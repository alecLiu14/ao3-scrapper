const puppeteer = require('puppeteer');

console.log('hello 4');

async function pleaseStart() {
    console.log('hello 1');
    
    const browser = await puppeteer.launch({
        // executablePath: "C:\Users\sammi\AppData\Local\Programs\Opera GX\opera.exe",
        enableExtensions: true,
        headless: false,
        dumpio: true
    });

    console.log('hello 3');
    const page = await browser.newPage();
    console.log('hello 2');
    await page.goto('https://quotes.toscrape.com');
}

pleaseStart();