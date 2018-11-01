const completeOrder = async (id, status) => {
	const URL = `https://jessam.herokuapp.com/api/v1/orders/${id}`;
  	let data = JSON.stringify({status: status});

  	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-access-token', getCookie("fffToken"));

	try {
      const fetchResult = fetch(
      new Request(URL, { method: 'PUT', cache: 'reload', body: data, headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();
    
    if(jsonData.status === 'success') {
    	(status === 'complete')?showComplete(id) : showDecline(id);
    	showSuccess(jsonData.message);
    } else {
       	showError(jsonData.message);
      }
	} catch(e) {
		throw Error(e);
	}
}

const showComplete = (id) => {
	let declineId = `decline_${id}`;
	let decline = document.getElementById(declineId);
	decline.style.display = 'none';

	acceptId = `accept_${id}`;
	let accept = document.getElementById(acceptId);
	accept.disabled = true;
	accept.classList.add('accept-complete');
	accept.innerHTML = 'Order complete';
}

const showDecline = (id) => {
	let acceptId = `accept_${id}`;
	let accept = document.getElementById(acceptId);
	accept.style.display = 'none';

	declineId = `decline_${id}`;
	let decline = document.getElementById(declineId);
	decline.disabled = true;
	decline.classList.add('decline-complete');
	decline.innerHTML = 'Order declined';
}

let z = document.querySelectorAll('button.accept');
for(let i = 0; i < z.length; i++) {
	z[i].addEventListener('click', (e) => {
		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		id = z[i].id;
		realId = id.substr(7);
		completeOrder(realId, 'complete');
	});
}

let y = document.querySelectorAll('button.decline');
for(let i = 0; i < y.length; i++) {
	y[i].addEventListener('click', (e) => {
	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		id = y[i].id;
		realId = id.substr(8);
		completeOrder(realId, 'cancelled');
	});
}