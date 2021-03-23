import React, { Component } from 'react';
import Web3 from 'web3';
import Medecin from './Medecin';
import Patient from './patient';
import './Formp.css'
import './App.css';
import Main from './Main';
import Ownable from '../abis/Ownable.json';
import InterfacePatient from '../abis/InterfacePatient.json';
import PatientRecords from '../abis/PatientRecords.json';
import { Navigation, Layout, Drawer, Content, Header, Card, CardText, Link } from 'react-mdl';
import {FormControl, FormGroup, Input ,Button, FormLabel , ButtonGroup } from '@material-ui/core';



class Formcompletep extends Component {
  state = {
      mailp:'',
      passphrasep:'',
      nomp:'',
      contract: null,
      web3: null,
      buffer: null,
      account: null
    }

  change = e =>{
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting patients records...", this.state)
    //......
};

  render() {
    return (
      <div className="demo-big-content">

        <form onSubmit={this.submit} className="formulaire">
        <h3 className="text-center">Renseignez vos informations</h3>
        <FormGroup>
        <FormLabel htmlFor="nomp">Nom:</FormLabel>
        <Input type='text' id='nomp' onChange={this.change.nomp}/>
        </FormGroup>

        <FormGroup>
        <FormLabel htmlFor="adressmailp">Adresse Mail:</FormLabel>
        <Input type='text' id='mailp' placeholer="Email" onChange={this.change.mailp}/>
        </FormGroup>

        <FormGroup>
        <FormLabel htmlFor="passphrasep">Pass Phrase:</FormLabel>
        <Input type='text' id='passphrasep'placeholer="Password"  onChange={this.change.passphrasep}/>
        </FormGroup>


        <ButtonGroup>
        <Button  variant="contained" color="primary">
          Envoyer
        </Button>
          </ButtonGroup>
        </form>

    </div>

    );
  }
}

export default Formcompletep;
