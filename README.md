# The Market
A Fullstack MERN app for online marketplace.
Demo: https://the-market-beryl.vercel.app/


To run the app locally run this command from the-market/ directory:
```js
npm run dev
```
which starts Expressjs server and Vite dev server using concurrently package.

You will need a couple env variables in the-market/ directory:

![image](https://github.com/viionc/the-market/assets/6730164/23de1bfe-35f1-47c8-b080-cf1c1b675e31)

- MONGO_DB_URI you can find in your Mongodb atlas project.
- JWT_SECRET is just a string e.g. "very_secret_jwt_secret"
- API_URL is URL for your backend (had to do it that way because I created separate projects for backend and frontend on vercel which had different URLs)

(you might need to change your whitelist IP in server/api/index.js for cors thingy)

And one in client/ directory:
![image](https://github.com/viionc/the-market/assets/6730164/7d684f5b-825e-43c9-98d3-15c6e0965e72)
URL same as API_URL for backend.

## todo
Current features:
- login/register
- browse listings including categories or user-specific
- add listings (no images atm, need to figure a way for this because apparently you shouldn't store images in Mongodb idk)
- buy listings (no payment or anything, listings just disappear with a notification that you bought it for now)
- listings are being removed when they expire
  

Plan on doing:
- add more content
- work on UI/UX
- maybe add some kind of payment system like stripe
- add listing images


## preview

![image](https://github.com/viionc/the-market/assets/6730164/d834bb8b-aef7-4ef7-b3fc-ddaa748fdff7)

![image](https://github.com/viionc/the-market/assets/6730164/9fc9fabd-ead3-45ba-a6b2-f307e9fe4ae7)

![image](https://github.com/viionc/the-market/assets/6730164/cd1ecb51-aa4e-44be-89c4-5a0f53e841a4)
