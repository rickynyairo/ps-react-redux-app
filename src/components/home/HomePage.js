import React from 'react';

import { Link } from 'react-router';

class HomePage extends React.Component {
    render() {
        return(
           <div className="jumbotron">
               <h1>Pluralsight Administration</h1>
               <p>Eact, Redux application utilizing redux hot reaload features and written in ES6</p>
               <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
           </div> 
        );
    }
}

export default HomePage;