import * as React from 'react';
import { cn } from '@bem-react/classname';

const cnLink = cn('Link');

export interface ILinkProps {
    url: string;
    target?: '_blank';
}

export const Link: React.SFC<ILinkProps> = props => (
    <a className={cnLink()} href={props.url} target={props.target}>{props.children}</a>
);

