import app from './app';
require("dotenv").config();
app.listen(process.env.appPort); // 4444
