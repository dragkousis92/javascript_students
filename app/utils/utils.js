import Student from "../models/Student";

class Utils {
    static instance;

    constructor() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = this;
    };

    static convertObjectToPerson(object) {
        const { id, firstname, lastname, dob, image, studies, academyPeriod, comments } = object;
        return new Student(id, firstname, lastname, dob, image, studies, academyPeriod, comments);
    }

}

export default Utils;