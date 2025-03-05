const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;

require("dotenv").config();
console.log("JWT Secret Key:", process.env.JWT_SECRET); // Debugging

const server = http.createServer(app);
server.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
