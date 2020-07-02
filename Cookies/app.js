var koa =require('koa');
var router =require('koa-router');
var app=new koa();
var _=new router();

_.get('/', (ctx)=>{
    ctx.body="ddd"
    ctx.cookies.set('name','value',
    {httpOnly:false,expires:new Date(Date.now()+36000)});
    //console.log('Cookies :foo=',ctx.cookies.get('foo'))
    ctx.cookies.set('foo','');
});

app.use(_.routes());
app.listen(3000)
