var development_env = require('./development');
var prodction_env = require('./prodction');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: development_env,
    prodction: prodction_env
}[process.env.NODE_ENV || 'development']