import React from 'react';

export default class PaginationPager extends React.Component {
	render() {
		//console.log('this.props pagination', this.props)
		var currentPage = this.props.currentPage;
		var numPages = this.getNumPages();
		var  buttons = [];

		if(numPages !== 0) { 
			if(currentPage === 1) { 
				buttons.push(<li className="previous disabled">
					<a href="javascript:void(0)"><span aria-hidden="true">&larr;</span> Anterior</a>
					</li>);
			} else {
				buttons.push(<li className="previous">
						<a href="#" onClick={this.onClickButton(currentPage-1)}>
							<span aria-hidden="true">&larr;</span> Anterior</a>
					</li>);
			}
			if(currentPage === numPages) {
				buttons.push(<li className="next disabled"><a href="javascript:void(0)">Siguiente <span aria-hidden="true">&rarr;</span></a></li>);
			} else {
				buttons.push(<li className="next"><a href="#" onClick={this.onClickButton(currentPage+1)}>Siguiente <span aria-hidden="true">&rarr;</span></a></li>);
			}
		}

		return (
			<nav>
			  	<ul className="pager">
					{buttons}
			  	</ul>
			</nav>
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
