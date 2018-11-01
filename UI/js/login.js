const validateForm = () => {
	const email = document.forms.login.email.value;
	const password = document.forms.login.password.value;
	if (email !== "") {
		if (password !== "") {
			hideMessages();
			showSuccess('Loading....');
			const data = { email, password };
			return data;
		} else {
			showError('Password cannot be empty');
			return false;
		}
	} else {
		showError('Email cannot be empty');
		return false;
	}
}

const clearFormData = () => {
	const email = document.forms.login.email.value = '';
	const password = document.forms.login.password.value = '';
}

const setCookie = (name, value, days) => {
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value}; ${expires}; path=/`;
}

const getCookie = (cookieName) => {
	const name = cookieName + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArr = decodedCookie.split(';');
	for(let i = 0; i < cookieArr.length; i++) {
		let j = cookieArr[i];
		while (j.charAt(0) === ' ') {
			j = cookieArr.substring(1);
		}
		if (j.indexOf(name) === 0) {
			return j.substring(name.length, j.length);
		}
	}
	return "";
}
const checkCookie = (cookieName) => {
	if(getCookie(cookieName) !== '') {
		return true;
	} else return false;
}

if(checkCookie('fffToken')) window.location.replace("order_food.html");

const postLogin = async (details) => {
	const URL = 'https://jessam.herokuapp.com/api/v1/auth/login';
  	let data = JSON.stringify(details);

  	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	try {
      const fetchResult = fetch(
      new Request(URL, { method: 'POST', cache: 'reload', body: data, headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();
    
    if(jsonData.status === 'success') {
    	clearFormData();
    	setCookie('fffToken', jsonData.token, 30);
    	showSuccess(jsonData.message);
		window.location.replace("order_food.html");
    } else {
    	hideMessages();
    	showError(jsonData.message);
      }
	} catch(e) {
		throw Error(e);
	}
}

document.getElementById("submit").addEventListener("click", (event) => {
	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	if(validateForm()) {
		postLogin(validateForm());
	}
})
