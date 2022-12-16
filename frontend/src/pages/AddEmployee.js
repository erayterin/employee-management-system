import React, { useState, useEffect, useStyles } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/actions";
const AddEmployee = () => {
  const [employeeState, setEmployeeState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hireDate: "",
    jobId: "",
    salary: 0,
    commissionPct: 0,
    managerId: 0,
    departmentId: 0
  });
  
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    hireDate,
    jobId,
    salary,
    commissionPct,
    managerId,
    departmentId,
  } = employeeState;
  
  const [error, setError] = useState("");
  

  let dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phoneNumber || !hireDate || !jobId || !salary || !managerId || !departmentId) {
      setError("Please fill all Input field !");
    }
    else{
      dispatch(addEmployee(employeeState));
      setError("");
      history.push("/");
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    console.log(!isNaN(+value));
    console.log(name);
    if(!isNaN(+value) && !(name === 'phoneNumber' || name === 'hireDate')){
      value = parseInt(value);
    }
    console.log(typeof value)
    setEmployeeState({ ...employeeState, [name]: value });
  };

  let history = useHistory();
  return (
    <div>
      <h1>Add Employee</h1>
      {error && <h3 style={{color:"red"}}>{error}</h3>}
      <Button
        style={{ width: "100px", marginTop: "30px" }}
        variant="contained"
        color="secondary"
        onClick={() => history.push("/")}
      >
        Go Back
      </Button>
      <Box
        component="form"
        sx={{
          marginTop: 10,
          "& > :not(style)": { m: 1, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          name="firstName"
          value={firstName}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={lastName}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          type="email"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          name="phoneNumber"
          value={phoneNumber}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Hire Date"
          variant="outlined"
          name="hireDate"
          value={hireDate}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Job Id"
          variant="outlined"
          name="jobId"
          value={jobId}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Salary"
          variant="outlined"
          name="salary"
          value={salary}
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Commission Pct"
          variant="outlined"
          name="commissionPct"
          value={commissionPct}
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Manager Id"
          variant="outlined"
          name="managerId"
          value={managerId}
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Department Id"
          variant="outlined"
          name="departmentId"
          value={departmentId}
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <Button
          style={{ width: "100px" }}
          variant="contained"
          type="submit"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AddEmployee;
