import React from 'react';

const Tweet = ({user: { displayName, username, photo  }}) => (
  <div className="tweet-container">
    <div className="profile-container">
      <div className="profile-photo-container">
        <img className="profile-photo" src='http://pbs.twimg.com/profile_images/910348766800236549/q5X5-a7o_normal.jpg'></img>
      </div>
        <span className="profile-display-name"> Jake Kopulsky </span>
        <span className="profile-username"> @Kakejopulsky </span>
    </div>
    <div className="tweet-entry">
      <textarea rows="10" cols="55" style={{ resize: "none", "font-size": "18px" }}> </textarea>
    </div>
    <div className="submit-container">
      <button type="submit"></button>
    </div>
  </div>
)

export default Tweet;
