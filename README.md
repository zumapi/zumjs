# ZUM JS

### Available Modules

#### configure
*This is a required module for the client to interact with the zum server. It configures the client with the necessary details like appName and server endpoints. No other module will work unless the client is configured.*
```js
zum.configure({
// all values default to null unless specified
})
```
*These values can be passed inside the configuration object to undertake various operations using the library*
* appName : Every app registered in zum has a unique app name. It serves as an id to identify the app.
* mk : Master key endpoint
* register : Registration endpoint
* users : Users endpoint
* login : Login endpoint
* logout : Logout endpoint
* verify : Token verification endpoint
* stats : Endpoint for server and user stats
```js
zum.configure({
    appName : 'myapp',
    register: 'http://www.myapp.com/register',
    login: 'http://www.myapp.com/login',
    verify: 'http://www.myapp.com/verify',
    users: 'http://www.myapp.com/users',
    mk: 'http://www.myapp.com/mk'
});
```

#### register
*Create a new user*
```js
zum.register(key_id, claims, callback)
```
* key_id : Master key id to use to sign the outgoing jwt token
* claims : User data
```js
zum.register('key1', {
    username : 'zaygo',
    password : 'Mypass@123',
    name : 'Arjun Nair',
    email : 'zaygo@myemail.com',
    scope : 'admin',
    country : 'Austria'
}, (err, res) => {
    if (err) throw err;
    console.log(res.status);
});
```

#### login 
*Acquire access token for a user*
```js
zum.login(key_id, username, password, callback)
```
* key_id : Master key id to use to sign the outgoing jwt token
* username : Unique username
* password : User password
```js
zum.login('key2', 'zaygo', 'Mypass@123', (err,res) => {
    if (err) throw err;
    console.log(res.status);
    console.log(res.headers['x-auth-token']);  // access token can be found inside the response header
});
```

#### update
*Update user account*
```js
zum.update(key_id, username, update_object, callback)
```
* key_id : Master key id to use to sign the outgoing jwt token
* username : Unique username
* update_object : Object containing parameters to update
```js

```
