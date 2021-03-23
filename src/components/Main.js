import React from 'react';
import LandingPage from './landingpage';
import Medecin from './Medecin';
import Patient from './patient';
import Formp from './Formp';
import Detailsp from './detailsp';
import Record from './record';
import { Switch, Route} from 'react-router-dom';
import Pjson from './importer';
import Centre from './centre';
import Logins from './logins';

const Main=() =>(
  <Switch>
    //<Route exact path="/bbbb" component={LandingPage}/>
    //<Route exact path="/landingPage" component={LandingPage}/>
    <Route exact path="/medecin" component={Medecin}/>
    <Route exact path="/patient" component={Patient}/>
    <Route exact path="/Formp" component={Formp}/>
    <Route exact path="/detailsp" component={Detailsp}/>
    <Route exact path="/record" component={Record}/>
    <Route exact path="/importPatient" component={Pjson}/>
    <Route exact path="/centre" component={Centre}/>
    <Route exact path="/login" component={Logins}/>
  </Switch>
)
export default Main;
