const fs = require('fs');

// Blocking , synchronous way
const data = fs.readFileSync('./file/text.txt' , 'utf-8');
const hello = "Hello Kanhaiya!";

const textOut = 'This is what we know about the avocado';
fs.writeFileSync('./file/output.txt' , textOut)
console.log(hello , data)

// Non-blocking, asynchronous way

fs.readFile('./file/output.txt' , 'utf-8' , (err , data) => {
    if(err) {
        throw err
    } else {
        console
        .log(data , "Check Data")
    }
})

fs.writeFile('./file/new.txt' , 'create new file and write something' , 'utf-8' , (err) => {
    if(err) return console.log('ERROR!')
})