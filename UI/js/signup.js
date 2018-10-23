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

const validateForm = () => {
	const email = document.forms.signup.email.value;
	const firstname = document.forms.signup.firstname.value;
	const lastname = document.forms.signup.lastname.value;
	const password = document.forms.signup.password.value;

	if (email !== "") {
		if (firstname !== "") {
			if (lastname !== "") {
				if (password !== "") {
					hideMessages();
					showSuccess("Loading.....");
					const data = { email, firstname, lastname, password };
					return data;
				} else {
					showError("Password cannot be empty");
					return false;
				}
			}  else {
					showError('Lastname cannot be empty');
					return false;
				}
		}  else {
					showError('Firstname cannot be empty');
					return false
				}
	}  else {
					showError('Email cannot be empty');
					return false;
				}
}

const clearFormData = () => {
	const email = document.forms.signup.email.value = '';
	const firstname = document.forms.signup.firstname.value = '';
	const lastname = document.forms.signup.lastname.value = '';
	const password = document.forms.signup.password.value = '';
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

const postData = async (details) => {
  const error = document.getElementById('error');
  const success = document.getElementById('success');	

  const URL = 'https://jessam.herokuapp.com/api/v1/auth/signup';
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
  } catch(e){
    throw Error(e);
  }
}

document.getElementById("submit").addEventListener("click", (event) => {
	event.preventDefault();
	if(validateForm()) {
		postData(validateForm());
	}
})
