import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <Header />
      	<div className="container">
			<RouteHandler />
		</div>	
    </div>
    );
  }
}
