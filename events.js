const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmiiter = new Sales();

myEmiiter.on('newSale', () => {
    console.log('There was a new sale!')
})

myEmiiter.on('newSale', () => {
    console.log("Customer name: jonas")
})
myEmiiter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock`)
})


myEmiiter.emit('newSale', 9)


const server = http.createServer()
server.on('request' , (req  , res) => {
    res.end('Request Received')
})

server.on('close' , (req , res) => {
    console.log('Server Closed')
})

server.listen(8000 , '127.0.0.1', () => {
    console.log('This Serbver listening on Port 8000')
})