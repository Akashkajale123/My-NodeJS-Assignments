const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// GET request to home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// POST request for addition
app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        res.json({ status: 'error', message: 'Invalid data types' });
        return;
    }

    const sum = num1 + num2;

    if (sum > 1000000) {
        res.json({ status: 'error', message: 'Overflow' });
    } else if (sum < -1000000) {
        res.json({ status: 'error', message: 'Underflow' });
    } else {
        res.json({ status: 'success', message: 'The sum of given two numbers', sum });
    }
});

// POST request for subtraction
app.post('/sub', (req, res) => {
    const { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        res.json({ status: 'error', message: 'Invalid data types' });
        return;
    }

    const difference = num1 - num2;

    if (difference > 1000000) {
        res.json({ status: 'error', message: 'Overflow' });
    } else if (difference < -1000000) {
        res.json({ status: 'error', message: 'Underflow' });
    } else {
        res.json({ status: 'success', message: 'The difference of given two numbers', difference });
    }
});

// POST request for multiplication
app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        res.json({ status: 'error', message: 'Invalid data types' });
        return;
    }

    const result = num1 * num2;

    if (result > 1000000) {
        res.json({ status: 'error', message: 'Overflow' });
    } else if (result < -1000000) {
        res.json({ status: 'error', message: 'Underflow' });
    } else {
        res.json({ status: 'success', message: 'The product of given numbers', result });
    }
});

// POST request for division
app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        res.json({ status: 'error', message: 'Invalid data types' });
        return;
    }

    if (num2 === 0) {
        res.json({ status: 'error', message: 'Cannot divide by zero' });
        return;
    }

    const result = num1 / num2;

    if (result > 1000000) {
        res.json({ status: 'error', message: 'Overflow' });
    } else if (result < -1000000) {
        res.json({ status: 'error', message: 'Underflow' });
    } else {
        res.json({ status: 'success', message: 'The division of given numbers', result });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
