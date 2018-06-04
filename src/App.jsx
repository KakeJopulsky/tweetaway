import React from 'react';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false
    }
	}

	componentDidMount() {
    console.log('App mounted');
    this.isLoggedIn();
  }
  
  isLoggedIn() {
    axios.get('/user')
      .then(({ data }) => this.setState({ isLoggedIn: data }))
      .catch((err) => console.log('failureL ', err))
  };

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<div>
        <a href="/auth/twitter">Log In with OAuth Provider</a>
				{isLoggedIn ? (<div>Logged in!</div>) : (<div>is not logged in</div>)}
			</div>
		)
	}
}

export default App;
