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

if(!checkCookie('fffToken')) window.location.replace("login.html");
