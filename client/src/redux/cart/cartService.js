import axios from "axios";

const HTTP_URL = "http://localhost:8800/api/cart";

const addToCart = async (cartData, access_token) => {
  try {
    const response = await axios.post(`${HTTP_URL}/`, cartData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllCarts = async (access_token) => {
  try {
    const response = await axios.get(`${HTTP_URL}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status === 200 && response.statusText) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const updateCart = async (updatedCart, access_token) => {
  try {
    const response = await axios.patch(
      `${HTTP_URL}/${updatedCart?._id}`,
      updatedCart,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 200 && response.statusText) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCart = async (cartId, access_token) => {
  try {
    const response = await axios.delete(`${HTTP_URL}/${cartId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.status === 200 && response.statusText) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const cartService = { addToCart, getAllCarts, updateCart, deleteCart };
export default cartService;
