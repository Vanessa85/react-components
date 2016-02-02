import React from 'react';

export default class FormDemo extends React.Component {

  componentDidMount() {
  		var self = this;
  		$('#FormModeloCamara').bootstrapValidator({
			excluded: ':disabled :hidden',
	        fields: {
            	title: {
                	validators: {
                    	notEmpty: {
                        	message: 'Este campo es obligatorio'
                    	}
                	}
           		},
           		body: {
                	validators: {
                    	notEmpty: {
                        	message: 'Este campo es obligatorio'
                    	}
                	}
           		}
            }	

		})
		.on('success.form.bv', function(e) {
			e.preventDefault();
			self.handleSubmit();
			$(e.target).bootstrapValidator('resetForm', true);
		});

  	this.onLoadData();
  }

  componentDidUpdate(prevProps, prevState) {
  	this.onLoadData();	
  }

  render() {

    return (
      <form id="formPost">
      	<input type="hidden" ref="postId" name="postId" />
      	<input type="hidden" ref="usuarioId" name="usuarioId" />
	  	<div className="form-group">
	    	<label for="title">Title</label>
	    	<input type="text" ref="title" className="form-control" id="title" placeholder="Title" />
	  	</div>
	  	<div className="form-group">
	    	<label for="body">Body</label>
	    	<textarea ref="body" id="body" className="form-control"></textarea>
	  	</div>
	  </form>
    );
  }

  handleSubmit(){

  }

  onLoadData(){
  	var data = this.props.data;
  	if(Object.keys(data).length > 0) {
  		React.findDOMNode(this.refs.postId).value = data.id;
  		React.findDOMNode(this.refs.usuarioId).value = data.userId;
  		React.findDOMNode(this.refs.title).value = data.title;
  		React.findDOMNode(this.refs.body).value = data.body;
  	} else {
  		React.findDOMNode(this.refs.postId).value = '';
  		React.findDOMNode(this.refs.usuarioId).value = '';
  		React.findDOMNode(this.refs.title).value = '';
  		React.findDOMNode(this.refs.body).value = '';
  	}
  }

  getId() {
  	return '#formPost';
  }
}
