import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  retrieveNotes, addNote, deleteNote, updateNote
} from '../store/reducers/notes'
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
    // Retrieve notes on slight delay to accommodate login
    window.setTimeout(() => {
      this.props.retrieveNotes()
    }, 200)
  }

  componentDidUpdate() {
    const { notes } = this.props
    // If no selection or deleted note was selected, select the first note
    if (notes.length && (!this.state.selected
        || !notes.find(note => note._id === this.state.selected))) {
      this.setState({ selected: notes[0]._id })
    }
  }

  viewNote(noteId) {
    this.setState({ selected: noteId })
  }

  removeNote(evt, noteId) {
    evt.stopPropagation()

    // De-select note if just removed
    if (noteId === this.state.selected._id)
      this.setState({ selected: null })
    this.props.deleteNote(noteId)
  }

  render() {
    const { notes, addNote, saveNote } = this.props
    const { selected } = this.state
    return (
      <div className="notebook">
        <div className="notes-list">
          <div className="add-note">
            <button onClick={ addNote }>New Note</button>
          </div>
          <div className="notes">
          {notes.map(note =>
            <NoteCard key={ note._id }
              selected={ selected && note._id === selected  }
              title={ note.title }
              date={ note.hoodie.createdAt }
              selectNote={ () => this.viewNote(note._id) }
              deleteNote={ evt => this.removeNote(evt, note._id) }
            />
          )}
          </div>
        </div>
        <Note
          note={ notes.find(note => note._id === selected) }
          handleSave={ saveNote }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ notes }) => ({ notes })

const mapDispatchToProps = dispatch => ({
  retrieveNotes: () => dispatch(retrieveNotes()),
  addNote: () => dispatch(addNote()),
  deleteNote: noteId => dispatch(deleteNote(noteId)),
  saveNote: note => dispatch(updateNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notebook)
