import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IFilterState {
  location: string;
  search_key: string;
  job_type: string;
  english_fluency: string;
  experience: string[];
  category: string[];
  tags: string[];
}

// Define the initial state using that type
const initialState: IFilterState = {
  location: "",
  search_key: "",
  job_type: "",
  english_fluency: "",
  experience: [],
  category: [],
  tags: [],
};

export const filterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      if (state.location === action.payload) {
        state.location = "";
      } else {
        state.location = action.payload;
      }
    },
    setJobType: (state, action: PayloadAction<string>) => {
      if (state.job_type === action.payload) {
        state.job_type = "";
      } else {
        state.job_type = action.payload;
      }
    },
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.search_key = action.payload
    },
    setEnglishFluency: (state, action: PayloadAction<string>) => {
      if (state.english_fluency === action.payload) {
        state.english_fluency = "";
      } else {
        state.english_fluency = action.payload;
      }
    },
    setExperience: (state, action: PayloadAction<string>) => {
      if (state.experience.includes(action.payload)) {
        state.experience = state.experience.filter((e) => e !== action.payload);
      } else {
        state.experience.push(action.payload);
      }
    },
    setCategory: (state, action: PayloadAction<string>) => {
      if (state.category.includes(action.payload)) {
        state.category = state.category.filter((c) => c !== action.payload);
      } else {
        state.category.push(action.payload);
      }
    },
    setTags: (state, action: PayloadAction<string>) => {
      if (state.tags.includes(action.payload)) {
        state.tags = state.tags.filter((t) => t !== action.payload);
      } else {
        state.tags.push(action.payload);
      }
    },
    resetFilter: (state) => {
      state.location = "";
      state.job_type = "";
      state.english_fluency = "";
      state.category = [];
      state.tags = [];
      state.experience = [];
    },
  },
});

export const {
  setLocation,
  setCategory,
  setExperience,
  setJobType,
  setTags,
  resetFilter,
  setEnglishFluency,
  setSearchKey,
} = filterSlice.actions;

export default filterSlice.reducer;
