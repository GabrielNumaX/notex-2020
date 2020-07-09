const app = require('./app');
require('./database');

// set('port', process.env.PORT || 3000);

app.listen(app.set('port'));
console.log('server running on port '+ app.set('port'))

module.exports = app;

