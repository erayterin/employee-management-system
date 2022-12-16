import React, { useState, useEffect, useStyles } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEmployee, updateEmployee } from "../redux/actions";

const EditEmployee = () => {
  const [employeeState, setEmployeeState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    hire_date: "",
    job_id: "",
    salary: 0,
    commission_pct: 0,
    manager_id: 0,
    department_id: 0,
  });

  const {
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_id,
    salary,
    commission_pct,
    manager_id,
    department_id,
  } = employeeState;

  const [error, setError] = useState("");
  const { employee } = useSelector((employeeState) => employeeState.data);

  let dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getSingleEmployee(id));
  }, []);

  useEffect(() => {
    if (employee) {
      setEmployeeState({ ...employee });
    }
  }, [employee]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !hire_date ||
      !job_id ||
      !salary ||
      !manager_id ||
      !department_id
    ) {
      setError("Please fill all Input field !");
    } else {
      dispatch(updateEmployee(employeeState));
      setError("");
      history.push("/");
    }
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    console.log(!isNaN(+value));
    console.log(name);
    if (!isNaN(+value) && !(name === "phone_number" || name === "hire_date")) {
      value = parseInt(value);
    }
    console.log(typeof value);
    setEmployeeState({ ...employeeState, [name]: value });
  };

  let history = useHistory();
  return (
    <div>
      <h1>Edit Employee</h1>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
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
          name="first_name"
          value={first_name || ""}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          name="last_name"
          value={last_name || ""}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={email || ""}
          type="email"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          name="phone_number"
          value={phone_number || ""}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Hire Date"
          variant="outlined"
          name="hire_date"
          value={hire_date || ""}
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Job Id"
          variant="outlined"
          name="job_id"
          value={job_id || ""}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Salary"
          variant="outlined"
          name="salary"
          value={salary || ""}
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Commission Pct"
          variant="outlined"
          name="commission_pct"
          value={commission_pct || "0"}
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Manager Id"
          variant="outlined"
          name="manager_id"
          value={manager_id || ""}
          type="number"
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-basic"
          label="Department Id"
          variant="outlined"
          name="department_id"
          value={department_id || ""}
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
          Update
        </Button>
      </Box>
    </div>
  );
};

export default EditEmployee;
