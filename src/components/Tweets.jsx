import React from "react";
import svg from "../assets/heart.svg";

const Tweets = ({ tweets, contract, account, getTweets, profileExists }) => {
  const handleLike = async (tweetID) => {
    try {
      await contract.methods
        .likeTweet(account, tweetID)
        .send({ from: account });
      getTweets();
    } catch (error) {
      console.error("Error liking tweet:", error);
    }
  };
  return (
    <div className="tweetsContainer">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet">
          <img
            className="user-icon"
            src={`https://api.dicebear.com/9.x/pixel-art/svg`}
            alt="User Icon"
          />
          <div className="tweet-inner">
            <div className="author">{profileExists}</div>
            <div className="content">{tweet.content}</div>
            <div className="likes">
              <img
                src={svg}
                alt=""
                width={20}
                className="likes like-button"
                onClick={() => handleLike(tweet.id)}
              />
              <span style={{ fontSize: "14px", color: "black" }}>
                {tweet.likes}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tweets;
