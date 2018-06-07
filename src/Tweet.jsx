import React from 'react';

// const Tweet = (props, { user: { displayName, username, photo  }}) => (
const Tweet = (props) => {
  const { displayName, username, photo } = props.user;

  return (
    <div className="tweet-container">

      <div className="profile-container">
        <div className="profile-photo-container">
          <img className="profile-photo" src={photo}></img>
        </div>
          <span className="profile-display-name"> {displayName} </span>
          <span className="profile-username"> @{username} </span>
      </div>

      <div className="tweet-entry">
        <textarea rows="10" cols="55" style={{ resize: "none", "font-size": "18px" }} value={props.textValue} onChange={e => props.input(e)}> </textarea>
      </div>
      <div className="submit-container">
        <span>{280 - (props.textValue.length)}</span>
        <button type="submit" onClick={props.submit}></button>
      </div>

    </div>
  )
}

export default Tweet;
