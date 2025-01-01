const fs = require('fs');
const server = require('http').createServer()

server.on('request' , (req , res) => {
    // Solution 1 
    // fs.readFile('./dev-data/data.json' , (err , data) => {
    //     if(err) console.log(err) 
    //         res.end(data)
    // })

    // Solution 2: Streams

    // const readable = fs.createReadStream('./dev-data/data.json');
    // readable.on('data' , chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end' , () => {
    //     res.end()
    // })
    // readable.on('error' , () => {
    //     res.statusCode(500)
    //     console.log("File not found!")
    // })

    // Solution 3 
    const readable = fs.createReadStream('./dev-data/data.json');
    readable.pipe(res)
})


server.listen(8000 , "127.0.0.1" , () => {
    console.log("Listening...")
})