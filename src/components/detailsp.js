import React ,{Component} from 'react';
import './App.css';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import {BootstrapTable, Table, TableHeaderColumn} from 'react-bootstrap-table';

const MaterialTableDemo=(props)=>{
  const { data } = props;
  console.log("pppripppps ", data);
  console.log("pppripppps 111 ", data[0])

// export default function MaterialTableDemo() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: 'Raison de visite', field: 'raisondevisite' },
      { title: 'Date de visite', field: 'datedevisite', type: 'date' },
      {
        title: 'Maladie',
        field: 'maladie',
        lookup: { 1: 'Rougeole', 2: 'Fievre jaune' },
      },
      { title: 'Traitement Prescrit', field: 'traitementprescrit',
      lookup: { 1: 'Antirougeole', 2: 'anti fievre jaune' },},
      {
        title: 'Etat du patient',
        field: 'etat',
        lookup: { 1:'Mauvais', 2:'Convalescence' , 3:'Bon' },
      },
    ],
  });

   function renderTableData(){
    //console.log("coucou je suis la je suis presente data ========= ", data)
    //var data2=[...data];
    var data2=[
      {	name:"John",
      nommedecin: "Doe",
          raisonvisite: "mal de gorge",
          maladiedetecte: "angine",
          traitementprescrit: "paracetamol",
          etatdupatient: "bon"
      },
      {
      name:"John1",
      nommedecin: "Doe1",
      raisonvisite: "mal de gorge1",
          maladiedetecte: "angine1",
          traitementprescrit: "paracetamol1",
          etatdupatient: "bon1"
      }
  ];

    console.log("coucou je suis la je suis presente data2 ========= ", data2)
    return data2.map((dataa, i) => {
       const { id, name, nommedecin, raisonvisite, maladiedetecte } = dataa //destructuring
       return (
          <tr key={i}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{nommedecin}</td>
             <td>{raisonvisite}</td>
             <td>{maladiedetecte}</td>
          </tr>
       );
    });
  };
  

  return (

    
    <div>

        {/* <div>
            <h2 id='title'>React Dynamic Table</h2>
            <table id='data'>
               <tbody>
                 {renderTableData()}
               </tbody>
            </table>
         </div> */}

        <MaterialTable
    columns={[
      { title: 'Nom', field: 'name' },
      { title: 'Nom Medecin', field: 'nommedecin' },
      { title: 'Raison de visite', field: 'raisonvisite' },
      { title: 'Maladie detecte', field: 'maladiedetecte' },
      { title: 'Traitement Prescrit', field: 'traitementprescrit' },
      { title: 'Etat du patient', field: 'etatdupatient' }
    ]}
    data={[
      {	name:"John",
      nommedecin: "Doe",
          raisonvisite: "mal de gorge",
          maladiedetecte: "angine",
          traitementprescrit: "paracetamol",
          etatdupatient: "bon"
      },
      {
      name:"John1",
      nommedecin: "Doe1",
      raisonvisite: "mal de gorge1",
          maladiedetecte: "angine1",
          traitementprescrit: "paracetamol1",
          etatdupatient: "bon1"
      }
  ]}
    title="Details des Info Patient"
    />

      {/* <BootstrapTable data={data} striped hover>
            <TableHeaderColumn isKey dataField='name'>Nom Patient</TableHeaderColumn>
            <TableHeaderColumn dataField='nommedecin'>Nom Medecin</TableHeaderColumn>
            <TableHeaderColumn dataField='raisonvisite'>Raison de visite</TableHeaderColumn>
            <TableHeaderColumn dataField='maladiedetecte'>Maladie detecte</TableHeaderColumn>
            <TableHeaderColumn dataField='traitementprescrit'>Traitement Prescrit</TableHeaderColumn>
            <TableHeaderColumn dataField='etatdupatient'>Etat du patient</TableHeaderColumn>
        </BootstrapTable> */}

          {/* <table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Nom medecin</th>
                <th>Raison de visite</th>
                <th>Maladie detecte</th>
                <th>Traitement Prescrit</th>
                <th>Etat du patient</th>
              </tr>
            </thead>
            <tbody>
              <tr>
      <td>{data}</td>
                <td>{data.name}</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              
            </tbody>
          </table> */}

    </div>




  //   <TableContainer component={Paper}>
  //   <Table className={classes.table} aria-label="simple table">
  //     <TableHead>
  //       <TableRow>
  //         <TableCell>Dessert (100g serving)</TableCell>
  //         <TableCell align="right">Calories</TableCell>
  //         <TableCell align="right">Fat&nbsp;(g)</TableCell>
  //         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
  //         <TableCell align="right">Protein&nbsp;(g)</TableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {rows.map((row) => (
  //         <TableRow key={row.name}>
  //           <TableCell component="th" scope="row">
  //             {row.name}
  //           </TableCell>
  //           <TableCell align="right">{row.calories}</TableCell>
  //           <TableCell align="right">{row.fat}</TableCell>
  //           <TableCell align="right">{row.carbs}</TableCell>
  //           <TableCell align="right">{row.protein}</TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // </TableContainer>

  //   data={[
  //     {	name:"John",
  //     nommedecin: "Doe",
  //         raisonvisite: "mal de gorge",
  //         maladiedetecte: "angine",
  //         traitementprescrit: "paracetamol",
  //         etatdupatient: "bon"
  //     },
  //     {
  //     name:"John1",
  //     nommedecin: "Doe1",
  //     raisonvisite: "mal de gorge1",
  //         maladiedetecte: "angine1",
  //         traitementprescrit: "paracetamol1",
  //         etatdupatient: "bon1"
  //     }
  // ]}

    

  //   <MaterialTable
  //     title="Details des Info Patient XXXXXXX"
  //     columns={state.columns}
  //     data={state.data}
  //     editable={{
  //       onRowAdd: (newData) =>
  //         new Promise((resolve) => {
  //           setTimeout(() => {
  //             resolve();
  //             setState((prevState) => {
  //               const data = [...prevState.data];
  //               data.push(newData);
  //               return { ...prevState, data };
  //             });
  //           }, 600);
  //         }),
  //       onRowUpdate: (newData, oldData) =>
  //         new Promise((resolve) => {
  //           setTimeout(() => {
  //             resolve();
  //             if (oldData) {
  //               setState((prevState) => {
  //                 const data = [...prevState.data];
  //                 data[data.indexOf(oldData)] = newData;
  //                 return { ...prevState, data };
  //               });
  //             }
  //           }, 600);
  //         }),
  //     }}
  //   />
   );
   }


  //MaterialTableDemo.propTypes = {   data: PropTypes.oneOfType([PropTypes.func, PropTypes.array]) };
  export default MaterialTableDemo;
