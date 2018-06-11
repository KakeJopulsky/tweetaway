import React from 'react';
import moment from 'moment';
import { Table, Button } from 'react-bootstrap';

let editDelete = {
  'textAlign': 'center'
}

const Queue = (props) => {

  return (
    <div className="queue-container">
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Message</th>
            <th>Date</th>
            <th colSpan="2" style={editDelete}> Edit / Delete </th>
          </tr>
        </thead>
        <tbody>
          {props.tweets.map((tweet, i) => (
            <tr>
            <td>{i}</td>
            <td>{tweet.message}</td>
            <td>{moment(tweet.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
            <td><Button bsStyle="warning" onClick={() => props.editMode(tweet)}>Edit</Button></td>
            <td><Button bsStyle="danger"  onClick={() => props.deleteTweet(tweet)}>Delete</Button></td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Queue;
