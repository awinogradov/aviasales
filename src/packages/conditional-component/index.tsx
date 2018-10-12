import * as React from 'react';

export type Condition<P> = (props: P) => boolean;
export type Body<P> = (Component: React.ComponentType<P>, props: P) => JSX.Element;

type Dictionary<P> = P & {
    [key: string]: string;
}

export function matchProps<P>(subset: Partial<P>): (props: P) => boolean  {
    return (props: P): boolean => Object.keys(subset).every(key => (props as Dictionary<P>)[key] === (subset as Dictionary<Partial<P>>)[key]);
}

export function withCondition<P>(condition: Condition<P>, cb?: Body<P>) {
    return function WithCondition(WrappedComponent: React.ComponentType<P>) {
        return function ConditionalComponent(props: P) {
            if (condition(props)) {
                return cb
                    ? cb(WrappedComponent, props)
                    : <WrappedComponent {...props} />;
            }

            return <WrappedComponent {...props} />;
        };
    };
}
