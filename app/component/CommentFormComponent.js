import Observer from '../library/Observer';
import Comment from '../models/Comment';

class CommentFormComponent extends Observer{

    constructor(state,selector,commentList,_student){

        super(state,selector);

        this._commentList = commentList;
        this._state = state;
        this._commentDetails = null;
        this._editComment = false;
        this._createComment = false;
        this._showForm = false;
        this._mode='';
        this._student=_student;
        this._commentDetailsId= -1;
      
    }

    generateCommentEntryHTML(){
        let counter=0;
        let commentHTML = '';
        this._commentList.forEach(comment =>{
         commentHTML+=`<li data-comment='${counter}' class='commennt'>${counter}. ${comment._name}-${comment._text}
                            <span class='edit'>e</span><span class='delete'>d</span>
                          </li>`; 
            counter++;
        });

        return `<ul>${commentHTML}</ul>`;
    }

    generateCommentForm(){
        if( !this._createComment && !this._editComment ) return '';

        let html = `<div class='formWrapper'>
                        <input id='nameInput' type='text' value='${this._commentDetails ? this._commentDetails._name : '' }' />
                        <input id='textInput' type='text' value='${this._commentDetails ? this._commentDetails._text : '' }' />
                    </div>
                    <div id='saveChangesButton'>${this._modeButton}</div>`;

        return html;
    }

    
    

    generateHTML(){
        return `<div class='comment-form'>
                    <div class='commentSum'>${this._commentList.length ? 'Number of comments:' + this._commentList.length : '' } </div>
                    <div id='createComment'>create new comment</div>
                    ${this.generateCommentEntryHTML()}
                    ${this.generateCommentForm()}
                </div>`;
    }

    attachListeners(){
        document.getElementById("createComment").onclick = () => {
            this._mode ='new';
            this._createComment = true;
            this._editComment = false;
            this._modeButton = 'save new';
            this.render();
        };

        let editBtns = document.getElementsByClassName('edit');
        for(let i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener("click", (e) => {   
                let commentId = e.target.parentElement.dataset.comment;
                this._mode ='edit';
                this._modeButton = 'save changes';
                this._commentDetails = this._commentList[ commentId ];
                this._commentDetailsId =  commentId;
                this._editComment = true;
                this._createComment = false;
                this.render();
            })
        }

        let deleteBtns = document.getElementsByClassName('delete');
        for(let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", (e) => {  
                console.log(  e.target.parentElement.dataset.comment ) ;
                this._commentList.splice( e.target.parentElement.dataset.comment , 1 );
                this.render();
            })
        }

        if( this._createComment || this._editComment ){
            let self = this;
            let saveChanges = function(){
                let tempComment = new Comment(document.getElementById("nameInput").value ,  document.getElementById("textInput").value );
        
                if( self._createComment ){
                    self._commentList.push( tempComment );   
                }
        
                if( self._editComment ) {
                    self._commentList[ self._commentDetailsId ] =  tempComment;
        
                }
                self._student.save();
                self.render();
            }

            document.getElementById("saveChangesButton").removeEventListener('click',saveChanges);
            document.getElementById("saveChangesButton").addEventListener('click',saveChanges);          
           
        }
    }


    render(){
        super.render();
        this.attachListeners();
    }
}

export default CommentFormComponent;