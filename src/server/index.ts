import { join } from 'path';
import { Server } from 'http';
import * as express from 'express';
import { Router } from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as MobileDetect from 'mobile-detect';
import * as morgan from 'morgan';

import { setup } from './app';

const app = express();
const port = process.env.PORT || 3000;
const assetsManifest = 'asset-manifest.json';
const staticStorage = join(__dirname, '..', '..', 'build');

let server: Server;

function run(router: Router) {
    server && server.close();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use((req, _, next) => {
        const md = new MobileDetect(req.headers['user-agent'] as string);

        req.platform = md.mobile() ? 'touch' : 'desktop';

        next();
    });

    if (process.env.NODE_ENV === 'development') {
        const webpackDevServerProxy = require('http-proxy-middleware')({
            target: 'http://localhost:3001',
            changeOrigin: true,
            ws: true
        });

        app.use(['**/*.*', '/static', '/sockjs-node'], webpackDevServerProxy);
    } else {
        app.use(compression());
        app.use(express.static(staticStorage));
    }

    app.use(router);

    server = app.listen(port);
};

run(setup(assetsManifest));

if (process.env.NODE_ENV === 'development') {
    module.hot && module.hot.accept('./app', () => {
        const app = require('./app').setup(assetsManifest);
        run(app);
    });

    process.argv.push('--config-overrides', './.config/webpack.client.js');
    require('react-app-rewired/scripts/start');
}
