import React from 'react';
import GridContainer from '../../components/grid/GridContainer';
import GridKid from '../../components/grid/GridKid';
import { useAppSelector } from '../../store/hooks';

const MainView = () => {

  const grid = useAppSelector((state) => state.grid);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <h2>Movable stuff</h2>
      <GridContainer >
        {grid.kids.map((k, i) => <GridKid {...k}>kid-{i}</GridKid>)}
      </GridContainer>
    </div>)
}

export default MainView;
