const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        // Go to addUser.html and click addUser
        await page.goto('http://localhost:3001/addUser.html');
        await page.click('#addUser');

        // Go to data.html and click showAllData
        await page.goto('http://localhost:3001/data.html');
        await page.click('#showAllData');

        // Wait for data to populate status div
        await page.waitForSelector('#status:not(:empty)');

        // Read status data
        const status = await page.$('#status');
        console.log(await status.evaluate(node => node.innerHTML));

        // Go to allUsers, take a screenshot
        await page.goto('http://localhost:3001/allUsers.html');
        await page.click('#showAllData');
        await page.waitForSelector('#status:not(:empty)');
        await page.screenshot({ path: 'screen.png' });

        // Read status data
        const newStatus = await page.$('#status');
        console.log(await newStatus.evaluate(node => node.innerHTML));

        // Close the browser
        await browser.close();
    } catch (e) {
        console.log(e);
    }
})();
