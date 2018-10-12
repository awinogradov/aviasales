import { Registry } from '@bem-react/di';

import { Serp, cnSerp } from '../../Serp/Serp@touch';
import { Ticket, cnTicket } from '../../Ticket/Ticket@touch';

export const touch = new Registry({ id: 'platform' });

touch.set(cnSerp(), Serp);
touch.set(cnTicket(), Ticket);
