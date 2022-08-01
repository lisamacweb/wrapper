import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

export const registerUsersActionThunk = createAsyncThunk("users/registerUserAction", async (id) => {
  return id;
});

// get all houses thunk
export const getUsersThunk = createAsyncThunk("houses/getUsers", async (obj, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/users`);

    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// UserReducer
export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    info: null,
    loading: "",
    error: "",
  },
  reducers: {
    setUsers(state, action) {
      state.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state, action) => {
      state.loading = "pending";
      state.info = null;
      state.error = "";
    });
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.loading = "idle";
      state.info = action.payload;
      state.error = null;
    });
    builder.addCase(getUsersThunk.rejected, (state, action) => {
      state.loading = "idle";
      state.info = null;
      state.error = action.error;
    });
  },
});

export const { setUsers } = UsersSlice.actions;

export const selectUsers = (state) => state.users;

export default UsersSlice.reducer;
