import * as React from 'react';
import { MouseEventHandler } from 'react';
import { cn } from '@bem-react/classname';

import { IHoverableComponentProps, withHover } from '../Hoverable/Hoverable';

import './Button.css';

const cnButton = cn('Button');

export interface IButtonProps extends IHoverableComponentProps {
    className?: string;
    theme?: 'default';
    action?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonPresenter: React.SFC<IButtonProps> = props => (
    <button
        className={cnButton({
            theme: props.theme,
            action: props.action,
            hovered: props.hovered,
            disabled: props.disabled
        }, [props.className])}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}>
        {props.children}
    </button>
);

export const Button = withHover(ButtonPresenter);

