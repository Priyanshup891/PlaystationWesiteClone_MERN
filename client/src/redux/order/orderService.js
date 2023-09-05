import axios from "axios";

const HTTP_URL = "http://localhost:8800/api/order";

const createOrder = async (orderData, access_token) => {
  try {
    const response = await axios.post(`${HTTP_URL}/`, orderData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (updatedOrder, access_token) => {
  try {
    const response = await axios.patch(
      `${HTTP_URL}/${updatedOrder?._id}`,
      updatedOrder,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const orderService = { createOrder, updateOrder };
export default orderService;
