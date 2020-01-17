import React, { Component } from 'react';
import Idea from './idea';
import { MdAdd } from 'react-icons/md';
import data from './../Data/data.json';

export default class IdeaList extends Component {
    constructor(props) {
        super(props);


        this.state = {
            ideas: [
                // {id:3, idea: 'one Idea', group:"Tal, Tomer"},
                // {id:7, idea: 'two Idea', group:"Fadi, Anni"},
                // {id:9, idea: 'three Idea', group:"Bla, Blabla"}
            ]
        }

        this.eachIdea = this.eachIdea.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
    }

    add({ event = null, id = null, txt = 'default title', grp = 'default group' }) {
        console.log(event, id, txt, grp);

        this.setState(prevState => ({
            ideas: [
                ...prevState.ideas, {
                    id: id !== null ? id : this.nextId(prevState.ideas),
                    idea: txt,
                    group: grp
                }
            ]
        }))
    }

    nextId(ideas = []) {
        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
    }

    componentDidMount() {
        data.map(item => {
            console.log('idea ' + item.idea);
            this.add({ id: item.id, txt: item.idea, grp: item.group });
        })
    }
    //need to write nextId // slide 22 

    delete(id) {
        this.setState(prevState => ({
            ideas: prevState.ideas.filter(idea => idea.id !== id)
        }))
    }

    update(newIdea, i) {
        console.log(`Update ${i} : ${newIdea}`);

        this.setState(prevState => ({
            ideas: prevState.ideas.map(
                oneIdea => oneIdea.id !== i ? oneIdea : { ...oneIdea, idea: newIdea }
            )
        }))

        // this.setState()
    }

    eachIdea(item, i, arr) {
        return (
            <div className="card" style={{ width: 18 + 'rem', marginBottom: 7 + 'px' }}>
                <div className="card-body">
                    <Idea key={i} index={item.id} onChange={this.update} onDelete={this.delete}>
                        <h5 className="card-title">{item.idea}</h5>
                        <p className="card-text"> By: {item.group} </p>
                        {/* <div>prev arr: {arr} </div> */}
                        {/* {console.log(`arr is: ${arr}`)} */}
                    </Idea>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="idea-list">
                {this.state.ideas.map(this.eachIdea)} 

                <button id="add" onClick={this.add} className="btn btn-primary" style={{ marginRight: "7px" }}> <MdAdd /> </button>
            </div>
        )
    }
}