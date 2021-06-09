import React, { useEffect, useMemo } from 'react'
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setNotes } from '../../store/notes/notesSlice';
import { getNotesForCollection } from '../../utils/firebase/collections';
import NoteSingle from './NoteSingle';

export interface NotesData {
  title?: string;
  content?: string;
}

export interface Note extends NotesData {
  id: string;
}

export interface NotesCollectionData {
  id: string;
}

const NotesBase: React.FC<NotesCollectionData> = ({ id }) => {

  const dispatch = useAppDispatch();
  const notesSelector = (state: RootState) => state.notes.notes;
  const allNotes = useAppSelector(notesSelector);

  useEffect(() => {
    async function fetchNotes() {
      const notes = await getNotesForCollection(id);
      if (notes !== undefined) {
        dispatch(setNotes({collectionId: id, notes}));
      }
    }
    fetchNotes();

  }, [id, dispatch])

  const notes = useMemo(() => allNotes[id], [id, allNotes])

  return (
    <>
    Notes!
    {notes && notes.map(n => <NoteSingle key={n.id} {...n} />)}
    </>
  )
}

export default NotesBase
