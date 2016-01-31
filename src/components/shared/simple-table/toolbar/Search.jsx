import React from 'react';

export default class Search extends React.Component {
	render() {
		var columns = this.props.columns;
		var searchFields = this.props.searchFields.sort();
		//console.log('searchFields', searchFields)

		var options = searchFields.map((item) => {
			var column = columns[item];
			return <option value={item}>{column.name}</option>;
		});

		return (
				<div className="input-group input-group-sm">
					<input type="text"
						ref="inputSearch"
						placeholder="Buscar..."
						className="form-control"
						value={this.props.filter}
						onChange={this.handleChange.bind(this)} />

					<span className="input-group-btn">
						<select ref="selectSearch" className="btn input-sm" style={{borderColor:'#ccc', textAlign:'left', fontWeight:'bold', fontSize:'13px'}}>
				   			{options}
				   		</select>
					</span>
				</div>
		
		);
	}

	handleChange(event) {
		var selectValue = React.findDOMNode(this.refs.selectSearch).value;
		var value = event.target.value;
		this.props.onChangeSearch(selectValue, value);
	}

}
