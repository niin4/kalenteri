import { NotesData } from '../../components/notes/NotesBase';
import { firestore } from './index';

interface CollectionData {
  type: string;
  owner: string;
  column: number;
  row: number;
  height: number;
  width: number;
}

export interface Collection extends CollectionData {
    id: string;
}

export interface Datasource {
  providerId: string | number;
  provider: string;
}

export interface NoteGroup {
  title: string;
}

export const getUserCollections = async (userId: string) => {
  const collections = await firestore.collection('collections').where('owner', '==', userId).get();

  if (!collections.empty) {
    const col: Collection[] = collections.docs.map(d => ({id: d.id, ...d.data() as CollectionData}) );
    return col;
  } 
  return undefined;
}

export const getDatasources = async (collectionId: string) => {
  const datasources = await firestore.doc(`collections/${collectionId}`).collection('datasources').get();

  if (!datasources.empty) {
    const response = datasources.docs.map(d => ({id: d.id, ...d.data() as Datasource}) );
    return response;
  } 
  return undefined;
}

/* export const getNoteGroups = async (collectionId: string) => {
  const noteGroups = await firestore.doc(`collections/${collectionId}`).collection('notegroups').get();

  if (!noteGroups.empty) {
    const response = noteGroups.docs.map(d => ({id: d.id, ...d.data() as NoteGroup}) );
    console.log(response);
  } 
  return undefined;
}
 */
export const getNotesForCollection = async (collectionId: string) => {
  const notes = await firestore.collection('note').where('collection', '==', collectionId).get();

  if (!notes.empty) {
    const response = notes.docs.map(d => ({id: d.id, ...d.data() as NotesData}) );
    return response;
  } 
  return undefined;
}

