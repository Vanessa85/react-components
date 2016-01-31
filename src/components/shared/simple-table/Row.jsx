import React from 'react';
import Cell from './Cell';
import EditCell from './EditCell';

const ROW_SELECT_SINGLE = "radio";
const ROW_SELECT_MULTI = "checkbox";

export default class Row extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      		currEditCell: null
    	};
	}

	render() {
		//console.log("Row TABLE", this.props.columns);

		var columnNames = Object.keys(this.props.columns);

		var cells = columnNames.map(function(name, columnIndex) {
			var column = this.props.columns[name];
			var editable = column.hasOwnProperty('editable')? column.editable : false;
			var columnaFicticia = column.hasOwnProperty('columnFalse')? column.columnFalse : false;
			var cellValue = columnaFicticia? '': this.props.item[name];
			
			 if(editable &&
          		this.state.currEditCell != null &&
          		this.state.currEditCell.rid == this.props.rowIndex &&
          		this.state.currEditCell.cid == columnIndex){
				
				return(
					<EditCell 
						completeEdit={this.handleCompleteEditCell.bind(this)}
                        key={columnIndex}
                        blurToSave={this.props.cellEdit.blurToSave}
                        rowIndex={this.props.rowIndex}
                        colIndex={columnIndex}
                        dataIndex={this.props.dataIndex}>
						{cellValue}
					</EditCell>);	

			 } else {
				var formattedStyle;
				if(column.tdStyle !== undefined) {
					formattedStyle = column.tdStyle(cellValue, this.props.item);
				}

				if(column.format !== undefined) {
					var formattedValue = column.format(cellValue, this.props.item, this.props.rowIndex);	

					return (
						<Cell 
							tdStyle={formattedStyle}
							cellEdit={this.props.cellEdit}
							onEdit={this.handleEditCell.bind(this)}>
							{(typeof formattedValue === "string")? 
								<div dangerouslySetInnerHTML={{__html: formattedValue}}></div> : <div>{formattedValue}</div>
							}
						</Cell>);
				} else {
					return (
						<Cell 
							tdStyle={formattedStyle}
							cellEdit={this.props.cellEdit}
							onEdit={this.handleEditCell.bind(this)}>
							{cellValue}
						</Cell>);
				}
			 }
			
		}, this);

		var selected = this.props.isSelected;
		if(this.props.selectRow.mode == "checkbox"){ 
			var selectRowColumn = this.renderSelectRowColumn(selected);
			cells.unshift(selectRowColumn);
		}

		var rowStyle = {
	    	backgroundColor: selected ? this.props.selectRow.bgColor : null
	    };

		if(this.props.selectRow && this.props.selectRow.clickToSelect){ 
	    	return(
		    	<tr style={rowStyle} onClick={this.rowClick.bind(this)}>{cells}</tr>
		    )
	    } else {
	    	return(
	       		<tr style={rowStyle}>{cells}</tr>
	      	)
	    }
	}

	rowClick(event) {

	}

	renderSelectRowColumn(selected) {
		return (<td style={{textAlign:'center'}}><input type="checkbox" checked={selected} onChange={this.handleSelectRowColumChange.bind(this)} /></td>);
	}
	/*if is defined clickToSelect, checkbox's event is will null*/
	handleSelectRowColumChange(event) {
		if(!this.props.selectRow.clickToSelect) {
			this.handleSelectRow(event.currentTarget.parentElement.parentElement.rowIndex, event.currentTarget.checked);
	    }
	}

	handleSelectRow(rowIndex, isSelected) {
		this.props.onSelectRow(rowIndex, isSelected);
	}

	handleEditCell(rowIndex, columnIndex){
    	//this.props.parentRender = false;
    	if(this._isSelectRowDefined()){
      		columnIndex--;
    	}
    	rowIndex--;
    	this.setState({currEditCell: {
      		rid: rowIndex,
      		cid: columnIndex}
      	});
  	}

  	_isSelectRowDefined(){
   	 	return this.props.selectRow.mode == ROW_SELECT_SINGLE ||
          	this.props.selectRow.mode == ROW_SELECT_MULTI;
  	}

  	handleCompleteEditCell(newVal, rowIndex, columnIndex){
    	this.setState({currEditCell: null});
		var columnNames = Object.keys(this.props.columns);
		var fieldName = columnNames[columnIndex];

	   	if(this.props.cellEdit.afterSaveCell){
	     	this.props.cellEdit.afterSaveCell(rowIndex, fieldName, newVal);
	    }
  	}

}
