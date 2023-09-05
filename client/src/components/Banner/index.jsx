import React from "react";
import styled from "styled-components";
import { bannerData } from "../../Constant/data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  return (
    <BannerContainer>
      <Carousel
        additionalTransfrom={0}
        autoPlay
        swipeable={false}
        arrows={false}
        autoPlaySpeed={5000}
        infinite
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        slidesToSlide={1}
      >
        {bannerData.map((banner) => (
          <BannerCard>
            <img src={banner.banner_image} alt={banner.title} />
            <CardContent>
              <img src={banner.logo} alt="logo" />
              <h1>{banner.title}</h1>
              <p>{banner.overview}</p>
              <button>Pre-order now</button>
            </CardContent>
          </BannerCard>
        ))}
      </Carousel>
      ;
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  margin-bottom: 30px;
`;

const BannerCard = styled.div`
  position: relative;
  height: 500px;
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

const CardContent = styled.div`
  position: absolute;
  right: 80px;
  bottom: 60px;
  left: 80px;
  z-index: 2;

  img {
    width: 350px;
  }

  h1 {
    color: #fff;
    font-weight: 100;
    font-size: 2.5rem;
  }
  p {
    color: #fff;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 1px;
    width: 600px;
    text-align: left;
  }

  button {
    padding: 0.7rem 2rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #0071f3;
    color: #fff;
    border: none;
    margin-top: 1rem;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Banner;
