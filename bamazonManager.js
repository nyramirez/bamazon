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
    managerView();

});

let managerOption = {
    type: "list",
    name: "managerAction",
    message: "Please use the arrows to selects and option from below:",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
}

function managerView() {
    managerOption = {
        type: "list",
        name: "managerAction",
        message: "Please use the arrows to selects and option from below:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
    inquirer.prompt(managerOption).then(answers => {

        switch (answers.managerAction) {
            case "View Products for Sale":
                // console.log(answers.managerAction);
                option1();

            case "View Low Inventory":
                // console.log(answers.managerAction);
                option2();

            case "Add to Inventory":
                // console.log(answers.managerAction);
                option3();

            case "Add New Product":
                // console.log(answers.managerAction);
                option4();

            default:
                console.log("nada jalo");
        }
    });

}

function option1() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(chalk.white("-----------------------------------------"));
            console.log(chalk.black.blue.bold("Item ID:") + "       " + chalk.yellow(res[i].item_id));
            console.log(chalk.black.blue.bold("Item Name:") + "     " + chalk.yellow(res[i].product_name));
            console.log(chalk.black.blue.bold("Item Price:") + "    " + chalk.yellow(res[i].price + " USD"));
            console.log(chalk.black.blue.bold("Qty available:") + " " + chalk.yellow(res[i].stock_quantity));
            console.log(chalk.white("_________________________________________"));
        }
        inquirer.prompt([
            {
                type: "list",
                name: "managerAction",
                message: "Do you want to EXIT?",
                choices: ["YES", "NO"]
            }
        ]).then(answers => {
            if (answers.managerAction === 'YES') {
                console.log("Thank you for working with us");
                console.log("Bamazon.com");
                connection.end();
            } else {
                console.log("You are ONLINE");
                managerView();
            }
        });
    });
}

function option2() {
    connection.query("SELECT item_id, product_name, department_name, price,stock_quantity FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log(chalk.white("-----------------------------------------"));
            console.log(chalk.black.blue.bold("Item ID:") + "       " + chalk.yellow(res[i].item_id));
            console.log(chalk.black.blue.bold("Item Name:") + "     " + chalk.yellow(res[i].product_name));
            console.log(chalk.black.blue.bold("Item Price:") + "    " + chalk.yellow(res[i].price + " USD"));
            console.log(chalk.black.blue.bold("Qty available:") + " " + chalk.yellow(res[i].stock_quantity));
            console.log(chalk.white("_________________________________________"));
        }

        inquirer.prompt([
            {
                type: "list",
                name: "managerAction",
                message: "Do you want to EXIT?",
                choices: ["YES", "NO"]
            }
        ]).then(answers => {
            if (answers.managerAction === 'YES') {
                console.log("Thank you for working with us");
                console.log("Bamazon.com");
                connection.end();
            } else {
                console.log("You are ONLINE");
                managerView();
            }
        });
    });
}

function option3() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let productIds = [];
        for (var i = 0; i < res.length; i++) {
            console.log(chalk.white("-----------------------------------------"));
            console.log(chalk.black.blue.bold("Item ID:") + "       " + chalk.yellow(res[i].item_id));
            productIds.push((res[i].item_id).toString());
            console.log(chalk.black.blue.bold("Item Name:") + "     " + chalk.yellow(res[i].product_name));
            console.log(chalk.black.blue.bold("Item Price:") + "    " + chalk.yellow(res[i].price + " USD"));
            console.log(chalk.black.blue.bold("Qty available:") + " " + chalk.yellow(res[i].stock_quantity));
            console.log(chalk.white("_________________________________________"));
        }

        // console.log(productIds);


        inquirer.prompt([
            {
                type: "list",
                name: "productOption",
                message: "What product do you want to update?",
                choices: productIds
            },
            {
                type: "input",
                name: "qtyChange",
                message: "What is the new quantity"
            }
        ]).then(answers => {
            console.log(answers.productOption);
            console.log(answers.qtyChange);

            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: answers.qtyChange
                    },
                    {
                        item_id: answers.productOption
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("Transaction Finalized");
                    console.log("")
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "managerAction",
                            message: "Do you want to EXIT?",
                            choices: ["YES", "NO"]
                        }
                    ]).then(answers => {
                        if (answers.managerAction === 'YES') {
                            console.log("Thank you for working with us");
                            console.log("Bamazon.com");
                            connection.end();
                        } else {
                            console.log("You are ONLINE");
                            managerView();
                        }
                    });
                });
        });
    }
    )
}

function option4() {

    inquirer.prompt([
        {
            type: "input",
            name: "newName",
            message: "What is the name of the item you want to add?"
        },
        {
            type: "input",
            name: "newDept",
            message: "Part of what department is this item?"
        },
        {
            type: "input",
            name: "newPrice",
            message: "What is the price to the public?"
        },
        {
            type: "input",
            name: "newStockQty",
            message: "How many items are we adding to stock?"
        }
    ]).then(answers => {
        // console.log(answers.newName);
        // console.log(answers.newDept);
        // console.log(answers.newPrice);
        // console.log(answers.newStockQty);

        connection.query("INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES (?, ?, ?, ?)",
                [
                    {
                        product_name: answers.newName
                    },
                    {
                        department_name: answers.newDept
                    },
                    {
                        price: answers.newPrice
                    },
                    {
                        stock_quantity: answers.newStockQty
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("Transaction Finalized");
                    console.log("")
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "managerAction",
                            message: "Do you want to EXIT?",
                            choices: ["YES", "NO"]
                        }
                    ]).then(answers => {
                        if (answers.managerAction === 'YES') {
                            console.log("Thank you for working with us");
                            console.log("Bamazon.com");
                            connection.end();
                        } else {
                            console.log("You are ONLINE");
                            managerView();
                        }
                    });
                });

    });
}