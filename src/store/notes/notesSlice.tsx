import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Note } from '../../components/notes/NotesBase'

interface NotesState {
  notes: {[collectionId: string]: Note[]}
}

const initialState: NotesState = {
  notes: {}
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<{collectionId: string, notes: Note[]}>) => {
      state.notes[action.payload.collectionId] = action.payload.notes
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setNotes
} = notesSlice.actions

export default notesSlice.reducer