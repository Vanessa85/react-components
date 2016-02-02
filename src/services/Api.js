import request from 'superagent';

const API_URL = 'http://jsonplaceholder.typicode.com';

var Api = {
	get: function(url, data = null, urlComplete = false) {
		var newURL = (urlComplete)? url : `${API_URL}/${url}`;

		var promise = new Promise(function(resolve, reject) {
			request
				.get(newURL)
				.set('Accept', 'application/json')
				.query(data)
				.end(function(error, response) {
					if(response !== undefined) {
						var body = response.body;
						if(response.ok) {
							resolve(response.body);
						} else if(response.body != null) {
							reject(getErrorMessage(response.body));	
						} else {
							reject(getErrorMessage(response.error.toString()));	
						}
					} else {
						reject(error.toString());	
					}
				});
			});

		return promise;
	},
	post: function(url, data = null) {
		var promise = new Promise(function(resolve, reject) {
			request
				.post(`${API_URL}/${url}`)
				.set('Content-Type', 'application/json')
				.send(data)
				.end(function(error, response) {
					if(response !== undefined) {
						var body = response.body;
						if(response.ok) {
							resolve(response.body);
						} else if(response.body != null) { 
							reject(getErrorMessage(response.body));	
						} else {
							reject(getErrorMessage(response.error.toString()));	
						}
					} else {
						reject(error.toString());	
					}

				});
			});

		return promise;
	},
	put: function(url, data) {
		const TOKEN = LoginStore.getToken();

		var promise = new Promise(function(resolve, reject) {
			request
				.put(`${API_URL}/${url}`)
				.set('Content-Type', 'application/json')
				.send(data)
				.end(function(error, response) {
					if(response !== undefined) {
						var body = response.body;
						if(response.ok) {
							resolve(response.body);
						} else if(response.body != null) {
							reject(getErrorMessage(response.body));
						} else {
							reject(getErrorMessage(response.error.toString()));	
						}
					} else {
						reject(error.toString());	
					}

				});
			});

		return promise;
	}
}

var getErrorMessage = function(errorMessage) {
	var error = "";
	if(errorMessage != null) {
		if(typeof errorMessage == 'string') {
			error = errorMessage;
		} else if(errorMessage.hasOwnProperty('error')) {
			error = errorMessage.error.message;
		} else if(errorMessage.hasOwnProperty('ExceptionMessage')) {
			error = errorMessage.ExceptionMessage;
		} else if(errorMessage.hasOwnProperty('Message')) {
			error = errorMessage.Message;
		} else {
			error = JSON.stringify(errorMessage);
		}	
	}
	
	return error;
};


export default Api;