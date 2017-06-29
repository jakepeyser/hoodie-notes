import React, { Component } from 'react'
import showdown from 'showdown'
const converter = new showdown.Converter()

export default class Note extends Component {
  constructor(props) {
    super(props)
    this.state = this.getStateFromNote(this.props.note)
    this.saveNote = this.saveNote.bind(this)
  }

  // Update note view when new note selected
  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromNote(nextProps.note))
  }

  getStateFromNote(note) {
    const newState = {
      id: note && note._id,
      title: note && note.title || '',
      text: note && note.text || ''
    }
    newState.rendered = this.renderMarkdown(newState.text)
    return newState
  }

  updateNote(field, val) {
    this.setState({ [field]: val })
  }

  renderMarkdown(markup) {
    return converter.makeHtml(markup)
  }

  saveNote() {
    const { title, text } = this.state
    this.props.handleSave(Object.assign({}, this.props.note, { title, text }))
  }

  render() {
    const { id, title, text, rendered } = this.state
    return (
      <div className="note-wrapper">
      {id ?
        <div className="note">
          <div className="note-title">
            <input
              placeholder="Title"
              value={ title }
              onChange={ evt => this.updateNote('title', evt.target.value) }
            />
            <button onClick={ this.saveNote }>Save</button>
          </div>
          <div className="note-panes">
            <div className="note-edit">
              <textarea
                placeholder="Write your Markdown here..."
                value={ text }
                onChange={ evt => {
                  this.updateNote('text', evt.target.value)
                  this.updateNote('rendered', this.renderMarkdown(evt.target.value))
                }}
              />
            </div>
            <div className="note-view" dangerouslySetInnerHTML={{ __html: rendered }} />
          </div>
        </div> :
        <p>Please add a note or select one from the list to get started!</p>
      }
      </div>
    )
  }
}
