require('dotenv').config()

const rp = require('request-promise')
const cheerio = require('cheerio')
var iconv = require('iconv-lite');
const fs = require('fs')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync('db.json'))
db.defaults({ questions: [] }).write()

run()
async function run () {
  //await crawl() //爬取数据库
  buildScript()  //制作自动答题脚本
}

async function crawl () {
  const cookies = process.env.COOKIES

  //从题库里抓取题目
  //配置需要爬取的类别，由于安全知识竞赛已包含其他类别，因此可以仅爬取安全知识竞赛
  const courses = [
    /*
    {
      name: '化学类安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=1436&page=',
      pageCount: 92 // 抓取页数
    },
    {
      name: '生物医学类安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=1467&page=',
      pageCount: 43 // 抓取页数
    },
    {
      name: '通识类安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=1471&page=',
      pageCount: 83
    },
    {
      name: '机械建筑类安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=1484&page=',
      pageCount: 57 // 抓取页数
    },
    {
      name: '电器类安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=1485&page=',
      pageCount: 43 // 抓取页数
    },
    {
      name: '辐射类安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=1486&page=',
      pageCount: 38 // 抓取页数
    },
    {
      name: '特种设备安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=4199&page=',
      pageCount: 9 // 抓取页数
    },
    {
      name: '消防安全题',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=4200&page=',
      pageCount: 10 // 抓取页数
    },*/
    {
      name: '安全知识竞赛',
      uri: 'http://121.192.191.91/redir.php?catalog_id=6&cmd=learning&tikubh=71905&page=',
      pageCount: 373 // 抓取页数
    },
  ]
  
  cnt = 0
  for (const course of courses) {
    dict = {}
    for (let i = 1; i < course.pageCount + 1; ++i) {
      //爬取一页的题目
      const questions = await getQstByPage(cookies, course.uri + i, i)
      // console.log(questions)
      for(let j=0;j<questions.titles.length;++j){
        dict[questions.titles[j]]=questions.answers[j]
      }
      cnt += questions.titles.length
      // console.log(questions.titles)
    }
    db.get('questions').push(dict).write()
    console.log('爬取<',course.name,'>完成')
  }
  console.log('总共有',cnt,'道题')
  //console.log('dict大小为',dict.length)
  
  // 去重
  //db.set('questions', db.get('questions').uniqBy('id').value()).write()

  //console.log('完成', db.get('questions').value().length)
}

function buildScript () {
  // 只保留必要字段
  const packed = JSON.stringify(
    db.get('questions')
  )
  //console.log(packed)
  // 注入题库数据到脚本
  fs.writeFileSync(
    'main.js',
    fs.readFileSync('main-template.js').toString().replace('{{questions}}', packed)
  )
  console.log('🎉 写出完成！复制 main.js 内全部代码到浏览器 Console 即可使用。')
}

async function getQstByPage (cookies, uri, i) {
  // console.log('正在爬取<',uri, '>第', i,'页')
  const body = await rp({
    uri: uri,
    method: 'GET',
    headers: {
      Cookie: cookies
    },
    encoding:null
  })

  html = iconv.decode(body,'gb2312')
  const $ = cheerio.load(html)

  const titles = $('.shiti').map((i, el) => {
    //去除头部的数字和'、',并且需要将\\，单引号，双引号,\n转义
    const titles = $(el).find('h3').text().replace(/[0-9]*、/,'').replace(/\'/g,'&#039;').replace(/\"/g,"&quot;").replace(/\\/g,'反斜杠').replace(/\n/g,'<br>')
    return titles
  }).get()
  const answers = $('.shiti-content').map((i, el) => {
    //去除头部（标准答案：和\n,)
    const answers = $(el).find('span').text().replace(/（标准答案：/g,'').replace(/ /g,'').replace(/\n/g,'').split('）')
    return answers
  }).get()
  // console.log(titles,'->',answers)
  return {
    titles,
    answers
  }
}
