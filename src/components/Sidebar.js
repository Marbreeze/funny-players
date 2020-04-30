import React from 'react';
import PropTypes from 'prop-types';
import{Link,Route} from 'react-router-dom';
import slug from 'slug';

//generic component its gonna be used when players are fetched
//teams are fetched, article as well is a left column side-bar

Sidebar.propTypes = {
    title:PropTypes.string.isRequired,
    list:PropTypes.array.isRequired,
    loading:PropTypes.bool.isRequired,
}//declaring 


function CustomLink({to, children}){ //passing 'to' as obj can have propriety as: pathname,search,hash,state
    return(
        <Route              //use route to get acces to match,which will tell if app's location matches the to.pathname
                            //if it does match name in list will be bold if does't, - normal
        path ={to.pathname} //a string representing the path to link to. '/examplename'
        children={({match}) => (
            <li style = {{listStyleType:'none',fontWeight:match ?'bold' : 'normal'}}>
                <Link to ={to}>{children}</Link>
            </li>
        )}
        />
    )
}
export default function Sidebar({title, list, loading,location,match}){
    return loading === true 
    ?<h1>Loading</h1>
    :<div> 
        {/* esle display a div with all the nams */}
        <h3 className = 'header'>{title}</h3>
        <ul className ='sidebar-list'>
    {list.map((item) =>(
<CustomLink 
key ={item}
to = {{
    pathname:`${match.url}/${slug(item)}`,
    search: location.search,
    }}
    >
        {item.toUpperCase()}
        </CustomLink>
    ))}
    </ul>
</div>
}