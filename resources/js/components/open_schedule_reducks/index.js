import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch ,withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {default as createStore} from './store/store';

import {default as RootContainer} from './containers/Root';

export const store = createStore();

if (document.getElementById('open-schedule-root')) {
    const element = document.getElementById('open-schedule-root-redux');
    ReactDOM.render(
        <Provider store={store}>
            <RootContainer passwordRequired={element.dataset.passwordRequired === '1' ? true:false} hashDigest={element.dataset.hashDigest} />
        </Provider>
        , document.getElementById('open-schedule-root-redux')
    );
}