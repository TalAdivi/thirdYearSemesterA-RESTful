import React, {Component} from 'react';
import {MdDelete, MdEdit, MdSave} from 'react-icons/md';

class Idea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
        }

        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.renderUI = this.renderUI.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }
    

    edit(e) {
        this.setState({
            editing: true
        })
        console.log('edit');
    }

    delete() {
        this.setState({
            tal: "Dafi"
        })

        this.props.onDelete(this.props.index);
        console.log('delete');
    }

    save(e) {
        e.preventDefault();
        // console.log(this.newIdea.value)
        this.props.onChange(this.newIdea.value, this.props.index);

        this.setState({
            // saved:true
            editing: false
        })


        // this.allSubjects.push(<span> {this.refs.projectIdeaTextArea.value} </span>  );
        console.log('project name saved');
    }


    renderUI() {
        return(
        <div className="idea">
            <div>{this.props.children}</div>
            <span>
            <button onClick={this.edit} className= "btn btn-primary" style={{marginRight: 7 + 'px'}}><MdEdit/></button>
            <button onClick={this.delete} className= "btn btn-primary"><MdDelete/></button>
            </span>
        </div>
        )         
    }

    renderForm() {
        return(
            <div>
            <p>Select Subject</p>
                <form>
                    <textarea  ref={ input => {this.newIdea = input; } }/>
                    <button onClick={this.save} ><MdSave/></button>
                </form>
            </div>   
        ) 
    }


render() {
    return !this.state.editing ? this.renderUI() : this.renderForm();
    }

}

export default Idea;