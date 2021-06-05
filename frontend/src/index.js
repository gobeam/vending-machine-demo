import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import App from 'containers/App';
import configureStore from 'configure-store';
import { throttle } from 'lodash';
import reportWebVitals from 'reportWebVitals';
import { loadState, saveState } from 'services/persist.service';


// Create redux store with history
const initialState = loadState();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

store.subscribe(
    throttle(() => {
        saveState({
            language: store.getState().language,
            global: store.getState().global,
        });
    }, 1000),
);

const render = (messages) => {
    ReactDOM.render(
        <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
        </Provider>,
        MOUNT_NODE,
    );
};
render();

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    reportWebVitals(console.log);
}
