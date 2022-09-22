# Project setup
- npm install
- npm run start 跑本地环境并且启动mock
- npm run serve:dev 跑本地环境
- npm run serve:test 跑测试环境接口
- npm run build:test 打包测试环境
- npm run serve:prod 跑生产环境接口
- npm run build:prod 打包生产环境

# 使用ui
- https://vant-contrib.gitee.io/vant/v3/


# vue3入门
https://www.tapd.cn/60211538/markdown_wikis/show/#1160211538001006854

# 同框架已上线项目
http://test-worksheet-xinfei.testxinfei.cn/ 
账号： 13162253507
密码： wei21hao

# 存储 
- 所有存储都需经过此文件 utils/cookies 或者用 storage方法
- storage.rcGetItem（获取） storage.rcSetItem（设置） storage.rcRemoveItem（移除）
- storage.rcSetItem(StorageType.local, Keys.userKey,value) local方式
- storage.rcSetItem(StorageType.cookie, Keys.userKey,value) cookie方式
- storage.rcSetItem(StorageType.session, Keys.userKey,value) session方式



# 框架规范注意事项
- 所有像素单位用 rem()
- 存储必须用全局封装
- 全局组件必须在guiline 中写案例
- 全局组件有的不允许单独写
- 与外部系统通过url交互的参数必须在 config/url.config.js中进行交互。不需要直接在.vue文件中存
- 所有.vue文件 除css外不允许超过300行
- 接口请求在@/apis 下
- 接口只要报错，会统一toast，不需要处理接口错误情况的toast