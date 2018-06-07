import React from 'react';
import { Table, Button } from 'react-bootstrap';

let editDelete = {
  'text-align': 'center'
}

const Queue = () => {

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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td><Button bsStyle="warning">Edit</Button></td>
            <td><Button bsStyle="danger">Delete</Button></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Queue;
