const getMenu = async () => {
	const url = 'http://jessam.herokuapp.com/api/v1/menu';
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTM5MTE0NTMzLCJleHAiOjg3OTM5MTE0NTMzfQ.yxltqK_niLpQgTCgeQLgWb9NHCB1DuiTZhE29mGd6j4');
	try {
		const fetchResult = fetch(
			new Request(url, {
				method: 'GET',
				headers: headers
			}));
		const response = await fetchResult;
		const jsonResponse = await response.json();
		console.log(jsonResponse);
	} catch(e) {
		throw Error(e);
	}
}
getMenu();