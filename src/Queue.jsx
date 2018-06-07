import React from 'react';
import { Table, Button } from 'react-bootstrap';

let editDelete = {
  'text-align': 'center'
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
            <td>{tweet.date}</td>
            <td><Button bsStyle="warning">Edit</Button></td>
            <td><Button bsStyle="danger">Delete</Button></td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Queue;
