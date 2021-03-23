
  class PatientRow extends React.Component {
    render() {
      const patient = this.props.patient;
      const name = patient.name;  
      const nommededin= patient.nommededin;
      const raisonvisite= patient.raisonvisite;
      const maladiedetecte= patient.maladiedetecte;
      const traitementprescrit= patient.traitementprescrit;
      const etatpatient= patient.etatpatient

      return (
        <tr>
          <td>{name}</td>
          <td>{nommededin}</td>
          <td>{raisonvisite}</td>
          <td>{raisonvisite}</td>
          <td>{maladiedetecte}</td>
          <td>{traitementprescrit}</td>
          <td>{etatpatient}</td>
        </tr>

      );
    }
  }