import Subject from '../library/Subject';
import indexedDbConnector from '../utils/indexedDbConnector'
import Observer from '../library/Observer';
import StudenComponent from './StudentCompoment';

class StudentListComponent extends Observer {

    constructor(state, selector) {
        super(state,selector);
        this._students = [];

        // let students =  IndexedDbConnector.readAll();
    }

    addStudentComponent(student){
      console.log('adding student');
      this._students.push(student);
    }

    generateHTML(){
   
      let studentsHTML = '';
      console.log(this._state);
      this._students.filter(student => {
        return this._state.filter !== student.getAcademyPeriod();
      }).forEach( student => {
          studentsHTML+= student.render();
      });
      
      let html =
       `<div class='studentList'>
            <div class=''>${studentsHTML}</div>
        </div>`
        ;

      return html;
        
    }

    update(state) {
      this._state=state;
      this.render();
    }    
}

export default StudentListComponent;