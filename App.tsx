import React from "react";
import { emojis } from "./emoji";
import { format } from "date-fns";
import "./style.css";
import logo from "./assets/logo.svg";

const App = () => {
  const [selectedEmoji, setSelectedEmoji] = React.useState(emojis[0]);

  const showRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setSelectedEmoji(emojis[randomIndex]);
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo"></img>
      <h1>Emoji of the Day</h1>
      <div className="date-display">{format(new Date(), "MMMM d, yyyy")}</div>
      <div className="emoji-container">
        <div className="emoji">{selectedEmoji.icon}</div>
        <div className="emoji-name">{selectedEmoji.name}</div>
        <button onClick={showRandomEmoji}>See other emoji</button>
      </div>
    </div>
  );
};

export default App;
