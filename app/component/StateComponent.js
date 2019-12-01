import Subject from '../library/Subject';

class StateComponent extends Subject{

    constructor(){
      super()
      this._state._filter = "";
      this._state._studentDetails = "";
  
    }

    getFilter(){
        return this._state._filter ;
    }

    getStudentDetails(){
        return this._state._studentDetails ;
    }

    setFilter(filter){
        this._state._filter = filter;
        this.notify();
    }

    
    setStudentDetails(studentDetails){
        this._state._studentDetails = studentDetails;
        this.notify();
    }

    notify() {
        if (this.observers.length > 0) {
            this.observers.forEach(observer => observer.update(this));
        }
    }
}

export default StateComponent;