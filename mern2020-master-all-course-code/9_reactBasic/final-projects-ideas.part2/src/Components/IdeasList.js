import React, { Component } from 'react'
import Idea from './Idea'
import { MdAdd } from 'react-icons/md'
import data from '../data/data.json'

class IdeasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: []
    };

    this.eachIdea = this.eachIdea.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.nextID = this.nextID.bind(this);
  }

  componentWillMount() {
    data.map(item => this.add({ id: item.id, txt: item.idea, grp: item.group }))
  }

  update(newIdea, i) {
    this.setState(prevState => ({
      ideas: prevState.ideas.map(data => data.id !== i ? data : { ...data, idea: newIdea })
    }))
  }

  delete(id) {
    console.log(`deleted: ${id}`)
    this.setState(prevState => ({
      ideas: prevState.ideas.filter(idea => idea.id !== id)
    }))
  }

  // destructor + default values
  add({ event = null, id = null, txt = 'default title', grp = 'default group' }) {
    console.log(event, id, txt, grp)
    this.setState(prevState => ({
      ideas: [
        ...prevState.ideas, {
          id: id !== null ? id : this.nextID(prevState.ideas),
          idea: txt,
          group: grp
        }]
    }))
  }

  // default values + Array.reduce
  nextID(ideas = []) {
    let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0)
    return ++max
  }

  eachIdea(item, i) {
    return (
      <div
        key={ `container${item.id}` }
        className="card"
        style={ { width: '18rem', marginBottom: '7px' } }
      >
        <div className="card-body">
          <Idea
            // NOTE: No need this key here! read more: https://reactjs.org/docs/lists-and-keys.html#keys
            // key={ `idea${item.id}` }
            index={ item.id }
            onChange={ this.update }
            onDelete={ this.delete }
          >
            { console.log(item) }
            <h5 className="card-title">{ item.idea }</h5>
            <p className="card-text">{ item.group }</p>
          </Idea>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ideasList">
        { this.state.ideas.map(this.eachIdea) }
        <button
          id="add"
          onClick={ this.add }
          className="btn btn-primary"
          style={ { marginRight: '7px' } }
        >
          <MdAdd />
        </button>
      </div>
    );
  }
}

export default IdeasList;
