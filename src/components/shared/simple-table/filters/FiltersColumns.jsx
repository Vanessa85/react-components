import React from 'react';
import FieldCheckbox from './FieldCheckbox';
//import './filters-columns.css';

export default class FiltersColumns extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		//console.log('filters', this.state.data);

		var childrens = [], count = 0;
		var buttons = [];
		this.props.data.forEach((item, index) => {
			if(!(item.hasOwnProperty('hide') && item.hide)) {
				if(item.hasOwnProperty('children')) {
					childrens = childrens.concat(item.children);	
					count = 0;
					item.children.forEach((ch) => {
						if(ch.hasOwnProperty('checked')) {
							if(ch.checked) count++;
						}
					});
					var parentChecked = count === item.children.length ? true:false; 
				}
				var formattedValue = item.format !== undefined? item.format: item.label;

				buttons.push(
					<button type="button" key={`parent${index}`} className={this.props.btnColor} onClick={this.onChange.bind(this)}>
						<label className="checkbox-inline">
							<input type="checkbox" 
					  			checked={parentChecked}
					  			
					  			data-key={item.id} value={item.id} /> 
								{formattedValue}
					  	</label>
					</button>
				);	
			} 

			{/*return <label key={`parent${index}`} className="checkbox-inline">
				  		<input type="checkbox" 
				  			checked={parentChecked}
				  			onChange={this.onChange.bind(this)}	
				  			data-key={item.id} value={item.id} /> 
				  			<span className="glyphicon glyphicon-tag" aria-hidden="true"></span> {item.label}
					</label> */}

			/*return <button type="button" className="btn btn-default" onClick={this.onClickGroupButton.bind(this)}>
						<input type="checkbox"
							data-key={item.id} 
							value={item.id}
							checked={item.checked || false} /> {item.label}
					</button>*/
		});

		var itemXColumns = this.props.childrenPerColumn;	
		var checkboxesGroup = [];
		var start = 1, end;
		for(let i=1; i<= this.props.numsColumns; i++) {
			end	= itemXColumns*i;
			if(end > childrens.length) end = childrens.length;
			if(end < start) {
				var items = null;
			} else {
				var items = [];
				for(let j=start-1; j < end; j++){
					items.push(<FieldCheckbox key={`cbx${j}`} 
						onChange={this.onChangeChildren.bind(this)}
						item={childrens[j]} />);
				}

				start += itemXColumns;	
			}

			checkboxesGroup.push(
					<div className="col-md-2 col-sm-4 col-xs-6">
						{items}					
					</div>	
				); 
		}

		return (
			<div className="simple-table-filters" id={this.props.id} style={{display:'none'}}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="btn-group" role="group">
                          {buttons}
                        </div>
                    </div>
                </div>
                <div className="row">
                	{checkboxesGroup}
                </div>
            </div>
		);
	}

	onChange(event) {
		var inputChildren = event.currentTarget.firstChild.firstChild;
		var key = inputChildren.getAttribute('data-key');
		var checked = !inputChildren.checked;	
		//var key = event.target.children[0].getAttribute('data-key');
		//var checked = event.target.checked;
		//var key = event.target.getAttribute('data-key');

		var newData = this.props.data;
		newData.every((item) => {
			if(item.id === key) {
				item.checked = checked;
				if(item.hasOwnProperty('children')) {
					item.children.forEach((ch) => {
						ch.checked = checked;
					});
				}
				return false;
			} else {
				return true;
			}
		});

		this.props.onChangeFilters(newData);
		//this.setState({data: this.state.data});
	}

	onChangeChildren(event){
		var checked = event.target.checked;
		var key = event.target.getAttribute('data-key');
		var encontrado = false;
		var newData = this.props.data;
		newData.every((item) => {
			if(item.hasOwnProperty('children')) {
				if(encontrado) {
					return false;
				} else {
					item.children.every((ch) => {
						if(ch.id === key) {
							ch.checked = checked;
							encontrado = true;
							return false;	
						} else {
							return true;
						}
					});	
					return true;
				}
			}
		});
		this.props.onChangeFilters(newData);
		//this.setState({data: this.state.data});
	}

	getHideCheckboxes(){
		var hideChildren = [];
		this.props.data.forEach((item, index) => {
			if(item.hasOwnProperty('hide') && item.hide) {
				if(item.hasOwnProperty('children')) {
					hideChildren = hideChildren.concat(item.children);
				}
			}
		});

		return hideChildren;
	}


};

FiltersColumns.defaultProps = {
	numsColumns: 6,
	childrenPerColumn:8,
	btnColor: 'btn btn-primary',
	filters:[],
	id: 'demo-simple'
};
