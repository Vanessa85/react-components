import React from 'react';

export default class SelectPages extends React.Component {
	render() {
		console.log('active page', this.props.activePage);
		var btnDefault = this.props.activePage;

		var buttons = this.props.pages.map(function(page, index){
			var btnClass = (String(btnDefault)===String(page))? "btn-primary":"btn-default";
			return <button 
						key={`btnPage${page}`} 
						type="button" 
						className={`btn ${btnClass}`} 
						onClick={this.handleClick.bind(this, page)}>
						{page}
					</button>
		}, this);

		return (
			<div className="btn-group btn-group-sm" role="group">
				{buttons}
			</div>
		);
	}

	handleClick(page, event) {
		event.preventDefault();
		this.props.onPageSizeChange(page);
	}
}
