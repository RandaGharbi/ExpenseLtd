import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { useActions, useValues } from 'kea';
import claimLogic from "../../Logic";
import {
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  appWrapper: {
    width: '25%',
    height: '35rem',
    margin: 'auto',
    border: '1px solid #0000002e'
  },
  switch: {
    paddingTop: '4rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  description: {
    resize: 'none',
    background: 'none',
    border: '1px solid #0000007a',
    paddingTop: '70px',
    marginTop: '15px',
    width: '65%',
    textAlign: 'center'
  },
  label: {
    paddingLeft: '8px',
    paddingTop: '20px',
    color: 'black',
    fontWeight: '200',
  },
  button: {
    marginLeft: '70%',
  },
  formWrapper: {
    position: 'relative',
    top: '6rem',
    textAlign: 'center'
  }
}));


export default () => {

  const classes = useStyles();
  const [state, setState] = useState({ Approved: true, Refused: false });
  const [name, setName] = useState('');
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')
  const [amount, setAmount] = useState('')
  const { claimers, loadingAddClaimer } = useValues(claimLogic)
  const { addClaimer } = useActions(claimLogic);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  console.log("claimers", claimers)


  return (
    <div>
      <Link to="/" className={classes.link}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Back Home
  </Button>
      </Link>
      {
        loadingAddClaimer ? <p>loadinng add claimer</p> :
          <div className={classes.formWrapper}>
            <form className={classes.appWrapper}>
              <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                className={classes.margin}
                id="name"
                label="Name"
              />
              <TextField
                value={date}
                onChange={e => setDate(e.target.value)}
                className={classes.margin}
                id="expense-date"
                label="Date of The Expense"
              />
              <InputLabel id="demo-simple-select-label" className={classes.label}>Reason</InputLabel>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                id="story"
                name="story"
                rows="5" cols="33" placeholder="Reason" className={classes.description} />
              <TextField
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className={classes.margin}
                id="Amount"
                label="€"
              />
              <FormGroup className={classes.switch}>
                <FormControlLabel
                  control={<Switch checked={state.gilad} onChange={handleChange} name="Approved" />}
                  label="Expense Approved"
                />
              </FormGroup>
            </form>
            <Button
              onClick={() => {
                addClaimer([...claimers, { // dispatch action in claimLogic actions 
                  name,
                  date,
                  reason,
                  amount,
                }])
              }}
              variant="contained" className={classes.costum} type="submit" color="primary">add claimer</Button>
          </div>
      }
    </div>
  );
};
