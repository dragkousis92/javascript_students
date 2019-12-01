class Observer {
    constructor(state,selector){
        this._state= state;
        this._selector = selector;
    }
    update(state){};

    generateHTML(){
        return "";
    }

    render(){ 
        
        if(this._selector){
            let markup = this.generateHTML();
            let parent = document.getElementById(this._selector);
            parent.innerHTML = markup;

            console.log(this._selector,markup);
            return;
        }

        let markup = this.generateHTML();
        return markup;     
     };
}


export default Observer;
