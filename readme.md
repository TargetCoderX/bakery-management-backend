
# Bakery Management System (Backend)

This repository contains the backend code for a Bakery Management System. The backend is built using Node.js and Express js and provides a robust API for managing bakery operations. This includes customer management, order processing, user authentication, and more.

**This project will be continuously improved over time.😊**




## Features

- **User Authentication:** Secure user login and registration using JWT.
- **Order Management:** Handle customer orders, including creating, updating, and viewing orders.
- **Product Management:** Manage bakery products, including adding, updating, and deleting products.
- **Customer Management:** Manage customers, add,update,delete & search customers

## Technologies Used

- **Node.js:** JavaScript runtime for building scalable network applications.
- **Express.js:** Web framework for Node.js, used for building APIs.
- **MySQL:** SQL database for storing application data
- **MySQL 2:** SQL  library for MySQL and Node.js
- **JWT (JSON Web Tokens):** For secure authentication.
- **bcrypt:** For hashing passwords.


## Installation

Clone the GIT repository

```bash
  https://github.com/TargetCoderX/bakery-management-frontend.git
  cd bakery-management-frontend
  npm install
```
Create a table in mysql. Adjust the MYSQL configuration and JWT secret in ``.env`` file


Run Seeders
```bash
    npm run seeder
```

This will insert some fake data in tables.

Now, Run the project by using

```bash
    npm run start
```

**By default it will run on 5000 port, You can adjust port in ``.env`` as well**

    
## Author

- [@Soumya Manna](https://portfolio-frontend-soumya-manna-1999.vercel.app/)

