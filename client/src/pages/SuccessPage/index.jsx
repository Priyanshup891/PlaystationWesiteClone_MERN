import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/order/orderSlice.js";

const SuccessPage = () => {
  const { currentOrder } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentOrder === null && !currentOrder) {
      navigate("/");
    }
  }, [currentOrder, navigate]);

  const handleGoToHome = () => {
    dispatch(reset());
    navigate("/");
  };

  return (
    <SuccessContainer>
      <h2>Thank You For Ordering</h2>
      {currentOrder && (
        <div>
          <span>
            Amount: Rs
            <p
              style={{
                color: "#000",
              }}
            >
              {currentOrder?.totalAmount}
            </p>
          </span>
          <span>
            Payment Id:{" "}
            <p
              style={{
                color: "#000",
              }}
            >
              {currentOrder?.paymentInfo?.id}
            </p>
          </span>
          <span>
            Payment:{" "}
            <p
              style={{
                color: "green",
              }}
            >
              {currentOrder?.paymentInfo?.status}
            </p>
          </span>
        </div>
      )}
      <button onClick={() => handleGoToHome()}>Go To Home</button>
    </SuccessContainer>
  );
};

const SuccessContainer = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > div {
    margin-top: 1rem;
  }
  span {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
  }

  button {
    background: transparent;
    font-size: 0.875rem;
    border: none;
    border-bottom: 2px solid blue;
    color: blue;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default SuccessPage;
