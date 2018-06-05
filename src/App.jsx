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
    this.isLoggedIn();
  }
  
  isLoggedIn() {
    axios.get('/user')
      .then(({ data }) => this.setState({ isLoggedIn: data }))
      .catch((err) => console.log(err))
  };

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<div className="container">
				{isLoggedIn ? (<div>Logged in!</div>) : (<div><a href="/auth/twitter">Log In with OAuth Provider</a></div>)}
			</div>
		)
	}
}

export default App;
