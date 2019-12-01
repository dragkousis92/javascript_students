import Subject from '../library/Subject';
import indexedDbConnector from '../utils/indexedDbConnector'
import Observer from '../library/Observer';
import StudenComponent from './StudentCompoment';



class StudentListComponent extends Observer {

    constructor(state, selector) {
        super(state,selector);
        this._students = [];

        // console.log(state);
    }

    addStudentComponent(student){
      this._students.push(student);
    }

    generateHTML(){
   
      let studentsHTML = '';

      let selectOptionsHTML = `<option value=''>All</option>`;
      let selectOptions=[];


      this._students.filter(student => {
        let academyPeriod= student.getAcademyPeriod();

        // selectInputHTML+= `<option value='}'></option>`;
        selectOptions.indexOf(academyPeriod) === -1 ? selectOptions.push(academyPeriod) : '';

        if(this._state._state._filter)
          return this._state._state._filter === student.getAcademyPeriod();
        else{
          return true;
        }
      }).forEach( student => {
          studentsHTML+= student.render();
      });

      selectOptionsHTML += selectOptions.map((option) =>{
        return `<option value='${option}' ${this._state._state._filter == option ? 'selected' : ""}>${option}</option>`
      }).join('');

      
      let html =
       `<div class='studentList'>
            <div class=''><select id='academyInput'>${selectOptionsHTML}</select></div>
            <div class=''>${studentsHTML}</div>
        </div>`
      ;
      return html;
    }

    attachListeners(){
    

      var userLinks = document.getElementsByClassName('studentDetailsLink');
      let state = this._state;

      for(let i = 0; i < userLinks.length; i++) {
        userLinks[i].addEventListener("click", function(e) {   
          state.setStudentDetails(e.target.dataset.id) ;
         
        })
      }

      document.getElementById('academyInput').onchange= (e) =>{
          state.setFilter( e.target.options[e.target.selectedIndex].value ) ;
      };
    }

    render(){
      super.render();
      this.attachListeners();
      console.log(this);
    }

    update(state) {
      this._state=state;
      this.render();
    }    
}

export default StudentListComponent;