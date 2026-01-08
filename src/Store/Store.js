import { configureStore, createSlice } from "@reduxjs/toolkit";

// One global slice for all your app state
const globalSlice = createSlice({
  name: "global",
  initialState: {
    Phone: null,
    Email: null,
    identifierType: null,
    storeName:null,
    selectedPayment:null,
    addressId:null,
    address:null

    // add anything else you need here
  },
  reducers: {
    setGlobalValue: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearGlobal: (state) => {
      Object.keys(state).forEach((key) => (state[key] = null));
    },
  },
});

export const { setGlobalValue, clearGlobal } = globalSlice.actions;

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
  },
});

export default store;
