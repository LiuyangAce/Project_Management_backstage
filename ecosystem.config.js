// pm2 init simple => 生成ecosystem.config.js

/**
 * TODO
 * 可以通过环境改变数据库地址 
 * 或者在不同环境下添加常量保存数据库地址
 * 
 * 这里用的config/index.js 来控制的这些信息
 */
module.exports = {
  apps: [{
      name: "pm_app",
      script: "./bin/www",
      // env: {
      //     "ip": "192.168.1.2",
      //     "NODE_ENV": "development"
      // },
      env_production: {
          // "ip": "192.168.1.1",
          "NODE_ENV": "production",
      },
      env_develop: {
          // "ip": "192.168.1.2",
          "NODE_ENV": "development",
      }
  }]
}