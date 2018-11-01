const menu = (foodName, callback) => {
    getMenu().then((result) => {
        result.map((food) => {
            if(food.food === foodName) {
                callback(food.quantifier);
            }
        });
    });
};

const user = (callback) => {
    getUserFromToken().then((result) => {
        callback(result);
    });
};

const getOrders = async (userId) => {
	const URL = `https://jessam.herokuapp.com/api/v1/users/${userId}/orders`;
    let orderGroup = document.getElementById('orderGroup');
    let orderCount = document.getElementById('orderCount');

  	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-access-token',  getCookie("fffToken"));

	try {
      const fetchResult = fetch(
      new Request(URL, { method: 'GET', headers: headers })
    );
    
    const response = await fetchResult;
    const jsonData = await response.json();

    const orders = jsonData.message;
    console.log(orders);
    
    orderCount.innerHTML = `${orders.length} total orders`;

    // loop through every order
    orders.map((order) => {
        const orderItems = JSON.parse(order.order_items);
        const amount = order.amount;
        const userId = order.user_id;
        const id = order.id;

        const fieldset = createNode('fieldset');
        const legend = createNode('legend');

        // Set name and insert into legend tag
            legend.innerHTML = `${order.time} - (&#8358;${amount})`;

        append(fieldset, legend);

        // loop through all order items and add them to html page
        Object.entries(orderItems).forEach(
            ([key, value]) => {
                let foodItem = createNode('div');
                let quantity = createNode('span');
                let foodName = createNode('div');
                  
                foodItem.id = key;
                foodItem.className = 'food-item';
                foodName.className = 'food-name';
                foodName.innerHTML = key;
                quantity.className = 'quantity';

                // Pluralize quantifier if food item is greater than one
                menu(key, (result) => {
                    let quantifier = (value > 1)?`${value} ${result}s`:`${value} ${result}`;
                    quantity.innerHTML = quantifier;
                })
                append(foodItem, foodName);
                append(foodItem, quantity);
                append(fieldset, foodItem);
            }); 

            const orderStatus = createNode('button');

            if (order.status === 'new') {
                orderStatus.className = 'new-order';
                orderStatus.innerHTML = 'New order';
            } else if (order.status === 'complete') {
                orderStatus.className = 'accept-complete';
                orderStatus.innerHTML = "This order has been completed";
            } else if (order.status === 'cancelled') {
                orderStatus.className = 'declined-order';
                orderStatus.innerHTML = "This order was declined";
            }
            append(fieldset, orderStatus);
                append(orderGroup, fieldset);
        });
    } catch(e) {
		throw Error(e);
	}
}
user(result => {
    const username = document.getElementById('username');
    username.innerHTML = `${result.firstname} ${result.lastname}`;
    getOrders(result.id);
})
