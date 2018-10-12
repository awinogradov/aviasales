import { render } from '../';
import { touch } from '../components/Page/Page.registry/touch';
import { Page } from '../components/Page/Page';

render(Page, touch);

module.hot && module.hot.accept(
    '../components/Page/Page',
    () => render(require('../components/Page/Page').Page, touch)
);
