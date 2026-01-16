const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('Capaian pekanan TAHFIDZ & TILAWAI.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert to JSON to see the structure easily
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log("ALL SHEET NAMES:", workbook.SheetNames);

    // Read first 20 rows
    console.log("--- ROWS Sample (First 20) ---");
    data.slice(0, 20).forEach((row, i) => {
        console.log(`Row ${i}:`, JSON.stringify(row));
    });

} catch (error) {
    console.error("Error reading file:", error.message);
}
