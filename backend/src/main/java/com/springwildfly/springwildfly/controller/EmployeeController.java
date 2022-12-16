package com.springwildfly.springwildfly.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springwildfly.springwildfly.model.Employee;
import com.springwildfly.springwildfly.service.EmployeeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	
	@GetMapping("/getAll")
	public List<Employee> getAll(){
		return employeeService.getAll();
	}
	@GetMapping("/getSort")
	public List<Employee> getEmployeeIdSort() throws SQLException{
		return employeeService.getEmployeeIdSort();
	}
	@GetMapping("/getId/{id}")
	@ResponseBody
	public Employee getEmployeeId(@PathVariable int id) throws SQLException {
		return employeeService.getEmployeeId(id);
	}
	
	@PostMapping("/add")
	public String addEmployee(@RequestBody Employee emp) throws SQLException {
		return employeeService.addEmployee(emp);
	}
	
	@PutMapping("/update")
	public String updateEmployee(@RequestBody Employee emp) throws SQLException {
		return employeeService.updateEmployee(emp);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteEmployeeId(@PathVariable int id) throws SQLException {
		return employeeService.deleteEmployeeId(id);
	}
	
}
