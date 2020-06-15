import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
        width: '52%'
    },
    edit:{
        width: '25%',
        marginTop: '7rem',
    },
    formWrapper: {
        position: 'relative',
        top: '6rem',
        textAlign: 'center',
    },
    Fade: {
        background: 'white',
        height: '28rem',
        paddingLeft: '7rem',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function ModalEdit() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = async () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                    handleOpen();
                }}
            >
                View Details
             </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} className={classes.Fade}>
                    <form className={classes.appWrapper}>
                        <TextField
                            className={classes.margin}
                            id="name"
                            label="Name"
                        />
                        <TextField
                            className={classes.margin}
                            id="expense-date"
                            label="Date of The Expense"
                        />
                        <InputLabel id="demo-simple-select-label" className={classes.label}>Reason</InputLabel>
                        <textarea
                            id="story"
                            name="story"
                            rows="5" cols="33" placeholder="Reason" className={classes.description} />
                        <TextField
                            className={classes.margin}
                            id="Amount"
                            label="€"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.edit}
                            endIcon={<EditIcon />}
                        /*onClick={() => {
                            const newArray2 = claimers.map(
                              item => {
                                if(item.name===row.name){
                                  return {
                                    
                                  }//return new data updated in form 
                                }
                                return item
                              }
                              )
                            console.log('newArray', newArray2)
                            addClaimer(newArray2)
                          }}*/
                        >
                            Edit
             </Button>
                    </form>
                </Fade>
            </Modal>
        </div>
    );
}
