import React from "react";
import "./Main.css";
// import memeData from "../../meme-data";

export default function Main() {
  let [allMeme, setAllMeme] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  let [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/265j.jpg",
  });
  // console.log(allMeme);
  function getRandomMeme(e) {
    e.preventDefault();
    // let memesArray = memeData.data.memes;
    let randomNumber = Math.floor(Math.random() * allMeme.length);

    let url = allMeme[randomNumber].url;

    setMeme((prevMeme) => {
      return { ...prevMeme, randomImage: url };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => {
      return { ...prevMeme, [name]: value };
    });
  }

  return (
    <div className="container">
      <form>
        <div className="input-div">
          <input
            className="input"
            type="text"
            placeholder="Top Text"
            value={meme.topText}
            onChange={handleChange}
            name="topText"
          />
          <input
            className="input"
            type="text"
            placeholder="Bottom Text"
            value={meme.bottomText}
            onChange={handleChange}
            name="bottomText"
          />
        </div>
        <button className="get-new-meme-button" onClick={getRandomMeme}>
          Get New Meme
        </button>
      </form>
      <div className="img-div">
        <img className="meme-img" src={meme.randomImage} alt="" />
        <h1 className="top-text-image">{meme.topText}</h1>
        <h1 className="bottom-text-image">{meme.bottomText}</h1>
      </div>
    </div>
  );
}
