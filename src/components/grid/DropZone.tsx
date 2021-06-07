import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../store/hooks';
import { setNewPosition } from '../../store/grid/gridSlice';

interface DropZoneProps {
  dropZoneId: string;
  column: number;
  row: number;
}

const StyledDropZone = styled.div<{ column: number, row: number, draggedOver: boolean }>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};
  background-color: ${(props) => props.draggedOver ? '#e1f4fc' : 'inherit'};
  border-radius: 1.5rem;
  border: ${(props) => props.draggedOver ? '2px dashed #7ac3ff' : 'none'};
  height: 18rem;
`

const DropZone: React.FC<DropZoneProps> = ({ dropZoneId, column, row, ...rest }) => {
  const [dragOver, setDragOver] = useState(false);
  const dispatch = useAppDispatch();

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setNewPosition({ row, column }));
    setDragOver(false);
  }

  const onDragOver = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }

  const onDragLeave = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }

  return (
    <StyledDropZone
      id={dropZoneId}
      draggedOver={dragOver}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      column={column}
      row={row}
    />
  )
}

export default DropZone
