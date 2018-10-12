import * as React from 'react';
import { cn } from '@bem-react/classname';
import { compose } from 'really-typed-compose';

import { Button } from '../Button/Button';
import { ButtonThemeDefault } from '../Button/_theme/Button_theme_default';

import './RadioButton.css';

const cnRadioButton = cn('RadioButton');
const ButtonWithMods = compose(ButtonThemeDefault)(Button);

export interface IRadioButtonItem {
    value: string;
    text: string;
    checked?: boolean;
}

export interface IRadioButtonProps {
    className?: string;
    theme?: 'default';
    items: IRadioButtonItem[]
    onChange: (value: IRadioButtonItem['value']) => void;
}

export class RadioButton extends React.PureComponent<IRadioButtonProps> {
    render() {
        const { theme, items, className } = this.props;
        const count = items.length;

        return (
            <div className={cnRadioButton({ theme }, [className])}>
                <div className={cnRadioButton('Inner')}>
                    {items.map((item, i) => {
                        let side = count === 1 ? 'both' : '';

                        if (i === 0) {
                            side = 'left';
                        }

                        if (i === (count - 1)) {
                            side = 'right';
                        }

                        return (
                            <div className={cnRadioButton('ButtonWrap')} key={`rb${i}`}>
                                <ButtonWithMods
                                    theme={theme}
                                    onClick={this.declButtonClick(item.value)}
                                    className={cnRadioButton('Button', {
                                        side,
                                        checked: item.checked
                                    })}>
                                    {item.text}
                                </ButtonWithMods>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    protected declButtonClick = (value: IRadioButtonItem['value']) => () => {
        this.props.onChange(value);
    }
}
