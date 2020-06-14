import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { useActions, useValues } from 'kea';
import claimLogic from "../../Logic";

export default function List() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name', id: 'name' },
            { title: 'Reason', field: 'reason', id: 'reason' },
            { title: 'Amount', field: 'amount', id: 'amount' },
            { title: 'Status', field: 'status', id: 'status' },
        ],
    });
    const { claimers, loadingFetchClaimers } = useValues(claimLogic)
    const { fetchClaimers } = useActions(claimLogic);
    useEffect(() => {
        fetchClaimers() // fetch fetchClaimers actions in claimLogic
    }, [fetchClaimers]);
    console.log("claimers", claimers)

    return (
        <>
            {
                loadingFetchClaimers ? <p>loading ... </p> :
                    <MaterialTable
                        title="List Of Claimers"
                        columns={state.columns}
                        claimers={state.claimers}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        setState((prevState) => {
                                            const claimers = [...prevState.claimers];
                                            data.push(newData);
                                            return { ...prevState, claimers };
                                        });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            setState((prevState) => {
                                                const claimers = [...prevState.claimers];
                                                claimers[claimers.indexOf(oldData)] = newData;
                                                return { ...prevState, claimers };
                                            });
                                        }
                                    }, 600);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        setState((prevState) => {
                                            const claimers = [...prevState.claimers];
                                            data.splice(claimers.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                        }}
                    />
            }
        </>
    );
}
