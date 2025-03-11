# Yale SWE (CPSC 439/539) CAS Example App

## overview 

[CAS](https://en.wikipedia.org/wiki/Central_Authentication_Service) stands for Central Authentication System, a single sign-on (SSO) protocol developed at Yale University. This is an example Next.js app for Yale's Software Engineering (CPSC 439/539) class that demonstrates how to use Yale CAS for simple authentication. App is hosted on Vercel here: [https://cas-auth-ex.vercel.app](https://cas-auth-ex.vercel.app).

This application is meant as an up-to-date Next.js re-write from this [very well-written Yale CAS example](https://github.com/yale-swe/cas-auth-example-express).

## changes

tldr: consolidated express.js authentication server with prettified next.js frontend, obsoleting react context with next-auth. 

To compare the difference between the previous example and this re-write: 

|    | Original   | Re-write   |
|------------|------------|------------|
| frontend | react.js     | next.js `v15.2.1`     |
| backend     | express.js  | next.js `v15.2.1`     |
| auth | passport.js | next-auth `v4.24.11` | 
| ui library | none | mantine `v7.17.1` | 


## running locally 

first install [node v20](https://nodejs.org/en/blog/release/v20.18.0) and the [yarn package manager](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable.)

to run locally, first install dependencies with `yarn install` and then run `yarn run dev`. your app will appear on `http://localhost:3000`. 

Please contact me at [anish.lakkapragada@yale.edu](mailto:anish.lakkapragada@yale.edu) for any questions. 