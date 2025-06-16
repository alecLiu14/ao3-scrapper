const puppeteer = require('puppeteer');
const URL = 'https://archiveofourown.org/tags/Sung%20Jin-Woo*s*Woo%20Jin-Chul/works';

async function pleaseStart() {
    
    const browser = await puppeteer.launch({
        // headless: false //| headless: false means that the browser will pop up when launched, makes it visible for the programmer
    });

    const page = await browser.newPage();
    await page.goto(URL);
    
    //takes a screenshot and saves it as quotes.png in the current project folder
    await page.screenshot({
        path: 'fics.png'
    });

    // prints out the html content of the page
    // console.log(await page.content());

    const fics = await page.evaluate(() => {
        const ficElements = document.querySelectorAll('[role="article"]');

        const ficsArray = [];

        for(const ficElement of ficElements) {
            const title = ficElement.querySelector('.header.module .heading');

            const clean = title.textContent.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");
            const final = clean.replace(/\n/g, " ");

            ficsArray.push(final);
        }

        return ficsArray;
    });

    console.log(fics);
    
    // prints out the html content of the page
    // console.log(await page.content());
    
    await browser.close();
}

pleaseStart();