function Card(props) {
  const cardInfo = [
    {
      href: "/coach/apex",
      src: "https://kochii.me/wp-content/uploads/2019/04/10Apexlegends.png",
      alt: "โค้ชสอนเล่น Apex",
    },
    {
      href: "/coach/dota",
      src: "https://kochii.me/wp-content/uploads/2018/11/3DOTA2-1.png",
      alt: "โค้ชสอน Dota",
    },
    {
      href: "/coach/hearthstone",
      src: "https://kochii.me/wp-content/uploads/2018/11/4HS-1.png",
      alt: "โค้ชสอนเล่น Hearthstone",
    },
    {
      href: "/coach/csgo",
      src: "https://kochii.me/wp-content/uploads/2018/11/2CSGO-1.png",
      alt: "โค้ชสอนเล่น Csgo",
    },
    {
      href: "/coach/lol",
      src: "https://kochii.me/wp-content/uploads/2018/11/7LOL-1.png",
      alt: "โค้ชสอนเล่น lol",
    },
    {
      href: "/coach/overwatch",
      src: "https://kochii.me/wp-content/uploads/2018/11/6OW-1.png",
      alt: "โค้ชสอนเล่น Overwatch",
    },
    {
      href: "/coach/pubgmobile",
      src: "https://kochii.me/wp-content/uploads/2018/11/8PUBG-M.png",
      alt: "โค้ชสอนเล่น PUBG Mobile",
    },
    {
      href: "/coach/pubg",
      src: "https://kochii.me/wp-content/uploads/2018/11/5Pubg.png",
      alt: "โค้ชสอนเล่น PUBG",
    },
    {
      href: "/coach/rov",
      src: "https://kochii.me/wp-content/uploads/2018/11/1Rov.png",
      alt: "โค้ชสอนเล่น ROV",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexFlow: "wrap",
          width: "880px",
        }}
      >
        {cardInfo.map((card) => {
          return (
            <div
              style={{
                padding: "10px",
              }}
            >
              <a href={card.href}>
                <img
                  width="200px"
                  height="200px"
                  src={card.src}
                  class="attachment-large size-large lazyloaded"
                  alt={card.alt}
                  sizes="(max-width: 600px) 100vw, 600px"
                  srcset={card.srcset}
                  data-ll-status="loaded"
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
