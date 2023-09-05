## PlayStation Ecommerce Website Clone using MERN Stack (React.js, Node.js, Express.js, MongoDB)

## Start

**1. Install Dependencies**

The project contains two basic folders: `client` and `server`. Client is the front end of the application and is written in React.js. Server is the back end of the application and is written in Node.js. To run this project, download it to your computer and open it with a code editor:

For both main files in the project folder, you have to go to the terminal and install the NPM dependencies. To do this:

- `cd client` and then `npm install`

- `cd server` and then `npm install`

**2. Run**

Now, you already installed the NPM dependencies. Now you can run the client and server.

**Run Client**: Client will run at `localhost:3000`. To run the client, use the commands:

- `cd client` and then `npm start`

**Run Server**: Server will run at `localhost:8800`. To run the server, use the commands:

- `cd server` and then `npm run dev`

## Project Information

The project has two main folders named client and server. Client is React.js. Server is Node.js and Express.js. Server side has got Express server. Express server is loaded in `app` variable:

**Client**

React.js is used here. It has folders named Pages, components and Redux. The Component's folder holds the components in this application like Navbar, GameCard, etc. Pages, on the other hand, hold pages such as Home page, Game Detail Page, etc. Components are rendered in certain parts of the pages. React Router DOM is used for page redirection. Redux Toolkit is used for state management. In components and pages, requests are made to the API addresses written on the server side. If the request results are positive, the incoming results are printed on the screen.

**Server**

Node.js, Express.js and MongoDB is used here. Database schema models were made in the models folder. API endpoints are written in the routes folder. Controller functions for routes are written in the controllers folder. Middlewares for routes are written in the Middlewares folder.

**Database Models**

User, Game, Cart, Order

**Authentication - Authorization**

This project uses JSON Web Token for authentication and authorization. You will receive a token when you log in. That token is sent to the user's browser and stored as a local storage. When you want to reach certain routes, the middleware takes the token from the headers and decrypts it. If the token is valid, it allows you to use the controller valid for that route.

Note: Your information resolved in the token will be kept in the `req.user` object.

**Routes**

    + Register: `http://localhost:8800/api/auth/register` (http post method)
    + Login: `http://localhost:8800/api/auth/login` (http post method)

    + Get All Game: `http://localhost:8800/api/game/` (http get method)
    + Get Game By Id: `http://localhost:8800/api/game/:id` (http get method)

    + Add To Cart: `http://localhost:8800/api/cart/` (http post method)
    + Get All Carts: `http://localhost:8800/api/cart/` (http get method)
    + Update Cart: `http://localhost:8800/api/cart/:id` (http patch method)
    + Delete Cart: `http://localhost:8800/api/cart/:id` (http delete method)

    + Create Order: `http://localhost:8800/api/order/` (http post method)
    + Update Cart: `http://localhost:8800/api/order/:id` (http patch method)

    + Payment Process: `http://localhost:8800/api/payment/process` (http post method)
    + Send Stripe Api: `http://localhost:8800/api/payment/stripeapi` (http get method)

## Snapshots

- **Home Page**:

![Home](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917198/Screenshot_from_2023-09-05_17-40-31_vngt3t.png)

- **Register Page**

![register](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917196/Screenshot_from_2023-09-05_17-40-50_zoyhcg.png)

- **Login Page**:

![login](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917195/Screenshot_from_2023-09-05_17-40-44_jud6un.png)

- **All Games Section**:

![all game](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917197/Screenshot_from_2023-09-05_17-40-39_q6myu6.png)

- **Game Detail Page**:

![game detail](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917196/Screenshot_from_2023-09-05_17-41-20_cky2lt.png)

- **Cart Page**

![cart](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917194/Screenshot_from_2023-09-05_17-41-32_m25gwa.png)

- **Order Page**

![order](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917197/Screenshot_from_2023-09-05_17-42-21_i8gnzg.png)

- **Add Address**

![add address](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917197/Screenshot_from_2023-09-05_17-43-22_fdy5vh.png)

- **Payment Page**:

![payment](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917197/Screenshot_from_2023-09-05_17-52-43_ihm97z.png)

- **Order Success Page**:

![order success](https://res.cloudinary.com/dmhfkaawt/image/upload/v1693917198/Screenshot_from_2023-09-05_17-55-09_xjhhqe.png)
