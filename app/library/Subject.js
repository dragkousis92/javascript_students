class Subject {
    constructor() {
        this.observers = [];
        this._state= {};
    }

    update() {
        this.notify(this._state);
    }

    getState(){
        return this._state;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const removeIndex = this.observers.findIndex(obs => {
            return observer === obs;
        });

        if (removeIndex !== -1) {
            this.observers = this.observers.slice(removeIndex, 1);
        }
    }

    notify() {
        if (this.observers.length > 0) {
            this.observers.forEach(observer => observer.update(this));
        }
    }
}

export default Subject;
