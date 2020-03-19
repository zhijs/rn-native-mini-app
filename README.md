### 基于 reat-native app


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
git clone https://github.com/zhijs/rn-native-mini-app.git
cd xl_mini_client
npm install
```


### 运行
```
// android环境
npm run ad

// ios
npm run ios

// 矢量图添加
路径： assets/svgs/
执行 npm run build
// 模拟器运行
crtl + m =>　选择 debug js remotely => 打开chrome浏览器 => f12 =>　查看console.log 日志

// 打包测试android apk
执行
  cd android 
  ./gradlew assembleRelease
  会在app/build/outputs/ 目录下生成 app-release.apk 将这个文件复制到android上，安装即可运行
```

### 代码提交
在develop分支上进行开发
```
// 拉到代码后
git checkout develop
// ... 开发
```
