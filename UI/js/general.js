const createNode = (element) => {
    return document.createElement(element);
}

const append = (parent, el) => {
    return parent.appendChild(el);
}

const showSuccess = (message) => {
	const success = document.getElementById('success');
	success.style.visibility = 'visible';
	success.innerHTML = message;
}

const hideMessages = () => {
	const success = document.getElementById('success');
	const error = document.getElementById('error');
	error.style.visibility = 'hidden';
	success.style.visibility = 'hidden';	
}

const showError = (message) => {
	const error = document.getElementById('error');
	error.style.visibility = 'visible';
	error.innerHTML = message;
}