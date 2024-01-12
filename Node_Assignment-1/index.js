const fs = require('fs');

// Function to create a new file with the given name and content
const myFileWriter = (testfile, content) => {
    fs.writeFileSync(`${testfile}.txt`, content);
    console.log(`${testfile}.txt created with content: ${content}`);
};

// Function to read the content of a file with the given name
const myFileReader = (testfile) => {
    try {
        const content = fs.readFileSync(`${testfile}.txt`, 'utf-8');
        console.log(`Content of ${testfile}.txt: ${content}`);
    } catch (error) {
        console.error(`Error reading ${testfile}.txt: ${error.message}`);
    }
};

// Function to update the content of a file without overwriting
const myFileUpdater = (testfile, newContent) => {
    try {
        fs.appendFileSync(`${testfile}.txt`, newContent);
        console.log(`${testfile}.txt updated with content: ${newContent}`);
    } catch (error) {
        console.error(`Error updating ${testfile}.txt: ${error.message}`);
    }
};

// Function to delete a file with the given name
const myFileDeleter = (testfile) => {
    try {
        fs.unlinkSync(`${testfile}.txt`);
        console.log(`${testfile}.txt deleted`);
    } catch (error) {
        console.error(`Error deleting ${testfile}.txt: ${error.message}`);
    }
};

// Test cases
// Uncomment and run each test case one by one

// myFileWriter("testfile", "Hello");
// myFileReader("testfile");
// myFileUpdater("testfile", " World");
// myFileDeleter("testfile");
