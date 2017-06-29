import React, { Component } from 'react'
import { connect } from 'react-redux';
import { retrieveNotes, addNote, deleteNote } from '../store/reducers/notes';
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

  removeNote(evt, noteId) {
    evt.stopPropagation()
    this.props.deleteNote(noteId)

    // De-select note if just removed
    if (noteId === this.state.selected._id)
      this.setState({ selected: null })
  }

  saveNote() {
    console.log('saving note')
  }

  render() {
    const { notes, addNote } = this.props
    const { selected } = this.state
    return (
      <div className="notebook">
        <div className="notes-list">
          <button onClick={ addNote }>New Note</button>
          <div className="notes">
          {notes.map(note =>
            <NoteCard key={ note._id }
              selected={ selected && note._id === selected._id  }
              title={ note.title }
              date={ note.hoodie.createdAt }
              selectNote={ () => this.viewNote(note) }
              deleteNote={ evt => this.removeNote(evt, note._id) }
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
  retrieveNotes: () => dispatch(retrieveNotes()),
  addNote: () => dispatch(addNote()),
  deleteNote: noteId => dispatch(deleteNote(noteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notebook)
