import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { deleteCart, updateCart } from "../../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, isError, message, isLoading } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const totalItems = cart.reduce((total, item) => item?.quantity + total, 0);

  const totalAmount = cart.reduce(
    (amount, item) => item?.game?.price * item?.quantity + amount,
    0
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleQuantity = (e, item) => {
    dispatch(updateCart({ _id: item?._id, quantity: +e.target.value }));
  };

  const handleDelete = (item) => {
    dispatch(deleteCart(item?._id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CartContainer>
        <CartContent>
          <h2>Cart</h2>
          {cart?.map((item, index) => (
            <CartItem key={index}>
              <CartLeft>
                <CartImage>
                  <img src={item?.game?.poster_path} alt="game-poster" />
                </CartImage>
                <CartItemContent>
                  <h3>{item?.game?.title}</h3>
                  <select
                    value={item?.quantity}
                    onChange={(e) => handleQuantity(e, item)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </CartItemContent>
              </CartLeft>
              <CartRight>
                <span>Rs {item?.game?.price}</span>
                <CartItemDelete onClick={() => handleDelete(item)}>
                  <MdDelete size={25} color="red" />
                </CartItemDelete>
              </CartRight>
            </CartItem>
          ))}
          <CartTotal>
            <div>
              <h3>Total Items in Cart</h3>
              <h3>{totalItems} Items</h3>
            </div>
            <div>
              <span>Subtotal</span>
              <span>Rs {totalAmount}</span>
            </div>
            <p>Shipping and taxes calculated at checkout</p>
          </CartTotal>
          <Link
            to="/checkout"
            style={{
              textDecoration: "none",
            }}
          >
            <CheckoutBtn>Checkout</CheckoutBtn>
          </Link>
        </CartContent>
      </CartContainer>
      <ToastContainer />
    </>
  );
};

const CartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const CartContent = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  max-width: 800px;
  padding: 1rem 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #000;
  }
`;

const CartItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const CartLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const CartImage = styled.div`
  width: 130px;
  overflow: hidden;
  border-radius: 0.4rem;
`;

const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  h3 {
    font-size: 1.2rem;
  }

  select {
    width: 50px;
    height: 30px;
    background-color: #fff;
    border: 2px solid #dcdcdc;
    border-radius: 0.4rem;
  }
`;

const CartRight = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  span {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const CartItemDelete = styled.button`
  background: transparent;
  border: none;
  outline: none;
`;

const CartTotal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;
  gap: 0.5rem;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1rem;
      font-weight: 400;
    }

    span {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  p {
    font-size: 0.875rem;
    font-weight: 400;
    color: #888888;
  }
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 0.7rem 0;
  font-size: 1rem;
  font-weight: 600;
  background-color: #d63d00;
  border: none;
  color: #fff;
  border-radius: 3rem;
  margin: 1rem 0;
`;

export default CartPage;
