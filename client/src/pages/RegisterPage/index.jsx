import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register, reset } from "../../redux/auth/authSlice";
import Loader from "../../components/Loader";

const logoURL =
  "https://my.account.sony.com/central/signin/c9b433609b383b6d7147ab7a2f0dcff63b47f87f/assets/images/logo_playstation.png";

const sonyImageUrl = "https://www.sony.net/template/2020/en/img/logo.svg";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [dispatch, isError, message, navigate, user]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all the fields.");
    } else {
      try {
        dispatch(register(formData));
        toast.info("Process is successful.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        toast.error("Error, check your information.");
      }
    }
  };

  if(isLoading){
    return <Loader/>
  }

  return (
    <>
      <SignInContainer>
        <div>
          <Brand>
            <img src={sonyImageUrl} alt="sony" />
          </Brand>
          <img style={{ width: "100%" }} src={logoURL} alt="playstation" />
          <form onSubmit={handleSubmit}>
            <p>Register to PlayStation with one of your Sony accounts.</p>
            <input
              type="text"
              placeholder="Enter Username"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Register</button>
          </form>
          <p>OR</p>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
            }}
          >
            <button>Already have an Account!</button>
          </Link>
        </div>
      </SignInContainer>
      <ToastContainer />
    </>
  );
};

const SignInContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("https://res.cloudinary.com/dmhfkaawt/image/upload/v1693482305/wallpaper_ytrgok.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 2rem;

    button {
      font-size: 1rem;
      font-weight: 600;
      color: #003791;
      border: none;
      border-radius: 0.2rem;
      background: none;
      cursor: pointer;
      margin-top: 1rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    gap: 2rem;
    input {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      height: 100%;
      width: 100%;
      border-radius: 0.2rem;
      border: 2px solid #bebdbd;
      background: none;
      &:focus {
        background: none;
        outline: none;
      }
    }

    button {
      padding: 0.7rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      background-color: #003791;
      color: #fff;
      border: none;
      border-radius: 0.2rem;
      cursor: pointer;
    }
  }
`;

const Brand = styled.div`
  background-color: #000;
  width: 100%;
  height: 3.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 6rem;
  }
`;

export default RegisterPage;