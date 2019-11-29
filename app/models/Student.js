class Student {
    constructor(
        id,
        firstName,
        lastName,
        dob,
        image,
        studies,
        academyPeriod,
        comments
    ) {
        this.id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._dob = dob;
        this._image = image;
        this._studies = studies;
        this._academyPeriod = academyPeriod;
        this._comments = comments;
    }

    toString() {
        return this.id + ": " + this._firstName + " " + this._lastName + " " + this._dob + " " + this._image + " " + this._studies + " " + this._academyPeriod + " " + this._comments;
    }

    getAcademyPeriod() {
        return this._academyPeriod;
    }





}

export default Student;