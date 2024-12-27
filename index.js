const fs = require('fs');
const http = require('http');
const url = require('url');


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
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
console.log(data , 'Check Data Hain ??')
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the Overview ')
    } else if (pathName === '/product') {
        res.end('This is the products')
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
    }

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
