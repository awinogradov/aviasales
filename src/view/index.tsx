import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { preloadReady } from 'react-loadable';
import { withRegistry, Registry } from '@bem-react/di';

import { IStore, IExtendedWindow } from '../typings';
import { register } from './components/SW/SW';
import { IPageProps } from './components/Page/Page';

const { requestId } = window as IExtendedWindow;

register();

const restore = (requestId: string) => fetch(`/cached/${requestId}`).then(res => res.json());

export const render = (Component: React.ComponentType<IPageProps>, registry: Registry) => Promise.all([
    preloadReady(),
    restore(requestId),
]).then(res => {
    const store: IStore = res[1];
    const script = document.getElementById('requestId');

    if (script && script.parentNode) {
        script.parentNode.removeChild(script);
    }

    const Platformed = withRegistry<IPageProps>(registry)(Component);

    ReactDOM.hydrate(
        <Router>
            <Platformed store={store} />
        </Router>,
        document.getElementById('root')
    )
});
