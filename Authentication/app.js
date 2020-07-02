var credentials = { name: 'Ayush', pass: 'India' }
const convert = require('koa-convert');
var koa = require('koa');
var auth = require('koa-basic-auth');
var _ = require('koa-router')();

var app = new koa();

//Error handling middleware
app.use(convert(function* (next) {
    try {
        yield next;
    } catch (err) {
        if (401 == err.status) {
            this.status = 401;
            this.set('WWW-Authenticate', 'Basic');
            this.body = 'You have no access here';
        } else {
            throw err;
        }
    }
}));

// Set up authentication here as first middleware. 
// This returns an error if user is not authenticated.
_.get('/protected', auth(credentials), (ctx,next) => {
    //console.log("dd")
    ctx.body = 'You have access to the protected area.';
     next();
});

// No authentication middleware present here.
_.get('/unprotected', (ctx,next) => {
    ctx.body = "Anyone can access this area";
    next();
});

app.use(_.routes());
app.listen(3000);