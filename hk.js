const puppeteer = require('puppeteer')

const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'ytg38021@qopow.com'
const password ='Raju@123'

let browserOpen = puppeteer.launch({
    headless : false, 
    args : ['--start-maximized'],
    defaultViewport: null
})

let page

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered = page.type("#input-1", email, {delay: 10})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered = page.type("#input-2", password, {delay : 10})
    return passwordIsEntered
}).then(function(){
    let LoginButtonClicked = page.click('button[data-analytics="LoginPassword"]', {delay: 50})
    return LoginButtonClicked
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]' , page)
    return getToWarmUp
}).then(function(){
    let waitFor3Seconds = page.waitFor(3000)
    return waitFor3Seconds
}).then(function(){
    let allChallengesPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay: 50})
    return allChallengesPromise;
}).then(function(questionArr){
    console.log('number of question', questionArr.length)
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answers[0])
    return questionWillBeSolved
})






function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
        
    })
}

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click()
        return questionWillBeClicked.then(function(){
            let EditorInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs", page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('.custom-input.theme-old.size-medium',page)
        }).then(function(){
            return page.type('.custom-input.theme-old.size-medium', answer, {delay:10})
        }).then(function(){
            let CtrlIsPressed = page.keyboard.down('Control')
            return CtrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:100})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X', {delay: 100})
            return XisPressed
        })

    })
}

