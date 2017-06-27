import React, { Component } from 'react'
import { connect } from 'react-redux';
import { retrieveNotes } from '../store/reducers/notes';
import NoteCard from './NoteCard'
import Note from './Note'

class Notebook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  componentDidMount() {
    this.props.retrieveNotes()
  }

  viewNote(selected) {
    this.setState({ selected })
  }

  newNote() {
    console.log('new note')
  }

  saveNote() {
    console.log('saving note')
  }

  render() {
    const { notes } = this.props
    const { selected } = this.state
    return (
      <div className="notebook">
        <div className="notes-list">
          <button onClick={ this.newNote }>New Note</button>
          <div className="notes">
          {notes.map(note =>
            <NoteCard key={ note._id }
              selected={ selected && note._id === selected._id  }
              title={ note.title }
              date={ note.hoodie.createdAt }
              selectNote={ () => this.viewNote(note) }
            />
          )}
          </div>
        </div>
        <Note note={ selected } handleSave={ this.saveNote }/>
      </div>
    );
  }
}

const mapStateToProps = ({ notes }) => ({ notes })

const mapDispatchToProps = dispatch => ({
  retrieveNotes: () => dispatch(retrieveNotes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Notebook)
