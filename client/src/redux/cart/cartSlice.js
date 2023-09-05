import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cart: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartData, thunkAPI) => {
    try {
      const access_token = thunkAPI.getState().auth.user.access_token;
      return await cartService.addToCart(cartData, access_token);
    } catch (error) {
      const message =
        (error.message && error.message.data && error.message.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllCarts = createAsyncThunk("cart/all", async (_, thunkAPI) => {
  try {
    const access_token = thunkAPI.getState().auth.user.access_token;
    return await cartService.getAllCarts(access_token);
  } catch (error) {
    const message =
      (error.message && error.message.data && error.message.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCart = createAsyncThunk(
  "cart/update",
  async (updatedCart, thunkAPI) => {
    try {
      const access_token = thunkAPI.getState().auth.user.access_token;
      return await cartService.updateCart(updatedCart, access_token);
    } catch (error) {
      const message =
        (error.message && error.message.data && error.message.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (cartId, thunkAPI) => {
    try {
      const access_token = thunkAPI.getState().auth.user.access_token;
      return await cartService.deleteCart(cartId, access_token);
    } catch (error) {
      const message =
        (error.message && error.message.data && error.message.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.cart = [];
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cart = [];
      })
      .addCase(getAllCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart.push(action.payload)
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cart = [];
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cart.findIndex(
          (item) => item._id === action.payload._id
        );
        state.cart[index] = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cart = [];
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cart.findIndex(
          (item) => item._id === action.payload._id
        );
        state.cart.splice(index, 1);
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
