import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/styles';

import theme from '../theme';
import Footer from './Footer';
import Header from './Header';

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};
export default Layout;