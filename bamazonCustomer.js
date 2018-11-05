const mysql = require("mysql");
const chalk = require("chalk");
const inquirer = require("inquirer");
const Table = require("cli-table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome, you are ONLINE");
    // Function to run
    customerView();

});

function customerView() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(chalk.white("-----------------------------------------"));
            console.log(chalk.black.blue.bold("Item ID:") + "       " + chalk.yellow(res[i].item_id));
            console.log(chalk.black.blue.bold("Item Name:") + "     " + chalk.yellow(res[i].product_name));
            console.log(chalk.black.blue.bold("Item Price:") + "    " + chalk.yellow(res[i].price + " USD"));
            // console.log(chalk.black.blue.bold("Qty available:") + " " + chalk.yellow(res[i].stock_quantity));
            console.log(chalk.white("_________________________________________"));
        }
        userInput();
    });
}


let customerInterest = [
    {
        type: "input",
        message: "Please type the Item ID of the product you want to aquire...",
        name: "productIDWanted"
    },

    {
        type: "input",
        message: "How many items do you want to buy?",
        name: "qtyWanted"
    }
]


function userInput() {
    customerInterest = [
        {
            type: "input",
            message: "Please type the Item ID of the product you want to aquire...",
            name: "productIDWanted"
        },
    
        {
            type: "input",
            message: "How many items do you want to buy?",
            name: "qtyWanted"
        }
    ]
    
    inquirer.prompt(customerInterest).then(function (answer) {
        
        customerInterest[0].name = answer.productIDWanted;
        customerInterest[1].name = answer.qtyWanted;

        stockCheck();

    });

}

function stockCheck() {
    // console.log("***********************");
    // console.log(customerInterest[0].name);
    // console.log(customerInterest[1].name);

    buyItem();
}

// Looking at the SQL database for infoamtion
function buyItem() {

    connection.query("SELECT item_id, product_name, department_name, price,stock_quantity FROM products WHERE item_id = ?",
        [
            customerInterest[0].name
        ],
        function (err, res) {
            if (err) throw err;
            // console.log(res[0].item_id);
            console.log("");
            console.log(res[0].product_name);
            // console.log(res[0].department_name);
            console.log(res[0].price + "USD");
            // console.log(res[0].stock_quantity);
            console.log("");

            if (customerInterest[1].name > res[0].stock_quantity) {
                console.log("");
                console.log("Not enough items in stock");
                console.log("We are sorry, we do not have enough " + res[0].product_name + " in stock for you order");
                console.log("Our current stock is " + res[0].stock_quantity + " please choose a smaller quantity");
                console.log("or contact customer service for wholesale pricing and ordering.");
                console.log("Thank you from Bamazon ;P");
                console.log("");
                // customerView();

            }
            else {

                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: res[0].stock_quantity - customerInterest[1].name
                        },
                        {
                            item_id: customerInterest[0].name
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("Transaction Finalized");
                        console.log("")
                        console.log("Order Total: " + (customerInterest[1].name*res[0].price) + "USD");
                        console.log("")
                        console.log("Thank you for your purchase");
                        console.log("Bamazon.com");
                        console.log("");
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "userAction",
                                message: "Do you want to continue purchasing products?",
                                choices: ["YES", "NO"]
                            }
                        ]).then(answers => {
                            // console.log(typeof(answers.userAction));
                            // console.log(answers.userAction);
                            // console.log(answers);
                            if (answers.userAction === 'NO') {
                                    console.log("Thank you for visiting");
                                    console.log("Bamazon.com");
                                    connection.end();
                            } else {
                                console.log("You are ONLINE");
                                customerView();
                            }
                        });
                    }
                );
            }
        });
}


