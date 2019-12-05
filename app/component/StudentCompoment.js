import Student from '../models/Student';
import Observer from '../library/Observer';

class StudentComponent extends Observer{

    constructor(student,state){
        super(state,null);
        this._student = student;
        this._state = state;
        this._detailsSelector
    }

    generateHTML() {
        let html = `
        <div  class='studentWrapper'>
            <div class='studentDetailsLink' data-id='${this._student.id}' >
                ${this._student.id}:<img class='student-img'src='${this._student.image}'/> 
                <a href='/student/${this._student.id}'>${this._student.first_name} ${this._student.last_name}</a> ${this._student.DoB}
            </div> 
        </div>`;

        return html;
    }

    getAcademyPeriod(){
        return this._student.academy_period;
    };  
}

export default StudentComponent;