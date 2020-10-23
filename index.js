#!/usr/bin/env node

const fs = require('fs')
const sharp = require('sharp')

process.ROOT = __dirname

// 创建文件夹方法
const mkdirSync = async (dirname) => {
  if(!fs.existsSync(dirname)){
    fs.mkdirSync(dirname)
  }
}

// 获取文件大小
const getFileSize = (dirname) => {
  return (fs.statSync(dirname).size / 1024).toFixed(2) + 'KB'
}

const intoPath = `${process.ROOT}/images`
const outPath = `${process.ROOT}/out`
mkdirSync(outPath)


// 批量修改图片大小
const batchImgResize = async (width) => {
  const files = fs.readdirSync(intoPath)
  if(files.length ===0) {
    console.log('当前目录下没有文件')
  }
  for(let i = 0; i < files.length; i++){
    const size = getFileSize(`${intoPath}/${files[i]}`)
    console.log(`图片大小: ${size}`)
    await sharp(`${intoPath}/${files[i]}`).resize(width).toFile(`${outPath}/${files[i]}`)
    const size2 = getFileSize(`${outPath}/${files[i]}`)
    console.log(`转换后图片大小: ${size2}`)
  }
}

batchImgResize(800)