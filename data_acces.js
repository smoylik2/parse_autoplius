const cheerio = require("cheerio");
const axios = require("axios");

function parse(html) {/* in: html-markup out: array with objects */
    /* parse html */
    let page = cheerio.load(html);
    /* set max length of result array */
    let count = page(".announcement-item").length;
    /* create array result */
    let arrResult = [];
    /* choose ever element in class and add to object, object push in results array */
    for (let i = 0; i < count; i++) {
        arrResult.push({
            img: page(".announcement-item .announcement-photo img")[i]
                .attribs['data-src'],
            name: page(".announcement-item .announcement-body .announcement-title")[i]
                .children[0].data.trim(),
            price: page('.announcement-item .announcement-pricing-info strong')[i]
                .children[0].data.trim(),
            year: page('.announcement-item .announcement-parameters .bottom-aligner span[title="Дата выпуска"]')[i]
                .children[0].data.trim()
        })
    }
    return arrResult
}

function createPromiseFromLink(url) {/* in: url-link out: promise */
    /* create get request and return promise */
    return new Promise((resolve) => {
        axios.get(url).then(res => {
            resolve(parse(res.data))
        })
    })
}

function createArrOfLinks(mainLink, startPage, count) {
    /* in: first-part of link, started number, final number */
    /* out: array with links */
    /* generated array with links */
    let arrResult = [];
    for (let i = startPage; i < (startPage + count); i++) {
        arrResult.push(`${mainLink}&page_nr=${i}`)
    }
    return arrResult
}

/* main function, parsed pages, in: url, first page, count currency, elements on a page out: array with data */
function scribingData(mainUrl, pageNumber, pool = 10, itemsOnPage = 20) {
    /* create array with links */
    let arrWithPromise = createArrOfLinks(mainUrl, pageNumber, pool);
    /* create array with promises */
    arrWithPromise.forEach((v, i, a) => a[i] = createPromiseFromLink(v));
    /* recursion function, get even 'pool' pages */
    return Promise.all(arrWithPromise).then((v) => {
            /* align array to single floor */
            v = v.flat();
            if (v.length === (pool * itemsOnPage)) {
                /* resume parsing pages */
                return scribingData(mainUrl, (pageNumber + pool), pool).then(a => [...v, ...a])
            } else {
                /* basic case - exit from all recursion stack */
                return [...v]
            }
        }
    ).catch(e => console.log(e.message))
}

module.exports = {scribingData};