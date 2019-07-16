const Koa = require('koa2');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = new KoaRouter();
const tooler = require('./lib/tooler');
const request = require('superagent');
const cors = require('koa-cors');
require('superagent-charset')(request);

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

// 日志记录
app.use(async (ctx, next) => {
    console.log('日志记录')
    await next() // 执行下一个中间件
    console.log('日志记录完成')
})


// 访问权限
app.use(async (ctx, next) => {
    console.log('权限验证')
    await next() // 执行下一个中间件
    console.log('权限验证完成')
})

router.get("/", async (ctx, next) => {
    var url = tooler.getUrlQuery("url", ctx.request.url);
    console.log(url);
    var res = await getHtml(url);
    console.log('等待输出');
    await next();
    ctx.body = res.text;
    console.log('等待输出完成')
})

async function getHtml(url){
    let Referer = 'http://www.177pic.info/html/2019/07/2960193.html'
    let Cookie = '__cfduid=d905ed7e582c6d47117ace260edbb07dd1563004118; _ga=GA1.2.16973338.1563004142; 494668b4c0ef4d25bda4e75c27de2817=76abfac9-c160-422a-898b-30f9a2a0dc5b:1:2; ppu_main_f9e9be9131515c6cbc74573d8d44515e=1; _gid=GA1.2.1643856135.1563228427; ppu_sub_f9e9be9131515c6cbc74573d8d44515e=3'
    let UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    return new Promise(resolve => {
        request.get(url)
        .charset('utf-8')
        // .set('Cookie', Cookie)
        // .set('Referer', Referer)
        // .set('User-Agent', UserAgent)
        // .set('Upgrade-Insecure-Requests', 1)
        // .set('Host', 'www.177pic.info')
        .end((err, sres) => {
            if(err){
                console.log(err);
                resolve({text: "无法获取数据"});
            }
            else{
                resolve(sres);
            }
        });
    })
    
}


app.listen(3000, () => {
    console.log('服务已开启 http://127.0.0.1:3000/');
});
