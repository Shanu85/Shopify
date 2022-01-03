# Shopify
An e-commerce website is a software system developed primarily to facilitate buying and selling of products between users.The focus of this project is to develop a Secure e-Commerce website.
To directly see about the site [user guide](https://github.com/Shanu85/Shopify/tree/main/ecommerce-website#user-guide-for-shopify-an-ecommerce-platform)

##  Main Features
A user should be able to use this system any place and any time with the availability of internet and web browsers. In addition to specific requirements mentioned below, all the global standards / laws with respect to e-commerce websites should be strictly followed. 

### Users 
In this project, there are following categories of users: 
- __Buyers__ 
A buyer is a free user of this service. A buyer will signup and login to the system to get access to a catalog of products. The products can belong to categories, and the user can search for specific products on the website.
A product will have at least two images, a name and a description. You can add additional information, if required.
A buyer can also purchase a product. To mimic a payment gateway, you can use stripe in test mode. It is easy to set up and allows transactions from a dummy card in dev mode. You can skip stripe integration if it gets too difficult, and create a simple CRUD based simple payment gateway as well.

- __Sellers__
A seller will request the admin for approval of selling. The seller will have to upload a document (can be any pdf) and send it to the admin for approval. 
Once a seller has approval from the admin, they will be allowed to catalog products, set the inventory, add product details, and so on. 

- __Admin__ 
An admin can remove any suspicious buyers or sellers from the e-commerce system. They can approve seller applications after looking at the documents. They can add or remove any products listed by any seller. 
  
### Functionality 
We decided about suitable access rights/ privileges and other  security features. Below are some basic functionality details for this project: 
- General functionality details: Below are some general functionality details which are implemented. 
  - Mechanism to search products using name, category, etc.
  - Creation and Maintenance of product list 
  - Ability to set/edit settings 
  - An e-cash wallet (or a payment gateway) for performing financial transactions. 
  - Maintenance of profile information of the user. 
  - Ability to share, sell and purchase products
  - Admin capabilities as mentioned above or more
  - Seller-Admin approval process using a document upload.

- Others 
  - __Public Key Certificates__: The secure e-commerce website must use public  key infrastructure (PKI) in addition to using SSL/TSL (HTTPS) to enforce the  security of the application. We established our own certificate issuing  authority for the purpose of this project. A minimum of two functions are employes PKI, and you we decided the extent of the PKI applicability to the functions.  
  - __OTP__: The secure e-commerce website must employ OTP (One Time  Password) technique with virtual keyboard feature to validate highly sensitive  transactions for at least two of the functions in requirements. You may decide the  extent of the OTP applicability to the functions.  
  - This website allows multiple users to use the  system simultaneously. 
  - Secure transaction logging is required to enable external audits. 
  - Must employ necessary security features to defend against attacks on the secure  e-commerce website (project will be tested by the TAs and students).
  - Make sure you read about payment gateway compliance and store only the data that is allowed to be stored. For example, storing card details on your local db store is not allowed. 
