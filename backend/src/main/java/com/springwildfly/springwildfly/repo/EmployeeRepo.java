package com.springwildfly.springwildfly.repo;



import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.springwildfly.springwildfly.model.Employee;





@Repository
public class EmployeeRepo {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@Value("${spring.datasource.url}")
	private String dbUrl;
	
	@Value("${spring.datasource.username}")
	private String username;
	
	@Value("${spring.datasource.password}")
	private String password;
    
	Connection con = null;
    
	private final String get_all = "SELECT * FROM EMPLOYEES";
	
	
	private RowMapper<Employee> rowMapper = (ResultSet rs, int rowNum) -> {
		Employee emp = new Employee();
		emp.setEmployee_id(rs.getInt(1));
		emp.setFirst_name(rs.getString(2));
		emp.setLast_name(rs.getString(3));
		emp.setEmail(rs.getString(4));
		emp.setPhone_number(rs.getString(5));
		emp.setHire_date(rs.getString(6));
		emp.setJob_id(rs.getString(7));
		emp.setSalary(rs.getInt(8));
		emp.setCommission_pct(rs.getInt(9));
		emp.setManager_id(rs.getInt(10));
		emp.setDepartment_id(rs.getInt(11));
		
		return emp;
	};
	public List<Employee> findAll() {
		return jdbcTemplate.query(get_all, rowMapper);
	}
	
	public Employee getEmployeeId(int id) throws SQLException {
		
		
		
        Employee employee = new Employee();
        try {
        	this.con = DriverManager.getConnection(this.dbUrl, this.username, this.password);
        	//Class.forName("oracle.jdbc.driver.OracleDriver");  
            //System.out.println("DB Oracle");
            //step3 create the statement object  
            CallableStatement cstmt = this.con.prepareCall("{call get_employee_id(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
            cstmt.setInt(1, id);  
            cstmt.registerOutParameter(2, Types.VARCHAR);
            cstmt.registerOutParameter(3, Types.VARCHAR);
            cstmt.registerOutParameter(4, Types.VARCHAR);
            cstmt.registerOutParameter(5, Types.VARCHAR);
            cstmt.registerOutParameter(6, Types.DATE);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.NUMERIC);
            cstmt.registerOutParameter(9, Types.NUMERIC);
            cstmt.registerOutParameter(10, Types.NUMERIC);
            cstmt.registerOutParameter(11, Types.NUMERIC);
            
            cstmt.executeQuery();
            
    		employee.setEmployee_id(id);
    		employee.setFirst_name(cstmt.getString(2));
    		employee.setLast_name(cstmt.getString(3));
    		employee.setEmail(cstmt.getString(4));
    		employee.setPhone_number(cstmt.getString(5));
    		Date dateObj = cstmt.getDate(6);
    		employee.setHire_date(dateObj.toString());
    		employee.setJob_id(cstmt.getString(7));
    		employee.setSalary(cstmt.getInt(8));
    		employee.setCommission_pct(cstmt.getInt(9));
    		employee.setManager_id(cstmt.getInt(10));
    		employee.setDepartment_id(cstmt.getInt(11));
    		
    		
    		return employee;
        } catch (SQLException e) {
            System.out.println("Error");
            e.printStackTrace();
            return employee;
        }
        finally {
        	this.con.close();
        }
	}
	
	public List<Employee> getEmployeeIdSort() throws SQLException {

        List<Employee> listEmployees = new ArrayList<Employee>();

        try {
        	this.con = DriverManager.getConnection(this.dbUrl, this.username, this.password);
            CallableStatement cstmt = this.con.prepareCall("{call get_sort_employees_id(?)}"); 
            cstmt.registerOutParameter(1, Types.REF_CURSOR);
            cstmt.executeQuery();
            ResultSet rs = (ResultSet)cstmt.getObject(1);
            while(rs.next()){
            	Employee employee = new Employee();
	    		employee.setEmployee_id(rs.getInt("EMPLOYEE_ID"));
	    		employee.setFirst_name(rs.getString("FIRST_NAME"));
	    		employee.setLast_name(rs.getString("LAST_NAME"));
	    		employee.setEmail(rs.getString("EMAIL"));
	    		employee.setPhone_number(rs.getString("PHONE_NUMBER"));
	    		Date dateObj = rs.getDate("hire_date");
	    		employee.setHire_date(dateObj.toString());
	    		employee.setJob_id(rs.getString("JOB_ID"));
	    		employee.setSalary(rs.getInt("SALARY"));
	    		employee.setCommission_pct(rs.getInt("commission_pct"));
	    		employee.setManager_id(rs.getInt("manager_id"));
	    		employee.setDepartment_id(rs.getInt("department_id"));
	    		listEmployees.add(employee);
             }
    		return listEmployees;
        } catch (SQLException e) {
            e.printStackTrace();
            return listEmployees;
        }
        finally {
        	this.con.close();
        }
	}

	public boolean addEmployee(Employee e) throws SQLException {

        try {
        	this.con = DriverManager.getConnection(this.dbUrl, this.username, this.password);
            CallableStatement cstmt = this.con.prepareCall("{call insert_employees(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
            cstmt.setString(1, e.getFirst_name());  
            cstmt.setString(2, e.getLast_name());
            cstmt.setString(3, e.getEmail());
            cstmt.setString(4, e.getPhone_number());
            cstmt.setString(5, e.getHire_date());
            cstmt.setString(6, e.getJob_id());
            cstmt.setInt(7, e.getSalary());
            cstmt.setInt(8, e.getCommission_pct());
            cstmt.setInt(9, e.getManager_id());
            cstmt.setInt(10, e.getDepartment_id());
            cstmt.executeQuery();
    		return true;
        } catch (SQLException exception) {
            System.out.println("Error");
            exception.printStackTrace();
            return false;
        }
        finally {
        	this.con.close();
        }
	}

	public boolean updateEmployee(Employee e) throws SQLException {
		
        try {
        	this.con = DriverManager.getConnection(this.dbUrl, this.username, this.password);
            CallableStatement cstmt = this.con.prepareCall("{call UPDATE_EMPLOYEES(?, ?, ?, ?, ?, ?, ?, ?, ?)}");
            cstmt.setInt(1, e.getEmployee_id());
            cstmt.setString(2, e.getFirst_name());  
            cstmt.setString(3, e.getLast_name());
            cstmt.setString(4, e.getEmail());
            cstmt.setString(5, e.getPhone_number());
            cstmt.setString(6, e.getJob_id());
            cstmt.setInt(7, e.getSalary());
            cstmt.setString(8, e.getHire_date());
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.executeQuery();
            if(cstmt.getInt(9) > 0)
            { 
        		return true;
            }
            else {
        		return false;
            }	
        } catch (SQLException exception) {
            System.out.println("Error");
            exception.printStackTrace();
            return false;
        }
        finally {
        	this.con.close();
        }
	}

	public boolean deleteEmployeeId(int id) throws SQLException {
        try {
        	this.con = DriverManager.getConnection(this.dbUrl, this.username, this.password);
            CallableStatement cstmt = this.con.prepareCall("{call DELETE_EMPLOYEE(?,?)}");
            cstmt.setInt(1, id);
        	cstmt.registerOutParameter(2, Types.INTEGER);
            cstmt.executeQuery();
            if(cstmt.getInt(2) == 0)
            {
        		return true;
            }
            else {
        		return false;
            }
        } catch (SQLException exception) {
            System.out.println("Error");
            exception.printStackTrace();
            return false;
        }
        finally {
        	this.con.close();
        }
	}

	

	
}