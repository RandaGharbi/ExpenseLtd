import React from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useValues } from 'kea';
import claimLogic from '../../Logic';
import { useClaimer } from '../../Logic';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles({
  root: {
    position: 'relative',
    top: '3rem'
  },
  pie:{
    display: 'block',
    width: '84rem',
    height: '40rem',
    position: 'absolute',
    left: '31rem',
    top: '8rem'
  },
  list:{
    fontSize: '19px',
    position: 'relative',
    right: '19rem',
    bottom: '22rem',
    maxWidth: '23rem',
    height: '23rem',
  },
  element:{
    margin: '2rem'
  }
});

const StatisticPage = () => {
  const classes = useStyles();
  const { requestNumber, approvedRequestNumber, refusedRequestNumber, total } = useValues(claimLogic);
  const { calculateStatistic } = useClaimer();
  const data = calculateStatistic(approvedRequestNumber, refusedRequestNumber );

  return (
    <div className={classes.root}>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          endIcon={<HomeIcon />}
        >
          Home
          </Button>
      </Link>
      <div className={classes.pie}>
      <Pie data={data} />
      <ul className={classes.list}>
        <li className={classes.element}>Request Number: <strong>{requestNumber}</strong></li>
        <li className={classes.element}> Number Request Approved: <strong>{approvedRequestNumber}</strong></li>
        <li className={classes.element}>Number Request Refused: <strong>{refusedRequestNumber}</strong></li>
        <li className={classes.element}>Total Expense: <strong>{total}  € </strong></li>
      </ul>
      </div>
    </div>
  );
};
export default StatisticPage;
