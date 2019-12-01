class Comment {
    constructor(
        name,
        text,
    
    ) {
        this._name = name;
        this._text = text;
       
    }

    toString() {
        return this._name + ": " + this._text;
    }
}

export default Comment;