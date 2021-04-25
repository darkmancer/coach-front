import cardInfo from "./cards/GameCards";
import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

function GameBar({ setGame, setCoach, game }) {
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    dots: true,
    dotsEach: 1,
    autoplay: true,
    loop: true,
    navText: ["Prev", "Next"],
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 7,
      },
    },
  };

  return (
    <div>
      <OwlCarousel className="owl-theme" {...options}>
        {cardInfo.map((card) => {
          return (
            <div
              className="item"
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => setGame(card.game)}
            >
              <img
                width="100%"
                src={card.src}
                class="attachment-large size-large lazyloaded"
                alt={card.alt}
                sizes="(max-width: 600px) 100vw, 600px"
                srcset={card.srcset}
                data-ll-status="loaded"
              />
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}

export default GameBar;
