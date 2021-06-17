import React from 'react';
import { Switch, Route } from "react-router-dom"; 

import Feed from './pages/Feed.js';
import New from './pages/New.js';


function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/new" component={New} />
        </Switch>         
    )

}

export default Routes;