import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:initialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: false 
};

export interface initialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
  }

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    },
});

export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlice.actions;

export default globalSlice.reducer;
    