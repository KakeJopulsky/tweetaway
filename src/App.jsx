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
      date: Date.now(), // If user forgets date, post immediately
      tweets: null,
      editMode: false,
      edittedTweetID: null,
      key: 1,
    }
    this.findOneAndUpdate = this.findOneAndUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.editMode = this.editMode.bind(this);
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
    if (this.state.editMode) {
      this.findOneAndUpdate();
      this.getTweets();
    } else {
        axios.post('/post/tweet', { message: this.state.inputText, date: this.state.date })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
      this.setState({ inputText: '', editMode: false })
      this.getTweets();
    }
  };

  // Deletes tweet and re-renders queue
  deleteTweet({ _id }) {
    axios.post('/delete/tweet', { id: _id })
      .then(() => this.getTweets())
      .catch(err => console.log(err))
  };

  // Update tweet in db
  findOneAndUpdate() {
    let newTweet = { id: this.state.edittedTweetID, message: this.state.inputText, date: this.state.date }
    axios.post('/update', newTweet)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    this.setState({ inputText: '', editMode: false });
  }

  // Retreive all tweets from given user from the db
  // Server uses session data to identify user
  getTweets() {
    axios.get('/get/tweets')
      .then(({ data }) => this.setState({ tweets: data }))
  };

  // Convert date to UTC format, makes sorting easy
  handleDate(date) {
    let UTCdate = Date.parse(date._d);
    this.setState({ date: UTCdate });
  };

  // Sets state for editMode
  // Should return to false after tweet is posted
  editMode({ _id, message }) {
    this.setState({ 
      editMode: true,
      inputText: message,
      edittedTweetID: _id,
      key: 1 
    });
    // if true, have some visual flag in <Tweet /> notifying user
  }

  // Changes bootstrap tabs
  handleSelect(key) {
    this.setState({ key: key })
  }

	render() {
    const isLoggedIn = this.state.isLoggedIn;
    
		return (
			<div className="container">
        {isLoggedIn 
          ? (
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
                  <Queue tweets={this.state.tweets} editMode={this.editMode} deleteTweet={this.deleteTweet} />
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
