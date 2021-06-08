import React from 'react'

export interface NotesData {
  id: string;
}

const NotesBase: React.FC<NotesData> = ({id}) => {
  return (
    <div>
      Notes!
    </div>
  )
}

export default NotesBase
