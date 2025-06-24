const puppeteer = require('puppeteer');
const prompt = require ("prompt-sync")({sigint: true})

const loginURL = 'https://archiveofourown.org/users/login';
const URL = 'https://archiveofourown.org/tags/Sung%20Jin-Woo*s*Woo%20Jin-Chul/works';

async function pleaseStart() {
    
    const browser = await puppeteer.launch({
        headless: false //| headless: false means that the browser will pop up when launched, makes it visible for the programmer
    });

    const page = await browser.newPage();
    
    // let username = "melotonin";//prompt("enter username:");
    // let pass = "mrshinypet1035";//prompt("enter password:");
    
    // await page.goto(loginURL);
    // await page.type('#user_login', username);
    // await page.type('#user_password', pass);
    // await Promise.all([
    //     page.click('.submit[type="submit"]'),
    //     page.waitForNavigation({waitUntil : 'networkidle0', timeout : 60000}),
    // ]);
    
    await page.goto(URL ,{timeout : 60000});

    /*do {
        await page.click(".next a");
        if(await page.$(".next .disabled") != null) {
            console.log("no more next page");
            break;
        }
        await page.waitForSelector('.next a', )
        
    } while(await page.$(".next a") != null); //could honestly just be a true statement since the actual breaker is in an if

    console.log("hi");*/

    // finds all titles in the current page and returns them as an array which is then printed out
    const fics = await page.evaluate(() => {
        const ficElements = document.querySelector('[role="article"]');
        const ficStats = ficElements.querySelector('.stats');
        const ficKudos = ficStats.querySelector('.kudos a');
        const ficHits = ficStats.querySelectorAll('.hits').item(1).textContent.replaceAll(',', "");

        // const ficsArray = [];

        // for(const ficElement of ficElements) {
        //     const title = ficElement.querySelector('.header.module .heading');

        //     const clean = title.textContent.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");
        //     const final = clean.replace(/\n/g, " ");

        //     ficsArray.push(final);
        // }

        return ficHits;
    });

    console.log(fics);
    
    // prints out the html content of the page
    // console.log(await page.content());
    
    await browser.close();
}

pleaseStart();

    // if(await page.$(".next a") == null) {
        // console.log("no more next page");
    // }
    //takes a screenshot and saves it as quotes.png in the current project folder
    // await page.screenshot({
    //     path: 'fics.png'
    // });

    // prints out the html content of the page
    // console.log(await page.content());