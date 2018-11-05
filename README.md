# bamazon

Bamazon is a simulation of an online store. There are two windows for this program:
* Customer View
* Manager View

## Customer View
1. On terminal, run the command *node bamazonCustomer.js*

2. A list of the items available to purchase will display.
    1. Each *Item information* has in display, Item ID, Item name and Item cost.

3. Bamazon will prompt for the **Item ID** of the product you want to purchase.
4. Type the *Item ID* and click **ENTER**.

5. Bamazon will then prompt for the *number of items that the customer want*, please enter the desired number and press **ENTER**.
    1. If the transaction was succesull, Bamazon will display the product you purchased, the total amount of money charged to your account and confirm that the transaction is Finalized.

    ![Transaction Finalazid successfully by Bamazon](https://github.com/nyramirez/bamazon/blob/master/assets/pictures/Bamazon%20Successful%20Purchase.png)
    
    2. If transaction was not successful, (meaning there were not enough products in stock), Bamazon will display, Bamazon will display the item you were interested on followed by the reason why the transaction was not successful.

    ![Transaction NOT Successful by Bamazon](https://github.com/nyramirez/bamazon/blob/master/assets/pictures/Transaction%20NOT%20Successful.png)

6. After the above transactions, Bamazon will ask you if you would like to continue shopping or leave the site.

7. We hope you have a good experience, tahnk you for visiting Bamazon.

## Manager View
1. On terminal, run the command *node bamazonManager.js*

2. A list of available option will be display:

![List of options for Manager entry](https://github.com/nyramirez/bamazon/blob/master/assets/pictures/Manager%20Options.png)

###View Products for Sale
After selecting this option, press **ENTER**.

This option will display a list of the items in Inventory by ID, Name, Price to public and Qty in stock.

![List of options for Manager entry](https://github.com/nyramirez/bamazon/blob/master/assets/pictures/Option1%20view.png)

###View Low Inventory
After selecting this option, press **ENTER**.

This option will display a list of the items in Inventory with quantities in stock lower than 5 items.

![View for low quantity in Inventory for Manager entry](https://github.com/nyramirez/bamazon/blob/master/assets/pictures/Low%20Inventory%20View.png)

###Add to Inventory
After selecting this option, press **ENTER**.

1. A list of the current inventory items will display on screen.

2. Bamazon will prompt for the **Item ID** of the product you want to update.

![View for low quantity in Inventory for Manager entry](https://github.com/nyramirez/bamazon/blob/master/assets/pictures/Update%20Stock.png)

3. Choose the **Item ID** and input the new quantity to appear on Inventory. Press **ENTER**.

4. Bamazon will display a message if the transaction was succesful.

###Add New Product
After selecting this option, press **ENTER**.

1. Bamazon will prompt four questions:
    1. **What is the name of the item you want to add?** => *Input the name of the product*
    
    2. **Part of what department is this item?** => *Input the department where the product will be placed*

    3. **What is the price to the public?** => *Input the price to customers*

    4.**How many items are we adding to stock?** => *Number of items Bamazon has in stock*

2. Bamazon will add your entry to the database ans assign a new Item ID for each item.

![New Item for Manager entry](https://github.com/nyramirez/bamazon/blob/master/assets/pictures/New%20Item.png)