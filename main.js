const axios = require('axios');
const Conf = require('conf');
const config = new Conf();
const njwt = require('njwt');

// Endpoint configuration function
function configure(object) {
    let appName = object.appName || null;
    let mk = object.mk || null;
    let register = object.register || null;
    let users = object.users || null;
    let login = object.login || null;
    let verify = object.verify || null;
    let stats = object.stats || null;
    
    config.set('appName', appName);
    config.set('mk', mk);
    config.set('register', register);
    config.set('users', users);
    config.set('login', login);
    config.set('verify', verify);
    config.set('stats', stats);
}

// Register user
function register(key_priority, claims_object, callback) {
    axios.get(`${config.get('mk')}/${key_priority}`).then((res) => {
        let key = Buffer.from(res.data, 'base64');
        let claims = claims_object;
        claims.app = config.get('appName');
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
            password: password,
            app: config.get('appName')
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

// Terminate user account
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

// Get server stats
function serverStats(callback) {
    let cpu_util = null;
    let mem_util = null;
    let disk_util = null;
    axios.get(`${config.get('stats')}/cpu-util`).then((result) => {
        cpu_util = result.data;
        axios.get(`${config.get('stats')}/mem-util`).then((result) => {
            mem_util = result.data;
            axios.get(`${config.get('stats')}/disk-util`).then((result) => {
                disk_util = result.data;
                let stats = {
                    cpu : cpu_util,
                    mem : mem_util,
                    disk : disk_util
                };
                if (callback)
                    callback(null, stats)
            }, (err) => {
                if (callback)
                    callback(err, null)
            });
        }, (err) => {
            if (callback)
                callback(err, null)
        });
    },(err) => {
        if (callback)
            callback(err, null)
    });
}

// Get user stats
function userStats(callback) {
    let registered = null;
    let logged = null;
    let disabled = null;
    axios.get(`${config.get('stats')}/registered`).then((result) => {
        registered = result.data;
        axios.get(`${config.get('stats')}/logged`).then((result) => {
            logged = result.data;
            axios.get(`${config.get('stats')}/disabled`).then((result) => {
                disabled = result.data;
                let stats = {
                    registered: registered,
                    logged: logged,
                    disabled: disabled
                };
                if (callback)
                    callback(null, stats)
            }, (err) => {
                if (callback)
                    callback(err, null)
            });
        }, (err) => {
            if (callback)
                callback(err, null)
        });
    }, (err) => {
        if (callback)
            callback(err, null)
    });
}

// Disable user account for certain number of days
function disable(username, days, reason, callback) {
    axios.post(`${config.get('users')}/disable`, {
        username : username,
        duration : days,
        reason : reason
    }).then((res) => {
        if(callback)
            callback(null, res)
    }, (err) => {
        if(callback)
            callback(err, null)
    });
}

// Manually re-enable user account
function enable(username,callback) {
    axios.get(`${config.get('users')}/enable/${username}`).then((res) => {
        if(callback)
            callback(null, res)
    }, (err) => {
        if(callback)
            callback(err, null)
    });
}

// Verify request token
function verify(username,token,callback) {
    axios.get(`${config.get('verify')}/${username}/${token}`).then((res) => {
        if(callback)
            callback(null,res);
    }, (err) => {
        if(callback)
            callback(err,null);
    });
}

module.exports = {configure, register, login, update, terminate, fetchUser, serverStats, userStats, disable, enable, verify};