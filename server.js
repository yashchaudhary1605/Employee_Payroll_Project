import express from "express";
import dotenv from "dotenv";
import connection from "./config/db.js";
import logger from "./Middleware/Logging.js";
import employeeRoutes from "./Routing/routes.js";
import * as controller from "./functions/functions.js";

dotenv.config();

const app = express();

connection();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
import methodOverride from "method-override";
app.use(methodOverride("_method"));

app.use(express.json());
app.use(logger);

app.use("/employees", employeeRoutes);
app.post("/employees/payroll/:id/email", controller.sendPayrollEmail);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

export default app;
