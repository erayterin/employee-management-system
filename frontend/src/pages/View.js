import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleEmployee } from "../redux/actions";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root:{
    minWidth:400,
    display: "inline-block",
  },
}));

const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { employee } = useSelector((state) => state.data);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleEmployee(id));
  }, []);
  return (
    <Card className={classes.root} sx={{ minWidth: 275 }}>
      <Button
        style={{ width: "100px", marginTop: "30px" }}
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Go Back
      </Button>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }}   gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h4" component="h2" textTransform= 'uppercase'  gutterBottom>
          Employee Detail
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'  >
          Employee Id
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique' >
          {employee.employee_id}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'  >
          First Name
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
        {employee.first_name}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Last Name
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.last_name}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Email
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.email}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Phone Number
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.phone_number}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Hire Date
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.hire_date}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Job Id 
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.job_id}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Salary 
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.salary}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Commission Pct 
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.commission_pct}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'   >
          Manager Id 
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.manager_id}
        </Typography>
        <Typography variant="h5" textTransform= 'uppercase' fontWeight='bold'  >
          Department Id
        </Typography>
        <Typography variant="h6"  fontWeight='medium'   fontStyle='oblique'  >
          {employee.department_id}
        </Typography>
        {/* <Typography    >
          adjective
        </Typography>
        <Typography variant="body2" fontSize="theme.typography.pxToRem(35)">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default View;
