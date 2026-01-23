const fs = require('fs');
const pdfLib = require('pdf-parse');

const dataBuffer = fs.readFileSync('new_product.pdf');

// Handle potential ESM default export in CJS
const pdfParse = (typeof pdfLib === 'function') ? pdfLib : (pdfLib.default || pdfLib);

if (typeof pdfParse !== 'function') {
    console.log('PDF Parse Library Structure:', pdfLib);
} else {
    pdfParse(dataBuffer).then(function (data) {
        console.log("PDF TEXT START");
        console.log(data.text);
        console.log("PDF TEXT END");
    }).catch(err => {
        console.error("Error:", err);
    });
}
