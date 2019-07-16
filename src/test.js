
const Koa = require('koa2'),
Router = require('koa-router'),
cheerio = require('cheerio'),
app = new Koa(),
router = new Router(),
tooler = require('./lib/tooler'),
request = require('superagent');
require('superagent-charset')(request)

router.get('/', function (ctx, next) {
// ctx.body = "路由搭建好啦";
// var url = 'https://www.baidu.com/'; //百度新闻地址

var aim = tooler.getUrlQuery("url", ctx.request.url);
console.log("-------");
console.log(aim);

//superagent不理解，请在文章开头的地方寻找了解superagent，点击进去理解
request.get(aim)
    .charset('utf-8') //当前页面编码格式
    .end((err, sres) => { //页面获取到的数据
        if(err){
            return next(err);
        }
        if(sres && sres.text){
            let html = sres.text;
            console.log(html);
            //用cheerio解析页面数据]
            let $ = cheerio.load(html, {
                decodeEntities: false
            });

            let arr = [];
            // 下面类似于jquery的操作，前端的小伙伴们肯定很熟悉啦
            $(".thumbnail img").each((index, element) => {
                var $text = $(element).attr("src");
                arr.push($text);
            });
            ctx.body = html;

        }
        else{
            ctx.body = "请求失败"
        }
    });
// ctx.body = aim;
});

app
.use(router.routes())
.use(router.allowedMethods());

app.listen(3000, () => {
console.log('服务已开启 http://127.0.0.1:3000/');
});