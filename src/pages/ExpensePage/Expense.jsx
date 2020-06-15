import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useFormik } from 'formik';

import { useClaimer } from '../../Logic';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Veuillez remplir ce champs';
  }
  if (!values.date) {
    errors.date = 'Veuillez remplir ce champs';
  }
  if (!values.reason) {
    errors.reason = 'Veuillez remplir ce champs';
		}

  if (!values.amount) {
    errors.amount = 'Veuillez remplir ce champs';
  }

  return errors;
};

export default (props) => {
		const isUpdate = props.location && props.location.state && props.location.state.id
		const clamerDataToUpdate =  props.location.state || {};
  const classes = useStyles();

  const { addClaimer, loadingAddClaimer, updateClaimer } = useClaimer();

  const formik = useFormik({
    initialValues: {
      name: clamerDataToUpdate.name || '',
      date: clamerDataToUpdate.date || '',
						reason: clamerDataToUpdate.reason || '',
						amount: clamerDataToUpdate.amount || 0,
						isApproved: clamerDataToUpdate.isApproved || false
    },
    validate,
    onSubmit: values => {
    console.log("values", {...clamerDataToUpdate, ...values})
					
					isUpdate ? updateClaimer({...clamerDataToUpdate, ...values}) : addClaimer(values);
    },
  });
  if (loadingAddClaimer) {
    return <p>loadinng {isUpdate ? 'update' : 'add'} claimer</p>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Paper>
          <Button type="submit" variant="contained" color="primary" href="/">
            Back Home
          </Button>
        </Paper>
        <Typography component="h1" variant="h5">
           {isUpdate ? 'UPDATE' : 'ADD'} CLAIMER
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom & Prenom"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.name}
            helperText={formik.touched.name ? formik.errors.name : ''}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="date"
            label="Date "
            type="date"
            id="date"
            onChange={formik.handleChange}
            value={formik.values.date}
            helperText={formik.touched.date ? formik.errors.date : ''}
            error={formik.touched.date && Boolean(formik.errors.date)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="reason"
            label="Reason "
            id="date"
            onChange={formik.handleChange}
            value={formik.values.reason}
            helperText={formik.touched.reason ? formik.errors.reason : ''}
            error={formik.touched.reason && Boolean(formik.errors.reason)}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={4}
            placeholder="Reason ..."
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            id="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
            helperText={formik.touched.amount ? formik.errors.amount : ''}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
          />
										 <FormControlLabel
													control={
													<Switch
													 checked={formik.values.isApproved}
              onChange={formik.handleChange}
														name="isApproved" />
													}
													label={formik.values.isApproved ? 'Approved' : 'Refused'}
											/>
          <Button
            type="submit"
            variant="contained"
												color="secondary"
												fullWidth
            className={classes.submit}
          >
             {isUpdate ? 'UPDATE' : 'ADD'} CLAIMER
          </Button>
        </form>
      </div>
    </Container>
  );
};
