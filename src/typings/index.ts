import { ITicket } from '../packages/tickets';

export interface IExtendedWindow extends Window {
    requestId: string;
}

export interface IExtendedTicket extends ITicket {
    price_rub?: string;
    price_usd?: string;
    price_eur?: string;
}

export interface IStore {
    tickets: IExtendedTicket[];
}

export interface IRouterMatch {
    match: {
        params: {
            query: string;
        }
    }
}
