import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { deleteCart, reset, updateCart } from "../../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/order/orderSlice";

const CheckoutPage = () => {
  const [address, setAddress] = useState({
    fullName: "",
    emailAddress: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [selectAddress, setSelectAddress] = useState(null);

  const { cart, isError, message, isLoading } = useSelector(
    (state) => state.cart
  );

  const { fullName, emailAddress, phone, streetAddress, city, state, zipCode } =
    address;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setAddress((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !emailAddress ||
      !phone ||
      !streetAddress ||
      !city ||
      !state ||
      !zipCode
    ) {
      toast.error("Please fill all the fields");
    } else {
      setSelectAddress({
        fullName,
        emailAddress,
        phone,
        streetAddress,
        city,
        state,
        zipCode,
      });
    }
  };

  const handleOrder = () => {
    if (selectAddress) {
      const orderData = {
        cart,
        totalAmount,
        totalItems,
        selectAddress,
        status: "pending",
      };
      dispatch(createOrder(orderData));
      toast.info("Order is created now do the payment ");
      setTimeout(() => {
        dispatch(reset());
        navigate("/payment");
      }, 3500);
    } else {
      toast.error("Enter Address");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CheckoutContainer>
        <PersonalInfoPayment>
          <PersonalInfo onSubmit={handleAddressSubmit}>
            <h2>Personal Information</h2>
            <p>Use a permanent address where you can receive your order.</p>
            <FormGroup>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label>Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={emailAddress}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label>Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={streetAddress}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                paddingBottom: "0.7rem",
                borderBottom: "1px solid #888888",
              }}
            >
              <FormGroup>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <label>State / Province</label>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <label>ZIP / Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-end",
                justifyContent: "end",
                flexDirection: "row",
              }}
            >
              <button type="submit">Add</button>
            </div>
          </PersonalInfo>
          <AddressPreview>
            <h3>Existing address</h3>
            {selectAddress && (
              <>
                <div>
                  <span>Full Name:</span>
                  {selectAddress?.fullName}
                </div>
                <div>
                  <span>Address:</span>
                  {`${selectAddress?.streetAddress}, ${selectAddress?.city}, ${selectAddress?.state}, ${selectAddress?.zipCode}`}
                </div>
                <div>
                  <span>Phone no.:</span>
                  {selectAddress?.phone}
                </div>
              </>
            )}
          </AddressPreview>
        </PersonalInfoPayment>
        <Orders>
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
            <CheckoutBtn onClick={handleOrder}>Order</CheckoutBtn>
          </Link>
        </Orders>
      </CheckoutContainer>
      <ToastContainer />
    </>
  );
};

const CheckoutContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const PersonalInfoPayment = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`;

const PersonalInfo = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: #888888;
    margin-bottom: 1rem;
  }

  button {
    margin: 2rem 0;
    width: 100px;
    padding: 0.7rem 0;
    font-size: 1rem;
    font-weight: 600;
    background-color: #d63d00;
    border: none;
    color: #fff;
    border-radius: 3rem;
    margin: 1rem 0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }

  input {
    height: 30px;
    border: 2px solid #dcdcdc;
    border-radius: 0.4rem;
  }
`;

const AddressPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  & > div {
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
    color: #888888;

    span {
      color: #000;
      margin-right: 0.3rem;
    }
  }
`;

const Orders = styled.div`
  background-color: #f5f5f5;
  margin-left: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CartItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const CartImage = styled.div`
  width: 100px;
  overflow: hidden;
  border-radius: 0.4rem;
`;

const CartItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  h3 {
    font-size: 0.875rem;
  }

  select {
    width: 40px;
    height: 25px;
    background-color: #fff;
    border: 2px solid #dcdcdc;
    border-radius: 0.4rem;
  }
`;

const CartRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  span {
    font-size: 0.875rem;
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

export default CheckoutPage;
