import { withCondition, matchProps } from '../../../../packages/conditional-component';

import { IButtonProps } from '../Button';

import './Button_action.css';

export const ButtonAction = withCondition<IButtonProps>(matchProps<IButtonProps>({ action: true }));
