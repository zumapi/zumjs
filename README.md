# ZUM JS

*Before using these modules install and require the library*
```sh
npm install zumjs
```
```js
const zum = require('zumjs')
```

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
*Create a new user. User will need to verify the email address before signing in, unless verified flag is set to true*
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
    country : 'Austria',
    verified : false
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
zum.update('key3', 'zaygo', {
    name : 'Zaygo',
    country : 'Germany'
}, (err,res) => {
    if (err) throw err;
    console.log(res.status);
});
```

#### terminate
*Delete user account. User will receive an email.*
```js
zum.terminate(username, delete_object, callback)
```
* username : Unique username
* delete_object : Contains the reason and initiator for the termination. These details will be passed to the user via email.

#### fetchUser
*Fetch user details using the username or email*
```js
zum.fetchUser(user, callback)
```
* user : username or registered email of the user

#### serverStats
*Get raw server stats of the zum server. Currently provides cpu, memory and disk stats.*
```js
zum.serverStats(callback)
```
*Callback will contain :*
* cpu : Real time cpu utilization
* mem : Real time memory utilization
* disk : Real time disk utilization

#### userStats
*Get general user stats*
```js
zum.userStats(callback)
```
*Callback will contain :*
* registered : Number of registered users on the server
* logged : Number of users currently logged in
* disabled : Number of users currently disabled

#### disable & enable
*Disable a user for a certain number of days or manually re-enable a disabled user. The user will receive an email.*
```js
zum.disable(username, days, reason, callback)
zum.enable(username, callback)
```
* username : Unique username
* days : Number of days before the ban ends
* reason : Reason for the ban
```js
zum.disable('arjun', 7, 'You violated rule 4', (err,res) => {
    if (err) throw err;
    console.log(res.status);
});
zum.enable('arjun', (err,res) => {
    if (err) throw err;
    console.log(res.status);
});
```

#### verify
*Verify access token*
```js
zum.verify(username, token, callback)
```
* username : Unique username
* token : Access token received from zum server

#### logout
*Logs out the user and invalidates the access token*
```js
zum.logout(username, callback)
```
* username : Unique username
