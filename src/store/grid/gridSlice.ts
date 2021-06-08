import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MediaQueryBreakpoints } from '../../utils/breakpoints'
import { GridKidProps } from '../../components/grid/GridKid';
import { ComponentType } from '../../components/grid/GridComponent';
import { Collection } from '../../utils/firebase/collections';

/* const TEST_KIDS = [
  {
    gridId: 'kid-1',
    gridArea: {
      column: 1,
      row: 1,
      height: 2,
      width: 1
    },
    gridComponent: {
      type: ComponentType.CALENDAR,
      data: {
        id: '1'
      }
    }
  },
  {
    gridId: 'kid-2',
    gridArea: {
      column: 2,
      row: 1,
      height: 1,
      width: 2
    },
    gridComponent: {
      type: ComponentType.NOTES,
      data: {
        id: '1'
      }
    }
  }
] */

export interface GridColumn {
  width: string;
}

interface GridState {
  columns: number;
  draggingIndex: string | null;
  kids: GridKidProps[];
}

const initialState: GridState = {
  columns: 1,
  draggingIndex: null,
  kids: []
}

const getData = (c: Collection) => {
  switch (c.type) {
    case 'CALENDAR':
      return {
        id: c.id
      }
    case 'NOTES': 
    return {
      id: c.id
      }
    default:
      return  {
        id: c.id
      }
  }
}

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<number>) => {
      state.columns = action.payload
    },
    setColumnsByBreakpoints: (state, action: PayloadAction<MediaQueryBreakpoints>) => {
      if (action.payload.lg) {
        state.columns = 6
      } else if (action.payload.md) {
        state.columns = 4;
      } else if (action.payload.sm) {
        state.columns = 2;
      } else {
        state.columns = 1;
      }
    },
    setDraggingIndex: (state, action: PayloadAction<string | null>) => {
      state.draggingIndex = action.payload;
    },
    setNewPosition: (state, action: PayloadAction<{ column: number, row: number }>) => {
      const draggedObject = state.draggingIndex !== null ? state.kids.findIndex(k => k.gridId === state.draggingIndex) : undefined;
      if (draggedObject !== undefined) {
        state.kids[draggedObject] = {
          ...state.kids[draggedObject],
          gridArea: {
            ...state.kids[draggedObject].gridArea,
            row: action.payload.row,
            column: action.payload.column
          }
        };
      }
    },
    setKidsFromCollections: (state, action: PayloadAction<Collection[]>) => {
     state.kids = action.payload.map(c => ({
       gridId: `${c.type}-${c.id}`,
       gridArea: {
         column: c.column,
         row: c.row,
         width: c.width,
         height: c.height
       },
       gridComponent: {
         type: c.type as unknown as ComponentType,
         data: getData(c)
       }
     }))
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setColumns,
  setColumnsByBreakpoints,
  setDraggingIndex,
  setNewPosition,
  setKidsFromCollections } = gridSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default gridSlice.reducer