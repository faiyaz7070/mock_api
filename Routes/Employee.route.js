const express = require("express");
const { Employee } = require("../Models/Employee.model")


const employeeRouter = express.Router();

employeeRouter.get("/employees", async(req,res) =>{
    const user = await Employee.find()
    res.send(user)
});

employeeRouter.post('/employees', async (req, res) => {
    let {
        firstName,
        lastName,
        email,
        department,
        salary,
      } = req.body;
    
      try {
        const employee = new Employee({
            firstName,
            lastName,
            email,
            department,
            salary,
        });
    
        await employee.save();
    
        res.status(201).json({ message: 'Employee created successfully' });
      } catch (error) {
        console.error('Failed to create classified', error);
        res.status(500).json({ error: 'Failed to create classified' });
      }
  });

  
  employeeRouter.put('/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedEmployee = req.body;
      await Employee.findByIdAndUpdate(id, updatedEmployee);
      res.json({ message: 'Employee updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update employee' });
    }
  });
  
  employeeRouter.delete('/employees/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Employee.findByIdAndRemove(id);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  });
  
  //sort
  employeeRouter.get('/employees/sort/:order', async (req, res) => {
    try {
      const order = req.params.order; // 'asc' or 'desc'
  
      let sortOption = {};
      if (order === 'asc') {
        sortOption = { salary: 1 };
      } else if (order === 'desc') {
        sortOption = { salary: -1 };
      } else {
        return res.status(400).json({ error: 'Invalid sort order' });
      }
  
      const employees = await Employee.find().sort(sortOption);
  
      res.json(employees);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  });
  
  //filter
  employeeRouter.get('/employees/filter/:department', async (req, res) => {
    try {
      const department = req.params.department;
  
      const employees = await Employee.find({ department });
  
      res.json(employees);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  });

  //searching by firstname
  employeeRouter.get('/employees/search/:firstName', async (req, res) => {
    try {
      const firstName = req.params.firstName;
  
      const employees = await Employee.find({ firstName: { $regex: firstName, $options: 'i' } });
  
      res.json(employees);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  });

module.exports={
    employeeRouter
}