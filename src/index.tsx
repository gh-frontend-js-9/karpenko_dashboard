import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import './App.scss';
import * as serviceWorker from './serviceWorker';
import Navigation from './components/navigation';
import { config } from 'dotenv';

// Redux
import { store } from './components/redux/reducers';
import { Provider } from 'react-redux';

config();

ReactDOM.render(
    <Provider key = "navigation_store" store = { store }>
        <Navigation key = "navigation_links" />
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
