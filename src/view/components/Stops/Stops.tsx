import * as React from 'react';
import { FormEvent } from 'react';
import { cn } from '@bem-react/classname';

import { Fieldset } from '../Fieldset/Fieldset';
import { StopsItem } from './Item/Stops-Item';

import './Stops.css';

const cnStops = cn('Stops');

export interface IStopsProps {
    onChange: (value: number[]) => void;
    value: number[];
}

interface IStopsState {
    variants: Record<string, boolean>;
    all: boolean;
}

export const stopsPluralMask: Record<string, string> = {
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки'
};

const makeDict = (values: Array<string | number>) => (value: boolean) => values.reduce((acc: Record<string, boolean>, curr) => {
    acc[curr] = value;
    return acc;
}, {});

const allIs = (value: boolean) => makeDict(Object.keys(stopsPluralMask))(value);


export class Stops extends React.Component<IStopsProps, IStopsState> {
    constructor(props: IStopsProps) {
        super(props);

        this.state = {
            variants: Object.keys(stopsPluralMask).reduce((acc: Record<string, boolean>, curr) => {
                acc[curr] = props.value.indexOf(Number(curr)) !== -1;
                return acc;
            }, {}),
            all: props.value.length === 4,
        };

        this.onVariantChange = this.onVariantChange.bind(this);
        this.onAllChange = this.onAllChange.bind(this);
        this.onOnlyClick = this.onOnlyClick.bind(this);
    }

    render() {
        const { variants, all } = this.state;

        return (
            <Fieldset className={cnStops()} title="Количество пересадок">
                <StopsItem
                    title="Все"
                    id="chAll"
                    value="all"
                    checked={all}
                    onChange={this.onAllChange} />

                {Object.keys(variants).map(value => (
                    <StopsItem
                        title={stopsPluralMask[value]}
                        key={`ch${value}`}
                        id={`ch${value}`}
                        value={value}
                        checked={variants[value]}
                        onChange={this.onVariantChange}
                        onOnlyClick={this.onOnlyClick}
                        possibleOnlyValue={value} />
                ))}
            </Fieldset>
        );
    }

    protected onOnlyClick(value: string) {
        this.setState({
            variants: {
                ...allIs(false),
                [value]: true,
            },
            all: false,
        });
    }

    protected onVariantChange(e: FormEvent<HTMLInputElement>) {
        const { checked, value } = e.currentTarget;

        this.setState({
            variants: {
                ...this.state.variants,
                [value]: checked,
            },
            all: checked ? this.state.all : false,
        }, this.onChange);
    }

    protected onAllChange(e: FormEvent<HTMLInputElement>) {
        const { checked } = e.currentTarget;

        this.setState({
            variants: allIs(checked),
            all: checked,
        }, this.onChange);
    }

    protected onChange() {
        const { variants } = this.state;

        this.props.onChange(Object.keys(variants).filter(v => variants[v]).map(Number));
    }
}
