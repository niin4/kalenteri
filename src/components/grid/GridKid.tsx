import React, { useMemo } from 'react'
import styled from 'styled-components';
import { setDraggingIndex } from '../../store/grid/gridSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export interface GridKidProps {
  gridId: string;
  gridArea: {
    column: number;
    row: number;
    width: number;
    height: number;
  }
}

const StyledGridKid = styled.div<{column: string, row: string}>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};
  background-color: #ffa9e2;
`

const GridKid: React.FC<GridKidProps> = ({gridId, children, gridArea, ...rest}) => {

  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.grid);

  const onDragStart = () => {
    dispatch(setDraggingIndex(gridId));
    console.log('on drag start: ', gridId);
  }

  const columnString = useMemo(() => {
    return `${gridArea.column > grid.columns ? 'auto' : gridArea.column} / span ${gridArea.width}`;
  }, [gridArea, grid.columns])

  const rowString = useMemo(() => {
    return `${gridArea.row} / span ${gridArea.height}`;
  }, [gridArea])

  console.log(columnString)

  return (
    <StyledGridKid
    column={columnString}
    row={rowString}
    draggable={true}
    onDragOver={(e) => console.log(e)}
    onDragEnter={(e) => e.preventDefault()}
    onDragStart={onDragStart}
    {...rest}>
      {children}
    </StyledGridKid>
  )
}

export default GridKid
