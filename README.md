# TweetLater

*Simple full stack web app that allows user to schedule and edit/delete queued tweets*

> ![TweetLater demo!](https://i.imgur.com/hNWN6LF.gif)

## How it works

Users are first authorized access after signing into Twitter via PassportJS's Twitter strategy. Once authorized, users enter a message, and desired post date. If a user decideds they want to alter or delete a scheduled tweet, all their queued tweets can be found under the 'Queue' tab. Tweets are persisted to the database, and retreived if their scheduled time is soon. After retreival, node-schedule jobs are attached to them, and they are placed in a queue. When the attached job is ready, the tweets are published to Twitter from Twit, an interface for the Twitter API. Once published, the tweets are deleted from the database. Logout simply closes the passport session on the server, and disallows access on the client.

### Why? 

I put this simple app together in 3 days for the sake of challenge and fun. 

## Build with :

- React
- Node/Express
- MongoDB
- PassportJS
- Node-scheduler
- Bootstrap
- Twit API
