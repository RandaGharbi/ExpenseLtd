import { kea } from "kea";
import axios from "axios";

import api from '../shared/utils/api'

const claimLogic = kea({

  actions: () => ({
    addClaimer: claimer => ({ claimer }), // action qui va déclancer le addclaimer listener
    deleteClaimer: name => ({ name }), // action qui va déclancer le addclaimer listener 
    setClaimer: claimer => ({ claimer }),
    setClaimers: claimers => ({ claimers }),
    setLoadingAddCaimer: (loading) => ({ loading }),
    UpdateClaimer: claimer => ({ claimer }),
    setLoadingUpdtateCaimer: (loading) => ({ loading }),
    setLoadingFetchClaimers: (loading) => ({ loading }),
    fetchClaimers: () => true, // action qui va déclancer le fetchClaimers listener 
  }),


  reducers: () => ({
    claimers: [[], { // name state
      setClaimers: (state, { claimers }) => console.log([...state, claimers.data]) || [...state, ...claimers.data],
      setClaimer: (_, { claimer }) => claimer
    }],
    loadingAddClaimer: [false, { // name state
      setLoadingAddCaimer: (_, { loading }) => loading,
    }],
    loadingUpdateClaimer: [false, { // name state
      setLoadingUpdateCaimer: (_, { loading }) => loading,
    }],
    loadingFetchClaimers: [true, { // name state
      setLoadingFetchClaimers: (_, { loading }) => loading,
    }]
  }),

  events: ({ actions }) => ({
    afterMount: () => {
      actions.fetchClaimers()
    },
  }),

  listeners: (props) => {
    const { actions } = props;
    return {
      fetchClaimers: async () => {
        try {
          const claimersResult = await api.get('/randagharbi/Claimers');
          console.log("claimersResult", claimersResult)
          actions.setClaimers(claimersResult)
          actions.setLoadingFetchClaimers(false)
        } catch (error) {
          actions.setClaimers({ data: [] })
          actions.setLoadingFetchClaimers(false)
        }
      },
      addClaimer: async ({ claimer }) => { // destruct claimer envoyé(returouné ) par l'action
        actions.setLoadingAddCaimer(true) // true pour afficher loading regarde le composant
        try {
          await api.post('/randagharbi/Claimers', claimer)
          actions.setClaimer(claimer) // pour concatiner la valeur ajouter avec les claimers existent dans le store kea
          actions.setLoadingAddCaimer(false) // false pour n'est pas afficher loading
        } catch (error) {
          actions.setClaimer([]) // pour concatiner la valeur ajouter avec les claimers existent dans le store kea
          actions.setLoadingAddCaimer(false) // false pour n'est pas afficher loading
        }

      },
      deleteClaimer: async ({ name }) => {
        try{
        await api.post('/randagharbi/Claimers', { data: { name } })
        }catch(e){
          console.log('errr',e)
        }

    },
      updateClaimer: async ({ claimer }) => {
        actions.setLoadingAddCaimer(true)

        const claimerResult = await axios.post('https://jsonbin.org/me/Claimers',
          { ...claimer }, {
          headers: {
            'Authorization': 'token a4cabe58-9e0b-4ff0-bb7f-a731530e1784',
            'Content-Type': 'application/json'
          }
        })
        actions.setClaimers(claimerResult)
        actions.setLoadingAddCaimer(false)
      },
    }
  },

  selectors: ({ selectors, }) => ({
    requestNumber: [
      () => [selectors.claimers],
      (claimers) => {
        return claimers.length
      }
    ],
    approvedRequestNumber: [
      () => [selectors.claimers],
      (claimers) => {
        return claimers.filter(item => item.approved).length
      }
    ],
    refusedRequestNumber: [
      () => [selectors.claimers],
      (claimers) => {
        return claimers.filter(item => !item.approved).length
      }
    ],

  })
})

export default claimLogic;