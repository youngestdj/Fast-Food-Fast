const getMenu = async () => {
	const URL = 'https://jessam.herokuapp.com/api/v1/menu';
  	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-access-token',  getCookie("fffToken"));

	try {
      const fetchResult = fetch(
      new Request(URL, { method: 'GET', headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    const foods = jsonData.message;
    return foods;
    } catch(e) {
		throw Error(e);
	}
}