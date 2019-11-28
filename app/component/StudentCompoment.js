import Student from '../models/Student';

class StudentComponent extends Student {

    renderSummary() {
        let html = `<div class='studentWrapper'>
            <div class=''>${this.id}</div>
        </div>`;

        return html;
    }


}

export default Student;