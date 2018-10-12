import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Ticket-Point.css';

const cnTicket = cn('Ticket');

export interface ITicketPointProps {
    className?: string;
    mode: 'origin' | 'destination';
    time: string;
    title?: string;
    date: string;
    iata: string;
    name: string;
}

export const TicketPoint: React.SFC<ITicketPointProps> = props => (
    <div className={cnTicket('Point', { mode: props.mode })}>
        <div className={cnTicket('PointTime')}>{props.time}</div>
        <div className={cnTicket('PointTitle')}>{props.title}</div>
        <div className={cnTicket('PointDate')}>{props.date}</div>
    </div>
);
