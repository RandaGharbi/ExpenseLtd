import React from 'react';
import {Pie} from 'react-chartjs-2';

import { useValues } from 'kea';
import claimLogic from '../../Logic';
import { useClaimer } from '../../Logic';

const StatisticPage = () => {
  const { requestNumber, approvedRequestNumber, refusedRequestNumber, total } = useValues(claimLogic);
  const { calculateStatistic } = useClaimer();
  const data = calculateStatistic(requestNumber,approvedRequestNumber, refusedRequestNumber, total);

    return (
      <div>
        <Pie data={data} />
      </div>
    );
  };
  export default StatisticPage;
