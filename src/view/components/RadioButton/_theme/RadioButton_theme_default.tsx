import { withCondition, matchProps } from '../../../../packages/conditional-component';

import { IRadioButtonProps } from '../RadioButton';

import './RadioButton_theme_default.css';

export const RadioButtonThemeDefault = withCondition<IRadioButtonProps>(matchProps<IRadioButtonProps>({ theme: 'default' }));
