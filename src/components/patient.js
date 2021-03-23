import React from 'react';
import Web3 from 'web3';
import clsx from 'clsx';
import Formcompletep from './formcompletep';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    nom: '',
    passphrasep: '',
    adressemailp: '',
    mtdhash:'',
    mndhash:'',
    mpdhash:'',
    showPassphrase: false,
    columns: [
      { title: 'Nom ', field: 'nom' },
      { title: 'Adresse Mail', field: 'mailp' },
      { title: 'Raison de visite', field: 'raisondevisite' },
      { title: 'Date de visite', field: 'datedevisite', type: 'date' },
      {
        title: 'Maladie',
        field: 'maladie',
        lookup: { 1: 'Migraine', 2: 'Vertige' },
      },
      { title: 'Traitement Prescrit', field: 'traitementprescrit' },
      {
        title: 'Etat du patient',
        field: 'etat',
        lookup: { 1:'Mauvais', 2:'Convalescence' , 3:'Bon' },
      },
      { title: 'Lien Donnees Textuels', field: 'mtdhash' },
      { title: 'Lien Donnees Numeriques', field: 'mndhash' },
      { title: 'Lien Donnees Privates', field: 'mpdhash' },
    ],

  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassphrase = () => {
    setValues({ ...values, showPassphrase: !values.showPassphrase });
  };

  const handleMouseDownPassphrase = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div>
      <Formcompletep/>

        
        <h3> Details de vos donnees </h3>
        <MaterialTable
          title="Mes infos"
          columns={values.columns}
          values={values.values}
          />
      </div>

    </div>
  );
}
