import { kea } from 'kea';
import api from '../shared/utils/api';

const claimLogic = kea({
  actions: () => ({
    syncClaimer: claimer => ({ claimer }), // action qui va déclancer le addclaimer listener
    setClaimer: claimer => ({ claimer }),
    setClaimers: claimers => ({ claimers }),
    setLoadingAddCaimer: loading => ({ loading }),
    setLoadingUpdtateCaimer: loading => ({ loading }),
    setLoadingFetchClaimers: loading => ({ loading }),
    fetchClaimers: () => true, // action qui va déclancer le fetchClaimers listener
  }),

  reducers: () => ({
    claimers: [
      [],
      {
        setClaimers: (state, { claimers }) =>
          [
            ...state,
            ...claimers.data,
          ],
        setClaimer: (_, { claimer }) => claimer,
      },
    ],
    loadingAddClaimer: [
      false,
      {
        setLoadingAddCaimer: (_, { loading }) => loading,
      },
    ],
    loadingUpdateClaimer: [
      false,
      {
        setLoadingUpdateCaimer: (_, { loading }) => loading,
      },
    ],
    loadingFetchClaimers: [
      true,
      {
        setLoadingFetchClaimers: (_, { loading }) => loading,
      },
    ],
  }),

  events: ({ actions }) => ({
    afterMount: () => {
      actions.fetchClaimers();
    },
  }),

  listeners: props => {
    const { actions } = props;
    return {
      fetchClaimers: async () => {
        try {
          const claimersResult = await api.get('/randagharbi/Claimers');
          actions.setClaimers(claimersResult);
          actions.setLoadingFetchClaimers(false);
        } catch (error) {
          actions.setClaimers({ data: [] });
          actions.setLoadingFetchClaimers(false);
        }
      },
      syncClaimer: async ({ claimer }) => {
        // destruct claimer envoyé(returouné ) par l'action
        actions.setLoadingAddCaimer(true); // true pour afficher loading regarde le composant
        try {
          await api.post('/randagharbi/Claimers', claimer);
          actions.setClaimer(claimer); // pour concatiner la valeur ajouter avec les claimers existent dans le store kea
          actions.setLoadingAddCaimer(false); // false pour n'est pas afficher loading
        } catch (error) {
          actions.setClaimer([]); // pour concatiner la valeur ajouter avec les claimers existent dans le store kea
          actions.setLoadingAddCaimer(false); // false pour n'est pas afficher loading
        }
      },
    };
  },

  selectors: ({ selectors }) => ({
    requestNumber: [
      () => [selectors.claimers],
      claimers => {
        return claimers.length;
      },
    ],
    approvedRequestNumber: [
      () => [selectors.claimers],
      claimers => {
        return claimers.filter(item => item.approved).length;
      },
    ],
    refusedRequestNumber: [
      () => [selectors.claimers],
      claimers => {
        return claimers.filter(item => !item.approved).length;
      },
    ],
  }),
});

export default claimLogic;
