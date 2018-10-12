import * as React from 'react';
import { cn } from '@bem-react/classname';
import { RegistryConsumer } from '@bem-react/di';

import { ITicket } from '../../../packages/tickets';
import { IExtendedTicket } from '../../../typings';
import { Box } from '../Box/Box';
import { ITicketProps, cnTicket } from '../Ticket/Ticket';
import { Stops } from '../Stops/Stops';
import { Currency, currencies } from '../Currency/Currency';

import './Serp.css';

export const cnSerp = cn('Serp');

export interface ISerpProps {
    tickets: IExtendedTicket[];
}

interface ISerpState {
    currency: currencies,
    stops: number[];
    tickets: IExtendedTicket[];
}

export const filterable = (field: keyof ITicket) =>
    (data: ITicket[]) =>
        (value: Array<string | number>) =>
            data.filter((o => value.indexOf(o[field]) !== -1));

export class Serp extends React.Component<ISerpProps, ISerpState> {
    private tickets: (stops: number[]) => ITicket[];

    constructor(props: ISerpProps) {
        super(props);

        this.tickets = filterable('stops')(props.tickets);

        const stops = [0];

        this.state = {
            currency: currencies.USD,
            stops,
            tickets: this.tickets(stops),
        };

        this.onStopsChange = this.onStopsChange.bind(this);
        this.onCurrencyChange = this.onCurrencyChange.bind(this);
    }

    render() {
        const { currency, tickets, stops } = this.state;

        return (
            <RegistryConsumer>
                {registries => {
                    const platform = registries['platform'];
                    const Ticket = platform.get<ITicketProps>(cnTicket());

                    return (
                        <div className={cnSerp()}>
                            <Box className={cnSerp('Filters')}>
                                <Currency onChange={this.onCurrencyChange} value={currency} />
                                <Stops onChange={this.onStopsChange} value={stops} />
                            </Box>
                            <div className={cnSerp('Tickets')}>
                                {tickets.map((ticketProps, i) => <Ticket {...ticketProps} currency={currency} key={`t${i}`} />)}
                            </div>
                        </div>
                    )

                }}
            </RegistryConsumer>
        );
    }

    protected onStopsChange(stops: number[]) {
        this.setState({
            stops,
            tickets: this.tickets(stops),
        });
    }

    protected onCurrencyChange(currency: currencies) {
        this.setState({
            currency
        });
    }
}
