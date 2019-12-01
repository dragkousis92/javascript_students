import Observer from '../library/Observer';
import CommentFormComponent from '../component/CommentFormComponent';
import IndexedDbConnector from "../utils/indexedDbConnector";

let update = IndexedDbConnector.update;
console.log(update);

class StudentDetailsComponent extends Observer{

    constructor(state,selector){

        super(state,selector);

        this._student = null;
        this._state = state;
        this._commentForm = null;
      

     
      
    }

    save(){
        update( this._student ,'student').then(response => {});

    }

    
    update(state) {
        console.log(this);

        if(!this._state._state._studentDetails) return;
        this._state=state;

        // IndexedDbConnector.init("persons", "student").then(response =>{

            // indexedDbConnector.read( this._state._state._studentDetails - 0 ,'student').then(response => {
                this._student= this._state._state._studentDetails;
                this._commentForm = new CommentFormComponent(state,'commentFormWrapper',this._student.comments,this);
                this.render();
              
            //   });
    
        // });
          
      
      }    

    generateHTML() {

        console.log('generateHTML');
        if(!this._student) return "";

        let studiesHTML='<ol>';
        this._student.studies.map(study =>{
            studiesHTML+=`<li class='study'>${study}</li>`; 
        });        

        let html = 
        `<div class='studentDetailsWrapper'>
            <div class='row'>
                <div class='col-md-6'><img src='${this._student.image}'></div>
                <div class='col-md-6'>
                    ${this._student.id}.${this._student.first_name} ${this._student.last_name} ${this._student.DoB}

                    <div class='row'>
                        <div class='col-md-12'>
                            ${this._student.academy_period}
                            ${studiesHTML}
                        </div>
                    </div>
                </div>
            </div>
            <div class='row'>
                <div class='col-md-12'>
                  <div id='commentFormWrapper'></div>
                </div>
            </div>
        </div>`;

        return html;
    }

    getAcademyPeriod(){
        return this._student.academy_period;
    }

    render(){
        super.render();
        this._commentForm.render();
    }
}


export default StudentDetailsComponent;