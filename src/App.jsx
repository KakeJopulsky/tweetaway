import React from 'react';
import Tweet from './tweet.jsx';
import Queue from './Queue.jsx';
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      isLoggedIn: false,
      inputText: '',
      charCount: 280,
      date: Date.now(),
      tweets: null,
      editMode: false,
      edittedTweetID: null,
      key: 1,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.editTweet = this.editTweet.bind(this);
    this.getTweets = this.getTweets.bind(this);
	}

	componentDidMount() {
    this.isAuthenticated();
  }
  
  isAuthenticated() {
    axios.get('/user')
      .then(({ data }) => {
        if (!data) {
          this.setState({ isLoggedIn: false })
        } else {
          this.setState({ isLoggedIn: true, user: data.user, tweets: data.tweets })
        }
      })
      .catch((err) => this.setState({ isLoggedIn: false }))
  };

  handleChange(e) {
    this.setState({
      inputText: e.target.value
    })
  };

  postTweet() {
    axios.post('/post/tweet', { message: this.state.inputText, date: this.state.date })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    this.setState({ inputText: '', editMode: false })
    this.getTweets();
  };

  getTweets() {
    axios.get('/get/tweets')
      .then(({ data }) => this.setState({ tweets: data }))
  };

  handleDate(date) {
    let UTCdate = Date.parse(date._d);
    this.setState({ date: UTCdate });
  };

  editTweet(tweet) {
    this.setState({ 
      editMode: true,
      inputText: tweet.message,
      edittedTweetID: tweet._id,
      key: 1 
    });
    // if true, have some flag in <Tweet /> notifying user
  }

  handleSelect(key) {
    this.setState({ key: key })
  }

	render() {
    const isLoggedIn = this.state.isLoggedIn;
    
		return (
			<div className="container">
        {isLoggedIn 
          ? (
              // <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
              <Tabs activeKey={this.state.key} onSelect={this.handleSelect} animation={false} >
                <Tab eventKey={1} title="Tweet">
                  <Tweet user={this.state.isLoggedIn}
                        input={this.handleChange} 
                        submit={this.postTweet} 
                        textValue={this.state.inputText}
                        handleDate={this.handleDate}
                  />
                </Tab>
                <Tab eventKey={2} title="Queue">
                  <Queue tweets={this.state.tweets} editTweet={this.editTweet} />
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
