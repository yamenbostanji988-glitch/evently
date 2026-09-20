const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "events.json");

function getEvents() {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveEvents(events) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(events, null, 4)
    );
}

module.exports = {
    getEvents,
    saveEvents
};
