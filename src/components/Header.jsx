import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
  	var pathName = this.context.router.getCurrentPathname();
  	console.log('pathName', pathName);

    return (
      <header>
		<nav className="navbar navbar-inverse">
		  <div className="container">
		    <div className="navbar-header">
			    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			    </button>
		      	<a className="navbar-brand" href="#">React Components</a>
		    </div>
		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      			<ul className="nav navbar-nav">
        			<li className={pathName == '/react-components/'? 'active': ''}><Link to="simple-table">SimpleTable</Link></li>
        			<li className={pathName == '/react-components/input-control'? 'active': ''}><Link to="input-control">InputControl</Link></li>
      			</ul>
      		</div>
		  </div>
		</nav>
	</header>	
    );
  }
}

Header.contextTypes = {
	router: React.PropTypes.func.isRequired
};

export default Header;

