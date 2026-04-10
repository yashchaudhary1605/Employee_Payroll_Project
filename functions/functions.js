import Employee from "../Models/Employee.js";

const calculateSalary = (basic) => {
  basic = Number(basic);
  const hra = basic * 0.2;
  const da = basic * 0.1;
  const pf = basic * 0.05;

  return basic + hra + da - pf;
};

const generateEmail = (name) => {
  const cleanName = String(name || "").trim().toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ");
  const parts = cleanName.split(" ").filter(Boolean);
  const localPart = parts.length > 1 ? `${parts[0]}.${parts[parts.length - 1]}` : parts[0] || "employee";
  const suffix = Math.floor(10 + Math.random() * 90);
  return `${localPart}${suffix}@company.com`;
};

const buildReceiptHtml = (emp, netSalary) => {
  const basic = Number(emp.basic_sal);
  const hra = Math.round(basic * 0.2);
  const da = Math.round(basic * 0.1);
  const pf = Math.round(basic * 0.05);
  const gross = basic + hra + da;

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Payroll Receipt</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f4f6fb; }
      .receipt { width: 100%; max-width: 800px; margin: 0 auto; background: white; padding: 32px; box-sizing: border-box; }
      h1 { margin: 0 0 16px; color: #111827; }
      .meta, .section { margin-bottom: 24px; }
      .meta span, .info-row span { display: block; color: #475569; margin-top: 4px; }
      .info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      .info-box { padding: 16px; border: 1px solid #e5e7eb; border-radius: 14px; background: #f8fafc; }
      .info-box strong { display: block; margin-bottom: 8px; color: #111827; }
      table { width: 100%; border-collapse: collapse; margin-top: 16px; }
      th, td { padding: 14px 16px; border: 1px solid #e5e7eb; }
      th { background: #eff6ff; color: #0f172a; text-align: left; }
      .total-row td { font-weight: 700; background: #f9fafb; }
    </style>
  </head>
  <body>
    <div class="receipt">
      <h1>Payroll Receipt</h1>
      <div class="meta">
        <div class="info-row"><strong>Employee:</strong><span>${emp.name}</span></div>
        <div class="info-row"><strong>Department:</strong><span>${emp.dept}</span></div>
        <div class="info-row"><strong>Email:</strong><span>${emp.email}</span></div>
        <div class="info-row"><strong>Employee ID:</strong><span>${emp.id}</span></div>
      </div>
      <div class="info-grid">
        <div class="info-box"><strong>Phone</strong><span>${emp.phone || "Not provided"}</span></div>
        <div class="info-box"><strong>Joining Date</strong><span>${emp.date || "Not set"}</span></div>
      </div>
      <div class="section">
        <table>
          <thead>
            <tr><th>Description</th><th>Amount (₹)</th></tr>
          </thead>
          <tbody>
            <tr><td>Basic Salary</td><td>${basic.toLocaleString('en-IN')}</td></tr>
            <tr><td>HRA</td><td>${hra.toLocaleString('en-IN')}</td></tr>
            <tr><td>DA</td><td>${da.toLocaleString('en-IN')}</td></tr>
            <tr><td>PF</td><td>${pf.toLocaleString('en-IN')}</td></tr>
            <tr><td>Gross Salary</td><td>${gross.toLocaleString('en-IN')}</td></tr>
            <tr class="total-row"><td>Net Salary</td><td>${netSalary.toLocaleString('en-IN')}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>`;
};

const normalizeWhatsappPhone = (phone) => {
  const digits = String(phone || "").replace(/[^0-9]/g, "");
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return `91${digits.slice(1)}`;
  }
  return digits;
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("list", { employees });
  } catch (err) {
    res.send("Error fetching employees: " + err.message);
  }
};

export const getEditPage = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);

    if (!emp) return res.send("Employee not found");

    res.render("edit", { emp });
  } catch (err) {
    res.send("Error fetching employee: " + err.message);
  }
};

export const addEmployee = async (req, res) => {
  try {
    const email = req.body.email?.trim() || generateEmail(req.body.name);
    const emp = new Employee({
      name: req.body.name,
      email,
      phone: req.body.phone?.trim() || "",
      gender: req.body.gender,
      dept: req.body.department,
      basic_sal: Number(req.body.basicSalary),
      date: req.body.joiningDate,
      photo_url: req.body.photoUrl || "",
    });

    await emp.save();
    res.redirect("/employees");
  } catch (err) {
    res.send("Error adding employee: " + err.message);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const existingEmp = await Employee.findById(id);

    if (!existingEmp) return res.send("Employee not found");

    const updatedEmp = await Employee.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email?.trim() || existingEmp.email || generateEmail(req.body.name),
        phone: req.body.phone?.trim() || existingEmp.phone || "",
        gender: req.body.gender,
        dept: req.body.department,
        basic_sal: Number(req.body.basicSalary),
        date: req.body.joiningDate,
        photo_url: req.body.photoUrl || "",
      },
      { new: true },
    );

    res.redirect("/employees");
  } catch (err) {
    res.send("Error updating employee: " + err.message);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const userid = req.params.id;
    const employee = await Employee.findByIdAndDelete(userid);

    if (!employee) {
      return res.send("Employee not Found");
    }

    res.redirect("/employees");
  } catch (err) {
    res.send("Error deleting employee: " + err.message);
  }
};

const buildWhatsappMessage = (emp, netSalary) => {
  const basic = Number(emp.basic_sal);
  const hra = Math.round(basic * 0.2);
  const da = Math.round(basic * 0.1);
  const pf = Math.round(basic * 0.05);
  const gross = basic + hra + da;

  return `Payroll Receipt for ${emp.name}\nEmployee ID: ${emp.id}\nDepartment: ${emp.dept}\nEmail: ${emp.email}\n\nSalary Breakdown (₹):\nBasic Salary: ${basic.toLocaleString('en-IN')}\nHRA: ${hra.toLocaleString('en-IN')}\nDA: ${da.toLocaleString('en-IN')}\nPF: ${pf.toLocaleString('en-IN')}\nGross Salary: ${gross.toLocaleString('en-IN')}\nNet Salary: ${netSalary.toLocaleString('en-IN')}\n\nThank you for using Employee Payroll.`;
};

const buildWhatsappLink = (phone, message) => {
  const digits = normalizeWhatsappPhone(phone);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

export const getPayroll = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);

    if (!emp) {
      return res.send("Employee not found");
    }

    const netSalary = calculateSalary(emp.basic_sal);
    const whatsappLink = emp.phone ? buildWhatsappLink(emp.phone, buildWhatsappMessage(emp, netSalary)) : null;
    const status = req.query.status;
    const message = req.query.message || null;

    res.render("payroll", { emp, netSalary, status, message, whatsappLink });
  } catch (err) {
    res.send("Error fetching payroll: " + err.message);
  }
};
