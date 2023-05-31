import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExampleState {
  counter: number;
}

const initialState: ExampleState = {
  counter: 1,
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    incrementCounter: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    resetCounter: (state) => {
      state.counter = 0;
    },
  },
});

export const { incrementCounter, resetCounter } = exampleSlice.actions;

export default exampleSlice.reducer;
