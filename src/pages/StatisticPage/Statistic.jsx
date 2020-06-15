import React from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

import { useValues } from 'kea';
import claimLogic from '../../Logic';
import { useClaimer } from '../../Logic';

const StatisticPage = () => {
  const { requestNumber, approvedRequestNumber, refusedRequestNumber, total } = useValues(claimLogic);
  const { calculateStatistic } = useClaimer();
  const data = calculateStatistic(requestNumber, approvedRequestNumber, refusedRequestNumber, total);

  return (
    <div>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
        >
          Create Claimer
          </Button>
      </Link>
      <Pie data={data} />
    </div>
  );
};
export default StatisticPage;
