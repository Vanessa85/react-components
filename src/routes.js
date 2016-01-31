import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import App from './components/App';
import PageSimpleTable from './components/PageSimpleTable';
import PageInputControl from './components/PageInputControl';

var routes = (
	<Route path='/' handler={App}>
		<DefaultRoute name="simple-table" handler={PageSimpleTable} />
		<Route name="input-control" handler={PageInputControl} />
	</Route>
);

Router.run(routes, Router.HistoryLocation,  function(Handler) {
	React.render(<Handler />, document.getElementById('main'));
});
