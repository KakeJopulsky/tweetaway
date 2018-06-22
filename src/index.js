import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
// const mixpanel = require('mixpanel-browser');
// const MixpanelProvider = require('react-mixpanel');

// mixpanel.init('ca65c75c9bc3a4d66c18942abcea3833');
 
// // mixpanel.init("YOUR_TOKEN");
// mixpanel.track("An event");

{/* <MixpanelProvider mixpanel={mixpanel}>
  <App />
  </MixpanelProvider> */}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
