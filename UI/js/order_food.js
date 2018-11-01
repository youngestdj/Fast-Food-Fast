const menu = getMenu();

const user = (callback) => {
    getUserFromToken().then((result) => {
        callback(result);
    });
};


const displayMenu = async () => {
	let orderGroup = document.getElementById('order-group');
	orderGroup.innerHTML = "Getting menu...";

   	menu.then((foods) => {
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
		orderGroup.innerHTML = "Getting menu...";

    });
   	});
}

displayMenu();

const getOrderEl = (callback) => {
	const x = document.querySelectorAll('.order-group .food-item input');
	let totalAmount = 0;
	let orderItemsObj= {};
	let orderObj= {};

	menu.then((foods) => {
		for(let i = 0; i < x.length; i++) {
			if (x[i].checked) {
				const quantity = x[i + 1].value;
				const id = x[i].id - 1;
				let amount = foods[id].price;
				let foodName = foods[id].food;
				amount = amount * quantity;
				totalAmount += amount;
				orderItemsObj[foodName] = quantity;
				showSuccess(`Your total order is &#8358;${totalAmount}`);
			}
		}
		if(totalAmount > 0) {
			orderObj['orderItems'] = orderItemsObj;
			orderObj['amount'] = totalAmount;
			callback(orderObj);
		}
	});
}

const validateOrder = () => {
	const x = document.querySelectorAll('.order-group .food-item input');
	let checkedRows = 0;
	for(let i = 0; i < x.length; i++) {
		if (x[i].checked) {
			checkedRows += 1;
			x[i].parentElement.classList.remove("error");
			if(x[i + 1].value === '') {
				x[i].parentElement.classList.add("error");
				showError("You cannot place order without specifying quantity");
				return false;
			}
		}
	}
	if(checkedRows === 0) {
		showError("You have to order something!");
		return false;
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
	headers.append('x-access-token',  getCookie("fffToken"));

	try {
	    const fetchResult = fetch(
	      new Request(URL, { method: 'POST', cache: 'reload', body: data, headers: headers })
	    );
	    
	    const response = await fetchResult;
	    const jsonData = await response.json();
	    
	    if(jsonData.status === 'success') {
	    	showSuccess(jsonData.message);
	    	return true;
	    } else {
	    	showError(jsonData.message);
	    	return false;
	    }
		} catch(e) {
			throw Error(e);
		}
}

document.getElementById('checkout').addEventListener("click", (e) => {
	e.preventDefault ? e.preventDefault() : (evenet.returnValue = false);
	hideMessages();
	if (validateOrder()) {
		let order = getOrderEl((result) => {
			if(postOrder(result)) {
				displayMenu();
				hideMessages();
			} else showError("Something went wrong");
		});	
	}
});
user(result => {
    const username = document.getElementById('username');
    username.innerHTML = `${result.firstname} ${result.lastname}`;
})
