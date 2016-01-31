import React from 'react';
import Row from './Row';
import Header from './Header';
import PaginationList from './pagination/PaginationList';
import PaginationPager from './pagination/PaginationPager';
import Toolbar from './toolbar/Toolbar';
import FiltersColumns from './filters/FiltersColumns';
import './simple-table.css';

//const SIZE_PER_PAGE = 10;

export default class SimpleTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			columns: props.columns,
			sort: props.sort || {column: '', order: ''},
			selectedRowKey: [],
      		currentPage: 1,
      		//sizePerPage: 10,
      		sizePerPage: this.props.pages[0],
      		filter: '',
      		searchColumn: null,
      		filters: props.filters,
      		currentEditCell:null 
		}

	}

	/*componentWillUpdate(nextProps, nextState) {
		if(Object.keys(this.props.dataTable).length > 0) {
			var table = $(`#${this.props.id}`).DataTable(this.props.dataTable);
			table.destroy();
			//parche...
			$(`#${this.props.id} thead tr th`).css({width:'100px'});
			$(`#${this.props.id} thead tr th`).eq(1).css({width:'150px'});

			//$('#remove').empty();
			//var id = document.getElementById(`${this.props.id}`);
			//	id.removeAttribute('role');
			//	id.removeAttribute('aria-describedby');
			//$(`#${this.props.id}`).empty();

		}
	} */

	/*componentDidUpdate(prevProps, prevState) {
		if(Object.keys(this.props.dataTable).length > 0) {
			var table = $(`#${this.props.id}`).DataTable(this.props.dataTable);
        	table.columns.adjust().draw(true);
        	table.fixedColumns().relayout();
        	//removiendo data-reactid
        	//$('.dataTables_scrollHeadInner table thead tr th').removeAttr('data-reactid');
        	$('.DTFC_LeftHeadWrapper table thead tr').removeAttr('data-reactid');
        	$('.DTFC_LeftHeadWrapper table thead tr td').removeAttr('data-reactid');
			$('.DTFC_LeftBodyWrapper').children().removeAttr('data-reactid');
			$('.DTFC_LeftBodyWrapper table tbody tr td').removeAttr('data-reactid');
			$('.DTFC_LeftFootWrapper table tfoot tr td').removeAttr('data-reactid');
			//$('.dataTables_scrollFootInner table tfoot tr td').removeAttr('data-reactid');
		}
	}*/

	render() {
		var items, numRows;
		if(this.props.pagination){
			var dataFilter = this.getPage(this.state.currentPage, this.state.sizePerPage);
			numRows = dataFilter.count;
			items = dataFilter.values;
		} else {
			items = this.props.data;
			numRows = this.props.numRows;
		}

		var searchFields = this.props.searchFields;
		var columns;

		if(this.props.filters.length > 0) {
			var columnsChecked = [];
			

			this.state.filters.forEach((element) => {
				element.children.forEach((ch) => {
					if(ch.hasOwnProperty('checked')){
						if(ch.checked) columnsChecked.push(ch.id);
					} 
				});
			});

			columns = {};
			Object.keys(this.props.columns).forEach((col) => {
				let isChecked;
				columnsChecked.every((colchecked) => {
					if(col === colchecked) {
						columns[String(col)] = this.props.columns[col];		
						return false;
					} else {
						return true;
					}
				});	
									
			});
			

		} else {
			columns = this.props.columns;
		}

		var pagination = this.renderPagination(this.state.sizePerPage, numRows);
		var columnsToolbar = this.props.columnsComplete? this.props.columnsComplete: this.props.columns;
		var toolbar = this.renderToolbar(columnsToolbar, searchFields);
		var filters = this.renderFilters();
		
		var rows = items.map((item, index) => {
			var selected = this.state.selectedRowKey.indexOf(item[this.props.keyField]) != -1;	
			
			if(this.state.currentPage > 1) {
				var dataIndex = index + this.state.sizePerPage*(this.state.currentPage-1);
			} else {
				var dataIndex = index;
			}

			return (
				<Row item={item} 
					isSelected={selected}
					columns={columns} 
					selectRow={this.props.selectRow}
					onSelectRow={this.handleSelectRow.bind(this)}
					cellEdit={this.props.cellEdit}
					rowIndex={index}
					dataIndex={dataIndex}
					parentRender={true} />
			); 
		});

		if(rows.length === 0) {
			var numsCols = Object.keys(columns).length;
			if(this.props.selectRow.mode !== 'none') {
				numsCols++;
			}
			rows.push(<tr><td colSpan={numsCols} style={{textAlign:'center'}}>No se han encontrado registros</td></tr>);		
		}
			
		var isSelectedAll = (this.state.selectedRowKey.length === items.length)? true:false;

		return (
			<div>
				{toolbar}
				{filters}
				<div className={ this.props.responsive? "mail table-responsive": ""}>
					<table 
						className={`simple-table ${this.props.className}`} 
						style={this.props.style}>
						<Header 
							footer={this.props.footer}
							columns={columns} 
							mode={this.props.selectRow.mode}
							selectColumn={this.props.selectColumn}
							isSelectedAll={isSelectedAll}
							onSelectAllRow={this.handleSelectAllRow.bind(this)}
							onSelectColumn={this.handleSelectColumn.bind(this)}
							onSorterColumn={this.handleSorterColumn.bind(this)} />
						<tbody>
							{rows}
						</tbody>
						{this.renderFooter(columns, this.props.data)}
					</table>
				
				</div>
				{pagination}
			</div>
		);
	}

	handleSelectAllRow(event) {
		var isSelected = event.currentTarget.checked;
		var data;
		if(this.props.pagination){
			data = this.getPage(this.state.currentPage, this.state.sizePerPage).values;
		} else {
			data = this.props.data;
		}

		var selectedKey;
		if(isSelected) {
			selectedKey = data.map((row) => {
				return row[this.props.keyField]
			});

			this.setState({selectedRowKey: selectedKey });
		} else {
			this.setState({selectedRowKey: []});
			selectedKey = [];
		}

		if(this.props.selectRow.onSelectAll){
	    	this.props.selectRow.onSelectAll(isSelected, selectedKey);
	    }
	}

	handleSelectRow(rowIndex, isSelected) {		
		var data;
		if(this.props.pagination){
			data = this.getPage(this.state.currentPage, this.state.sizePerPage).values;
		} else {
			data = this.props.data;
		}

		var key = data[rowIndex-1][this.props.keyField];
		var selectedRow = data[rowIndex-1];

	    if(isSelected){
	     	this.state.selectedRowKey.push(key);
	    }
	    else{
	    	this.state.selectedRowKey = this.state.selectedRowKey.filter(function(element){
	        	return key !== element;
	      	});
	    }

	    this.setState({
	    	selectedRowKey: this.state.selectedRowKey
	    });

	    if(this.props.selectRow.onSelect){
	    	this.props.selectRow.onSelect(rowIndex, selectedRow, isSelected, this.state.selectedRowKey);
	    }
	}

	handleSelectColumn(column, isSelected) {
		if(this.props.selectColumn.onSelect){
			this.props.selectColumn.onSelect(column, isSelected);
		}
	}

	handleSorterColumn(columnName, column) {
		//console.log('column', columnName, column)
		var newSortOrder = (this.state.sort.order == "asc") ? "desc" : "asc";

      	if (this.state.sort.column != columnName)
        	newSortOrder = column.defaultSortOrder;
      	
      	this.setState({
      		sort: { column: columnName, order: newSortOrder },
      		filter: '',
      		currentPage: 1,
      		selectedRowKey: [],
      		currentEditCell: null,
      		searchColumn: null
      	});
		
		if(this.props.selectRow.onSelect){
			this.props.selectRow.onSelect(-1, {}, false, []);
			this.props.selectRow.onSelectAll(false, []);	
		}
	}

	renderPagination(sizePerPage, numRows) {
		if(this.props.pagination) {
			if(this.props.paginationStyle === 'list') {
				return <PaginationList 
							pageSize={sizePerPage} 
							numRows={numRows}
							onChangePage={this.handlePageChange.bind(this)}
							currentPage={this.state.currentPage} />	
			} else {
				return <PaginationPager 
							pageSize={sizePerPage} 
							numRows={numRows}
							onChangePage={this.handlePageChange.bind(this)}
							currentPage={this.state.currentPage} />
			}
		} else {
			return null;
		}
	}
	/*pagination click on buttons for to change page*/
	handlePageChange(page) {
		this.setState({
			currentPage: page,
			selectedRowKey: []
		});
	}

	getPage(page, sizePerPage) {
		var dataComplete = this.props.data;
		//order data
		if(this.state.sort.column !== '') {
			//console.log('dataComplete', dataComplete, 'column', this.state.sort.column)
			var sortedItems = _.sortBy(dataComplete, this.state.sort.column);
			if (this.state.sort.order === "desc") sortedItems.reverse();
		} else {
			var sortedItems = dataComplete;
		}
		
		var data = this.getDataFilter(sortedItems, this.state.searchColumn, this.state.filter);

		var numRows = data.length;

		var start = Number(sizePerPage) * (page-1);
		var end = start + Number(sizePerPage);
		//console.log('START', start, 'END', end, sizePerPage, page);

		return {count: numRows, values: data.slice(start, end)};
	}

	renderToolbar(columns, searchFields) {
		if(this.props.toolbar) {
			return <Toolbar
						pageSize={this.state.sizePerPage}
						pages={this.props.pages} 
						onPageSizeChange={this.handlePageSizeChange.bind(this)}
						
						columns={columns}
						searchFields={searchFields}
						filter={this.state.filter}
						onChangeSearch={this.handleChangeSearch.bind(this)} />

		} else {
			return null;
		}
	}

	handlePageSizeChange(page) {
		this.setState({
			sizePerPage: page,
			currentPage: 1
		});
	}

	handleChangeSearch(column, filter) {
		/*selectedRowKey: [],
      		currentPage: 1,
      		sizePerPage: 10,
      		filter: '',
      		searchColumn: null*/

		this.setState({
			searchColumn: column, 
			filter: filter,
			selectedRowKey: []
		});
	}

	getDataFilter(data, column, filter) {
		if(column !== null && this.props.toolbar) {
			var dataFilter = [];
			data.forEach((item) => {
				if(item[String(column)].toLowerCase().indexOf(filter.toLowerCase()) !== -1 ) {
					dataFilter.push(item);
				} 
			});	
			return dataFilter;
		} else {
			return data;
		}
	}

	renderFilters(){
		//if(this.props.filters.length > 0 && this.props.onDisplayFilters) {
			return <FiltersColumns refs="filters" 
						id={this.props.filterID}
						data={this.state.filters}
						onChangeFilters={this.handleChangeFilters.bind(this)}
						numsColumns={this.props.configFilters.numsColumns}
						childrenPerColumn={this.props.configFilters.childrenPerColumn}
						btnColor={this.props.configFilters.btnColor} />
		/*}  else {
			return null;
		}*/
	}

	handleChangeFilters(newData){
		this.setState({filters: newData});
	}

	renderFooter(columns, items){
		if(this.props.footer && items.length > 0){
			var footerTotal = [];
			Object.keys(columns).forEach((columnName) => {
				var sumador = 0;
				if(columns[columnName].hasOwnProperty('footer') && columns[columnName].footer) {
					var columnaFicticia = columns[columnName].hasOwnProperty('columnFalse') ? columns[columnName].columnFalse:false;

					items.forEach((item, index) => {
						var cellValue = 0;
						if(columnaFicticia) {
							cellValue = columns[columnName].format('', item, index); 	
						} else {
							cellValue = item[columnName]	
						}
						sumador += Number(cellValue);
					});

					footerTotal.push(<td>{sumador.toFixed(2)}</td>);
				} else {
					footerTotal.push(<td></td>);
				}
				
			});

			return (
				<tfoot className="simple-table-footer">
					<tr>
						{footerTotal}
					</tr>
				</tfoot>
			);
			
		} else {
			return null;
		}
	}

}

SimpleTable.defaultProps = {
	responsive: true,
	dataTable: {},
	data: [],
	pages:['10','25','50','70'],
	pagination: false,
	paginationStyle: "list",
	toolbar: false,
	filters:[],
	footer: false,
	onDisplayFilters: false,
	configFilters:{
		numsColumns: 6,
		childrenPerColumn:8,
		btnColor:'btn btn-primary'
	},
	selectRow: {
		mode: "none",
    	bgColor: "",
    	onSelect: undefined,
    	onSelectAll: undefined,
    	clickToSelect: false
  	},
  	cellEdit:{
    	mode: "none",
    	blurToSave: false,
    	afterSaveCell: undefined
  	},
  	selectColumn: {
  		mode: "none",
  		selected: "normal",
  		onSelect: undefined
  	},
  	columnsComplete: null,
  	style: null

};
