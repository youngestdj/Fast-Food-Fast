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

let tObj = {};

const getMenu = async () => {
	const URL = 'https://jessam.herokuapp.com/api/v1/menu';
	let orderGroup = document.getElementById('order-group');
	orderGroup.innerHTML = "Getting menu...";

  	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-access-token', getCookie(fffToken));

	try {
      const fetchResult = fetch(
      new Request(URL, { method: 'GET', headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();
   	orderGroup.innerHTML = "";
    console.log(jsonData);

    const foods = jsonData.message;
    tObj = jsonData.message;
    foods.map((food) => {
    	let foodItem = food.food;
    	let price = food.price;
    	let foodId = food.id;

    	let foodItemHtml = createNode('div');
    	let checkboxHtml = createNode('input');
    	let foodNameHtml = createNode('div');
    	let amountHtml = createNode('span');
    	let quantityHtml = createNode('input');

    	foodItemHtml.className = 'food-item';
    	checkboxHtml.type = 'checkbox';
    	checkboxHtml.name = foodItem;
    	checkboxHtml.id = foodId;
    	foodNameHtml.className = 'food-name';
    	foodNameHtml.innerHTML = foodItem;
    	amountHtml.className = 'amount';
    	amountHtml.innerHTML = `&#8358;${price}`;
    	quantityHtml.type = 'number';
    	quantityHtml.placeholder = 'quantity';


    	let span = createNode('span');
    	span.innerHTML = food.food;
    	append(foodItemHtml, checkboxHtml);
    	append(foodItemHtml, foodNameHtml);
    	append(foodItemHtml, amountHtml);
    	append(foodItemHtml, quantityHtml);
    	append(orderGroup, foodItemHtml);

    });
    } catch(e) {
		throw Error(e);
	}
}

getMenu();


const getOrderEl = () => {
	const x = document.querySelectorAll('.order-group .food-item input');
	let totalAmount = 0;
	let orderItemsObj= {};
	let orderObj= {};
	for(let i = 0; i < x.length; i++) {
		if (x[i].checked) {
			const quantity = x[i + 1].value;
			const id = x[i].id - 1;
			let amount = tObj[id].price;
			let foodName = tObj[id].food;
			amount = amount * quantity;
			totalAmount += amount;
			orderItemsObj[foodName] = quantity;
			showSuccess(`Your total order is &#8358;${totalAmount}`);
		}
	}

	if(totalAmount > 0) {
		orderObj['orderItems'] = orderItemsObj;
		orderObj['amount'] = totalAmount;
		return orderObj;
	}
}

const validateOrder = () => {
	const x = document.querySelectorAll('.order-group .food-item input');
	for(let i = 0; i < x.length; i++) {
		if (x[i].checked) {
			x[i].parentElement.classList.remove("error");
			if(x[i + 1].value === '') {
				x[i].parentElement.classList.add("error");
				showError("You cannot place order without specifying quantity");
				return false;
			}
		}
	}
	return true;
}

const postOrder = async (order) => {

	const URL = 'https://jessam.herokuapp.com/api/v1/orders';
	let data = JSON.stringify(order);
	let orderGroup = document.getElementById('order-group');
	orderGroup.innerHTML = "Placing order...";


	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-access-token', getCookie(fffToken));

	try {
	    const fetchResult = fetch(
	      new Request(URL, { method: 'POST', cache: 'reload', body: data, headers: headers })
	    );
	    
	    const response = await fetchResult;
	    const jsonData = await response.json();
	    console.log(jsonData);
	    
	    if(jsonData.status === 'success') {
	    	showSuccess(jsonData.message);
	    } else showError(jsonData.message);
		} catch(e) {
			throw Error(e);
		}
}

document.getElementById('checkout').addEventListener("click", (e) => {
		e.preventDefault();
		hideMessages();
		if (validateOrder()) {
			if(postOrder(getOrderEl())) {
				getMenu();
			}
		}
})

