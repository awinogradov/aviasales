import { URL, URLSearchParams } from 'url';
import * as got from 'got';

type SupportedCurrency = 'RUB' | 'USD' | 'EUR';

export interface ICurrencyRequest {
    source: SupportedCurrency;
    target: SupportedCurrency;
    value: number;
}

export interface ICurrencyAPIFormat {
    [SOURCE_TARGET: string]: {
        val: number;
    };
}

export interface ICurrencyResponse {
    value: number;
}

export const currency = (req: ICurrencyRequest): Promise<ICurrencyResponse> => {
    const url = new URL('http://free.currencyconverterapi.com/api/v5/convert');
    url.search = new URLSearchParams({
        q: `${req.source}_${req.target}`,
        compact: 'y',
    }).toString();

    return got(url, { json: true })
        .then(o => o.body)
        .then((res: ICurrencyAPIFormat) => {
            const diff = res[Object.keys(res)[0]].val;

            return {
                value: Math.round(req.value * diff),
            };
        });
};
