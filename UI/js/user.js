const getUser = async (id) => {
	const URL = `https://jessam.herokuapp.com/api/v1/user/${id}`;
  	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-access-token',  getCookie("fffToken"));

	try {
      const fetchResult = fetch(
      new Request(URL, { method: 'GET', headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    const user = jsonData.message;
    return user;
    } catch(e) {
		throw Error(e);
	}
}

const getUserFromToken = async() => {
  const URL = 'https://jessam.herokuapp.com/api/v1/user';
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-access-token',  getCookie("fffToken"));

  try {
      const fetchResult = fetch(
      new Request(URL, { method: 'GET', headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    const user = jsonData.message;
    return user;
    } catch(e) {
    throw Error(e);
  }
}