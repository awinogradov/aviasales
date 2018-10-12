import * as React from 'react';
import { Route } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { RegistryConsumer } from '@bem-react/di';

import { Logo } from '../Logo/Logo';
import { Link } from '../Link/Link';
import { cnSerp, ISerpProps } from '../Serp/Serp';
import { IStore, IRouterMatch } from '../../../typings';

import './Page.css';

export const cnPage = cn('Page');

export interface IPageProps {
    store: IStore;
}

const aviasalesSearchLink = (route: IRouterMatch) => `//aviasales.ru/search/${route.match.params.query}`;
const pagePresenter = (props: IPageProps) => (route: IRouterMatch) => (
    <RegistryConsumer>
        {registries => {
            const platform = registries['platform'];
            const Serp = platform.get<ISerpProps>(cnSerp());

            return (
                <>
                    <div className={cnPage('Header')}>
                        <Link url={aviasalesSearchLink(route)} target="_blank">
                            <Logo />
                        </Link>
                    </div>
                    <div className={cnPage('Content')}>
                        <Serp tickets={props.store.tickets} />
                    </div>
                </>
            );
        }}
    </RegistryConsumer>
);

export const Page: React.SFC<IPageProps> = props => (
    <Route path="/search/:query" component={pagePresenter(props)} />
);
