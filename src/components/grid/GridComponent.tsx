import React from 'react'
import CalendarBase, { CalendarData } from '../calendar/CalendarBase';
import NotesBase, { NotesCollectionData } from '../notes/NotesBase';

export enum ComponentType {
  CALENDAR, NOTES
}

export interface GridComponentProps {
  type: ComponentType;
  data: CalendarData | NotesCollectionData;
}

const GridComponent: React.FC<GridComponentProps> = ({type, data}) => {

  return (
    <>
      {type === ComponentType.CALENDAR && <CalendarBase {...data} />}
      {type === ComponentType.NOTES && <NotesBase {...data} />}
    </>
  )
}

export default GridComponent;
