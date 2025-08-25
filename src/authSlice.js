import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../src/config';

const initialState = {
  auth: false,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Login failed' });
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(`${API_URL}/api/check`, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'User fetch failed' });
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ updateDetails }, thunkAPI) => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.patch(`${API_URL}/api/update`, updateDetails, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Update failed' });
    }
  }
);

export const updatePhoto = createAsyncThunk(
  'auth/updatePhoto',
  async (formData, thunkAPI) => {
    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.patch(`${API_URL}/api/photo`, formData, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Photo update failed' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.auth = false;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.auth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.auth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch failed";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


