import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonSquare, BsCart4 } from "react-icons/bs";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../redux/auth/authSlice";
const sonyImageUrl = "https://www.sony.net/template/2020/en/img/logo.svg";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info(`${user?.user?.name} is logging out!`);
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  };

  return (
    <NavbarContainer>
      <Brand>
        <div>
          <img src={sonyImageUrl} alt="" />
        </div>
      </Brand>
      <Content>
        <Navigations>
          <Link to="/">
            <img src={logo} alt="playstation_logo" />
          </Link>
          <NavigationLinks href="#">
            Games
            <MdKeyboardArrowDown size={20} color={"#8d8d8d"} />
          </NavigationLinks>
          <NavigationLinks href="#">
            Hardware
            <MdKeyboardArrowDown size={20} color={"#8d8d8d"} />
          </NavigationLinks>
          <NavigationLinks href="#">
            Services
            <MdKeyboardArrowDown size={20} color={"#8d8d8d"} />
          </NavigationLinks>
          <NavigationLinks href="#">
            News
            <MdKeyboardArrowDown size={20} color={"#8d8d8d"} />
          </NavigationLinks>
          <NavigationLinks href="#">
            Shop
            <MdKeyboardArrowDown size={20} color={"#8d8d8d"} />
          </NavigationLinks>
          <NavigationLinks href="#">
            Support
            <MdKeyboardArrowDown size={20} color={"#8d8d8d"} />
          </NavigationLinks>
        </Navigations>
        <SearchSignIn>
          {user ? (
            <Menu
              menuButton={
                <h2
                  style={{
                    color: "#000",
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <BsPersonSquare size={20} /> {user?.user?.name}
                </h2>
              }
              transition
            >
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/login">
              <SignIn>Sign In</SignIn>
            </Link>
          )}
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <BsCart4 color="#000" size={25} />
              {cart?.length ? <CartCount>{cart?.length}</CartCount> : ""}
            </button>
          </Link>
        </SearchSignIn>
      </Content>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  width: 100%;
`;

const Brand = styled.div`
  height: 36px;
  background-color: #000;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > div {
    height: 13px;
    margin: 0 8px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 1.25rem;
`;

const Navigations = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  img {
    height: 40px;
  }
`;

const SearchSignIn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const SignIn = styled.a`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  background-color: #363636;
  color: #fff;
  padding: 0.1rem 0.8rem;
  border-radius: 1rem;
`;

const CartCount = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  top: 0;
  right: 0;
  margin-top: 50px;
  margin-right: 15px;
  background-color: blue;
  font-size: 12px;
`;

const NavigationLinks = styled.a`
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  color: #000;
  display: flex;
  align-items: center;

  @media (max-width: 688px) {
    display: none;
  }
`;

export default Navbar;
