import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Carrier.css';

const cnCarrier = cn('Carrier');

export interface ICarrierProps {
    className?: string;
    name: string;
}

export const Carrier: React.SFC<ICarrierProps> = ({ name, className }) => (
    <div className={cnCarrier({ name }, [className])} />
);
