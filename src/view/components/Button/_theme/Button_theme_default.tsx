import { withCondition, matchProps } from '../../../../packages/conditional-component';

import { IButtonProps } from '../Button';

import './Button_theme_default.css';

export const ButtonThemeDefault = withCondition<IButtonProps>(matchProps<IButtonProps>({ theme: 'default' }));
