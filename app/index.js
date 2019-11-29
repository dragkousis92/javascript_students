import Student from "./models/Student";
import IndexedDbConnector from "./utils/indexedDbConnector";
import Utils from "./utils/utils";
import StudentComponent from "./component/StudentCompoment";
import StudentListComponent from "./component/StudentListComponent";
import Subject from "./library/Subject";

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
    db.readAll("student");
});

document.addEventListener("IndexedDbReadAll", function (e) {

  
 
    let subject = new Subject();
    let state= {'filter' : "-"};
    subject.update(state);
    console.log(subject);



    let studentList = new StudentListComponent(subject,'studentList');
    subject.addObserver(studentList);

    event.detail.result.map((item) => {
        let temp = new StudentComponent(item,state);
        studentList.addStudentComponent(temp);
        // Students.push(Utils.convertObjectToPerson(item));
    });

    studentList.render();


    // setTimeout(() => {
    //     state= {'filter': "October 2019"};
    //     subject.update(state);
    //     console.log(subject);
    // }, 5000);
   

    

});




let result = [];


console.log(result);

