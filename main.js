const fs = require('fs');

const filePath = process.argv[2];

function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file ${filePath}: ${err.message}`);
        return;
      }
      resolve(data);
    });
  });
}

function modifyText(text) {
  return new Promise((resolve, reject) => {
    try {
      // Convert text to uppercase
      const upperCaseText = text.toUpperCase();
      
      // Reverse the text
      const reversedText = upperCaseText.split('').reverse().join('');
      
      resolve(reversedText);
    } catch (err) {
      reject(`Error modifying text: ${err.message}`);
    }
  });
}

// Check if file path is provided
if (!filePath) {
  console.error('Please provide a file path as a command-line argument.');
  process.exit(1);
}

// Read and modify the file content
readFileAsync(filePath)
  .then((data) => modifyText(data))
  .then((modifiedText) => {
    console.log(modifiedText);
  })
  .catch((error) => {
    console.error(error);
  });
