import React from 'react';

//use for routing in react
import ReactDOM from 'react-dom';



import './assets/css/font-awesome.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const app = (
    <App />
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
