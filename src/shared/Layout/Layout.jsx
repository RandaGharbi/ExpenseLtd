import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/styles';

import theme from '../theme';
import Footer from './Footer';
import Header from './Header';

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
    minHeight: '800px',
    // backgroundImage: `url(${'https://c8.alamy.com/comp/KF05RG/monthly-budget-family-income-profit-and-expense-background-KF05RG.jpg'})`,
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
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