/**
 * Created by xia on 16/11/30.
 */
var http = require("http");
var url = require("url");
var cheerio = require("cheerio");
var async = require("async");
var eventproxy = require('eventproxy');

var charset = require('superagent-charset');
var superagent = charset(require('superagent'));


var catchFirstUrl = 'http://www.cnblogs.com/',	//入口页面
	deleteRepeat = {},	//去重哈希数组
	urlsArray = [],	//存放爬取网址
	catchDate = [],	//存放爬取数据
	pageUrls = [],	//存放收集文章页面网站
	pageNum = 1,	//要爬取文章的页数
	startDate = new Date(),	//开始时间
	endDate = false;	//结束时间


var iMovies = 0

var iStart = 97000


for (var i = 1; i <= pageNum; i++) {


	pageUrls.push('http://www.dy2018.com/i/' + (iStart + i) + '.html');
}

// 主start程序
function requestHtml(pageUrl, callback) {
	superagent.get(pageUrl).charset('gb2312')
		.end(function (err, pres) {

			//res.write('fetch ' + pageUrl + ' successful<br/>');
			callback(null, pageUrl)

			// 常规的错误处理
			if (err) {

				console.log('fetch ' + pageUrl + ' error');
				//console.log(err);
				//callback(err,null)
				return
			}


			console.log(iMovies++ + ' fetch ' + pageUrl + ' successful');


			if (pres) {
				var html = pres.text;
				var $ = cheerio.load(html);
				console.log(html)

				var curPageUrls = $('.title_all h1');

				var fileUrl = $('a[href^="ftp"]')

				var desc = $('div[id="Zoom"]')


				console.log(curPageUrls.text())

				console.log(fileUrl.text())

				console.log(desc.html())

			}

		})
}
function getPage(res) {
	// 轮询 所有文章列表页
	//pageUrls.forEach(function (pageUrl) {
	//	requestHtml(pageUrl);
	//})


	async.mapLimit(pageUrls, 5, requestHtml, function (err, results) {


	})
}

getPage()