import axios from "axios";

const HTTP_URL = "http://localhost:8800/api/game";

const getAllGames = async () => {
  try {
    const response = await axios.get(`${HTTP_URL}/`);
    if (response.status === 200 && response.statusText) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getGameById = async (gameId) => {
  try {
    const response = await axios.get(`${HTTP_URL}/${gameId}`);
    if (response.status === 200 && response.statusText) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const gameService = { getAllGames, getGameById };
export default gameService;
