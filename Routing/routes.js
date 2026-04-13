import express from "express";
import * as controller from "../functions/functions.js";

const router = express.Router();

router.get("/", controller.getEmployees);

router.get("/add", (req, res) => {
  res.render("form"); // your file is form.ejs
});
router.get("/edit/:id", controller.getEditPage);

router.post("/", controller.addEmployee);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

router.get("/payroll/:id", controller.getPayroll);
router.post("/payroll/:id/email", controller.sendPayrollEmail);

export default router;
