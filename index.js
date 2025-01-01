const fs = require('fs');
const http = require('http');
const url = require('url');
// const EventEmitter = require('events');
// console.log(EventEmitter , "EventEmitter")
// const myEmiiter = new EventEmitter();

const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate')

// Blocking , synchronous way
// const data = fs.readFileSync('./file/text.txt' , 'utf-8');
// const hello = "Hello Kanhaiya!";

// const textOut = 'This is what we know about the avocado';
// fs.writeFileSync('./file/output.txt' , textOut)
// console.log(hello , data)

// Non-blocking, asynchronous way

// fs.readFile('./file/output.txt' , 'utf-8' , (err , data) => {
//     if(err) {
//         throw err
//     } else {
//         console
//         .log(data , "Check Data")
//     }
// })

// fs.writeFile('./file/new.txt' , 'create new file and write something' , 'utf-8' , (err) => {
//     if(err) return console.log('ERROR!')
// })

// ////////////////////////


// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html` , 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html` , 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html` , 'utf-8');
// console.log(tempOverview , tempCard ,tempProduct , 'Check This Line' )
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName , {lower: true}));
console.log(slugs , 'slugs')
const server = http.createServer((req, res) => {
    const {query , pathname} = url.parse(req.url , true);
    //Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        })
        const cardsHtml = dataObj.map(el =>  replaceTemplate(tempCard , el))
        const output = tempOverview.replace('{%PRODUCT_CARDS%}' , cardsHtml)
        // console.log(output , 'Check Output')
        res.end(output)
    }
    // Product Page
    else if (pathname === '/product') {
        res.writeHead(200 , {'Content-type': "text/html"})
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct , product);
        res.end(output);
    }
    //  API
    else if (pathname === '/api') {

        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
    }
    //  NOT FOUND
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end('<h1>Page not found!</h1>')
    }
})
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on request on port 8000')
})
