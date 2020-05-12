const axios = require('axios');
const Conf = require('conf');
const config = new Conf();
const njwt = require('njwt');

// Endpoint configuration function
function configure(object) {
    let mk = object.mk || null;
    let register = object.register || null;
    let users = object.users || null;
    let login = object.login || null;
    let mfa_activate = object.mfa_activate || null;
    let mfa_verify = object.mfa_verify || null;
    
    config.set('mk', mk);
    config.set('register', register);
    config.set('users', users);
    config.set('login', login);
    config.set('mfa_activate', mfa_activate);
    config.set('mfa_verify', mfa_verify);
}

// Register function
function register(key_priority, claims_object, callback) {
    axios.get(`${config.get('mk')}/${key_priority}`).then((res) => {
        let key = Buffer.from(res.data, 'base64');
        let claims = claims_object;
        let jwt = njwt.create(claims, key);
        let token = jwt.compact();
        axios.post(config.get('register'), {
            priority: key_priority,
            token: token
        }).then((res) => {
            if(callback)
                callback(null, res)
        }, (err) => {
            if(callback)
                callback(err, null)
        });
    }, (err) => {
        console.log(err);
    });
}

// Login function
function login(key_priority, username, password, callback) {
    axios.get(`${config.get('mk')}/${key_priority}`).then((res) => {
        let key = Buffer.from(res.data, 'base64');
        let claims = {
            username: username,
            password: password
        }
        let jwt = njwt.create(claims, key);
        let token = jwt.compact();
        axios.post(config.get('login'), {
            priority: key_priority,
            token: token
        }).then((res) => {
            if (callback)
                callback(null, res)
        }, (err) => {
            if(callback)
                callback(err, null)
        });
    }, (err) => {
        console.log(err);
    });
}

// Update function
function update(key_priority, username, update_object, callback) {
    axios.get(`${config.get('mk')}/${key_priority}`).then((res) => {
        let key = Buffer.from(res.data, 'base64');
        let claims = update_object;
        let jwt = njwt.create(claims, key);
        let token = jwt.compact();
        axios.patch(`${config.get('users')}/${username}`, {
            priority: key_priority,
            token: token
        }).then((res) => {
            if (callback)
                callback(null, res)
        }, (err) => {
            if (callback)
                callback(err, null)
        });
    }, (err) => {
        console.log(err);
    });
}

// Delete function
function terminate(username, delete_object, callback) {
    axios.delete(`${config.get('users')}/${username}`, delete_object).then((res) => {
        if (callback)
            callback(null, res)
    }, (err) => {
        if (callback)
            callback(err, null)
    });
}

// Fetch user by username or email
function fetchUser(user, callback) {
    axios.get(`${config.get('users')}/${user}`).then((res) => {
        if (callback)
            callback(null, res)
    }, (err) => {
        if (callback)
            callback(err, null)
    });
}

module.exports = {configure, register, login, update, terminate, fetchUser};