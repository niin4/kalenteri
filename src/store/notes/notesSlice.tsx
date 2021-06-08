import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Note {
  id: string;
  title?: string;
  text?: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: []
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setNotes
} = notesSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default notesSlice.reducer