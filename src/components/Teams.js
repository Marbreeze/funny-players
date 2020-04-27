import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import SideBar from './Sidebar';
import { getTeamNames} from '../api';
import TeamLogo from './TeamLogo'
import Team from './Team'
//component that needs to be rendered whenever app route matches the location


export default class Teams extends Component{
    state ={
        teamNames:[],
        loading:true,
    }

    componentDidMount(){
        getTeamNames()
        .then((teamNames) =>{
            this.setState((currentState) =>({
                loading:false,
                teamNames
            }))
    })
}


    render(){
        const { loading, teamNames } = this.state
        const { location, match } = this.props //props by React Router 
        return(
            <div className = 'container two-column'>
                <SideBar //passing the props
                loading = {loading}
                title = 'Teams'
                list ={teamNames}
                {...this.props}
                />
                {loading === false && location.pathname === '/teams'
                ?<div className='sidebar-instruction'>Select a Team</div>
                :null}
                <Route path = {`${match.url}/:teamId`} render = {({match}) =>(
                    <div className = 'panel'>
        {/* crearte a component that is gonna fetch data and return data */}
                    <Team id = {match.params.teamId}>
                        {(team) => (team === null)
                        ?<h1>Loading</h1>
                        :<div style = {{width:'100%'}}>
                        <TeamLogo id = {team.id} className = 'center' />
                        <h1 className ='medium-header'>{team.name}</h1>
                        <ul className = 'info-list row'>
                            <li>Established<div>{team.established}</div></li>
                            <li>Manager<div>{team.manager}</div></li>
                            <li>Coach<div>{team.coach}</div></li>
                        </ul>
                        <Link className = 'center btn-main' 
                            to={`/${match.params.teamId}`}>
                            {team.name}Team page</Link>
                        
                        </div>}
                    </Team>
                    </div>
                )}/>

            </div> 
        )
    }
}