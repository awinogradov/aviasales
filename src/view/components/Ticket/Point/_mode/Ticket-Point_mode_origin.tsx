import * as React from 'react';

import { withCondition, matchProps } from '../../../../../packages/conditional-component';
import { ITicketPointProps } from '../Ticket-Point';

export const TicketPointModeOrigin = withCondition<ITicketPointProps>(
    matchProps({ mode: 'origin'}),
    (TicketPoint, props) => (
        <TicketPoint {...props} title={`${props.iata}, ${props.name}`} />
    ),
);
