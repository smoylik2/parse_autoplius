const {getDataPage} = require('./business_logic');
const fs = require('fs');

async function create_html(url) {
    /* wait data from bll (array with object) */
    const arrData = await getDataPage(url);
    /* read template for one car */
    let template = fs.readFileSync('car_template.html').toString();
    /* replace template point to data */
    let arrResult = arrData.map((v, i, a, marckup) => {
        marckup = template.replace(/{{img}}/g, v.img)
            .replace(/{{name}}/g, v.name)
            .replace(/{{count}}/g, v.count);
        v.minPrice === v.maxPrice
            ? marckup = marckup.replace(/{{price}}/g, v.maxPrice)
            : marckup = marckup.replace(/{{price}}/g, `от  ${v.minPrice} до  ${v.maxPrice}`);
        v.minYear === v.maxYear
            ? marckup = marckup.replace(/{{year}}/g, v.maxYear)
            : marckup = marckup.replace(/{{year}}/g, `от  ${v.minYear} до  ${v.maxYear}`);
        return marckup
    });
    /* read template whole pages */
    let mainPage = fs.readFileSync('list.html').toString();
    /* create complete html for response */
    mainPage = mainPage.replace(/{{Content}}/g, arrResult.join('\n'));

    return mainPage
}

module.exports = {createHtml: create_html};