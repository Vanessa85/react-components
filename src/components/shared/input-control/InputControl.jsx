import React from 'react';
import sweetAlert from 'sweetalert';
import bootstrapValidator from 'bootstrapValidator';
import {Modal} from 'react-bootstrap';
import Listbox from './Listbox';
import Actions from './InputControlActions';
import './input-modal.css';

export default class InputControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			loading: false,
			data: [],
			currentItem: {},
			currentIndex: -1,
			config: {}
		};
	}

	render() {
		var title = this.props.config.title;
		var Form = this.props.form;
		var listbox = this.props.config.listbox;
		var data = this.state.currentItem;
		var currentIndex = this.state.currentIndex;
		var items = this.state.data;
		var disabled = data.hasOwnProperty('Activo')?(data.Activo? false : true) : false;

		//console.log('this.state.contro', this.state);
		return (
		<div>
			<div className="input-group">
		    	<input type="text" ref="valueInput" name={this.props.name} className="form-control" id={this.props.name} placeholder="Seleccione..." disabled />
			    <span className="input-group-addon" onClick={this.onOpenModal.bind(this)}>
			    <span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
	    	</div>

	    	{this.state.showModal?
				<Modal enforceFocus={false} show={this.state.showModal} onHide={this.onClose.bind(this)} bsSize="large" bsStyle="primary">
					<Modal.Header closeButton className='bg-primary text-primary'>
				        <Modal.Title>{title}</Modal.Title>
				    </Modal.Header>
			        <Modal.Body>
		        		<div className="row">
	      					<div className="col-md-5">
								<Listbox 
									config={this.props.config.listbox}
									items={this.state.data}
									onClickItem={this.onClickItem.bind(this)} />
	      					</div>
	      					<div className="col-md-7">
	      						<div className="row">
	      							<div className="col-md-12">
	      								<div className="input-modal-btn-group btn-group" role="group">
			      							{
			      								this.state.currentIndex === -1?
			      								<button className="btn btn-primary" onClick={this.addItem.bind(this)} disabled>
									        		<i className="fa fa-floppy-o"></i> Guardar
									        	</button>
									        	:
										        <button className="btn btn-primary" onClick={this.updateItem.bind(this)} disabled>
										        	<span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Editar
										        </button>	
										    }
										    {
										    	this.state.currentIndex !== -1?	
									        	<button className="btn btn-success" onClick={this.changeStatus.bind(this, true)} disabled>
													<i className="fa fa-check-square-o"></i> Activar
										        </button>
										        : null
										    }
										    {
										        this.state.currentIndex !== -1?	
										        <button className="btn btn-warning" onClick={this.changeStatus.bind(this, false)} disabled>
													<i className="fa fa-square-o"></i> Desactivar
										        </button>
										        : null
			      							}
								        	<button className="btn btn-default" onClick={this.onCancelItem.bind(this)}>
								        		<span className="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Cancelar
								        	</button>
								        </div>
	      							</div>
	      						</div>
	      						<div className="row">
	      							<div className="col-md-12">
	      								<hr style={{marginTop:0}} />
	      								<Form ref="formModal" data={data} onSubmit={this.onSubmit.bind(this)} />	
	      							</div>
	      						</div>
	      					</div>
	      				</div>		
			        </Modal.Body>
			        <Modal.Footer>
			        	<button className="btn btn-default" onClick={this.onClose.bind(this)}>Cerrar</button>
			            <button className="btn btn-primary" onClick={this.onSelectedItem.bind(this)} disabled={disabled}>
			            	Seleccionar
			            </button>
			        </Modal.Footer>
				</Modal>
				:
				null
	    	}
		</div>
		);
	}

	onOpenModal(event) {
		event.preventDefault();
		Actions.openModal(this.props.config, this);
	}

	onClose() {
		Actions.closeModal(this);
	}

	onClickItem(index, item){
		Actions.clickItemListbox(index, item, this);
	}

	onCancelItem(){
		var FormId = this.refs.formModal.getId();
		$(FormId).bootstrapValidator('resetForm', true);
		Actions.resetForm(this);
	}

	addItem(e) {
		e.preventDefault();
		var FormId = this.refs.formModal.getId();
		$(FormId).submit();
	}

	updateItem(e){
		e.preventDefault();
		var FormId = this.refs.formModal.getId();
		$(FormId).submit();
	}

	onSubmit(newItem){
		var url = this.props.config.url;
		if(this.state.currentIndex === -1) {
			newItem['EntityState'] = 1;
			Actions.addItem(url, newItem, this);
		} else {
			newItem['EntityState'] = 2;
			Actions.updateItem(url, newItem, this);
		}
	}

	changeStatus(status, e) {
		e.preventDefault();
		var url = this.props.config.url;
		var urlActivate = `${url}/Activate/${status}`;
		var item = this.state.currentItem;
		var primaryKey = this.props.config.primaryKey;
		var codigo = item[primaryKey];
		var that = this;
		
		if(!status) {
            swal({
                title: "¿Está seguro?",
                text: "Se desactivará el registro actual",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, continuar",
                closeOnConfirm: true,
                cancelButtonText: "Cancelar"
            },
            function(){
                Actions.changeStatus(urlActivate, status, codigo, that);
            });
        } else {
          	Actions.changeStatus(urlActivate, status, codigo, that);
        } 
		
	}

	onSelectedItem(){
		Actions.closeModal(this);
		React.findDOMNode(this.refs.valueInput).value = this.state.currentItem[this.props.config.display]; 
		this.props.onSelectedItem(this.state.currentItem, this.props.name);
	}

	getValue() {
		return this.state.currentItem;
	}

	setValue(objeto) {
		if(objeto != undefined && objeto != null) {
			React.findDOMNode(this.refs.valueInput).value = objeto[this.props.config.display];
			this.setState({currentItem: objeto});
		}
	}
}
