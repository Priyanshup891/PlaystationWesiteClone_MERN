import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import GameDetailPage from "./pages/GameDetailPage";
import Protected from "./components/Protected";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import SuccessPage from "./pages/SuccessPage";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/payment//stripeapi",
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setStripeApiKey(response.data.stripeApiKey);
      } catch (error) {
        console.log(error);
      }
    };
    getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <CheckoutPage />
              </Protected>
            }
          />
          <Route
            path="/payment"
            element={
              <Protected>
                {stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <PaymentPage />
                  </Elements>
                )}
              </Protected>
            }
          />
          <Route
            path="/success"
            element={
              <Protected>
                <SuccessPage />
              </Protected>
            }
          />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
