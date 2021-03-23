import React ,{Component} from 'react';
import './App.css';
import './Formp.css';
import Web3 from 'web3';
import MaterialTable from 'material-table';
import Ownable from '../abis/Ownable.json';
import InterfacePatient from '../abis/InterfacePatient.json';
import PatientRecords from '../abis/PatientRecords.json';
import {FormControl, TextareaAutosize, FormGroup, Input ,InputLabel, Button ,FormLabel , Select,MenuItem,FormHelperText, ButtonGroup } from '@material-ui/core';
import App from './App';
import ipfs from './ipfs';
import Details from './detailsp';
import {BootstrapTable, TableHeaderColumn, Col} from 'react-bootstrap-table';
import MaterialTableDemo from './detailsp';
import { Form, TextArea } from 'semantic-ui-react';


class Record extends Component{
  //constructor() {
      //super();
        constructor(props) {
          super(props)
      
          this.state = {
            patient: null,
            adressec: null,
            filename:'',
            maladiedetecte: '',
            traitementprescrit: '',
            etatpatient: '',
            contract: null,
            web3: null,
            buffer: null,
            account: null,
            value1: '',
            value2: '',
            memeHash: '',
            mnd:'',
            mtd:'',
            mpd:'',
            datas:[]
      
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
    
         async addRecord2(patient, adressec, maladiedetecte, traitementprescrit, etatpatient) {
          await this.state.contract.methods.addRecord2(patient, adressec, maladiedetecte,
            traitementprescrit, etatpatient).send({from: this.state.account})                  
            .on('confirmation', result => {
              if (result === 1) {
                  console.log("ok patient info maladies cree ")
                 }
              });

        }


        async addmnd(patient, adressec, mnd) {
          await this.state.contract.methods.addmnd(patient, adressec,mnd).send({from: this.state.account})                  
            .on('confirmation', result => {
              if (result === 1) {
                  console.log("ok mnd cree, Hash ajoute a la blockchain. ");
                 }
              });

        }

        async addmtd(patient, adressec, mtd) {
          await this.state.contract.methods.addmnd(patient, adressec,mtd).send({from: this.state.account})                  
            .on('confirmation', result => {
              if (result === 1) {
                  console.log("ok mtd cree, Hash ajoute a la blockchain. ");
                 }
              });

        }

        async addmpd(patient, adressec, mpd) {
          await this.state.contract.methods.addmpd(patient, adressec,mpd).send({from: this.state.account})                  
            .on('confirmation', result => {
              if (result === 1) {
                  console.log("ok mpd cree, Hash ajoute a la blockchain. ");
                 }
              });

        }

        async getRecord1(id, adressep) {
          const bb=  (await this.state.contract.methods.getRecord1(id,adressep).call())
          console.log("coucou  , nom medecin = ",bb[0] + " raison visite : = "+ bb[1])
        }
      
      
        async loadBlockchainData() {
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

            const address =contract.options.address;
            console.log("adresse ",address)

            this.state.adressec=await contract.methods.getAdressC().call();
            console.log("coucou  , adresse du centre = ", this.state.adressec);
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
      //console.log("value  ", e.target.value);
    };

    handlechange = e =>{
      this.setState({
        [e.target.id]: e.target.value
      });
    };

    captureFile = (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        this.setState({ buffer: Buffer(reader.result) })
        console.log('buffer', this.state.buffer)
      }
    }


    submitmtd = e => {
      e.preventDefault();
      console.log("this.state.mtd ====   ",this.state.mtd);
      const mtd=JSON.stringify(this.state.mtd);
      console.log("mtd json contenu ==  ", mtd)

    }

    submitmpd = e => {
      e.preventDefault();

    }

    submitmnd = event => {
    event.preventDefault();
    console.log("adding", this.state.filename, "to IPFS..");
    ipfs.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("IPFS add result: ", result);
      const mnd = result[0].hash;
      console.log("Hash:", mnd);
      //this.setState({ mnd });
      console.log("file added to IPFS.");

      console.log("Adding new hash to blockchain..");
      this.addmnd(this.state.patient, this.state.adressec, mnd);
    });

    }

      submit = e => {
        e.preventDefault();
        this.setState({
          patient: this.state.patient,
          maladiedetecte : this.state.maladiedetecte,
          traitementprescrit: this.state.traitementprescrit,
          etatpatient: this.state.etatpatient,
          datas: [...this.state.data, this.state.patient, this.state.maladiedetecte, this.state.traitementprescrit,
          this.state.etatpatient
          ]
     });
        console.log("info record  , maladie =  ", this.state.patient, "  nnn  ",this.state.maladiedetecte, "  traitement : ",this.state.traitementprescrit,
        "  etat  =  ", this.state.etatpatient);

      //   this.state.data=[{
      //     patient: this.state.patient,
      //   maladiedetcte : this.state.maladiedetecte,
      //   traitementprescrit: this.state.traitementprescrit,
      // etatpatient: this.state.etatpatient}];

        this.setState.datas= this.getRecord1(0, this.state.patient);

        console.log("data= ", this.state.datas)

        //  this.addRecord2(this.state.patient, this.state.adressec, this.state.maladiedetecte, 
        //    this.state.traitementprescrit, this.state.etatpatient);
      };


  render(){
    //const {data}=this.props.data;
    return(
      
      <div>
        <form className="milieu">
                        <p class="milieu">
                        </p>
                      </form>

                  <form className="gauche">
                  <h3 className="text-center">Diagnostic patient</h3>
                  <FormGroup>
                    <FormLabel  htmlFor="patient">Adresse du patient : </FormLabel >
                    <Input type="text" id="patient" value={this.state.patient} onChange={this.change}/>
                    </FormGroup>

                    <FormGroup>
                    <FormLabel  htmlFor="maladiedetecte">Maladie detecte :</FormLabel >
                    <Select
                        id={this.state.maladiedetecte}
                        onChange={this.change}
                        >
                       <MenuItem value={"Acne"}>Acne</MenuItem>
                        <MenuItem value={"Anxiete"}>Anxiete</MenuItem>
                        <MenuItem value={"Anemie"}>Anemie</MenuItem>
                        <MenuItem value={"Blessure"}>Blessure</MenuItem>
                        <MenuItem value={"Blulure"}>Blulure</MenuItem>
                        <MenuItem value={"Cancer"}>Cancer</MenuItem>
                        <MenuItem value={"Constipation"}>Cancer</MenuItem>
                        <MenuItem value={"Diabete"}>Diabete</MenuItem>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                    <FormLabel  htmlFor="traitementprescrit">Traitement prescrit :</FormLabel >
                    
                      <Select
                        id={this.state.traitementprescrit}
                        onChange={this.change}
                        >
                       <MenuItem value={"Antiinflammatoire"}>Anti inflammatoire</MenuItem>
                        <MenuItem value={"Antibiotique"}>Anti biotique</MenuItem>
                        <MenuItem value={"AntiDouleur"}>Anti Douleur</MenuItem>
                        <MenuItem value={"Antalgique"}>Antalgique</MenuItem>
                        <MenuItem value={"Analgesique"}>Analgesique</MenuItem>
                      </Select>
                    </FormGroup>


                    <FormGroup>
                      <FormLabel htmlFor="etatpatient">Etat patient :</FormLabel>
                      <Select
                        id={this.state.etatpatient}
                        onChange={this.change}
                      >
                       <MenuItem value={"Mauvais"}>Mauvais</MenuItem>
                        <MenuItem value={"Convalescent"}>Convalescent</MenuItem>
                        <MenuItem value={"Bon"}>Bon</MenuItem>
                      </Select>
                      {/* <Input type="text" id="etatpatient" value={this.state.etatpatient} onChange={this.change}/> */}
                      </FormGroup>
                   

                  <ButtonGroup>
                    <Button onClick={this.submit} variant="contained" color="primary">
                      Envoyer
                    </Button>
                  </ButtonGroup>
                      </form>

                      <form className="milieu">
                        <p class="milieu">
                        </p>
                      </form>

                      <Form className="droite">
                      <FormGroup>
                        <h4>Donnees textuelles</h4>
        
                          <textarea id={this.state.mtd} onChange={this.onChange} placeholder='Tell us more' style={{ minHeight: 50 }} />
                          <ButtonGroup>
                            <Button  onClick={this.submitmtd} variant="contained" color="primary">
                              Envoyer
                            </Button>
                          </ButtonGroup>
                        </FormGroup>

                        <FormGroup>
                          <h4>Donnees numeriques</h4>
                          <Input type='file' value={this.state.mnd}  onChange={this.captureFile}/>
                          <ButtonGroup>
                            <Button onClick={this.submitmnd} variant="contained" color="primary">
                              Envoyer
                            </Button>
                          </ButtonGroup>
                        </FormGroup>

                        <FormGroup>
                          <h4>Donnees privees</h4>
                      
                          <textarea id={this.state.mpd} onChange={this.onChange} placeholder='Tell us more' style={{ minHeight: 50 }} />
                          <ButtonGroup>
                            <Button  onClick={this.submitmpd} variant="contained" color="primary">
                              Envoyer
                            </Button>
                          </ButtonGroup>
                          </FormGroup>
                    </Form>

                    
                    <table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Adresse</th>
                          <th>Maladie detecte</th>
                          <th>Traitement Prescrit</th>
                          <th>Etat du patient</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                         {this.state.datas.map(data =>(
                          <h3 key={data.patient}>
                          {data.patient}</h3>
                         
                        ))}
                        </tr>
                        
                      </tbody>
                    </table>

                     <BootstrapTable data={this.state.datas} striped hover>
                      <TableHeaderColumn isKey dataField='patient'>Adresse Patient</TableHeaderColumn>
                      <TableHeaderColumn dataField='maladiedetecte'>Maladie detecte</TableHeaderColumn>
                      <TableHeaderColumn dataField='traitementprescrit'>Traitement Prescrit</TableHeaderColumn>
                      <TableHeaderColumn dataField='etatdupatient'>Etat du patient</TableHeaderColumn>
                  </BootstrapTable> 


      </div>

    );
  }

}
export default Record;
