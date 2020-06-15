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
    const newClaimers = claimers.reduce((acc, item) => {
      if (item.id === updatedClaimer.id) {
        return [ ...acc, {id: item.id, ...updatedClaimer}];
      }
      return [...acc, item];
    }, []);
    syncClaimer(newClaimers);
  };

  return {
    claimers,
    addClaimer,
    deleteClaimer,
    updateClaimer,
    loadingAddClaimer,
    loadingFetchClaimers,
  };
}
