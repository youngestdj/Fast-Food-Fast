const menu = (foodName, callback) => {
    getMenu().then((result) => {
        result.map((food) => {
            if(food.food === foodName) {
                callback(food.quantifier);
            }
        });
    });
};

const user = (id, callback) => {
    getUser(id).then((result) => {
        callback(result);
    });
};

const getOrders = async () => {
	const URL = 'https://jessam.herokuapp.com/api/v1/orders';
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


    if(jsonData.status === 'success') {
        const orders = jsonData.message;
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
            user(userId, (result) => {
                legend.innerHTML = `${result.firstname} ${result.lastname} (&#8358;${amount}) - ${order.time}`;
            });
    
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
                const accept = createNode('button');
                const decline = createNode('button');
    
                if (order.status === 'new') {
                    accept.type = 'button';
                    accept.innerHTML = 'Accept order';
                    accept.id = `accept_${id}`;
                    accept.className = 'accept';
                    decline.id = `decline_${id}`;
                    decline.className = 'decline';
                    decline.href = '#';
                    decline.innerHTML = 'Decline order';
        
                    append(fieldset, accept);
                    append(fieldset, decline);
                    append(orderGroup, fieldset);
                } else if (order.status === 'complete') {
                    const orderStatus = createNode('div');
                    orderStatus.innerHTML = "This order has been completed";
    
                    append(fieldset, orderStatus);
                    append(orderGroup, fieldset);
                } else if (order.status === 'cancelled') {
                    const orderStatus = createNode('div');
                    orderStatus.innerHTML = "This order was declined";
    
                    append(fieldset, orderStatus);
                    append(orderGroup, fieldset);
                }
            });
        
        // load script to accept/reject orders
        let tag = document.createElement("script");
        tag.src = "js/accept_order.js";
        document.getElementsByTagName("body")[0].appendChild(tag);
    } else showError(jsonData.status);  
} catch(e) {
		throw Error(e);
	}
}
getOrders();