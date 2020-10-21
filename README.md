# AutoAnswer2XMU
这是一个用来自动爬取厦门大学实验室安全考试系统题目，并制备js自动答题的脚本，100分必备！！！
# 使用说明
**1、复制 main.js 内全部代码**

**2、打开 厦门大学实验室安全考试系统 答题页面**

**3、按下 F12 打开开发者窗口**

**4、找到 Console 面板**

**5、按下 ctrl+v 贴入代码**

**6、按下 回车**

# 如何制备数据库
**首先打开index.js,根据需求配置courses，index.js会自动生成db.json本地数据库，然后自动根据db.json和模板main-template.js生成main.js自动答题脚本**
```
//由于安全知识竞赛已包含其他类别，因此可以仅爬取安全知识竞赛
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
```
**注意，需要在.env配置COOKIES**
### cd src # 进入 src 目录
### npm install # 安装依赖
### npm start # 启动抓取与生成

# 操作演示
**demo.mp4**

[demo](demo.png)

# 代码参考
代码参考厦大新生入学答题脚本https://github.com/wangzexi/yiban-assistant
