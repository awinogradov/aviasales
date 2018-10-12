import * as React from 'react';
import { cn } from '@bem-react/classname';
import { compose } from 'really-typed-compose';

import { Fieldset } from '../Fieldset/Fieldset';
import { RadioButton } from '../RadioButton/RadioButton';
import { RadioButtonThemeDefault } from '../RadioButton/_theme/RadioButton_theme_default';

const cnCurrency = cn('Currency');
const RadioButtonWithMods = compose(RadioButtonThemeDefault)(RadioButton);

export enum currencies {
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR',
};

export interface ICurrencyProps {
    value: currencies;
    onChange: (value: currencies) => void;
}

interface ICurrencyState {
    value: currencies;
}

export class Currency extends React.PureComponent<ICurrencyProps, ICurrencyState> {
    constructor(props: ICurrencyProps) {
        super(props);

        this.state = {
            value: props.value,
        };

        this.onRadioButtonChange = this.onRadioButtonChange.bind(this);
    }

    render() {
        const { value } = this.state;

        return (
            <Fieldset className={cnCurrency()} title="Валюта">
                <RadioButtonWithMods
                    className={cnCurrency('RadioButton')}
                    theme="default"
                    onChange={this.onRadioButtonChange}
                    items={Object.keys(currencies).map(item => ({
                        text: item,
                        value: item,
                        checked: item === value,
                    }))} />
            </Fieldset>
        );
    }

    protected onRadioButtonChange(val: string) {
        const value = val as currencies;
        this.setState({
            value,
        });

        this.props.onChange(value);
    }
}
