import React from 'react';
import assign from 'react/lib/Object.assign';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columnSelected: null
		}
	}

	render() {
		//console.log('header', this.props.columns);
		var columns = this.props.columns;
		var header = Object.keys(columns).map((columnName, index) => {
			var column = columns[columnName];
			var width = column.hasOwnProperty('width')? {width: column.width} : {width: null};
			var thStyle = column.hasOwnProperty('thStyle')? column.thStyle : {};
			var mergeStyle = assign(width, thStyle);
			var cellSelectColumn = column.hasOwnProperty('selectColumn')? column.selectColumn: this.props.selectColumn? true: false;
			var classFooter = '';
			if(this.props.footer) {
				if(column.hasOwnProperty('footer')) {
					classFooter = column.footer? 'sum' : '';
				} else {
					classFooter = 'sum';
				}
			}

			var checked;
			if(this.state.columnSelected !== null) {
				checked = columnName == this.state.columnSelected? true: false;	
			} else {
				checked = false;
			}
			
			if(this.props.selectColumn && this.props.selectColumn.onSelect && cellSelectColumn) {
				return (
					<th key={`headerCol${index}`} style={mergeStyle} className={classFooter}>
						{this.renderSelectColumnHeader(columnName, checked)}
						{column.name}
						{this.renderButtonSorter(column, columnName)}
					</th>
				);
			} else {
				return <th key={`headerCol${index}`} style={mergeStyle} className={classFooter}>
						{column.name}
						{this.renderButtonSorter(column, columnName)}
					</th>;
			}

		});	
		
		if(this.props.mode === 	"checkbox") {
			header.unshift(this.renderSelectRowHeaderColumn());
		}

		return (
			<thead>
				<tr>
					{header}
				</tr>
			</thead>
		);
	}

	renderButtonSorter(column, columnName) {
		var sorter = column.hasOwnProperty('defaultSortOrder')? true: false;
		if(sorter)
			return (
				<button 
					className="btn btn-link" 
					style={{marginLeft:5}}
					onClick={this.props.onSorterColumn.bind(this, columnName, column)}>
					<span className="glyphicon glyphicon-sort"></span>
				</button>
			);
		else
			return null;
	}

	renderSelectRowHeaderColumn() {
		var thStyle = {
	    	width: 35
	    };

		return (
			<th style={thStyle}>
	        	<div className="th-inner table-header-column">
	          		<input type="checkbox" 
	          			checked={this.props.isSelectedAll} 
	          			onChange={this.props.onSelectAllRow} />
	        	</div>
	        </th>
		);
	}

	renderSelectColumnHeader(column, valueChecked){
		return (
			<div className="th-inner table-header-column">
				<input type="checkbox"
					checked={valueChecked}
					onChange={this.handleSelectedColumn.bind(this, column)} />

			</div>
		);
	}

	handleSelectedColumn(column, event){
		var isSelected = event.currentTarget.checked;
		if(this.state.columnSelected === null && isSelected){
			this.setState({columnSelected: column});
			this.props.onSelectColumn(column, isSelected);	
		} else {
			if(this.state.columnSelected !== null) {
				if(column === this.state.columnSelected && !isSelected) {
					this.setState({columnSelected: null});		
				} 
			}

			this.props.onSelectColumn(this.state.columnSelected, isSelected);	
		}
			
	}

}
