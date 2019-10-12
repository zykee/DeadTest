# DeadTest
homework for 计算机网络 
## 浏览地址 
無
## 运行方法
```
1. 环境需要：node.js  mongodb
2. `git clone https://github.com/zykee/DeadTest.git`
3. `npm install`
4. 启动mongodb
5. 导入数据 
`monogimport -d movies -c movies --type csv --headerline --file movies.dat` 导入表movies
`monogimport -d movies -c types --type csv --headerline --file types.dat` 导入表types
6. `node app.js`
```
## 技术选型
### 客户端
- Javascript库：[jQuery](http://jquery.com/)

- CSS框架：[Boostrap](http://getbootstrap.com/)

- 测试框架：无
### 服务端
- API服务器：[Express.js](https://expressjs.com/en/starter/installing.html)

- ODM（数据关系模型）框架：[moogoose](http://mongoosejs.com/docs/guide.html)

- 数据库：[Mongodb](http://www.mongodb.org.cn/)

- 测试框架：无
## 目录
```
│  app.js                   // 入口以及后台api
│  package.json             // 依赖管理
│
├─node_modules              // 组件包
│
├─public                    // 静态资源
│  │  
│  ├─index.html             // 主页
│  └─details.html           // 详细页
│
├─js
│  │  
│  │
│  ├─index.js               //主页页面逻辑
│  │     
│  │
│  ├─details.js             //详情页逻辑
│  │    
│  │
│  └─layui
│        
│
├─models
│  ├─movies.js              //电影
│  └─types.js               //电影type
│
├─types.dat                 //数据
└─movies.dat
```
