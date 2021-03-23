import React from 'react';
import MaterialTable from 'material-table';
import {FormControl,TextareaAutosize, FormGroup, Input ,Button, FormLabel , ButtonGroup } from '@material-ui/core';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nom Medecin', field: 'nommedecin' },
      { title: 'Adresse Mail Medecin', field: 'mail' },
      { title: 'Raison de visite', field: 'raisondevisite' },
      { title: 'Date de visite', field: 'datedevisite', type: 'date' },
      {
        title: 'Maladie',
        field: 'maladie',
        lookup: { 1:'Acne', 2:'Anxiete' , 3:'Anemie',
      4:'Blessure', 5:'Blulure' , 6:'Cancer',
      7:'Constipation', 8:'Diabete' },
      },
      { title: 'Traitement Prescrit', field: 'traitementprescrit',
      lookup: { 1:'Anti-inflammatoire', 2:'Anti-biotique' , 3:'Anti-Douleur', 4:'Antalgique', 5:'Analgesique'},
    },
      {
        title: 'Etat du patient',
        field: 'etat',
        lookup: { 1:'Mauvais', 2:'Convalescence' , 3:'Bon' },
      },
    ],

    data: [
      { nommedecin: 'momo', raisondevisite: 'mal de tete', traitementprescrit: 'Anti-biotique', datedevisite: '04/05/2020', maladie: 1 },
      {
        nommedecin: 'mimi',
        raisondevisite: 'mal de gorge',
        traitementprescrit: 'Antalgique',
        datedevisite: '04/05/2020',
        maladie: 2,
      },
    ],
  });

  return (
    <div>
    <MaterialTable
      title="Table des infos de Patients"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),

      }}
    />
    </div>
  );
}
