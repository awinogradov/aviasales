import * as React from 'react';
import { cn } from '@bem-react/classname';

import { Checkbox, ICheckboxProps } from '../../Checkbox/Checkbox';
import { IHoverableComponentProps, withHover } from '../../Hoverable/Hoverable';

import './Stops-Item.css';

const cnStops = cn('Stops');

export interface IStopsItemProps extends IHoverableComponentProps, ICheckboxProps {
    possibleOnlyValue?: any;
    onOnlyClick?: (value: string) => void;
}

const StopsItemPresenter: React.SFC<IStopsItemProps> = props => (
    <div
        className={cnStops('Item', {
            hovered: props.hovered,
            disabled: props.disabled,
        })}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}>
        <Checkbox className={cnStops('Checkbox')} {...props} />
        {props.possibleOnlyValue && props.hovered && (
            <span
                className={cnStops('OnlyButton')}
                onClick={() => props.onOnlyClick && props.onOnlyClick(props.possibleOnlyValue)}
                onMouseEnter={props.onMouseEnter}>
                ТОЛЬКО
            </span>
        )}
    </div>
);

StopsItemPresenter.defaultProps = {
    possibleOnlyValue: false,
};

export const StopsItem = withHover(StopsItemPresenter);
