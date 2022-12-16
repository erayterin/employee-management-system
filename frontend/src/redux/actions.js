import axios from "axios";
import * as types from "./actionType";

const EMPLOYEE_BASE_URL = "http://127.0.0.1:8080/springwildfly5/api";
// Actions ise bu global state'e gönderilecek verinin gövdesidir.
const getEmployees = (employees) => ({
  type: types.GET_EMPLOYEES,
  payload: employees,
});

const employeeAdded = () => ({
  type: types.ADD_EMPLOYEE,
});

const employeeDeleted = () => ({
  type: types.DELETE_EMPLOYEE,
});

const employeeUpdated = () => ({
  type: types.UPDATE_EMPLOYEE,
});

const singleEmployee = (employee) => ({
  type: types.GET_SINGLE_EMPLOYEE,
  payload: employee,
});

export const loadEmployees = () => {
  return function (dispatch){
    axios.get(EMPLOYEE_BASE_URL+"/getSort").then((resp) => {
      console.log("response : ", resp);
      dispatch(getEmployees(resp.data));
    }).catch(err => console.log(err));
  };
}

export const addEmployee = (employee) => {
  return function (dispatch){
    const data = JSON.stringify({
      "first_name": employee.firstName,
      "last_name": employee.lastName,
      "email": employee.email,
      "phone_number": employee.phoneNumber,
      "hire_date": employee.hireDate,
      "job_id": employee.jobId,
      "salary": employee.salary,
      "commission_pct": employee.commissionPct,
      "manager_id": employee.managerId,
      "department_id": employee.departmentId
    });
    const customConfig = {
      headers: {
      'Content-Type': 'application/json'
      }
  };
    axios.post(EMPLOYEE_BASE_URL+"/add", data, customConfig).then((resp) => {
      console.log("response : ", resp);
      dispatch(employeeAdded());
      dispatch(loadEmployees());
    }).catch(err => console.log(err));
  };
}

export const deleteEmployee = (id) => {
  return function (dispatch){
    axios.delete(EMPLOYEE_BASE_URL+"/delete/"+id).then((resp) => {
      console.log("response : ", resp);
      dispatch(employeeDeleted());
      dispatch(loadEmployees());
    }).catch(err => console.log(err));
  };
}

export const getSingleEmployee = (id) => {
  return function (dispatch){
    axios.get(EMPLOYEE_BASE_URL+"/getId/"+id).then((resp) => {
      console.log("response : ", resp);
      dispatch(singleEmployee(resp.data));
    }).catch(err => console.log(err));
  };
}

export const updateEmployee = (employee) => {
  return function (dispatch){
    axios.put(EMPLOYEE_BASE_URL+"/update", employee).then((resp) => {
      console.log("response : ", resp);
      dispatch(employeeUpdated());
      dispatch(loadEmployees());
    }).catch(err => console.log(err));
  };
}