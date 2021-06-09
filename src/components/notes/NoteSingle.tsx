import React from 'react'
import styled from 'styled-components'
import { Note } from './NotesBase'

const NoteContainer = styled.div`
  background-color: white;
  padding: 0.1rem 0.5rem;
`

const NoteSingle: React.FC<Note> = ({title, content}) => {
  return (
    <NoteContainer>
      <h3>{title}</h3>
      <p>{content}</p> 
    </NoteContainer>
  )
}

export default NoteSingle
