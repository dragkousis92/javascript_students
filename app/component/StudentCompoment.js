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
        console.log(this._student);

        let html = `
        <div  class='studentWrapper'>
            <a href='/student/1'>student</a>
            <div class='studentDetailsLink' data-id='${this._student.id}' >
                ${this._student.id}:<img class='student-img'src='${this._student.image}'/> 
                ${this._student.first_name} ${this._student.last_name} ${this._student.DoB}
            </div> 
        </div>`;

        return html;
    }

    getAcademyPeriod(){
        return this._student.academy_period;
    };  
}

export default StudentComponent;