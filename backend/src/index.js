import app from "./app.js";
import {connectDB} from '../src/database/db.js'
import {settingDotEnvPort} from "./config/config.js";
connectDB();
const { port } = settingDotEnvPort();
app.listen(port, console.log('Server on port', port))