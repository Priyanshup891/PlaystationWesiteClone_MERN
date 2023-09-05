import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllGames, reset } from "../../redux/game/gameSlice";
import GameCard from "../GameCard";
import Loader from "../Loader";

const Games = () => {
  const { games, isLoading, isError, message } = useSelector(
    (state) => state.game
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllGames());

    return () => dispatch(reset());
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <GamesContainer>
        <h2>New release</h2>
        <p>Great PS5 and PS4 games available now</p>
        <GameGrid>
          {games &&
            games?.map((game, index) => <GameCard game={game} index={index} />)}
        </GameGrid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button>Load More</button>
        </div>
      </GamesContainer>
      <ToastContainer />
    </>
  );
};

const GamesContainer = styled.div`
  background-color: #000;
  padding: 1rem 8rem;

  h2 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
  }

  p {
    color: #fff;
    font-size: 1.25rem;
    font-weight: 200;
    margin-top: 0.5rem;
  }

  button {
    padding: 0.7rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #cc0000;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 2rem;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
  margin-top: 40px;
`;

export default Games;
