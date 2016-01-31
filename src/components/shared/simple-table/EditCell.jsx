import React from 'react';

export default class EditCell extends React.Component {
	componentDidMount() {
		var input = React.findDOMNode(this.refs.inputRef);
	    input.value = this.props.children;
	    input.focus();	
	}

	render() {
		return (
			<td>
	        	<input ref="inputRef" type="text"
	        		className="form-control input-sm"
	          		onKeyDown={this.handleKeyPress.bind(this)}
	          		onBlur={this.handleBlur.bind(this)} />
	      	</td>
		);
	}

	handleKeyPress(e){
		if (e.keyCode == 13) { //Pressed ENTER
     		this.props.completeEdit(e.currentTarget.value, this.props.dataIndex, this.props.colIndex);
    	}else if(e.keyCode == 27){
      		this.props.completeEdit(null, this.props.dataIndex, this.props.colIndex);
    	}
	}

	handleBlur(e){
		if(this.props.blurToSave){
	    	this.props.completeEdit(e.currentTarget.value, this.props.dataIndex, this.props.colIndex);
	    }
	}
}

EditCell.propTypes = {
    completeEdit: React.PropTypes.func,
  	rowIndex: React.PropTypes.number,
  	colIndex: React.PropTypes.number,
  	blurToSave: React.PropTypes.bool
}
