const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "bookings.json");

function getBookings() {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveBookings(bookings) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(bookings, null, 4)
    );
}

module.exports = {
    getBookings,
    saveBookings
};