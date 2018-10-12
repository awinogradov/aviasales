import * as React from 'react';
import { FormEventHandler } from 'react';
import { cn } from '@bem-react/classname';

import { IHoverableComponentProps, withHover } from '../Hoverable/Hoverable';

import './Checkbox.css';

const cnCheckbox = cn('Checkbox');

export interface ICheckboxProps extends IHoverableComponentProps {
    className?: string;
    title?: string;
    value: string | number;
    checked: boolean;
    id: string;
    onChange: FormEventHandler;
}

const CheckboxPresenter: React.SFC<ICheckboxProps> = props => (
    <span
        className={cnCheckbox({
            hovered: props.hovered,
            disabled: props.disabled,
        }, [props.className])}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}>
        <label className={cnCheckbox('Label')} htmlFor={props.id}>
            <input
                className={cnCheckbox('Input')}
                type="checkbox"
                id={props.id}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange} />

            <span className={cnCheckbox('View')} />

            {props.title}
        </label>
    </span>
);

export const Checkbox = withHover(CheckboxPresenter);
