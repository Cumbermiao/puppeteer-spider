const http = require('http');
const https = require('https');
const fs = require('fs');
const {
    spider
} = require('../config/defaultConf');
const path = require('path')
const promisify = require('util').promisify;
const writeFile = promisify(fs.writeFile)

async function base2Img(src) {
    try {
        const regx = /^data:(.+?);base64(.+?)$/
        const matches = src.match(regx)
        const ext = matches[1].split('/')[1].replace('jpeg', 'jpg')
        const file = `${spider}/${Date.now()}.${ext}`
        const content = matches[2]
        await writeFile(file, content, 'base64')
        console.log(file)
    } catch (err) {
        console.log("err:", err)
    }
}

const url2Img = promisify((src) => {
    const mod = /https/.test(src) ? https : http
    const ext = path.extname(src)

    const file = path.resolve(__dirname, `../../spider/${Date.now()}${ext}`)
    console.log(file)
    try {
        mod.get(src, res => {
            res.pipe(fs.createReadStream(file))
                .on('finish', () => {
                    console.log(file)
                })
        })
    }catch(err){
        console.log('图片路径存在问题')
    }
})

module.exports = async (e) => {
    if (/^http/.test(e.src)) {
        try {
            await url2Img(e.src)
        } catch (err) {
            console.log('url2img:', err)
        }
    } else {
        await base2Img(e.src)
    }

}