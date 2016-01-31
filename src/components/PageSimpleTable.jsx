import React from 'react';
import {SimpleTable} from './shared/index';

export default class PageSimpleTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="row">
        <div className="col-xs-4 col-md-2">
            <div className="list-group">
                <a href="#basic-table" className="list-group-item active">Tabla básica</a>
                <a href="#table-style" className="list-group-item">Table Style</a>
                <a href="#" className="list-group-item">Morbi leo risus</a>
                <a href="#" className="list-group-item">Porta ac consectetur ac</a>
                <a href="#" className="list-group-item">Vestibulum at eros</a>
            </div>
        </div>
    	<div className="col-xs-12 col-md-10">
            <div className="bs-docs-section">
    		   <h1 id="basic-table" className="page-header">Tabla básica</h1>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={products} columns={columns} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns} /> \n \n" + 
                        "var products = [ \n" +
                        "   {Id: 1, Name: 'Product 1', Price: 101}, \n" +
                        "   {Id: 2, Name: 'Product 2', Price: 102}, \n" +
                        "   {Id: 3, Name: 'Product 3', Price: 103}, \n" +
                        "   {Id: 4, Name: 'Product 4', Price: 104}, \n" +
                        "   {Id: 5, Name: 'Product 5', Price: 105} \n" +
                        "]; \n\n" +
                        "var columns = {\n"+
                        "   Id: {name: 'ID'},\n" +
                        "   Name: {name: 'Product Name'},\n"+
                        "   Price: {name: 'Product Price'} \n"+ 
                        "};"
                        }
                    </code>
                </pre>
            </div>
    	</div>
    </div>
    );
  }
}

var products = [
    {Id: 1, Name: 'Product 1', Price: 101},
    {Id: 2, Name: 'Product 2', Price: 102},
    {Id: 3, Name: 'Product 3', Price: 103},
    {Id: 4, Name: 'Product 4', Price: 104},
    {Id: 5, Name: 'Product 5', Price: 105}
];

var columns = {
  Id: {name: 'ID'},
  Name: {name: 'Product Name'},
  Price: {name: 'Product Price'}  
};
