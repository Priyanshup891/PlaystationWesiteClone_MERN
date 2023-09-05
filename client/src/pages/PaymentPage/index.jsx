import React from "react";
import styled from "styled-components";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "../../redux/order/orderSlice";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentOrder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const paymentData = {
    amount: currentOrder?.totalAmount,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    try {
      const response = await axios.post(
        "http://localhost:8800/api/payment/process",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      const clientSecret = response.data.client_secret;
      console.log(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.user?.name,
            email: user?.user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          dispatch(
            updateOrder({
              _id: currentOrder?._id,
              status: "paid",
              paymentInfo: {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              },
            })
          );
          navigate("/success");
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      toast.error(error);
    }
  };

  return (
    <>
      <PaymentContainer>
        <PaymentForm onSubmit={handleSubmit}>
          <div>
            <label>Card Number</label>
            <SCardNumberElement type="text" />
          </div>
          <div>
            <label>Card Expiry</label>
            <SCardExpiryElement type="text" />
          </div>
          <div>
            <label>Card CVC</label>
            <SCardCvcElement type="text" />
          </div>
          <button type="submit" id="pay_btn">
            Pay {` - Rs${currentOrder && currentOrder?.totalAmount}`}
          </button>
        </PaymentForm>
      </PaymentContainer>
      <ToastContainer />
    </>
  );
};

const PaymentContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaymentForm = styled.form`
  background-color: #f5f5f5;
  width: 100%;
  max-width: 500px;
  padding: 1rem;
`;

const SCardNumberElement = styled(CardNumberElement)`
  padding: 0.7rem 0.2rem;
  border: 2px solid #dcdcdc;
  border-radius: 0.4rem;
  background-color: #ffffff;
  margin-top: 0.3rem;
`;

const SCardExpiryElement = styled(CardExpiryElement)`
  padding: 0.7rem 0.2rem;
  border: 2px solid #dcdcdc;
  border-radius: 0.4rem;
  background-color: #ffffff;
  margin-top: 0.3rem;
`;

const SCardCvcElement = styled(CardCvcElement)`
  padding: 0.7rem 0.2rem;
  border: 2px solid #dcdcdc;
  border-radius: 0.4rem;
  background-color: #ffffff;
  margin-top: 0.3rem;
`;

export default PaymentPage;
