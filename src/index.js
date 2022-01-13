import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import './styles/master.css';

export default function App() {

    const [user, setUser] = useState({});

    return <Router>
            <div>
                <Header user={user}/>
                <div className="body">
                    <Switch>
                        <Route exact path="/" component={Home}  />
                        {/* <Route path="/:game" component={Game} /> */}
                    </Switch>
                </div>
                <div className="footer">

                </div>
            </div>
            
            
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Router>
}

ReactDOM.render(<App />, document.getElementById('app'))