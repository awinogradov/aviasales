import { URL } from 'url';
import * as got from 'got';
export interface ITicket {
    origin: string;
    origin_name: string;
    destination: string;
    destination_name: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
    carrier: string;
    stops: number;
    price: number;
}

type TicketFields = keyof ITicket;

export const matchSubset = (subset: Partial<ITicket>) => (data: ITicket[]) => data.filter(o => (Object.keys(subset) as TicketFields[]).every(key => o[key] === subset[key]));

const queryMask = [3, 4, 3, 4, 1];
const query = (key: string) => {
    const q = Array.from(key);
    const parsed = [];

    for (const subset of queryMask) {
        parsed.push(q.splice(0, subset).join(''));
    }

    return parsed.filter(Boolean);
}

// tickets in the mocked data available only for VVO1205TLV1
export const tickets = (req: string): Promise<ITicket[]> => {
    const url = new URL('http://localhost:3000/api/tickets');

    const parsedQuery = query(req);
    const subset = matchSubset({
        origin: parsedQuery[0],
        // departure_date: moment(parsedQuery[1], 'DDMM'),
        destination: parsedQuery[2],
    });

    return got(url, { json: true }).then(o => subset(o.body));
};
