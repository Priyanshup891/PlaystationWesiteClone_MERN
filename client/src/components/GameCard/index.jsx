import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GameCard = ({ game, index }) => {
  return (
    <Card key={index}>
      <Link
        to={`/game/${game?._id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <CardHead>
          <img src={game?.poster_path} alt={game?.title} />
        </CardHead>
      </Link>
      <CardBody>
        <span>{game?.title}</span>
      </CardBody>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  border-radius: 15px;
  margin-bottom: 15px;

  img {
    transition: 0.4s ease-in-out;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

const CardHead = styled.div`
  position: relative;
  height: 250px;
  border-radius: 15px;
  margin-bottom: 15px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    object-fit: cover;
  }
`;

const CardBody = styled.div`
  span {
    color: #cccccc;
    font-size: 1rem;
    margin-top: 1rem;
    font-weight: 400;
  }
`;

export default GameCard;
