package com.springwildfly.springwildfly.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springwildfly.springwildfly.model.Employee;
import com.springwildfly.springwildfly.repo.EmployeeRepo;

@Service
public class EmployeeService {

	@Autowired
	EmployeeRepo employeeRepo;

	public List<Employee> getAll() {
		// TODO Auto-generated method stub
		return employeeRepo.findAll();
	}
	public Employee getEmployeeId(int id) throws SQLException {
		return employeeRepo.getEmployeeId(id);
	}
	public String addEmployee(Employee emp) throws SQLException {
		String response;
		if(employeeRepo.addEmployee(emp)) {response = "Success add.";}
		else { response = "Wrong try again.";}
		return response;
	}
	public List<Employee> getEmployeeIdSort() throws SQLException {
		return employeeRepo.getEmployeeIdSort();
	}
	public String updateEmployee(Employee emp) throws SQLException {
		String response;
		if(employeeRepo.updateEmployee(emp)) {
			response = "Success updated";
		}
		else {
			response = "Wrong updated";
		}
		return response;
	}
	public String deleteEmployeeId(int id) throws SQLException {
		String response;
		if(employeeRepo.deleteEmployeeId(id)) {
			response = "Success deleted";
		}
		else {
			response = "Wrong deleted";
		}
		return response;
	}
	
}
