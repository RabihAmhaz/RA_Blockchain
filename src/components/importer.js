import React from 'react';
import MaterialTableDemo from './detailsp';
import { FormGroup, Input ,Button, ButtonGroup } from '@material-ui/core';

class Pjson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      dataa:''
    };
   
   // this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  displayData(content) {
    this.setState({data: content});
  }

  change = e =>{
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  // handleFileSelect(evt) {
  //   let files = evt.target.reader;
  //   that.displayData(e.target.result);
    // if (!files.length) {
    //   alert('No file select');
    //   return;
    // }
    //   let file = files[0];
    //   console.log("coucou file ......", files);
    //   let that = this;
    //   console.log("coucou that ......", that);
    //   let reader = new FileReader();
    //   console.log("coucou reader ......", reader);
    //   reader.onload = function(e) {
    //   that.displayData(e.target.result);

    //  };
  //}

  RenderTableData(){
    //var data2=[...this.state.data];
    console.log("XXXXX ", this.state.data)
    //  dataas=JSON.parse(JSON.stringify(this.state.data));
    //  console.log("bbbbbbbbbb datas    ======", dataas);
     console.log("type de dataas   =====", typeof(dataas))
    return this.state.data.map((dataa, i) => {
       const { id, name, nommedecin, raisonvisite, maladiedetecte, etatpatient } = dataa //destructuring
       return (
          <tr key={i}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{nommedecin}</td>
             <td>{raisonvisite}</td>
             <td>{maladiedetecte}</td>
             <td>{etatpatient}</td>
          </tr>
       );
    });
  };


  render() {

     


    //const datas= this.state.data;
    //const name= data.name;
    //const obj=JSON.parse(datas);
    
    // var dataArray = this.state.data.split('');
    // console.log("datas  ", this.state.data, "dataArray ", dataArray)
    // for (var i=0; i<dataArray.length; i++){
    //      dataArray[i] = JSON.parse(dataArray[i]);
    //      console.log(dataArray[i]);
    // }

    // //dataas.push(datas);
    // console.log("patients  ", dataArray, "   premier patient   ", dataArray[0]);


    return (
      <div>
        <FormGroup>
              <h4>Données importées à partir d'un Fichier JSON</h4>
              <Input type="json" id="data" value={this.state.data} onChange={this.change}/>
              <ButtonGroup>
                <Button  variant="contained" color="primary">
                  Importer les Données

                </Button>
              </ButtonGroup>
            </FormGroup>
            <div>
            <table id='data'>
               <tbody>
                 {this.RenderTableData()}
               </tbody>
            </table>
         </div> 

        <MaterialTableDemo data={this.state.data}/>
        </div>

    );
  }

}
export default Pjson;