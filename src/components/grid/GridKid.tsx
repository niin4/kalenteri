import React, { useMemo, useRef } from 'react'
import styled from 'styled-components';
import { setDraggingIndex } from '../../store/grid/gridSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import GridComponent, { GridComponentProps } from './GridComponent';

export interface GridKidProps {
  gridId: string;
  gridArea: {
    column: number;
    row: number;
    width: number;
    height: number;
  };
  gridComponent: GridComponentProps;
}

const StyledGridKid = styled.div<{ column: string, row: string }>`
  grid-row: ${(props) => props.row};
  grid-column: ${(props) => props.column};
  background-color: #ffa9e2;
  position: relative;
`
const GridKid: React.FC<GridKidProps> = ({ gridId, children, gridArea, gridComponent, ...rest }) => {

  const kidRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => state.grid);

  const onDragStart = () => {
    dispatch(setDraggingIndex(gridId));
  }

  const columnString = useMemo(() => {
    return `${gridArea.column > grid.columns ? 'auto' : gridArea.column} / span ${gridArea.width}`;
  }, [gridArea, grid.columns])

  const rowString = useMemo(() => {
    return `${gridArea.row} / span ${gridArea.height}`;
  }, [gridArea])

/*   const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if(entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
        
        console.log(contentBoxSize)
      } else {

      }
    }
    
    console.log('Size changed');
  });
  
  useEffect(() => {
    if (kidRef.current) {
      resizeObserver.observe(kidRef.current);
    }
  }, [])
 */
  return (
    <StyledGridKid
      ref={kidRef}
      column={columnString}
      row={rowString}
      draggable={true}
      onDragStart={onDragStart}
      {...rest}>
     <GridComponent {...gridComponent} />
    </StyledGridKid>
  )
}

export default GridKid
