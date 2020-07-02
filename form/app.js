var koa = require('koa');
var router = require('koa-router');
var bodyParser = require('koa-body');
var app = new koa();
var _=new router();

//Set up Pug
var Pug = require('koa-pug');
var pug = new Pug({
   viewPath: './views',
   basedir: './views',
   app: app //Equivalent to app.use(pug)
});

//Set up body parsing middleware
app.use(bodyParser({
   formidable:{uploadDir: './uploads'},
   multipart: true,
   urlencoded: true
}));

_.get('/', async (ctx)=>{
    await ctx.render('form');
 });
_.post('/upload', (ctx)=>{
     console.log(ctx.request.body.files);
     console.log(ctx.request.body.fields);
    ctx.body = "Received your data!";
 });

app.use(_.routes()); 
app.listen(3000);