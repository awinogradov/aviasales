import * as React from 'react';

import { withCondition, matchProps } from '../../../../../packages/conditional-component';
import { ITicketPointProps } from '../Ticket-Point';

export const TicketPointModeDestination = withCondition<ITicketPointProps>(
    matchProps({ mode: 'destination'}),
    (TicketPoint, props) => (
        <TicketPoint {...props} title={`${props.name}, ${props.iata}`} />
    ),
);
