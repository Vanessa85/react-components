import React from 'react';

export default class Listbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter : ''
		}
	}

	render() {
		//console.log('config lisboc', this.props)

		var label = this.props.config.label;	
		var labelSubItem = this.props.config.hasOwnProperty('subItem')? this.props.config.subItem : null;

		var items = [];
		this.props.items.forEach((item, index) => {
			if(item[label].toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1 ) {
				let activo;
				if(item.hasOwnProperty('Activo')){
					if(item.Activo) {
						activo = <span className="badge success">Activo</span>
					} else {
						activo = <span className="badge warning">No activo</span>
					}	
				} else {
					activo = null;
				}
				
				//parchando... :(
				if(labelSubItem) {
					items.push(
						<a href="#" key={index} className="list-group-item"
						 onClick={this.handleClickItem.bind(this, index, item)}>
						 	{activo} 
							<strong>{item[label]}</strong>
							<p style={{marginBottom:0}}>{item[labelSubItem]}</p>
						</a>);	

				} else {
					items.push(
						<a href="#" key={index} className="list-group-item"
						 onClick={this.handleClickItem.bind(this, index, item)}>
							{activo} {item[label]}
							
						</a>);	
				}

			}
		});

		var total = items.length;
		if(items.length === 0) {
			items.push(<a href="javascript:void(0)" 
				className="list-group-item center">No hay registros</a>);
		}

		return (
			<div className="listbox-modal">
				<input type="text" placeholder="buscar..." 
					className="form-control" onChange={this.onChangeFilter.bind(this)} />
				<ul className="list-group listbox-container">
					{items}
				</ul>
			</div>
			
		);
	}

	handleClickItem(index, item, event) {
		event.preventDefault();
		this.props.onClickItem(index, item);
	}

	onChangeFilter(e){
		this.setState({filter: e.target.value});
	}
}

Listbox.defaultProps = {
	items:[]
};
