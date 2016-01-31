import React from 'react';
import SelectPages from './SelectPages';
import Search from './Search';

export default class Toolbar extends React.Component {
	render() {
		var styleToolbar = {
			marginBottom: '10px'
		}

		return (
			<div className="row" style={styleToolbar}>
                <div className="col-lg-3 col-md-4 col-sm-3">
                	<SelectPages 
                	   activePage={this.props.pageSize}
                	   pages={this.props.pages}
                	   onPageSizeChange={this.props.onPageSizeChange} />
               	</div>
	            <div className="col-lg-9 col-md-8 col-sm-9">
	            	<Search 
	            		columns={this.props.columns}
	            		searchFields={this.props.searchFields}
	            		filter={this.props.filter}
	            		onChangeSearch={this.props.onChangeSearch} />
	           	</div>
	      	</div>
		);
	}
}
