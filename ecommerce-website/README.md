# User guide for shopify (an ecommerce platform)


You also need to install the Google Authenticator App on mobile from the play store. The steps can be found in this manual :- https://www.thecloudtutorial.com/create-user-manual-for-web-application/

First a user needs to register on our website. To register, you need to click on the REGISTER button on top-right. User have to choose his role as a BUYER or as a SELLER.

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/homepage1.png)

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/homepage2.png)

### The registration page for the buyer is :-

- The user then needs to fill in his details according to the details mentioned in the page and then needs to click the REGISTER button.
- Then the user needs to scan a QR code and verify an OTP by using Google Authenticator App.

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/buyer_register1.png)

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/buyer_register2.png)

Now, after registering or login, whenever the user logs out, then during the time of login he again has to scan the QR code and enter an OTP.

### Similarly the registration page for seller is :-
- Then the user (seller) needs to fill in the details according to the details mentioned in the page and then needs to click the REGISTER button.
- Then the user needs to scan a QR code and verify an OTP by using Google Authenticator App.

## Buyer:
 - When buyer successfully login, product page will be displayed -  

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/products_page.png)

- The Buyer can add products to his cart (the cart is already created for each buyer whenever they register) after clicking on a product on the product page. To add a product to the cart, the user (buyer) has to click on ADD TO CART button. After adding to the cart, the user (buyer) has to click on CONTINUE SHOPPING to purchase the product :-

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/cart.png)

- After clicking on CONTINUE SHOPPING, the user (buyer) has to provide his address details in a form and then press on the ADD button to confirm the address. After adding the address, the user (buyer) can check out his products (in his cart) by clicking on the CHECK OUT button :-
![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/order_details.png)

- After clicking checkout, the user (buyer) will get redirected to payment page where she/he can pay in 2 different methods, by cash on delivery or by card payment. 
![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/payment_page.png)

- In cash on delivery, the user (buyer) is required to fill a captcha to place the order. 
- In card method, after clicking on PAY NOW, you will have to enter your email address. After selecting the Card option, the user(buyer) will have to enter his card details such as Card number, Expiry data, CVV. Since this is testing mode, the accepted Card number will be 4111111111111111.
 Then the user will have to type in the OTP received at his phone number:-
    After clicking the PAY button, the order would have been placed.
    ### Note: The payment made is in the form of dollars, and for that we have correctly converted the cost of the product from rupees to dollars.

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/razorpay1.png)

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/razorpay2.png)

- After placing the order, the user would have bought the item. 

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/order_placed.png)

## Seller:

- The user(seller) personal info (Dashboard) page is this. 
 Here the user (seller) can also edit his personal info using the EDIT button.
![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/profile_page.png)

- The user (seller) can also view/add his products from the Products button :-

 To add a product, the user (seller) has to use the ADD PRODUCT button.
 To add a product, you have to upload 3 images and each image size should be less than 0.5 MB. Also the price of the product should be more than 50 Rs. The discount price here shows that after discount what will be the price of the product, and that it should be less than that of the product. The size of the proposal pdf should be less than 1 MB. The product description should be more than 10 characters.

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/add_product.png)

- After adding the project, seller have to wait for admin to approve the product. After admin approve the product, buyer can buy the product. Seller can also edit or remove the listed project.
![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/seller_product_page.png)


- The orders page (through the Orders button) shows what were the recent orders.

- The user (seller) can also change his password by using the Change password button.

# User Information :-

### Admin
 
- Phone numbers - 9171234567
- Password - Shopify@8769
- Qrcode -

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/admin_QR.png)


### Seller
  #### Whatthe$97
- Phone numbers - 9177654321
- Password - Whatthe$97
- Qrcode -

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/Whatthe%2497_QR.png)

  #### Aman$890
- Phone numbers - 9175559999
- Password - Aman$890
- Qrcode -

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/Aman%24890_QR.png) 


### Buyer
 #### Chaman@1456
- Phone numbers - 9172589875
- Password - Chaman@1456
- Qrcode -

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/Chaman%401456_QR.png) 

 #### Kyakaru&4978
- Phone numbers - 9180596836
- Password - Kyakaru&4978
- Qrcode - 

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/Kyakaru%264978_QR.png) 


## Admin:
### The admin have the privilege to do the following changes:

![](https://github.com/Shanu85/Shopify/blob/main/ecommerce-website/Website_Image/admin.png)
- Approve the Product of a seller, or delete it. Within this he/she is only allowed to change the status attribute for the Product.
- Delete seller or buyer but not other admins
- See the orders, addresses, favorite products
- Is able to only view the order details. Admin cannot edit, delete or add any order to the users.



<!-----

# Django React eCommerce

Advanced eCommerce example web application with Django and React

[Development](#development) <br>
[Deployment](#deployment)

# Development

Setup environment for development

### Install dependencies

Clone the project then install python and react dependencies

```
git clone https://github.com/amirahrari/django-react-ecommerce.git
cd django-react-ecommerce
pip install -r requirements.txt
yarn # or npm install
```

### Add built in [dummy data](dummy_data)

Create database, apply migrations and add some [dummy data](dummy_data)

```
python add_dummy_data.py
```

### Run the server

```
yarn run dev
python manage.py runserver
python manage.py livereload # hot reload
```

Open http://localhost:8000/

### Admin pannel

Admin user has been created in [users.json](dummy_data/users.json) <br />
You can access the admin pannel from http://localhost:8000/admin/ <br />
phone number: 09171234567 <br />
password: password

# Deployment

Deploy with docker using postgresql, gunicorn and nginx.

### Setup envrionment variables
```
cp .env.sample .env
cp .env.db.sample .env.db
```

### Build and up image using docker compose

```
docker-compose build
docker-compose up -d
```

### Collect static files and add dummy data

```
docker-compose exec web python manage.py collectstatic --no-input
docker-compose exec web python add_dummy_data.py
```

You are good to go. Open your server ip address on port 80 (Ex on localhost: http://127.0.0.1).
 
--->
