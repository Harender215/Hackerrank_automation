const puppeteer = require('puppeteer')
const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'ytg38021@qopow.com'
const password ='Raju@123';



(async function(){
    try{
        let browserInstance = await puppeteer.launch({
            headless : false, 
            args : ['--start-maximized'],
            defaultViewport: null
        })

        let newTab = await browserInstance.newPage()
        await newTab.goto(loginLink)
        await newTab.type("#input-1", email, {delay: 10})
        await newTab.type("#input-2", password, {delay : 10})
        await newTab.click('button[data-analytics="LoginPassword"]', {delay: 50})
        await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab)

    }catch(error){
        console.log(error)
    }
})()


async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector)
    let selectorClicked = cPage.click(selector)
    return selectorClicked
}