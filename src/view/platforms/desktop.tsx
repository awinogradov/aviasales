import { render } from '../';
import { desktop } from '../components/Page/Page.registry/desktop';
import { Page } from '../components/Page/Page';

render(Page, desktop);

module.hot && module.hot.accept(
    '../components/Page/Page',
    () => render(require('../components/Page/Page').Page, desktop)
);
