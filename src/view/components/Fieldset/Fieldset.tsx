import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Fieldset.css';

const cnFieldset = cn('Fieldset');

export interface IFieldsetProps {
    className?: string;
    title?: string;
}

export const Fieldset: React.SFC<IFieldsetProps> = ({ className, title, children }) => (
    <fieldset className={cnFieldset(null, [className])}>
        {title && <legend className={cnFieldset('Legend')}>{title}</legend>}
        {children}
    </fieldset>
);
