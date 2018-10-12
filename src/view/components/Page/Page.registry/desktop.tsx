import { Registry } from '@bem-react/di';

import { Serp, cnSerp } from '../../Serp/Serp@desktop';
import { Ticket, cnTicket } from '../../Ticket/Ticket@desktop';

export const desktop = new Registry({ id: 'platform' });

desktop.set(cnSerp(), Serp);
desktop.set(cnTicket(), Ticket);
