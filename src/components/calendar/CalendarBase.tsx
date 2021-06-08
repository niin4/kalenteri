import React, { useEffect } from 'react'

export interface CalendarData {
  id: string;
}

const CalendarBase: React.FC<CalendarData> = ({id}) => {

  useEffect(() => {
    /* Get data from dataprovider, if google for example
    if (type === ComponentType.CALENDAR) {
      getDatasources(data.id);
    } */
  }, [id])
  
  return (
    <div>
      Calendar!
    </div>
  )
}

export default CalendarBase
