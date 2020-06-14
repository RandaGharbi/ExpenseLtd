import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Claim Expense LTD -'}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default () => (
  <footer>
    <Box pt={4}>
      <Copyright />
    </Box>
  </footer>
);
