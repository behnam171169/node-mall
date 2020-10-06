const App=require('./app');
require('app-module-path').addPath(__dirname);
global.config=require('./app/config');
module.exports=new App;
