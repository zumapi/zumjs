# ZUM JS

### Available Modules

#### configure
*This is a required module for the client to interact with the zum server. It configures the client with the necessary details like appName and server endpoints. No other module will work unless the client is configured.*
```js
zum.configure({
// all values default to null unless specified
})
```
*These values should be passed inside the configuration object to undertake various operations using the library*
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
