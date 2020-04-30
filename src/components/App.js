import React, {Component}from 'react';
import {BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import Home from './Home';
import Teams from './Teams';
import Players from './Players';
import Navbar from './Navbar';
import TeamPage from './TeamPage';
import Articles from './Articles'
class App extends Component{
  render(){
  return (
    <Router>
       <Navbar />
    <div>
     <Switch>
      <Route exact path = '/'component = {Home}/>
      <Route path = '/players' component = {Players}/> 
      <Route path = '/teams' component = {Teams}/> 
      <Route path = '/:teamId' exact component ={TeamPage}/> 
      <Route path = '/:teamId/articles' component = {Articles}/>
      <Route render ={() => <h1 className='text-center'>Four oh Four</h1>} /> 
      {/* doest have a path prop so if no path matches the 404 is rendered for :teamId applies as well */}
        </Switch>
    </div>
    </Router>

  )
}
}

export default App;
