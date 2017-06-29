import React from 'react'
import moment from 'moment'
import TrashIcon from '../assets/trash.svg'

const NoteCard = ({ selected, title, date, selectNote, deleteNote }) =>
  <div className={`note-card ${selected ? 'selected' : ''}`} onClick={ selectNote }>
    <div className="note-card-text">
      <h3>{ title || 'Untitled Note' }</h3>
      <span>{ moment(date).format('MMMM Do, YYYY') }</span>
    </div>
    <div className="note-card-trash" onClick={ deleteNote }>
      <TrashIcon />
    </div>
  </div>

export default NoteCard
