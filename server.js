const express = require("express");
const cors = require("cors");
const { dbConnect, PORTS } = require("../ExpressJWT/app/config/db.config");
const routers = require("./app/routes/auth.routes");
const Role = require("../ExpressJWT/app/models/role.model");

const app = express();
app.use(cors());
app.use(express.json());

dbConnect();
initial();
app.use("/api/v1", routers);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = (ports) => {
  const tryNextPort = () => {
    const port = ports.shift(); // Get the next port to try

    if (!port) {
      console.error("Failed to start server on any port");
      return;
    }

    app
      .listen(port, () => {
        console.log(`Server is running on port1 ${port}`);
        // console.log(port);
        
      })
      .on("error", (err) => {
        console.error(`Error starting server on port2 ${port}:`, err.message);
        tryNextPort(); // Try the next port on error
      });
  };

  tryNextPort(); // Start server with the first port
};

// Start the server with fallback ports
startServer(PORTS);
console.log(PORTS);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ["user", "admin", "superadmin"].forEach((roleName) => {
        new Role({ name: roleName }).save((err) => {
          if (err) {
            console.error("Error initializing roles:", err);
          } else {
            console.log(`Added ${roleName} to roles`);
          }
        });
      });
    }
  });
}
