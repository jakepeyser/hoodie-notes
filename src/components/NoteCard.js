import React from 'react'
import moment from 'moment'

const NoteCard = ({ selected, title, date, selectNote }) =>
  <div className={`note-card ${selected ? 'selected' : ''}`} onClick={ selectNote }>
    <h3>{ title || 'Untitled Note' }</h3>
    <span>{ moment(date).format('MMMM Do, YYYY') }</span>
  </div>

export default NoteCard
