import Api from '../../../services/Api';
import toastr from 'toastr';

var InputControlActions  =  {
	openModal: function(config, contexto) {
		console.log('config', config, 'contexto', contexto)
		contexto.setState({loading: true, currentItem:{}, currentIndex: -1});	
		Api.get(config.urlGET)
			.then((response) => {
				var data;
				if(response.hasOwnProperty('values') ){
					data = response.values;
				} else {
					if(response.hasOwnProperty('value')) {
						data = response.value;
					} else {
						data = response;
					}
				}
				contexto.setState({loading: false, data: data, showModal: true});
			})
			.catch((err) => {
				toastr.error(this.err, 'Se ha encontrado un problema');
				contexto.setState({loading: false});	
			});
	},
	closeModal: function(contexto) {
		contexto.setState({showModal: false, loading: false, data: []});
	},
	clickItemListbox: function(index, item, contexto) {
		contexto.setState({currentItem: item, currentIndex: index});
	},
	addItem: function(url, newItem, contexto) {
		let data = [];
		data.push(newItem);

		Api.post(url, JSON.stringify(data))
			.then((response) => {
				var newData = contexto.state.data;
				newData.unshift(response[0]);
				contexto.setState({data: newData});
				toastr.success('Se guardaron los datos correctamente', '¡Guardado!');
			})
			.catch((err) => {
				toastr.error(this.err, 'Se ha encontrado un problema');
			});	
	},
	updateItem: function(url, newItem, contexto) {
		let data = [];
		data.push(newItem);

		Api.put(url, JSON.stringify(data))
			.then((response) => {
				let datos = contexto.state.data;
				datos.splice(contexto.currentIndex, 1);
				datos.unshift(response[0]);
				var newCurrentIndex = contexto.state.currentIndex = -1;
				var newCurrentItem = contexto.state.currentItem = {};
				contexto.setState({data: datos, currentIndex:newCurrentIndex, currentItem: newCurrentItem });

				toastr.success('Se actualizaron los datos correctamente', '¡Actualizado!');
			})
			.catch((err) => {
				toastr.error(this.err, 'Se ha encontrado un problema');
			});
	},
	changeStatus: function(url, status, id, contexto) {
		let data = [];
		data.push(id);
		status = JSON.parse(status);

		Api.put(url, JSON.stringify(data))
			.then((response) => {
				var item = contexto.state.currentItem;
				var newDatos = contexto.state.data;
				if(response.ids.length > 0) {
					item.Activo = status;
					newDatos.splice(contexto.state.currentIndex, 1);
					newDatos.unshift(item);
					toastr.success(response.message, '¡Operación existosa!');
				} else {
					toastr.warning('No se puede desactivar el registro seleccionado', '¡Avertencia!');
				}
				contexto.setState({data:newDatos, currentIndex: -1, currentItem: {} });
			})
			.catch((err) => {
				toastr.error(this.err, 'Se ha encontrado un problema');
			}); 
	},
	resetForm: function(contexto) {
		contexto.setState({currentIndex:-1, currentItem: {}});
	}

};
	
export default InputControlActions;
