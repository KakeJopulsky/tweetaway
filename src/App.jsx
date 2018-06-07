import React from 'react';
import Tweet from './tweet.jsx';
import Queue from './Queue.jsx';
import axios from 'axios';
import { Tab, Tabs, TabContent } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      isLoggedIn: true,
      inputText: '',
      charCount: 280,
      date: Date.now(),
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
	}

	componentDidMount() {
    //this.isAuthenticated();
  }
  
  isAuthenticated() {
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
    axios.post('/post/tweet', { message: this.state.inputText, time: this.state.date })
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
          ? (
              <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                <Tab eventKey={1} title="Tweet">
                <Tweet user={this.state.isLoggedIn} input={this.handleChange} submit={this.handleInput} textValue={this.state.inputText} />
                </Tab>
                <Tab eventKey={2} title="Queue">
                  <Queue />
                </Tab>
              </Tabs>
            )
          
          : (<div><a href="/auth/twitter">Log In with OAuth Provider</a></div>)
        }
			</div>
		)
	}
}

export default App;
