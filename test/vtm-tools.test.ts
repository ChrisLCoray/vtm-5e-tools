import { html, fixture, expect } from '@open-wc/testing';
import { VtmTools } from '../src/VtmTools.js';
import '../src/vtm-tools.js';

describe('VtmTools', async () => {
	let element: VtmTools;
	beforeEach(async () => {
		element = await fixture(html`<vtm-tools></vtm-tools>`);
	});

	it('renders an h1', () => {
		const h1 = element.shadowRoot!.querySelector('h1')!;
		expect(h1).to.exist;
		expect(h1.textContent).to.equal(element.title);
	});

	// Quick copy + paste template
	// it('', async () => {});

	// ARIA compatibility audit
	// it('passes the a11y audit', async () => {
	// 	await expect(element).shadowDom.to.be.accessible();
	// });
});
