import React, { Component } from 'react';
import img from './esante.jpg';
import './App.css';
import './Formp.css'
import Main from './Main';




class LandingPage extends Component {

  constructor(props){
    super(props);
}

render(){
    return (
        <div>
          <header className="App-header">
            <img src={img} alt="mon image" className="image" />
          </header>
        </div>
    )
}
}

  // constructor(props) {
  //   super(props);
  //     this.state = {
  //       value1: '',
  //       value2: '',
  //       memeHash: '',
  //       contract: null,
  //       web3: null,
  //       buffer: null,
  //       account: null
  //     };

  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  //   handleChange(event) {
  //     this.setState({value: event.target.value});
  //   }

  //   handleSubmit(event) {
  //     alert('Un essai a été envoyé : ' + this.state.value);
  //     event.preventDefault();
  //   }

  //   captureFile = (event) => {
  //     event.preventDefault()
  //     const file = event.target.files[0]
  //     const reader = new window.FileReader()
  //     reader.readAsArrayBuffer(file)
  //     reader.onloadend = () => {
  //       this.setState({ buffer: Buffer(reader.result) })
  //       console.log('buffer', this.state.buffer)
  //     }
  //   }

    // onSubmit = (event) => {
    //   event.preventDefault()
    //   console.log("Submitting file to ipfs...")
    //   // ipfs.add(this.state.buffer, (error, result) => {
    //   //   console.log('Ipfs result', result)
    //   //   if(error) {
    //   //     console.error(error)
    //   //     return
    //   //   }
    //      this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
    //        return this.setState({ memeHash: result[0].hash })
    //      })
    //   })
    // }

//   render(){
//     return(
//         <img src="{sante}" alt="sante lr" />
//     )
//   }

// }

export default LandingPage;
