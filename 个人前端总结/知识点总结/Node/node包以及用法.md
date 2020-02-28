# Node包

## A.node所安装的包

### I.express搭配使用的包

##### 1.body-parser

```js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//设置返回数据
app.use(bodyParser.json())
// post数据提交方式
app.use(bodyParser.urlencoded({ extended: true }))
```

##### 2.设置跨域问题：

```js
// 防止跨域问题
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token, Uid');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
  });
```

##### 3.nodemon是避免重复开启服务

##### 4.mysql数据库连接

```js
// mysql.js
//数据库配置以及建立连接
const mysql = require('mysql')
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'tours'
})

db.connect()

module.exports = (sql, callback) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

// user
//文件引用
const db = require('../mysql.js')
```

##### 5.multer文件上传

```js
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    // 设置上传后文件的路径
    destination(req, file, cb) {
        const path = `${process.cwd()}/tmp/`
        if(!fs.existsSync(path)){
            fs.mkdirSync(path)
        }
        cb(null, path)
    },
    // 给上传文件重命名，获取添加后缀名
    filename(req, file, cb ){
        let fileFormat = (file.originalname).split('.')
        cb(null, file.filename + '-' + Date.now() + '.' + fileFormat[fileFormat.length-1])
    }

})

// 添加配置文件到multer对象
let upload = multer({
    storage: storage
})

module.exports = upload;
```

### II.koa搭配使用的包

##### 1.koa安装方法：

```js
//全局安装
npm install -g koa-generator
// 安装项目 koa的html模板是jade  koa2的html模板是pug
koa2 my-project 
//切换目录到my-project  
cd my-project
//安装依赖
npm install
```

##### 2.pug是html模板

##### 3.koa-convert：将Koa1包中使用的Generator函数转换成Koa2中的async函数。

```js
// koa1
app.use(function *(next) {
  console.log(1111); // 1. 第一步先打印 1111
  yield next;
  console.log(222222); // 4. 第四步打印 222222
});
// koa2
app.use(async (ctx, next) => {
  console.log(3333); // 2. 第二步再打印 3333
  await next();
  console.log(44444); // 3. 第三部打印44444
});
```

##### 4.sequelize

- 解释：Sequelize是一款基于Nodejs功能强大的异步ORM框架。
   同时支持PostgreSQL, MySQL, SQLite and MSSQL多种数据库，很适合作为Nodejs后端数据库的存储接口，为快速开发Nodejs应用奠定扎实、安全的基础。

- ```js
  // 安装
  npm install --save sequelize
  npm install --save mysql
  npm install --save mysql2
  ```

- 连接数据库

  ```js
  const Sequelize = require('sequelize');
  /**
   * 配置数据库
   * 第一个参数 boblog    数据库名字
   * 第二个参数 root      数据库名字
   * 第三个参数 password  数据库密码
   */
  const sequelize = new Sequelize('boblog', 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
      operatorsAliases: false,
      dialectOptions: {
          charset: "utf8mb4",
          collate: "utf8mb4_unicode_ci",
          supportBigNumbers: true,
          bigNumberStrings: true
      },
  
      pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
      },
      timezone: '+08:00' //东八时区
  });
  
  //验证是否连接成功
  sequelize.authenticate().then(() => {
          console.log('Success.');
  }).catch(err => {
          console.error('Failed', err);
  });
  ```

- ### 新建模型 schema

  ```js
  //schema/role.js
  const moment = require('moment');
  module.exports = function (sequelize, DataTypes) {
      return sequelize.define('role', {
          id: {
              type: DataTypes.INTEGER.UNSIGNED,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
          },
          // 角色名字
          name: {
              type: DataTypes.STRING(100),
              field: 'name',
              allowNull: false
          },
          // 角色权限
          limits: {
              type: DataTypes.INTEGER.UNSIGNED,
              allowNull: false,
              field: 'limits',
              default: 0
          },
           // 这可以创建一个外键:
          bar_id: {
             type: Sequelize.INTEGER,
             references: {
                // 这是引用另一个模型
                model: Bar,
                 // 这是引用模型的列名称
                key: 'id',
                 // 这声明什么时候检查外键约束. 仅限PostgreSQL.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
          }
          createdAt: {
              type: DataTypes.DATE,
              field: 'created_id',
              get() {
                  return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
              }
          },
          updatedAt: {
              type: DataTypes.DATE,
              field: 'updated_id',
              get() {
                  return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
              }
          }
      }, {
          // 如果为 true 则表的名称和 model 相同，即 user
          // 为 false MySQL创建的表名称会是复数 users
          // 如果指定的表名称本就是复数形式则不变
          freezeTableName: true
      })
  }
  ```

- ### 新建model

  ```js
  //model/RoleModel.js
  const db = require('../config/db');
  const Sequelize = db.sequelize;
  const Op = Sequelize.Op;
  const Role = Sequelize.import('../schema/role');
  Role.sync({force: false});
  ```

- ### 关联表查询

  ```js
  const Article = Sequelize.import('../schema/article');
  const Category = Sequelize.import('../schema/category');
  const User = Sequelize.import('../schema/user');
  //设置表关联
  Category.hasMany(Article); // 将会添加 category_id 到 ArticleModel 模型
  User.hasMany(Article); // 将会添加 authorId 到 ArticleModel 模型
  //设置关联外键
  Article.belongsTo(Category, {foreignKey: 'categoryId'});
  Article.belongsTo(User, {foreignKey: 'authorId'});
  
  //使用
  Article.findOne({
       where: {
             id,
             is_del: 0
      },
      include: [{
           model: Category,
           where: {categoryId: Sequelize.col('article.categoryId')}
       }, {
           model: User,
           where: {id: Sequelize.col('article.authorId')},
           attributes: ['id','nickname']
     }],
     attributes: {exclude: ['is_del']}
  }).then(res=>{})
  ```

- ## 关联 association

  ```js
  return await Test.findOne({
     where:{id},
     include: [ { 
      //关连键(test_id)在TestTitles表上
       association:Test.hasMany(TestTitles,{foreignKey: 'test_id',as:'titles'}),
       include:[ {
             association:TestTitles.hasMany(TestOptions,{foreignKey: 't_id',as:'options'})
       } ],
     },]
   });
  
  //关联键在UserTest上
  await UserTest.findAndCountAll({
      where:{userId},
      include: [ {
           association:UserTest.belongsTo(Test,{foreignKey: 'testId'}),
      }]
  })
  ```

  ##### 5.







## B.koa2项目文件创建

#### 1.文件结构

- config配置文件

- module与数据库交互

- controllers从数据库中获取数据

- schema数据库设置

#### 2.











## C.Koa2的坑点

### 1.koa2中的koa-bodyparser的post请求ctx.request.body为空

解决办法： 替换成koa-body包

```js
const koaBody = require('koa-body')

app.use(koaBody({
  multipart:true, // 支持文件上传
  encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));
```

```
//获取参数
ctx.request.body
ctx.request.files
```

### 2.koa-static的静态资源存放

```js
// 要注意资源放置的目录，路径如果是/public/images，去掉public路径就行了
// 直接访问http://localhost:3000/images/xxx.png路径即可 
app.use(require('koa-static')(__dirname + '/public'))
```

### 3.