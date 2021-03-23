import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import PatientRecords from '../abis/PatientRecords.json';
import AppBar from '@material-ui/core/AppBar';
import { BrowserRouter, Route } from 'react-router-dom'

import Medecin from './Medecin';
import Patient from './patient';
import Formp from './Formp';
import Record from './record';
import Detailsp from './detailsp';
import Centre from './centre';
import Main from './Main';

import { Navigation, Layout, Drawer, Content, Header, Button, Card, CardText, Link } from 'react-mdl';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      adresscentre: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      patient: null,
      adressec: null,
      passphrasem: '',
      adressemailm:'',
      raisonvisite: ''

    }
  }
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  //  async addCentre(adressecentre) {
  //   await this.state.contract.methods.addCentre(adressecentre).send({from: this.state.account})
  //   .on('confirmation', result => {
  //     if (result === 1) {
  //           console.log("ok centre cree ")
  //                 }
  //             });
  // }

  async loadBlockchainData(adresse) {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    console.log("coucou ", networkId)
    const networkData = PatientRecords.networks[networkId]
    console.log("coucou networkdata", networkData)
    if(networkData) {
      const contract = web3.eth.Contract(PatientRecords.abi, networkData.address)
      this.setState({ contract })
      const resultat = await contract.methods.calcul(15,22).call()
      const resul= resultat.toNumber()
      console.log("coucou voici le resultat", resul);

      const address =contract.options.address;
      console.log("adresse ",address)
      //this.addCentre("0x2ccBc1066EecDCD4375b4e0a861DAAd2Cb755071");
    

  //       await contract.methods.addCentre('0x6896968af77135dffA9C82766f15C2F8C02c4178').send({from: accounts[0]})
  // .on('confirmation', result => {
  //   if (result === 1) {
  //         console.log("ok centre cree ")
  //               }
  //           });
      //await contract.methods.addCentre('0x6896968af77135dffA9C82766f15C2F8C02c4178').estimateGas();
      //console.log("gas ", gas)

      //console.log("coucou   ",JSON.stringify(bb.name.toString()))


      //await contract.methods.addPatient(0x8E4CDe480222F9565A5d4F2318948e43E1125F50).call()

      //this.setState({ adresscentre })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
    return this.contract;
  };

 

  render() {
    return (
      <div style={{height: '600px',position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header title="RADAR & Blockchain " scroll>
                <Navigation>
                    <a href="/landingpage">Statistiques</a>
                    <a href="/">Mon Compte</a>
                    <a href="/">Connexion</a>
                </Navigation>
            </Header>
            <Drawer title="Dapp">
                <Navigation>
                <a href="/">Centre Medical</a>
                    <a href="/centre">Creer Centre</a>
                    <a href="/importPatient">Import des Patients</a>
                    <a href="/medecin">Medecins</a>
                    <a href="/Formp">NouveauPatient</a>
                    <a href="/record">Diagnostic Patient</a>
                    <a href="/patient">Patients</a>
                    <a href="/landingpage">Chercheurs</a>
                </Navigation>
            </Drawer>
            <Content className="page-content">
              <Main/>
            </Content>

      </Layout>

    </div>
    );
  }
}

export default App;
