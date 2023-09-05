import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiGamepadCross } from "react-icons/gi";
import { MdVideogameAsset } from "react-icons/md";
import { TbDeviceGamepad2, TbNetwork } from "react-icons/tb";
import { MdOutlineBookOnline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { RiRemoteControlLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getGameById, reset } from "../../redux/game/gameSlice";
import GameImages from "../../components/GameImages";
import { addToCart } from "../../redux/cart/cartSlice";
import Loader from "../../components/Loader";

const GameDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { gameDetail, isLoading, isError, message } = useSelector(
    (state) => state.game
  );
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (isError) {
      toast.error(message);
    }

    dispatch(getGameById(id));

    return () => dispatch(reset());
  }, [dispatch, id, isError, message]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (user === null && !user) {
      navigate("/login");
    }
    if (cart.findIndex((item) => item?.game?._id === gameDetail?._id) < 0) {
      const game = {
        gameId: gameDetail?._id,
        quantity,
      };
      dispatch(addToCart(game));
      toast.info(`${gameDetail?.title} is added to cart`);
    } else {
      toast.error("Game already added");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <DetailContainer>
        {gameDetail && (
          <>
            <DetailContent>
              <img src={gameDetail?.background_path} alt="" />
              <Info>
                <h1>{gameDetail?.title}</h1>
                <span>2K</span>
                <span>PS5&nbsp;&nbsp;&nbsp;PS4</span>
                <h3>Rs {gameDetail?.price}</h3>
                <div></div>
                <p>Release date: {gameDetail?.release_date}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <GamePlayDetail>
                  <div>
                    <p>
                      <GiGamepadCross size={25} /> PS Plus required for online
                      play
                    </p>
                    <p>
                      <MdVideogameAsset size={25} /> In-game purchases optional
                    </p>
                    <p>
                      <TbDeviceGamepad2 color="#fff" size={25} /> Vibration
                      function required
                    </p>
                    <p>
                      <TbNetwork size={25} /> Supports up to 8 online players
                      with PS Plus
                    </p>
                  </div>
                  <div>
                    <p>
                      <MdOutlineBookOnline size={25} /> Online play optional
                    </p>
                    <p>
                      <BsPeopleFill size={25} /> 1 - 8 players
                    </p>
                    <p>
                      <RiRemoteControlLine size={25} /> Remote Play supported
                    </p>
                  </div>
                </GamePlayDetail>
              </Info>
            </DetailContent>
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "2rem 5rem",
              }}
            >
              <GameImages images={gameDetail?.images} />
              <Trailer src={gameDetail?.trailer_path}></Trailer>
            </div>
          </>
        )}

        {/* <Cart open={isOpen} drawertoggle={toggleDrawer} /> */}
      </DetailContainer>
      <ToastContainer />
    </>
  );
};

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
`;

const DetailContent = styled.div`
  position: relative;
  height: 600px;
  overflow: hidden;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    object-fit: cover;
    object-position: top;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1),
      50%,
      rgba(0, 0, 0, 0.2)
    );
  }
`;

const Info = styled.div`
  position: absolute;
  right: 80px;
  bottom: 60px;
  left: 80px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  h1 {
    color: #fff;
    font-size: 3rem;
  }

  span {
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
  }

  h3 {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 200;
  }

  button {
    width: 300px;
    padding: 0.7rem 0;
    font-size: 1rem;
    font-weight: 600;
    background-color: #d63d00;
    border: none;
    color: #fff;
    border-radius: 3rem;
    margin: 1rem 0;
  }

  p {
    color: #fff;
    font-size: 1rem;
  }
`;

const Trailer = styled.iframe`
  width: 100%;
  height: 700px;
  margin: 3rem 1rem;
  border: none;
  border-radius: 0.7rem;
`;

const GamePlayDetail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  p {
    font-size: 1rem;
    margin-bottom: 1rem;
    font-weight: 200;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export default GameDetailPage;
