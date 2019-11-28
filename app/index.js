import Student from "./models/Student";
import IndexedDbConnector from "./utils/indexedDbConnector";
import Utils from "./utils/utils";

const utils = new Utils();
const Students = [];



// Create the event
// var eventDBReady = new CustomEvent("IndexedDbReady", {});
// var eventDBLoad = new CustomEvent("IndexedDbLoad", {});

const db = new IndexedDbConnector("persons", "student");


window.db = db;

// Dispatch/Trigger/Fire the event



// db.add(s2, "student");



// Add an event listener
document.addEventListener("IndexedDbReady", function (e) {
    console.log('IndexedDbReady event');
    db.readAll("student");
});

document.addEventListener("IndexedDbReadAll", function (e) {


    event.detail.result.map((item) => {
        Students.push(Utils.convertObjectToPerson(item));
    });


    //addObserverPattern here

    let html = '';
    Students.forEach(student => { console.log(student); html += student.renderSummary() });

    console.log(html);

    document.getElementById('studentList').innerHTML = html;

});




let result = [];


console.log(result);

