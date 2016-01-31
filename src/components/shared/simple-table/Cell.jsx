import React from 'react';

const CELL_EDIT_CLICK = "click";
const CELL_EDIT_DBCLICK = "dbclick";

export default class Cell extends React.Component {

	render() {
		//console.log('propssssssss', this.props);
		var tdStyle = this.props.tdStyle;
		var opts = {};
	    if(this.props.cellEdit){
	    	if(this.props.cellEdit.mode == CELL_EDIT_CLICK){
	    		opts.onClick = this.handleCellEdit.bind(this);
	      	}else if(this.props.cellEdit.mode == CELL_EDIT_DBCLICK){
	        	opts.onDoubleClick = this.handleCellEdit.bind(this);
	      	}
	    }
	
		return (
			<td style={tdStyle} {...opts}>
				{this.props.children}
			</td>
		);
	}

	handleCellEdit(e) {
		if(this.props.cellEdit.mode == CELL_EDIT_DBCLICK){
     		if(document.selection && document.selection.empty) {
        		document.selection.empty();
      		} else if(window.getSelection) {
          		var sel = window.getSelection();
          		sel.removeAllRanges();
      		}
    	}

    	this.props.onEdit(
      		e.currentTarget.parentElement.rowIndex,
      		e.currentTarget.cellIndex
      	);
	}
}
