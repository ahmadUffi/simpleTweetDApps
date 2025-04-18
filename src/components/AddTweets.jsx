import React, { useState } from "react";
import { errors } from "web3";

const AddTweets = ({ contract, account, getTweets }) => {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await contract.methods.createTweet(tweet).send({
        from: account,
      });
      await getTweets();
      setTweet("");
    } catch (error) {
      console.log("Error adding tweet:", error);
      alert("Error adding tweet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <textarea
        name=""
        id=""
        onChange={(e) => setTweet(e.target.value)}
        value={tweet}
      ></textarea>
      <br />
      <button id="tweetSubmitBtn" type="submit" disabled={loading}>
        {loading ? <div className="spinner"></div> : <span>Tweet</span>}
      </button>
    </form>
  );
};

export default AddTweets;
