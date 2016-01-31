import React from 'react';

export default class FieldCheckbox extends React.Component {
	render() {
		var item = this.props.item;
		return (
			<div className="checkbox">
            	<label>
            		<input type="checkbox" 
            			data-key={item.id}
            			checked={item.checked || false}
            			onChange={this.props.onChange}
            			value={item.id} />
            		{item.label}
            	</label>
            </div>
		);
	}
}
