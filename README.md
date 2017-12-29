# DeadTest
homework for 计算机网络 
### 浏览地址 
[zykee.net](http://zykee.net)
### 运行方法
1. 环境需要：node.js  mongodb
2. `git clone https://github.com/zykee/DeadTest.git`
3. `npm install`
4. 启动mongodb
5. 导入数据 
`monogimport -d movies -c movies --type csv --headerline --file movies.dat` 导入表movies
`monogimport -d movies -c types --type csv --headerline --file types.dat` 导入表types
5. `node app.js`
