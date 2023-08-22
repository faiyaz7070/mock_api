const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        enum: ['Tech', 'Marketing', 'Operations'],
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },
})

const Employee = mongoose.model("Employee", EmployeeSchema)

module.exports={
    Employee
}