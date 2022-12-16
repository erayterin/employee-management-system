import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEmployee,
  getSingleEmployee,
  loadEmployees,
} from "../redux/actions";
import { useHistory } from "react-router-dom";

const useStylesButton = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});

const Home = () => {
  const classes = useStyles();
  const buttonClasses = useStylesButton();

  const { employees } = useSelector((employeeState) => employeeState.data);
  let dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    dispatch(loadEmployees());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteEmployee(id));
    }
  };
  return (
    <>
      <div className={buttonClasses.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/addEmployee")}
        >
          Add employee
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee Id</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Hire Date</StyledTableCell>
              <StyledTableCell align="center">Job Id</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center">Commission Pct</StyledTableCell>
              <StyledTableCell align="center">Manager Id</StyledTableCell>
              <StyledTableCell align="center">Department Id</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees &&
              employees.map((employee) => (
                <StyledTableRow key={employee.employee_id}>
                  <StyledTableCell component="th" scope="row">
                    {employee.employee_id}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {employee.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.email}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.phone_number}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.hire_date}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.job_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.salary}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.commission_pct}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.manager_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.department_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className={buttonClasses.root}>
                      <ButtonGroup
                        variant="contained"
                        aria-label="contained primary button group"
                      >
                        <Button
                          color="secondary"
                          style={{ marginRight: "5px" }}
                          onClick={() => handleDelete(employee.employee_id)}
                        >
                          Delete
                        </Button>
                        <Button
                          color="primary"
                          style={{ marginRight: "5px" }}
                          onClick={() =>
                            history.push(
                              "/editEmployee/" + employee.employee_id
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            history.push(
                              "/viewEmployee/" + employee.employee_id
                            )
                          }
                        >
                          View
                        </Button>
                      </ButtonGroup>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
