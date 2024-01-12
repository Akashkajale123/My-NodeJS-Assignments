// index.js
const fs = require('fs');
const http = require('http');

const port = 5000; // You can use any port of your choice

// Read the content of index.html
const htmlContent = fs.readFileSync('index.html', 'utf-8');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(htmlContent);
    res.end();
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
