import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

// get all houses thunk
export const getHousesThunk = createAsyncThunk("houses/getHouses", async (obj, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/houses?type=${obj.type}`);

    console.log("data getHousesThunk : ", data);
    return data;
  } catch (err) {
    // Use `err.response.data` as `action.payload` for a `rejected` action,
    // by explicitly returning it using the `rejectWithValue()` utility
    return rejectWithValue(err.response.data);
  }
});

// HousesReducer
export const HousesSlice = createSlice({
  name: "houses",
  initialState: {
    info: null,
    loading: "idle",
    error: "",
  },
  reducers: {
    setHouse(state, action) {
      state.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("=====> builder case ");
      if (!action.payload.houses.info) {
        console.log("no info case");

        return state;
      }

      // TODO - handle client side state override

      console.log("info case");
      state.info = action.payload.houses.info;
    });
    builder.addCase(getHousesThunk.pending, (state) => {
      console.log("pending");
      state.loading = "pending";
      state.info = null;
      state.error = "";
    });
    builder.addCase(getHousesThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.loading = "idle";
      state.info = action.payload;
      state.error = null;
    });
    builder.addCase(getHousesThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loading = "idle";
      state.info = null;
      state.error = action.error;
    });
  },
});

export const selectHouses = (state) => state.houses;

export const { setHouse } = HousesSlice.actions;

export default HousesSlice.reducer;
