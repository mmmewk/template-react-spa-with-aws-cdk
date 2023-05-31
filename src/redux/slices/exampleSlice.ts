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
  },
});

// Action creators are generated for each case reducer function
export const { incrementCounter } = exampleSlice.actions;

export default exampleSlice.reducer;
