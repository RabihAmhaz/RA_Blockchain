import React ,{Component} from 'react';
import './App.css';
import './Formp.css';
import Web3 from 'web3';
import MaterialTable from 'material-table';
import Ownable from '../abis/Ownable.json';
import InterfacePatient from '../abis/InterfacePatient.json';
import PatientRecords from '../abis/PatientRecords.json';
import {FormControl, FormGroup, Input ,Button ,FormLabel, MenuItem , ButtonGroup } from '@material-ui/core';
import App from './App';

class Formp extends Component{
  constructor(props) {
    super(props)
      this.state = {
        adresscentre: '',
        contract: null,
        web3: null,
        buffer: null,
        message:'',
        account: null,
        patient: null,
        adressec: null,
        nommedecin: null,
        passphrasem: null,
        adressemailm: null,
        raisonvisite: null
      };
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


    async addPatient(patient) {
      await this.state.contract.methods.addPatient(patient).send({from: this.state.account})
      .on('confirmation', result => {
        if (result === 1) {
          window.alert("ok patient cree ")
                    }
                });
    }

     async addRecord(patient, adressec, nommedecin, passphrasem, adressemailm, raisonvisite) {
      await this.state.contract.methods.addRecord( patient, adressec, nommedecin, passphrasem,
        adressemailm, raisonvisite).send({from: this.state.account}).on('confirmation', result => {
          if (result === 1) {
            window.alert("ok patient info cree ")
             }
          });

    }

    async addmessage(patient, adressec, message) {
      await this.state.contract.methods.addmessage( patient, adressec, message).send({from: this.state.account}).on('confirmation', result => {
          if (result === 1) {
            window.alert("ok message envoyé")
             }
          });

    }
    async getrecord1(numbre, patient) {
      await this.state.contract.methods.getRecord1(0,this.state.patient).call()
    }
  
    async loadBlockchainData() {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const networkId = await web3.eth.net.getId()
      const networkData = PatientRecords.networks[networkId]
      if(networkData) {
        const contract = web3.eth.Contract(PatientRecords.abi, networkData.address)
        this.setState({ contract })
        const resultat = await contract.methods.calcul(15,22).call()
        const resul= resultat.toNumber()
        console.log("coucou voici le resultat", resul);
  
        const address =contract.options.address;
        console.log("adresse ",address)

        const adressec=await contract.methods.getAdressC().call();
          this.setState({adressec})
         console.log("coucou  , adresse du centre = ", this.state.adressec);
      } else {
        window.alert('Smart contract not deployed to detected network.')
      }
      return this.contract;
    };

    change = e =>{
      this.setState({
        [e.target.id]: e.target.value
      });
    };

    submitpatient = e => {
      e.preventDefault();
      this.addPatient(this.state.patient);

    };
    submit = e => {
      e.preventDefault();
      this.addRecord(this.state.patient, this.state.adressec, this.state.nommedecin, 
        this.state.passphrasem, this.state.adressemailm, this.state.raisonvisite);
    };

    submitmessage = e => {
      e.preventDefault();
      this.addmessage(this.state.patient, this.state.adressec, this.state.message);
    };
    // submitget = e => {
    //   e.preventDefault();
    //   const bb=  this.getrecord1(0,"0x2d6aB45546b545A95409E3F29a265Aec082D8a11")
    //   console.log("coucou  , nom medecin = ",bb[0] + " raison visite : = "+ bb[1])

    // };

  render(){
    return(
      <div>
                  <form className="milieu">
                        <p class="milieu">
                        </p>
                      </form>

                  <form className="gauche">
                  <h3 className="text-center">Nouveau patient</h3>
                  <FormGroup>
                    <FormLabel  htmlFor="patient">Adresse du patient : </FormLabel >
                    <Input type="text" id="patient" value={this.state.patient} onChange={this.change}/>
                    <Button  onClick={this.submitpatient} variant="contained" color="primary">
                      Ajouter Adresse patient
                    </Button>
                    </FormGroup>

                    <FormGroup>
                    <FormLabel  htmlFor="nommedecin">Nom du medecin  :</FormLabel >
                    <Input type="text" id="nommedecin" value={this.state.medecin} onChange={this.change}/>
                    </FormGroup>

                    <FormGroup>
                    <FormLabel  htmlFor="passphrasem">Passphrase        : </FormLabel >
                    <Input type="password" placeholer="Password" value={this.state.passphrasem} id="passphrasem" onChange={this.change}/>
                    </FormGroup>

                    <FormGroup>
                    <FormLabel  htmlFor="adressemailm">Adresse mail      :</FormLabel >
                    <Input type="email" placeholer="Email" value={this.state.adressemailm} id="adressemailm" onChange={this.change}/>
                    </FormGroup>

                    <FormGroup>
                    <FormLabel  htmlFor="raisonvisite">Raison de visite  : </FormLabel >
                    <Input type="text" id="raisonvisite" value={this.state.raisonvisite} onChange={this.change}/>
                    </FormGroup>

                    <ButtonGroup>
                    <Button  onClick={this.submit} variant="contained" color="primary">
                      Envoyer
                    </Button>
                      </ButtonGroup>
                      </form>

                        
                      <form className="milieu">
                          <p class="milieu">
                          </p>
                        </form>

                        <form className="droite">
                      <h3>Envoyer un message</h3>
                          <FormGroup>
                        <FormLabel  htmlFor="message">Message à envoyer au patient : </FormLabel >
                        <Input type="text" id="message" value={this.state.message} onChange={this.change}/>
                        </FormGroup>

                        <ButtonGroup>
                        <Button  onClick={this.submitmessage} variant="contained" color="primary">
                          Envoyer
                        </Button>
                          </ButtonGroup>
                      </form>

                   {/* <MaterialTable
                      columns={[
                        { title: 'Adresse Patient', field: 'patient' },
                        { title: 'Nom Medecin', field: 'nommedecin' },
                        { title: 'Raison de visite patient', field: 'raisonvisite' }
                      ]}
                     // data={data}
                      title="Details des Nouveaux Patients"
                      />  */}

      </div>

    );
  }

}
export default Formp;
