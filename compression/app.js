var koa = require('koa');
var router = require('koa-router');
var app = new koa();
var compress=require('koa-compress')
var Pug = require('koa-pug');
var pug = new Pug({

    viewPath: '/views',
    basedir: '/views',
    app: app
});

app.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH

}))

var _ = router();
_.get('/', (ctx, next)=> {
    ctx.render('index');
});

// function getRoot(ctx, next) {
//     ctx.render('index');
// }

app.use(_.routes()); //Use the routes defined using the router
app.listen(3000);