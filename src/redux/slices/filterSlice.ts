import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Filter } from "../../types/filter";

type filterState = {
  filters: Filter[];
  activeFilter: {
    countries: string[];
    roles: string[];
  };
};

const initialState = {} as filterState;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setfilters: (state, action: PayloadAction<filterState["filters"]>) => {
      state.filters = action.payload;
    },
    setActiveFilterCountries: (
      state,
      action: PayloadAction<filterState["activeFilter"]["countries"]>
    ) => {
      state.activeFilter = {
        ...state.activeFilter,
        countries: action.payload,
      };
    },
    setActiveFilterRoles: (
      state,
      action: PayloadAction<filterState["activeFilter"]["roles"]>
    ) => {
      state.activeFilter = {
        ...state.activeFilter,
        roles: action.payload,
      };
    },
  },
});

export const { setfilters, setActiveFilterCountries, setActiveFilterRoles } =
  filterSlice.actions;
export default filterSlice.reducer;
