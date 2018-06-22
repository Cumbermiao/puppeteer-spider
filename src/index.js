const puppeteer = require('puppeteer');
const {
    screenShot
} = require('./config/defaultConf')
const savePic = require('./helper/toImg.js')
const img = require('./test')
    // savePic("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1852430516,3040315200&amp;fm=27&amp;gp=0.jpg")
    ~(async () => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        try {
            await page.setViewport({
                width: 1920,
                height: 1280
            })
            await page.goto('https://image.baidu.com/');
            await page.focus("#kw")
            page.keyboard.sendCharacter('清纯')
            await page.click(".s_search")

            // await page.screenshot({
            //     path: `${screenShot}/${Date.now()}.png`
            // });
            page.on('load', async () => {
                const imgs = await page.$$eval('img.main_img', (imgs) => {
                    return imgs
                    // console.log(savePic)
                    // await savePic(item.src)
                })
                console.dir(imgs)
                imgs.forEach((item) => {
                    console.log(item.src)
                })
                // const srcs = await page.evaluate(()=>{
                //     const images = document.querySelectorAll('img.main_img')
                //     return [].map.call(images,(e)=>e.src)
                // })
                // console.log(srcs)
                // srcs.forEach((item)=>{
                //     savePic(item)
                // })
                // await browser.close();

            })

        } catch (error) {
            console.log('error:', error)
        }
    })();