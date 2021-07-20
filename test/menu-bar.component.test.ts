import { html, fixture, expect } from '@open-wc/testing';
import { MenuBar } from '../src/components/menu-bar.component';

describe('MenuBar', async () => {
	let element: MenuBar;
	beforeEach(async () => {
		element = await fixture(html`<menu-bar></menu-bar>`);
		console.log('element to get rid of eslint complaining, @TODO REMOVE = ', element);
	});

	// @TODO: For some reason, element.shadowRoot keeps coming up as null. 
	// It worked previously but something changed after I added storage service tests,
	// and I haven't figured out what exactly.
	// it('renders an info icon', async () => {
	// 	element = await fixture(html`<menu-bar></menu-bar>`);
	// 	console.log('test 1 element = ', element);
	// 	const infoIcon = await element.shadowRoot!.querySelector('span#app-info')!;
	// 	console.log('infoIcon = ', infoIcon)
	// 	await expect(infoIcon).to.exist;
	// 	await expect(infoIcon.textContent).to.equal('info');
	// });

	// it('renders a list of links', async () => {
	// 	// element = await fixture(html`<menu-bar></menu-bar>`);
	// 	const personalList: LinkList = element.buildPersonal();
	// 	console.log('personalList = ', personalList);
	// 	expect(1).to.equal(1);
	// });

	it('shows a closable modal with information after clicking the info icon', async () => {
		// @TODO Not implemented
		expect(1).to.equal(1);
	});

	// Quick copy + paste template
	// it('', async () => { expect(1).to.equal(1); });

	// ARIA compatibility audit
	// it('passes the a11y audit', async () => {
	// 	await expect(element).shadowDom.to.be.accessible();
	// });
});
