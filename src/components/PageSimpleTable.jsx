import React from 'react';
import {SimpleTable} from './shared/index';

export default class PageSimpleTable extends React.Component {
  constructor(props) {
    super(props);
  }

    onSelectAll(isSelected, selectedRowKey){
      console.log('isSelected', isSelected, 'selectedRowKey', selectedRowKey);
    }

    onRowSelect(rowIndex, row, isSelected, selectedRowKey){
        console.log('rowIndex', rowIndex, 'selectedRowKey', selectedRowKey);   
    }

  render() {
    var selectRowProp = {
        mode: "checkbox",
        clickToSelect: false,
        bgColor: "rgb(238, 193, 213)",
        onSelect: this.onRowSelect.bind(this),
        onSelectAll: this.onSelectAll.bind(this)
    };

    return (
    <div className="row">
        <div className="col-xs-4 col-md-2">
            <div className="list-group">
                <a href="#basic-table" className="list-group-item">Tabla básica</a>
                <a href="#column-width" className="list-group-item">Ancho de Columna</a>
                <a href="#tdstyle" className="list-group-item">Estilo de la Columna</a>
                <a href="#formatColumn" className="list-group-item">Formato de la Columna </a>
                <a href="#orderColumn" className="list-group-item">Ordenar Columna</a>
                <a href="#pagination" className="list-group-item">Paginación</a>
                <a href="#toolbarTable" className="list-group-item">Toolbar</a>
                <a href="#selectRowTable" className="list-group-item">Seleccionar filas</a>
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
                        "   {Id: 1, Name: 'Product 1', Price: 101, Stock: 0}, \n" +
                        "   {Id: 2, Name: 'Product 2', Price: 102, Stock: 200}, \n" +
                        "   {Id: 3, Name: 'Product 3', Price: 103, Stock: 150}, \n" +
                        "   {Id: 4, Name: 'Product 4', Price: 104, Stock: 0}, \n" +
                        "   {Id: 5, Name: 'Product 5', Price: 105, Stock: 10} \n" +
                        "]; \n\n" +
                        "var columns = {\n"+
                        "   Id: {name: 'ID'},\n" +
                        "   Name: {name: 'Product Name'},\n"+
                        "   Price: {name: 'Product Price'} \n"+
                        "   Stock: {name: 'Stock'} \n"+ 
                        "};"
                        }
                    </code>
                </pre>
            </div>
            <div className="bs-docs-section">
                <h1 id="column-width" className="page-header">Ancho de Columna</h1>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={products} columns={columnsWidth} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns} /> \n \n" + 
                        "var columns = {\n"+
                        "   Id: {name: 'ID', width:'50px'},\n" +
                        "   Name: {name: 'Product Name'},\n"+
                        "   Price: {name: 'Product Price', width:'120px'} \n"+ 
                        "   Stock: {name: 'Stock', width:'120px'} \n"+ 
                        "};"
                        }
                    </code>
                </pre>
            </div>
            <div className="bs-docs-section">
                <h1 id="tdstyle" className="page-header">Estilo de la Columna</h1>
                <p>Use <code>tdStyle</code> para especificar el estilo de la columna.</p>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={products} columns={columnsTdstyle} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns} /> \n \n" + 
                        "var columns = {\n"+
                        "   Id: {name: 'ID', tdStyle: function(cell, row) {return {textAlign: 'right'}}},\n" +
                        "   Name: {name: 'Product Name'},\n"+
                        "   Price: {name: 'Product Price', tdStyle: function(cell, row) {return {textAlign: 'right'}}} \n"+ 
                        "   Stock: {name: 'Stock', tdStyle: function(cell, row) {if(Number(cell)>0) return {textAlign: 'right'}; else return{background:'#f0ad4e', textAlign:'right'}} \n"+ 
                        "};"
                        }
                    </code>
                </pre>
            </div>
             <div className="bs-docs-section">
                <h1 id="formatColumn" className="page-header">Formato de la Columna</h1>
                <p>Use <code>format</code> para personalizar la columna.</p>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={products} columns={columnsFormat} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns} /> \n \n" + 
                        "var columns = {\n"+
                        "   Id: {name: 'ID'},\n" +
                        "   Name: {name: 'Product Name'},\n"+
                        "   Price: {name: 'Product Price'} \n"+ 
                        "   Stock: {name: 'Stock', format:function(cell, row, index){return `S/. ${cell}`; }} \n"+ 
                        "};"
                        }
                    </code>
                </pre>
            </div>
            <div className="bs-docs-section">
                <h1 id="orderColumn" className="page-header">Ordenar Columna</h1>
                <p>Use <code>defaultSortOrder</code> para ordenar la columna en forma <code>asc</code> o <code>desc</code>.</p>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={products} columns={columnsOrder} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns} /> \n \n" + 
                        "var columns = {\n"+
                        "   Id: {name: 'ID', defaultSortOrder: 'desc'},\n" +
                        "   Name: {name: 'Product Name', defaultSortOrder: 'desc'},\n"+
                        "   Price: {name: 'Product Price', defaultSortOrder: 'desc'} \n"+ 
                        "   Stock: {name: 'Stock', defaultSortOrder: 'desc' }} \n"+ 
                        "};"
                        }
                    </code>
                </pre>
            </div>
            <div className="bs-docs-section">
                <h1 id="pagination" className="page-header">Paginación</h1>
                <p>Use <code>pagination</code> para habilitar la paginación de su tabla.</p>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={productsPagination} 
                        columns={columns} 
                        pages={['5','10','15','20']}
                        pagination={true} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns}  \n"+
                        "   pages={['5','10','15','20']} \n"+
                        "   pagination={true} /> "
                        }
                    </code>
                </pre>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={productsPagination} 
                        columns={columns} 
                        pages={['5','10','15','20']}
                        pagination={true}
                        paginationStyle="pager" />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns}  \n"+
                        "   pages={['5','10','15','20']} \n"+
                        "   pagination={true} \n" +
                        "   paginationStyle='pager' />"
                        }
                    </code>
                </pre>
            </div>
            <div className="bs-docs-section">
                <h1 id="toolbarTable" className="page-header">Toolbar</h1>
                <p>Use <code>toolbar</code> para mostrar el numero de registros y el buscador.</p>
                <p><small>Nota: por defecto searchFields es un array vacío.</small></p>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={products} 
                        columns={columns}
                        toolbar={true}
                        searchFields={searchFields} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns} \n" + 
                        "   toolbar={true} \n" + 
                        "   searchFields={searchFields} /> \n \n" + 
                        "var searchFields = ['Name', 'Price','Stock'];"
                        }
                    </code>
                </pre>
            </div>
            <div className="bs-docs-section">
                <h1 id="selectRowTable" className="page-header">Seleccionar filas</h1>
                <SimpleTable 
                    className="table table-bordered table-striped table-hover"
                        data={products} 
                        columns={columns}
                        keyField="Id"
                        selectRow={selectRowProp} />     
                <pre>
                    <code>
                        {"<SimpleTable className='table table-bordered table-striped table-hover' \n"+ 
                        "   data={products} \n"+
                        "   columns={columns} \n" + 
                        "   keyField='Id' \n" + 
                        "   selectRow={selectRowProp} /> \n \n" + 
                        "var selectRowProp = { \n"+
                        "    mode: 'checkbox', \n" +
                        "    clickToSelect: false, \n"+
                        "    bgColor: 'rgb(238, 193, 213)', \n"+
                        "    onSelect: this.onRowSelect.bind(this), \n"+
                        "    onSelectAll: this.onSelectAll.bind(this) \n" +
                        "}; \n\n"+
                        "onSelectAll(isSelected, selectedRowKey){ \n"+
                        "   console.log('isSelected', isSelected, 'selectedRowKey', selectedRowKey); \n" + 
                        "} \n\n"+
                        "onRowSelect(rowIndex, row, isSelected, selectedRowKey){ \n"+
                        "   console.log('rowIndex', rowIndex, 'selectedRowKey', selectedRowKey);\n"+   
                        "}"
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
    {Id: 1, Name: 'Product 1', Price: 101, Stock: 0},
    {Id: 2, Name: 'Product 2', Price: 102, Stock: 200},
    {Id: 3, Name: 'Product 3', Price: 103, Stock: 150},
    {Id: 4, Name: 'Product 4', Price: 104, Stock: 0},
    {Id: 5, Name: 'Product 5', Price: 105, Stock: 10}
];
var productsPagination = [
    {Id: 1, Name: 'Product 1', Price: 101, Stock: 0},
    {Id: 2, Name: 'Product 2', Price: 102, Stock: 200},
    {Id: 3, Name: 'Product 3', Price: 103, Stock: 150},
    {Id: 4, Name: 'Product 4', Price: 104, Stock: 0},
    {Id: 5, Name: 'Product 5', Price: 105, Stock: 10},
    {Id: 6, Name: 'Product 6', Price: 106, Stock: 10},
    {Id: 7, Name: 'Product 7', Price: 107, Stock: 150},
    {Id: 8, Name: 'Product 8', Price: 108, Stock: 100},
    {Id: 9, Name: 'Product 9', Price: 109, Stock: 100},
    {Id: 10, Name: 'Product 10', Price: 110, Stock: 245},
    {Id: 11, Name: 'Product 11', Price: 111, Stock: 10},
    {Id: 12, Name: 'Product 12', Price: 112, Stock: 10},
];

var columns = {
  Id: {name: 'ID'},
  Name: {name: 'Product Name'},
  Price: {name: 'Product Price'},
  Stock: {name: 'Stock'}  
};

var columnsWidth = {
  Id: {name: 'ID', width:'50px'},
  Name: {name: 'Product Name'},
  Price: {name: 'Product Price', width:'120px'},
  Stock: {name: 'Stock', width:'120px'}
};

var columnsTdstyle = {
  Id: {name: 'ID', tdStyle: function(cell, row) {return {textAlign: 'right'}}},
  Name: {name: 'Product Name'},
  Price: {name: 'Product Price', tdStyle: function(cell, row) {return {textAlign: 'right'}}},
  Stock: {name: 'Stock', tdStyle: function(cell, row) {if(Number(cell)>0) return {textAlign: 'right'}; else return{background:'#f0ad4e', textAlign:'right'};}}
};

var columnsFormat = {
  Id: {name: 'ID'},
  Name: {name: 'Product Name'},
  Price: {name: 'Product Price', format:function(cell, row, index){return `S/. ${cell}`; }},
  Stock: {name: 'Stock'}
};

var columnsOrder = {
  Id: {name: 'ID', defaultSortOrder: "desc"},
  Name: {name: 'Product Name', defaultSortOrder: "desc"},
  Price: {name: 'Product Price', defaultSortOrder: "desc"},
  Stock: {name: 'Stock', defaultSortOrder: "desc"}
};

var searchFields = ["Name", "Price","Stock"];



