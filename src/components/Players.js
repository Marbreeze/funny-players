import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {getPlayers} from '../api' //a function 
import {parse} from 'query-string'
import slug from 'slug' //refers to a string of text that is URL-safe

//component that needs to be rendered whenever app route matches the location



export default  class Players extends Component{
    state = {
        players:[],
        loading:true,
    }
    componentDidMount(){
        const {location} =this.props
        location.search
        ?this.fetchPlayers(parse(location.search).teamId) //if query-string at the end has a name of team
        :this.fetchPlayers() //if there is no query string and the location is at /players
    }
    fetchPlayers =(teamId) =>{
        getPlayers(teamId)
        .then(players => this.setState(() =>({
            loading:false,
            players,
        })))
    }
    render(){
    const {players, loading} =this.state
    const {match,location} = this.props
    return(
        <div className = 'container two-column'>
            {/* {JSON.stringify(this.state)} */}
            <Sidebar 
            loading ={loading}
            title = 'Players'
            list = {players.map((player) => player.name)}
            {...this.props} //passing all the props that match location and history to my Sidebar comp
            />
            {loading === false && location.pathname === '/players' //the user did not select the player yet
            ? <div className ='sidebar-instruction'>Select a Player </div>
            :null}
    <Route  path = {`${match.url}/:playerId`} render = {({match}) => { //`the url up until this point/:playername(Id)` 
        if(loading === true) return null;
            const{ //destructuring (dummy vars)
                name, position, teamId, number, avatar, apg, ppg, rpg, spg 
                } = players.find((player) => slug(player.name) === match.params.playerId) //slug == snakecase pl.name eqaul the same url and playername(Id) in this case
            return (  // UI
                <div className = 'panel'>
                    <img className = 'avatar' src = {`${avatar}`} alt = {`${name}'s avatar`}/>
                    <h1 className = 'medium-header'>{name}</h1>
                    <h3 className = 'header'>#{number} this is my team </h3>
                    <div className = 'row'>
                    <ul className = 'info-list' style = {{marginRight: 80}}>
                        <li>Team
                            <div>
                            <Link style={{color: '#688809a'}} to={`/${teamId}`}>
                                {teamId[0].toUpperCase() + teamId.slice(1)}
                            </Link>
                            </div>
                        </li>
                        <li>Position<div>{position}</div></li>
                        <li>PPG<div>{ppg}</div></li>
                        </ul>
                        <ul className ='info-list'> 
                        {/*  if not in div number will be displays in line  */}
                        <li>APG<div>{apg}</div></li> 
                        <li>RPG<div>{rpg}</div></li>
                        <li>SPG<div>{spg}</div></li>
                        </ul>
                        </div>   
                    </div>
                    )
                }}
        />
    </div>
            
        )
    }
}