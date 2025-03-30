import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/MovieSlice"
import personReducer from "./reducers/PersonSlice"
import tvReducer from "./reducers/TvSlice"


export const store = configureStore({
  reducer: {
    movie: movieReducer,
    person: personReducer,
    tv: tvReducer,
  },
});
