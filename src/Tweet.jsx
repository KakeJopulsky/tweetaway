import React from 'react';
import Datetime from 'react-datetime';
require('react-datetime');

const Tweet = (props) => {
  const { displayName, username, photo } = props.user;

  let textAreaStyle = {
    resize: "none",
    fontSize: "18px",
    border: "1px solid black",
    borderRadius: '5px'
  }

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
      <Datetime onChange={props.handleDate}/>
        <textarea rows="7" cols="55" style={textAreaStyle} value={props.textValue} onChange={e => props.input(e)}> </textarea>
      </div>
      <div className="submit-container">
        <span className="char-counter">{280 - (props.textValue.length)}</span>
        <button type="submit" onClick={props.submit}>Submit</button>
      </div>
    </div>
  )
}

export default Tweet;
