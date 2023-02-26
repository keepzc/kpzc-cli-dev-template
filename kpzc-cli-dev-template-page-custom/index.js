const path = require('path')
const fse = require('fs-extra')
const glob = require('glob')
const ejs = require('ejs')
const semver = require('semver')
const pkgUp = require('pkg-up')

async function ejsRender(options) {
  const { targetPath, pageTemplate } = options
  const { ignore } = pageTemplate
  return new Promise((resolve, reject) => {
    glob(
      '**',
      {
        cwd: targetPath,
        nodir: true,
        ignore: ignore || ''
      },
      (err, files) => {
        if (err) {
          reject(err)
        } else {
          Promise.all(
            files.map((file) => {
              // 获取文件真实路径
              const filePath = path.resolve(targetPath, file)
              return new Promise((resolve1, reject1) => {
                // ejs渲染，重新拼接render参数
                ejs.renderFile(
                  filePath,
                  {
                    name: pageTemplate.pageName.toLocaleLowerCase()
                  },
                  {},
                  (err, result) => {
                    if (err) {
                      reject1(err)
                    } else {
                      // 重新写入文件信息
                      fse.writeFileSync(filePath, result)
                      resolve1(result)
                    }
                  }
                )
              })
            })
          )
            .then(() => {
              resolve()
            })
            .catch((e) => {
              reject(e)
            })
        }
      }
    )
  })
}

async function dependenciesMerge({ templatePath, targetPath }) {
  function exec(command, args, options) {
    const win32 = process.platform === 'win32'
    const cmd = win32 ? 'cmd' : command
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args
    return require('child_process').spawn(cmd, cmdArgs, options || {})
  }
  function execAsync(command, args, options) {
    return new Promise((resolve, reject) => {
      const p = exec(command, args, options)
      p.on('error', (e) => {
        reject(e)
      })
      p.on('exit', (c) => {
        resolve(c)
      })
    })
  }
  async function execCommand(command, cwd) {
    let ret
    if (command) {
      // npm install => ['npm', 'install']
      const cmdArray = command.split(' ')
      const cmd = cmdArray[0]
      const args = cmdArray.slice(1)
      ret = await execAsync(cmd, args, {
        stdio: 'inherit',
        cwd
      })
      if (ret !== 0) {
        throw new Error(command + '命令执行失败！')
      }
      return ret
    }
  }
  function objToArray(o) {
    const arr = []
    Object.keys(o).forEach((key) => {
      arr.push({
        key,
        value: o[key]
      })
    })
    return arr
  }
  function depDiff(templateDepArr, targetDepArr) {
    const finalDep = [...targetDepArr]
    // 1. 场景 模版中存在依赖，项目中不存在 （拷贝依赖）
    // 2. 场景 模版中存在，项目中也存在依赖（不会拷贝依赖， 但是在脚手架中提示，让开发者手动修改依赖）
    templateDepArr.forEach((templateDep) => {
      const duplicateDep = targetDepArr.find(
        (targetDep) => templateDep.key === targetDep.key
      )
      if (duplicateDep) {
        const templateRange = semver.validRange(templateDep.value).split('<')[1]
        const targetRange = semver.validRange(duplicateDep.value).split('<')[1]
        if (templateRange !== targetRange) {
          return
        }
      } else {
        finalDep.push(templateDep)
      }
    })
    return finalDep
  }
  function arrToObj(arr) {
    let obj = {}
    arr.forEach((item) => {
      obj[item.key] = item.value
    })
    return obj
  }
  // 处理依赖合并问题
  // 1. 获取package.json
  const templatePkgPath = pkgUp.sync({ cwd: templatePath })
  const targetPkgPath = pkgUp.sync({ cwd: targetPath })
  const templatePkg = fse.readJSONSync(templatePkgPath)
  const targetPkg = fse.readJSONSync(targetPkgPath)
  // 2. 获取dependencies
  const templateDep = templatePkg.dependencies || {}
  const targetDep = targetPkg.dependencies || {}
  // 3. 对象转化为数组
  const templateDepArr = objToArray(templateDep)
  const targetDepArr = objToArray(targetDep)
  // 4. dep 之间的diff
  const newDep = depDiff(templateDepArr, targetDepArr)
  // 5. 数组转化为对象
  const newDepObj = arrToObj(newDep)
  targetPkg.dependencies = newDepObj
  // 6. 写入目标目录package.json
  fse.writeJSONSync(targetPkgPath, targetPkg, { spaces: 2 })

  // 自动安装依赖
  console.log('项目依赖安装路径', path.dirname(targetPkgPath))
  console.log('正在安装页面模版依赖')
  await execCommand('npm install', path.dirname(targetPkgPath))
  console.log('安装页面模版依赖成功！')
}

async function install(options) {
  console.log('custom', options)
  const { templatePath, targetPath, pageTemplate } = options
  fse.copySync(templatePath, targetPath)
  await ejsRender({ targetPath, pageTemplate })
  await dependenciesMerge({ templatePath, targetPath })
}

module.exports = install
