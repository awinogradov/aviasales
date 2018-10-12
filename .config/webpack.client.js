const cpx = require('cpx');
const rewirePostCSS = require('react-app-rewire-postcss');
const rewireTypescript = require('react-app-rewire-clean-typescript');
const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');

// drop checking for required files
const checkPath = require.resolve('react-dev-utils/checkRequiredFiles.js');
require.cache[checkPath] = { exports: () => true };

const formatPlatformedEntry = entry => {
    const js = entry.pop();
    return platform => [].concat(entry, js.replace('index', `platforms/${platform}`));
};

module.exports = function override(config, env) {
    config = rewireTypescript(config, env, {}, 'src/view/index');
    config = rewirePostCSS(config, {
        plugins: () => [
            require('lost')(),
        ]
    });

    // remove html plugins
    config.plugins.shift();
    config.plugins.shift();

    const setPlatform = formatPlatformedEntry(config.entry);

    config.entry = {
        desktop: setPlatform('desktop'),
        touch: setPlatform('touch'),
    };

    if (env === 'development') {
        config.output.filename = 'static/js/[name].js';
    }

    config.optimization = undefined;

    if (env === 'production') {
        config = rewireWebpackBundleAnalyzer(config, env, {
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false,
        });

        cpx.copySync('src/**/*.css', 'dist');
    }

    return config;
}
