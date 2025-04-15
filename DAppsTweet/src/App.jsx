import React, { useEffect, useState } from "react";
import "./App.css";
import Connenct from "./components/Connenct";
import ProfileCreation from "./components/ProfileCreation";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState();
  const [userContract, setUserContract] = useState(null);
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState();

  const checkProfile = async (account) => {
    if (2 < 1) {
      alert(
        "Web3 or profileContract not initialized or account not connected."
      );
      return;
    }
    console.log(account);
    console.log(web3);
    console.log(userContract);
    const profile = await userContract.methods.getProfile(account).call();
    setProfileExists(profile.displayName);
  };

  // first check
  // short addreess wallet
  const shortAddress = (address) => {};
  return (
    <div>
      <Connenct
        setContract={setContract}
        setUserContract={setUserContract}
        setAccount={setAccount}
        setWeb3={setWeb3}
        account={account}
        checkProfile={checkProfile}
        profileExists={profileExists}
      />
      {!profileExists ? (
        <ProfileCreation
          userContract={userContract}
          account={account}
          checkProfile={checkProfile}
        />
      ) : (
        <div className="profile-exists">Profile dosnt exists</div>
      )}
    </div>
  );
};

export default App;
