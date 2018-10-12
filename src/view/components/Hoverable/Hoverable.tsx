import * as React from 'react';
import { MouseEvent, MouseEventHandler } from 'react';

export interface IHoverableComponentProps {
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    disabled?: boolean;
    hovered?: boolean;
}

export interface IHoverableComponentState {
    disabled?: boolean;
    hovered?: boolean;
}

export const ensureProp = (predicate: boolean, prop: any) => predicate ? prop : undefined;

export function withHover<P extends IHoverableComponentProps>(WrappedComponent: React.ComponentType<P>): React.SFC<P> {
    class HoverableComponent extends React.Component<IHoverableComponentProps, IHoverableComponentState> {
        constructor(props: IHoverableComponentProps) {
            super(props);

            const { disabled } = this.props;

            this.state = {
                disabled,
                hovered: this.props.hovered,
            };

            this.onMouseEnter = this.onMouseEnter.bind(this);
            this.onMouseLeave = this.onMouseLeave.bind(this);
        }

        componentWillReceiveProps(nextProps: IHoverableComponentProps) {
            if (nextProps.disabled !== this.props.disabled) {
                this.setState({ disabled: nextProps.disabled });
            }
        }

        render() {
            const { disabled, hovered } = this.state;

            const newProps = Object.assign({}, {
                disabled,
                hovered: !disabled && hovered,
                onMouseEnter: ensureProp(!disabled, this.onMouseEnter),
                onMouseLeave: ensureProp(!disabled, this.onMouseLeave),
            }, this.props);

            return <WrappedComponent {...newProps} />;
        }

        protected onMouseEnter(e: MouseEvent<HTMLElement>) {
            this.setState({ hovered: true });

            if (this.props.onMouseEnter) {
                this.props.onMouseEnter(e);
            }
        }

        protected onMouseLeave(e: MouseEvent<HTMLElement>) {
            this.setState({ hovered: false });

            if (this.props.onMouseLeave) {
                this.props.onMouseLeave(e);
            }
        }
    }

    return (props: P) => <HoverableComponent {...props} />;
};
