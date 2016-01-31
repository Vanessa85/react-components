import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import App from './components/App';
import PageSimpleTable from './components/PageSimpleTable';

var routes = (
	<Route path='/' handler={App}>
		<DefaultRoute handler={PageSimpleTable} />
	</Route>
);

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById('main'));
});
