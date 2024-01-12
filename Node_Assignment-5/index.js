const express = require('express');
const app = express();
const PORT = 8081;

app.get('/welcome', (req, res) => {
    res.status(200).type('text/plain').send('Welcome to Dominos!');
});

app.get('/contact', (req, res) => {
    const contactInfo = {
        phone: '18602100000',
        email: 'guestcaredominos@jublfood.com'
    };
    res.status(200).json(contactInfo);
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
