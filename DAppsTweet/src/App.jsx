import React, { useEffect, useState } from "react";
import "./App.css";
import Connect from "./components/Connenct"; // Kalau ini typo, file component-nya juga diganti ya
import ProfileCreation from "./components/ProfileCreation";
import AddTweets from "./components/AddTweets";
import Tweets from "./components/Tweets";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [profileContract, setProfileContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [profileExists, setProfileExists] = useState(false);

  const checkProfile = async (account) => {
    try {
      if (!web3 || !profileContract || !account) return;
      const profile = await profileContract.methods.getProfile(account).call();
      setProfileExists(profile.displayName);
    } catch (error) {
      console.error("Error checking profile:", error);
    }
  };

  const getTweets = async () => {
    try {
      if (!web3 || !contract || !account) return;
      const tempTweets = await contract.methods.getAllTweets(account).call();
      setTweets([...tempTweets]);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (contract && account) {
        if (profileExists) {
          await getTweets();
        } else {
          await checkProfile(account);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [account, contract, profileExists]);
  return (
    <div>
      <Connect
        setContract={setContract}
        setProfileContract={setProfileContract}
        setAccount={setAccount}
        setWeb3={setWeb3}
        account={account}
        checkProfile={checkProfile}
        profileExists={profileExists}
      />

      {profileExists && account && !loading ? (
        <>
          <AddTweets
            contract={contract}
            account={account}
            getTweets={getTweets}
          />
          {loading ? (
            <p>Loading tweets...</p>
          ) : (
            <Tweets
              tweets={tweets}
              contract={contract}
              account={account}
              getTweets={getTweets}
              profileExists={profileExists}
            />
          )}
        </>
      ) : (
        account &&
        !loading && (
          <ProfileCreation
            profileContract={profileContract}
            account={account}
            checkProfile={checkProfile}
          />
        )
      )}
    </div>
  );
};

export default App;
