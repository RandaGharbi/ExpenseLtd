import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appName: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <h1 className={classes.appName}>claims expense</h1>
      </AppBar>
    </div>
  );
};
