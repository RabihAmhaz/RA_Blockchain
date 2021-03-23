import React ,{Component} from 'react';
import './App.css';
import Web3 from 'web3';
import PatientRecords from '../abis/PatientRecords.json';
import './Formp.css';
import {FormControl, FormGroup, Input ,Button ,FormLabel , ButtonGroup } from '@material-ui/core';

class Centre extends Component{
  //constructor() {
      //super();
      constructor(props) {
        super(props)
    
        this.state = {
          adresscentre: '',
          contract: null,
          web3: null,
          buffer: null,
          account: null,
          adressec: null
    
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
    
       async addCentre(adressecentre) {
        await this.state.contract.methods.addCentre(adressecentre).send({from: this.state.account})
        .on('confirmation', result => {
          if (result === 1) {
                alert("ok centre cree ")
                      }
                  });
      }
    
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
      
        } else {
          window.alert('Smart contract not deployed to detected network.')
        }
        return this.contract;
      };
      //this.onSubmit = this.onSubmit.bind(this);
    //}

    change = e =>{
      this.setState({
        [e.target.id]: e.target.value
      });
    };

      submit = e => {
        e.preventDefault();
        console.log(this.state.adressec);
        this.addCentre(this.state.adressec);
      };


  render(){
    return(
      <div>
                  <form className="formulaire">
                  <h3 className="text-center">Enregistrer un Centre</h3>
                  <FormGroup>
                    <FormLabel  htmlFor="adressec">Adresse du centre : </FormLabel >
                    <Input type="text" id="adressec" onChange={this.change}/>
                    </FormGroup>

                    <ButtonGroup>
                    <Button onClick={this.submit} variant="contained" color="primary">
                      Valider
                    </Button>
                    </ButtonGroup>


                    </form>
      </div>

    );
  }

}
export default Centre;
