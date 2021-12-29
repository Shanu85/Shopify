# User guide for shopify (an ecommerce platform)


You also need to install the Google Authenticator App on mobile from the play store. The steps can be found in this manual :- https://www.thecloudtutorial.com/create-user-manual-for-web-application/


The home page of our website can be accessed from this URL :- https://192.168.2.238

- First a user needs to register on our website. To register, you need to click on the REGISTER button on top-right
- The user can then choose his role as a BUYER or as a SELLER.

## The registration page for the buyer is :-

- The user then needs to fill in his details according to the details mentioned in the page and then needs to click the REGISTER button.
- Then the user needs to scan a QR code and verify an OTP by using Google Authenticator App.

## The products webpage will be then displayed after registering and entering the OTP :-

- Whenever the user logs out, then during the time of login he again has to scan the QR code and enter an OTP.

## Similarly the registration page for seller is :-
- Then the user (seller) needs to fill in the details according to the details mentioned in the page and then needs to click the REGISTER button.
- Then the user needs to scan a QR code and verify an OTP by using Google Authenticator App.

## The user(seller) personal info (Dashboard) page is this :-

- Here the user (seller) can also edit his personal info using the EDIT button.

## The user (seller) can also view/add his products from the Products button :-

- To add a product, the user (seller) has to use the ADD PRODUCT button.
- To add a product, you have to upload 3 images and each image size should be less than 0.5 MB. Also the price of the product should be more than 50 Rs. The discount price here shows that after discount what will be the price of the product, and that it should be less than that of the product. The size of the proposal pdf should be less than 1 MB. The product description should be more than 10 characters.

## The orders page (through the Orders button) shows what were the recent orders :-

- The user (seller) can also change his password by using the Change password button.

## The Buyer can add products to his cart (the cart is already created for each buyer whenever they register) after clicking on a product on the product page :-

## To add a product to the cart, the user (buyer) has to click on ADD TO CART button :-

## After adding to the cart, the user (buyer) has to click on CONTINUE SHOPPING to purchase the product :-

## After clicking on CONTINUE SHOPPING, the user (buyer) has to provide his address details in a form and then press on the ADD button to confirm the address:-

## After adding the address, the user (buyer) can check out his products (in his cart) by clicking on the CHECK OUT button :-

- The user (buyer) can pay in 2 different methods, by cash on delivery or by card payment.

## In cash on delivery, the user (buyer) is required to fill a captcha to place the order :-

- After placing the order, the user would have bought the item.

## The following is the card payment method :-

## After clicking on PAY NOW, you will have to enter your email address :-

- After selecting the Card option, the user(buyer) will have to enter his card details such as Card number, Expiry data, CVV.
- Since this is testing mode, the accepted Card number will be 4111111111111111.

## Then the user will have to type in the OTP received at his phone number:-

- After clicking the PAY button, the order would have been placed.
- Note: The payment made is in the form of dollars, and for that we have correctly converted the cost of the product from rupees to dollars.

## User Information :-

### Admin
Phone numbers - 9171234567
Password - Shopify@8769
Qrcode - 



### Seller
Phone numbers - 9177654321
Password - Whatthe$97
Qrcode - 

Phone numbers - 9175559999
Password - Aman$890
Qrcode - 


### Buyer
Phone numbers - 9172589875
Password - Chaman@1456
Qrcode - 

Phone numbers - 9180596836
Password - Kyakaru&4978
Qrcode - 


## Admin:
### The admin have the privilege to do the following changes:

- Approve the Product of a seller, or delete it. Within this he/she is only allowed to change the status attribute for the Product.
- Delete seller or buyer but not other admins
- See the orders, addresses, favorite products
- Is able to only view the order details. Admin cannot edit, delete or add any order to the users.






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
 
