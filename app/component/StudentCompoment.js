import Student from '../models/Student';
import Observer from '../library/Observer';

class StudentComponent extends Observer{

    constructor(student,state){

        super(state,null);

        this._student = student;
        this._state = state;
      
    }

    generateHTML() {
        let html = `<div class='studentWrapper'>
            <div class=''>${this._student.id}</div>
        </div>`;

        return html;
    }

    getAcademyPeriod(){
        return this._student.academy_period;
    }


    


}

export default StudentComponent;