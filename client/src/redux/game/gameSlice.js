import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "./gameService";

const initialState = {
  games: [],
  gameDetail: {},
  isLoading: false,
  isError: false,
  message: "",
};

export const getAllGames = createAsyncThunk("game/all", async (_, thunkAPI) => {
  try {
    return await gameService.getAllGames();
  } catch (error) {
    const message =
      (error.message && error.message.data && error.message.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getGameById = createAsyncThunk(
  "game/byId",
  async (gameId, thunkAPI) => {
    try {
      return await gameService.getGameById(gameId);
    } catch (error) {
      const message =
        (error.message && error.message.data && error.message.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: (state) => {
      state.games = [];
      state.gameDetail = {};
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.games = action.payload;
      })
      .addCase(getAllGames.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.games = [];
      })
      .addCase(getGameById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGameById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameDetail = action.payload;
      })
      .addCase(getGameById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.gameDetail = {};
      });
  },
});

export const { reset } = gameSlice.actions;
export default gameSlice.reducer;
