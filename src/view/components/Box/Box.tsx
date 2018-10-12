import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Box.css';

const cnBox = cn('Box');

export interface IBoxProps {
    className?: string;
}

export const Box: React.SFC<IBoxProps> = ({ className, children }) => (
    <div className={cnBox(null, [className])}>{children}</div>
);
