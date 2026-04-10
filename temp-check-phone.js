import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/employee_payroll';
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dept: String,
  basic_sal: Number,
  date: String,
  gender: String,
  photo_url: String,
}, { timestamps: true });

const Employee = mongoose.model('EmployeeTemp', employeeSchema, 'employees');

try {
  await mongoose.connect(uri);
  const emp = await Employee.findOne().lean();
  console.log(emp);
  await mongoose.disconnect();
} catch (err) {
  console.error(err);
  process.exit(1);
}
