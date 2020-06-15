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
    backgroundImage: `url(${'https://www.lediplomate.tn/wp-content/uploads/2019/05/croissance-courbe.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '77rem',
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
