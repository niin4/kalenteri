import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { setColumnsByBreakpoints } from '../../store/grid/gridSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useBreakpoint } from '../../utils/breakpoints';
import DropZone from './DropZone';

const Container = styled.div<{ columns: string }>`
  position: absolute; 
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-auto-rows: 18rem;
  grid-gap: 1rem;
  grid-auto-flow: dense;
`

const GridContainer: React.FC = ({ children }) => {

  const grid = useAppSelector((state) => state.grid);
  const dispatch = useAppDispatch();
  const breakpoints = useBreakpoint();

  useEffect(() => {
    dispatch(setColumnsByBreakpoints(breakpoints));
  }, [breakpoints, dispatch])


  const gridColumns = useMemo(() => {
    let gridString = '';
    let i = 0;
    while (i < grid.columns) {
      gridString = `${gridString} 1fr`;
      i++;
    }
    return gridString;
  }, [grid.columns])

  const getColumn = (i: number, columns: number) => {
    if (i + 1 <= columns) {
      return i + 1;
    } else {
      return (i + 1) % columns + 1;
    }
  }

  const getRow = (i: number, columns: number) => {
    if (i + 1 <= columns) {
      return 1;
    } else {
      return Math.floor((i + columns) / columns);
    }
  }

  const dropZones = useMemo(() => {
    return Array.from({ length: grid.columns * 2 }, (v, i) => (
      {
        dropZoneId: `drop-zone-${i}`,
        column: getColumn(i, grid.columns),
        row: getRow(i, grid.columns)
      }));
  }, [grid.columns])

  return <div style={{position: 'relative'}}>
    <Container columns={gridColumns}>
      {dropZones.map(dz => <DropZone {...dz} />)}
    </Container>
    <Container columns={gridColumns}>
      {children}
    </Container>
  </div>
}

export default GridContainer;