package com.information.employee.service;

import com.information.employee.model.Employee;
import com.information.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository empRepository;

    // CREATE
    public Employee createEmployee(Employee emp){
        return empRepository.save(emp);
    }

    // READ
    public List<Employee> getEmployees(){
        return empRepository.findAll();
    }

    public Optional<Employee> getEmployee(Long empId){
        return empRepository.findById(empId);
    }
    // DELETE
    public void deleteEmployee(Long empId){
        empRepository.deleteById(empId);
    }

    // UPDATE
    public Employee updateEmployee(Long empId, Employee employeeDetails){
        Employee emp = empRepository.findById(empId).get();
        emp.setFirstName(employeeDetails.getFirstName());
        emp.setLastName(employeeDetails.getLastName());
        emp.setEmailId(employeeDetails.getEmailId());
        return empRepository.save(emp);
    }
}
