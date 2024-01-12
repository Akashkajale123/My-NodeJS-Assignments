// readCommandLineArguments.js
const name = process.argv[2];

if (name) {
    console.log(`Hello ${name}`);
} else {
    console.log('Please provide a name as a command line argument.');
}
