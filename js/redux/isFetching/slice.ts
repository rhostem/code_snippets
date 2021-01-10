import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, boolean> = {};

const isFetching = createSlice({
  name: 'isFetching',
  initialState,
  reducers: {
    setIsFetching: (
      state,
      { payload }: PayloadAction<{ type: string; isFetching: boolean }>
    ) => {
      state[payload.type] = payload.isFetching;
    },
  },
});

const { actions, reducer } = isFetching;

export { actions as isFetchingActions };
export default reducer;
