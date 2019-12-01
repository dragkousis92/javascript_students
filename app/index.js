import Student from "./models/Student";
import IndexedDbConnector from "./utils/indexedDbConnector";
import Utils from "./utils/utils";
import StudentComponent from "./component/StudentCompoment";
import StudentListComponent from "./component/StudentListComponent";
import StudentDetailsComponent from "./component/StudentDetailsComponent";
import StateComponent from "./component/StateComponent";

console.log(IndexedDbConnector);

let path = window.location.pathname;
let state = new StateComponent();

IndexedDbConnector.init("persons", "student").then(response =>{

        console.log(response)
        // /let database = response;

    if( path == '/'){
  
        let studentList = new StudentListComponent(state,'studentList');
        state.addObserver(studentList);

        IndexedDbConnector.readAll("student").then(response => {
            response.forEach(item=>{
                let temp = new StudentComponent(item,state);
                studentList.addStudentComponent(temp);
            });
            studentList.render();
        });
    }
    
    if(  path.indexOf('student/')  ){
        let studentId= path.split('/')[2];
        let studentDetails = new StudentDetailsComponent(state,'studentDetails');
        state.addObserver(studentDetails);

        IndexedDbConnector.read(1,'student',).then(response => {
             console.log(response)
                 state.setStudentDetails(response);
        })

    
    }


});


// document.addEventListener("IndexedDbReady", function (e) {
//     // db.readAll("student");
//     if( path == '/'){
  
//         let studentList = new StudentListComponent(state,'studentList');
//         state.addObserver(studentList);

//         window. db.readAll("student").then(response => {
//             response.forEach(item=>{
//                 let temp = new StudentComponent(item,state);
//                 studentList.addStudentComponent(temp);
//             });
//             studentList.render();
//         });
//     }
    
//     if(  path.indexOf('student/')  ){
//         let studentId= path.split('/')[2];
//         let studentDetails = new StudentDetailsComponent(state,'studentDetails');
//         state.addObserver(studentDetails);
//         state.setStudentDetails(studentId);
//     }

// });