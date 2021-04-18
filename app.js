const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});


http.get('http://jsonplaceholder.typicode.com/posts', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        fs.writeFile('result/post.json', data, function (err) {
            if (err) return console.log(err);
            console.log(`${data} > post.json`);
            console.log(data);
        });
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});




server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
