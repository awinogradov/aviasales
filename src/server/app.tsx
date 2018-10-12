import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import * as got from 'got';
import * as express from 'express';
import * as uuid from 'uuid/v4';
import { StaticRouter as Router } from 'react-router';
import * as moment from 'moment';
import * as currencyFormatter from 'currency-formatter';
import { withRegistry } from '@bem-react/di';

import { IStore } from '../typings';
import { tickets } from '../packages/tickets';
import { currency } from '../packages/currency';
import { Page, IPageProps } from '../view/components/Page/Page';
import { desktop } from '../view/components/Page/Page.registry/desktop';
import { touch } from '../view/components/Page/Page.registry/touch';

moment.locale('ru');

const platformsMap = {
    desktop,
    touch,
};
const cacheStorage = new Map<string, IStore>();
const api = require('../packages/tickets/api');
const formatDate = (date: string) => moment(date, 'DD.MM.YY').format('D MMM YYYY, dd').replace('.', '');
const formatMoney = (value: number, code: string) => currencyFormatter.format(value, { code }).replace(/(\.|\,)00/, '');
const script = (url: string) => `<script type="text/javascript" src="${url}"></script>`;
const style = (url: string) => `<link rel="stylesheet" href="${url}">`;

export function setup(manifest: string) {
    const router = express.Router();

    const assets = async (host: string, platform: string) => {
        const assetsManifest = await got(`http://${host}/${manifest}`, { json: true });
        const assetsMap = assetsManifest.body;

        const scripts: string[] = [];
        const styles: string[] = [];

        for (const key in assetsMap) {
            const asset = assetsMap[key];

            if (asset.includes(platform)) {

                if (asset.endsWith('js')) {
                    scripts.push(script(asset));
                }

                if (asset.endsWith('.css')) {
                    styles.push(style(asset));
                }

            }
        }

        return {
            styles,
            scripts,
        };
    }

    router.get('/search/:query', async (req, res, next) => {
        const platform = req.platform;
        const { styles, scripts } = await assets(req.headers.host as string, platform);

        const requestId = uuid();
        const availableTickets = await tickets(req.params.query);
        const extendedTickets = Promise.all(availableTickets.map(ticket => Promise.all([
            currency({ source: 'RUB', target: 'USD', value: ticket.price }),
            currency({ source: 'RUB', target: 'EUR', value: ticket.price }),
        ]).then(foreignPrices => ({
            ...ticket,
            departure_date: formatDate(ticket.departure_date),
            arrival_date: formatDate(ticket.arrival_date),
            price_rub: formatMoney(ticket.price, 'RUB'),
            price_usd: formatMoney(foreignPrices[0].value, 'USD'),
            price_eur: formatMoney(foreignPrices[1].value, 'EUR'),
        }))));

        extendedTickets.then(tickets => {
            const store: IStore = {
                tickets,
            };

            cacheStorage.set(requestId, store);

            res.write(`
                <!DOCTYPE html>
                <html lang=en>
                <head>
                    <meta charset=utf-8>
                    <meta name=viewport content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <title>Aviasales</title>
                    ${styles.join('')}
                </head>
                <body class=Page><div class=Page-Root id=root>`);

            const Platformed = withRegistry<IPageProps>(platformsMap[platform])(Page);

            const stream = renderToNodeStream(
                <Router location={req.url} context={{}}>
                    <Platformed store={store} />
                </Router>
            );

            stream.pipe(res, { end: false });

            stream.on('end', () => {
                res.write(`</div><script id=requestId>window.requestId='${requestId}';</script>${scripts.join('')}</body></html>`);

                res.end();
                next();
            });
        });
    });

    router.get('/cached/:id', (req, res) => {
        const cached = cacheStorage.get(req.params.id);
        return res.json(cached);
    });

    router.get('/api/tickets', (_, res) => res.json(api.tickets));

    return router;
}
