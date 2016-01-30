import React from 'react';
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
			<div className="page-header">
		  		<h1>React Components</h1>
			</div>
		</div>	
    </div>
    );
  }
}

React.render(<App />, document.getElementById('main'));