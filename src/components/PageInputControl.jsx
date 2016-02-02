import React from 'react';
import {InputControl} from './shared/index';
import FormDemo from './FormDemo';

export default class PageInputControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
      	<div className="col-md-12">
      		<div className="bs-docs-section">
    		   <h1 id="basic-table" className="page-header">InputControl</h1>
    		   
    		   <div className="col-md-5">
                    <p>
                        Use <code>InputControl</code> para mostrar una caja de texto que lanza un modal para seleccionar los items que serán cargados desde la urlGET.
                        Atravez de esta tambien puede agregar o editar estos elementos. Recibe los siguientes parametros:
                        <br />
                        <code>config</code> : <b>(requerido)</b>. Es un objeto que contiene los parametros de configuración.
                        <br />
                        <code>form</code> : formulario <b>(requerido)</b>. Es el formulario que se utilizará para editar o agregar los elementos del modal.
                        <br />
                        <code>onSelectedItem</code> : callback function <b>(requerido)</b>. Devuelve el item seleccionado del listado del modal.
                        <br />
                        <br />
                    </p>
	    		   <form>
	    		   		<div className="form-group">
					    	<label htmlFor="nombre" className="col-sm-2 control-label">Post</label>
					    	<div className="col-sm-10">
								<InputControl
									ref='postcontrol'
									config ={CONFIG}
									form={FormDemo}
									name='postcontrol'
									onSelectedItem={this.onSelectedItem.bind(this)} />
					    	</div>
					    </div>
	      			</form>
                    <br /><br /> <br />
                    <pre>
                        <code>
                            {"<InputControl \n" +
                            "    ref='postcontrol' \n" +
                            "    config ={CONFIG} \n" +
                            "    form={FormDemo} \n" +
                            "    name='postcontrol' \n"+
                            "    onSelectedItem={this.onSelectedItem.bind(this)} /> \n" + 
                            " \n"+
                            "var CONFIG = { \n"+ 
                            "    url: 'posts', \n" +
                            "    urlGET: 'posts', \n"+
                            "    title: 'Mantenimiento de Post', \n" +
                            "    listbox: {label: 'title', filterBy: 'title'}, \n" +
                            "    display: 'title', \n"+
                            "    primaryKey: 'id' \n"+
                            "} \n"+
                            "onSelectedItem(item, name) { \n" +
                            "    console.log('item', name); \n" +
                            "}"
                            }
                        </code>
                    </pre>
                    
      			</div>
      			<div className="col-md-7">
                    <h5>Ejemplo de un formulario que se muestra en el modal.</h5>
                    <pre>
                        <code>
                            {"import React from 'react'; \n"+
                            "   export default class FormDemo extends React.Component {\n"+
                            "      componentDidMount() {\n"+
                            "            var self = this;\n"+
                            "            $('#FormModeloCamara').bootstrapValidator({\n"+
                            "                excluded: ':disabled :hidden',\n"+
                            "                fields: {\n"+
                            "                    title: {\n"+
                            "                       validators: {\n"+
                            "                            notEmpty: {\n"+
                            "                                message: 'Este campo es obligatorio'\n"+
                            "                            }\n"+
                            "                       }\n"+
                            "                   },\n"+
                            "                   body: {\n"+
                            "                        validators: {\n"+
                            "                            notEmpty: {\n"+
                            "                                message: 'Este campo es obligatorio'\n"+
                            "                            }\n"+
                            "                        }\n"+
                            "                    }\n"+
                            "                }\n"+   
                            "            })\n"+
                            "            .on('success.form.bv', function(e) {\n"+
                            "                e.preventDefault();\n"+
                            "                self.handleSubmit();\n"+
                            "                $(e.target).bootstrapValidator('resetForm', true);\n"+
                            "            });\n\n"+
                            "        this.onLoadData();\n"+
                            "      }\n\n"+
                            "      componentDidUpdate(prevProps, prevState) {\n"+
                            "        this.onLoadData();\n"+  
                            "      }\n\n"+
                            "      render() {\n\n"+    
                            "        return (\n"+
                            '          <form id="formPost">\n'+
                            '            <input type="hidden" ref="postId" name="postId" />\n'+
                            '            <div className="form-group">\n'+
                            '                <label for="title">Title</label>\n'+
                            '                <input type="text" ref="title" className="form-control" id="title" />\n'+
                            '            </div>\n'+
                            '            <div className="form-group">\n'+
                            '                <label for="body">Body</label>\n'+
                            '                <textarea ref="body" id="body" className="form-control"></textarea>\n'+
                            "            </div>\n"+
                            "          </form>\n"+
                            "        );\n"+
                            "      }\n\n"+
                            "      handleSubmit(){\n"+
                            "       \n"+
                            "      }\n\n"+
                            "      onLoadData(){\n"+
                            "        var data = this.props.data;\n"+
                            "        if(Object.keys(data).length > 0) {\n"+
                            "           React.findDOMNode(this.refs.postId).value = data.id;\n"+
                            "           React.findDOMNode(this.refs.title).value = data.title;\n"+
                            "           React.findDOMNode(this.refs.body).value = data.body;\n"+
                            "        } else {\n"+
                            "           React.findDOMNode(this.refs.postId).value = '';\n"+
                            "           React.findDOMNode(this.refs.title).value = '';\n"+
                            "           React.findDOMNode(this.refs.body).value = ''; \n"+
                            "        }\n"+
                            "      }\n\n"+
                            "      getId() {\n"+
                            "        return '#formPost';\n"+
                            "      }\n"+
                            "    }"
                            }
                        </code>
                    </pre>
    		   </div>	
    		 </div>
      	</div>
      </div>
    );
  }

  onSelectedItem(item, name) {
  	console.log('item', name);
  }
}

 var CONFIG = { 
	url: "posts",
	urlGET: "posts",
	title: "Mantenimiento de Post",
	listbox: {label: 'title', filterBy: "title"},
	display: "title",
	primaryKey: "id"
};
