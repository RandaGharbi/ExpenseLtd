import { useActions, useValues } from 'kea';
import uid from 'uid';

import claimLogic from './Logic';

export default function useClaimer() {
  const { claimers, loadingAddClaimer, loadingFetchClaimers } = useValues(claimLogic);
  const { syncClaimer } = useActions(claimLogic);

  const addClaimer = newClaimer => {
    const newClaimers = [...claimers, { ...newClaimer, id: uid() }];
    syncClaimer(newClaimers);
  };

  const deleteClaimer = deltedClaimer => {
    const newClaimers = claimers.filter(item => item.id !== deltedClaimer.id);
    syncClaimer(newClaimers);
  };

  const updateClaimer = updatedClaimer => {
    const newClaimers = claimers.reducer((acc, item) => {
      if (item.id === updatedClaimer.id) {
        return [ ...acc, {id: item.id, ...updatedClaimer}];
      }
      return [...acc, item];
    }, []);
    syncClaimer(newClaimers);
  };

  const calculateStatistic = (
    approvedRequestNumber,
    refusedRequestNumber,
    ) => ({
        labels: [
          'approved request number',
          'refused request number',
        ],
        datasets: [{
          data: [approvedRequestNumber, refusedRequestNumber],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#bce6bc5e'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#bce6bc5e'
          ]
        }]
    });

  return {
    claimers,
    addClaimer,
    deleteClaimer,
    updateClaimer,
    loadingAddClaimer,
    loadingFetchClaimers,
    calculateStatistic,
  };
}
