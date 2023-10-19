package com.information.employee.controller;

import com.information.employee.model.Employee;
import com.information.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @RequestMapping(value="/employees", method= RequestMethod.POST)
    public Employee createEmployee(@RequestBody Employee emp){
        return employeeService.createEmployee(emp);
    }

    @RequestMapping(value="/employees", method=RequestMethod.GET)
    public List<Employee> readEmployees(){
        return employeeService.getEmployees();
    }

    @RequestMapping(value="/employees/{empId}", method=RequestMethod.GET)
    public Optional<Employee> getEmployee(@PathVariable(value="empId") Long id){
        return employeeService.getEmployee(id);
    }

    @RequestMapping(value="/employees/{empId}", method=RequestMethod.PUT)
    public Employee readEmployees(@PathVariable(value="empId") Long id, @RequestBody Employee empDetails){
        return employeeService.updateEmployee(id, empDetails);
    }
    @RequestMapping(value="/employees/{empId}", method=RequestMethod.DELETE)
    public void deleteEmployees(@PathVariable(value="empId") Long id){
        employeeService.deleteEmployee(id);
    }
}
