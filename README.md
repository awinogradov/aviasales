# Simple Aviasales

### Usage

``` bash
❯ npm i
❯ npm start
```

Point your browser to [http://localhost:3000/search/VVO1205TLV1](http://localhost:3000/search/VVO1205TLV1).

### Production

``` bash
❯ npm run build
❯ npm start:production
```

## How it works

Shared React and TypeScript on client and server. Based on the [my boilerplate](https://github.com/awinogradov/cra-ssr-boilerplate).

### Server

- express
- server side __streaming__

### Client

- BEM classNames with [@bem-react/classname](https://npms.io/search?q=%40bem-react%2Fclassname)
- Component variations by `src/packages/conditional-components`
- Composition by [really-typed-compose](https://npms.io/search?q=really-typed-compose)
- Platforms code spliting by Dependency Injection pattern [@bem-react/di](https://npms.io/search?q=%40bem-react%2Fdi). Based on registries and new React Context API.

### Build

- Webpack HMR in development mode for __server and client code__
- fully based on `react-scripts` from CRA. __No eject!__ Customized by `react-app-rewired` and connected to `express` by proxy.

#### Currency

__Be careful!__  `src/packages/currency` is free version of API with requests per hour limitations ;)

### License [MIT](LICENSE)
