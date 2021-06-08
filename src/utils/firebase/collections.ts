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

export const getUserCollections = async (userId: string) => {
  const collections = await firestore.collection('collections').where('owner', '==', userId).get();

  if (!collections.empty) {
    const col: Collection[] = collections.docs.map(d => ({id: d.id, ...d.data() as CollectionData}) );
    return col;
  } 
  return undefined;
}

export const getDatasources = async (collectionId: string) => {
  const collections = await firestore.doc(`collections/${collectionId}`).collection('datasources').get();

  if (!collections.empty) {
    const response = collections.docs.map(d => ({id: d.id, ...d.data()}) );
    console.log(response);
  } 
  return undefined;
}

