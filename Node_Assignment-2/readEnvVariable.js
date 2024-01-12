// readEnvVariable.js
const name = process.env.USERNAME;

if (name) {
    console.log(`Hello ${name}`);
} else {
    console.log('Please set the USERNAME environment variable.');
}
