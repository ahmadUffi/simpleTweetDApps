import React, { useState } from "react";

function ProfileCreation({ userContract, account, checkProfile }) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userContract);
    try {
      setLoading(true);
      await userContract.methods
        .setProfile(username, bio)
        .send({ from: account });
      const profile = await userContract.methods.getProfile(account).call();
      console.log("Profile created successfully:", profile);
      checkProfile(account);
      alert("Profile created successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="create-profile-form">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username :
          <input
            id="username"
            type="text"
            required
            className="profile-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="bio">
          Bio :
          <input
            type="text"
            id="bio"
            required
            className="profile-input"
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <button>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <span>Create Profile</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default ProfileCreation;
