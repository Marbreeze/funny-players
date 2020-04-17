import React,{Component} from 'react';
import TeamLogo from './TeamLogo';
import {Link} from 'react-router-dom';
import {getTeamNames} from '../api';
 //component that needs to be rendered whenever app route matches the location

 export default class Home extends Component{
     state ={
         teamNames :[]
     }
     //fetch the teams using getTeamNames will add those to state
     //that will cause a re-render and will get the list of names
    
     componentDidMount(){
         getTeamNames()
         .then((teamNames)=>this.setState((currentState) =>({
             teamNames
         })))
     }
    
     render(){
         const{teamNames} = this.state; //teamNames was undifined used distructuring
        return(
            <div className ='container'>
                <h1 className ='large-header'>Hash History Basketball League</h1>
            <h3 className='header text-center'>Select a team</h3>
            <div className = 'home-grid'>
            {teamNames.map((id)=>(
                <Link key ={id} to ={`/${id}`}>
                    <TeamLogo id ={id} width="120px"/>
                </Link> 
            ))}
            </div>
            </div>
        )
    }
}