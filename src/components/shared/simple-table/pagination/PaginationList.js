import React from 'react';

export default class PaginationList extends React.Component {
	render() {
		//console.log('props pagination', this.props);
		
		var currentPage = this.props.currentPage;
		var  buttons = [];
		var numPages = this.getNumPages();

		if(numPages !== 0) {
			if(currentPage === 1) {
				buttons.push(
					<li className="disabled">
						<span className="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
					</li>);

				buttons.push(
					<li className="disabled">
						<span className="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
					</li>);
			} else {
				buttons.push(
					<li><a href="#" onClick={this.onClickButton(1)}>
						<span className="glyphicon glyphicon-step-backward" aria-hidden="true"></span></a>
					</li>);	

				buttons.push(
					<li><a href="#" onClick={this.onClickButton(currentPage-1)}>
						<span className="glyphicon glyphicon-triangle-left" aria-hidden="true"></span></a>
					</li>);
			}

			buttons.push(<li><a href="javascript:void(0)" className="pagination-num">Página <strong>{currentPage}</strong> de {numPages}</a></li>);

			if(currentPage === numPages) {
				buttons.push(
					<li className="disabled">
						<span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
					</li>);

				buttons.push(
					<li className="disabled">
						<span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
					</li>);
			} else {
				buttons.push(
					<li>
						<a href="#" onClick={this.onClickButton(currentPage+1)}>
							<span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>	
						</a>
					</li>);

				buttons.push(
					<li><a href="#" onClick={this.onClickButton(numPages)}>
						<span className="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
					</a></li>);	
			}

			buttons.push(<li><a href="javascript:void(0)">Total de registros: {this.props.numRows}</a></li>);	
		}

		return (
			<ul className="pagination pagination-sm" style={{margin:0, marginBottom:20}}>
                {buttons}
            </ul>
		);
	}

	onClickButton(pageNum) {
		return (event) => {
			event.preventDefault();	
			var numPages = this.getNumPages();

			if(pageNum <= 0) pageNum = 1;

			if(pageNum > numPages) pageNum = numPages;

			this.props.onChangePage(pageNum);
		}
	}

	getNumPages() {
		if(this.props.pageSize !== "Todos"){
			var numPages = Math.floor(this.props.numRows / this.props.pageSize)
			if (this.props.numRows % this.props.pageSize > 0) {
				numPages++
			}
		} else {
			numPages = 0;
		}
	
		return numPages;
	}
}
