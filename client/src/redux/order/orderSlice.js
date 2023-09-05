import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  currentOrder: null,
  isLoading: false,
  isError: false,
  message: "",
};

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, thunkAPI) => {
    try {
      const access_token = thunkAPI.getState().auth.user.access_token;
      return await orderService.createOrder(orderData, access_token);
    } catch (error) {
      const message =
        (error.message && error.message.data && error.message.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/update",
  async (updatedOrder, thunkAPI) => {
    try {
      const access_token = thunkAPI.getState().auth.user.access_token;
      return await orderService.updateOrder(updatedOrder, access_token);
    } catch (error) {
      const message =
        (error.message && error.message.data && error.message.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.currentOrder = null;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentOrder = null;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentOrder = null;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
