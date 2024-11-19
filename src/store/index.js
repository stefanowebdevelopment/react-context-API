import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit'
 


const initialState = { counter: 0 };
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++ // Can be mutaate the state directly wothout make and return a brand new copy
    },
    decrement(state) {
      state.counter--
    },
  }
});

const counterReducer = (state = initialState, action) => {
  if(action.type == 'increment') {
    return {counter: state.counter + 1}
  } 
  if(action.type == 'decrement') {
    return {counter: state.counter - 1}
  } 
  return state;
};



// const store = createStore(counterReducer);
const store = configureStore({
  reducer: counterSlice.reducer
 
});

export const counterActions = counterSlice.actions;

export default store;