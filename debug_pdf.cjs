const fs = require('fs');
const pdfLib = require('pdf-parse');

const dataBuffer = fs.readFileSync('new_product.pdf');

async function parse() {
    try {
        console.log('Attempting parse...');
        // Common pattern: module.exports is the function
        if (typeof pdfLib === 'function') {
            const data = await pdfLib(dataBuffer);
            console.log('Text Content:', data.text);
            return;
        }

        // Check for .default
        if (pdfLib.default && typeof pdfLib.default === 'function') {
            const data = await pdfLib.default(dataBuffer);
            console.log('Text Content:', data.text);
            return;
        }

        // Check for PDFParse property (as seen in keys)
        if (pdfLib.PDFParse) {
            console.log('Found PDFParse property, type:', typeof pdfLib.PDFParse);
            // It might be the main function or a class
            if (typeof pdfLib.PDFParse === 'function') {
                // Try calling it
                try {
                    const data = await pdfLib.PDFParse(dataBuffer);
                    console.log('Text Content:', data.text);
                    return;
                } catch (err) {
                    console.error("Error calling PDFParse:", err);
                }
            }
        }

        console.error('Could not find parse function. Keys:', Object.keys(pdfLib));
    } catch (e) {
        console.error('Parse Error:', e);
    }
}

parse();
