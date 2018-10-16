const validateForm = () => {
	const email = document.forms.signup.email.value;
	const firstname = document.forms.signup.firstname.value;
	const lastname = document.forms.signup.lastname.value;
	const password = document.forms.signup.password.value;
	const error = document.getElementById('error');
	const success = document.getElementById('success');	

	if (email !== "") {
		if (firstname !== "") {
			if (lastname !== "") {
				if (password !== "") {
					error.style.visibility = 'hidden';
					success.style.visibility = 'visible';
					success.innerHTML = 'Loading....';
					const data = { email, firstname, lastname, password };
					return data;
				} else {
					error.style.visibility = 'visible';
					error.innerHTML = 'Password cannot be empty';
					return false;
				}
			}  else {
					error.style.visibility = 'visible';
					error.innerHTML = 'Lastname cannot be empty';
					return false;
				}
		}  else {
					error.style.visibility = 'visible';
					error.innerHTML = 'Firstname cannot be empty';
					return false
				}
	}  else {
					error.style.visibility = 'visible';
					error.innerHTML = 'Email cannot be empty';
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
	alert('cookie has been set');
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
			console.log(j.substring(name.length, j.length));
			return j.substring(name.length, j.length);
		}
	}
	return "";
}
const checkCookie = (cookieName) => {
	if(getCookie(cookieName) !== '') {
		alert(getCookie(cookieName));
	} else alert('No cookies');
}

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
    console.log(jsonData);
    if(jsonData.status === 'success') {
    	clearFormData();
    	setCookie('fffToken', jsonData.token, 30);
    	success.style.visibility = 'visible';
		success.innerHTML = jsonData.message;
		checkCookie('fffToken');
//		window.location.replace("order_food.html");
    } else {
    	success.style.visibility = 'hidden';
    	error.style.visibility = 'visible';
		error.innerHTML = jsonData.message;
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
