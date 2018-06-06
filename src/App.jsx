import React from 'react';
import Tweet from './tweet.jsx';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      isLoggedIn: false,
      inputText: '',
      charCount: 280,
      date: Date.now()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
	}

	componentDidMount() {
    this.isLoggedIn();
  }
  
  isLoggedIn() {
    axios.get('/user')
      .then(({ data }) => this.setState({ isLoggedIn: data }))
      .catch((err) => console.log(err))
  };

  handleChange(e) {
    this.setState({
      inputText: e.target.value
    })
  };

  handleInput() {
    axios.post('/tweet', { message: this.state.inputText, time: this.state.date })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    this.setState({
      inputText: ''
    })
  };

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<div className="container">
        {isLoggedIn 
          ? (<Tweet user={this.state.isLoggedIn} input={this.handleChange} submit={this.handleInput} textValue={this.state.inputText}/>)
          : (<div><a href="/auth/twitter">Log In with OAuth Provider</a></div>)
        }
			</div>
		)
	}
}

export default App;
