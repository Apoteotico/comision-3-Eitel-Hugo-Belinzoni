import app from "./app.js";
import {settingDotEnvPort} from "./config/config.js";

const { port } = settingDotEnvPort();
app.listen(port, console.log('Server on port', port))
