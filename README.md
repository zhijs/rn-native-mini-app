### mini 项目脚手架


### 1.目录结构
```
|--src           源代码目录
|  |--api        接口请求相关逻辑  
|  |--assets     资源文件目录
|  |--components 可复用组件目录
|  |--pages      页面组件目录
|  |--store      redux相关目录
|  |--util      公用工具函数目录
```

### 2.开发环境搭建
https://www.jianshu.com/p/12674aa384a1


3.clone 远程代码,并安装依赖
```javascript
git clone https://gitlab.com/xl_mini/xl_mini_client.git
cd xl_mini_client
npm install
```


### 运行
```
// android环境
npm run ad

// ios
npm run ios

react-devtools 开启调试器
react-native log android 输出日志 console.log

// 矢量图添加
路径： assets/svgs/
执行 npm run build
```

### 代码提交
在develop分支上进行开发
```
// 拉到代码后
git checkout develop
// ... 开发
```
