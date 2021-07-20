/**
 * This is used for creating "white card" effects,
 * which are white boxes with red borders that have a 45 deg angle instead
 * of rounded corners, which is used in the VtM 5e manual.
 */

import { html, TemplateResult } from 'lit';
import { Directive, directive } from 'lit/directive.js';

class WhiteCardDirective extends Directive {
	render(htmlDOM: TemplateResult) {
        return html`
            <div class="white-card-container">
                <div class="white-card">
                    <div class="wcb tbl"></div><div class="wcb tbr"></div><div class="wcb bbl"></div><div class="wcb bbr"></div>
                    ${htmlDOM}
                </div>
            </div>
        `
    }
}

export const whiteCard = directive(WhiteCardDirective);
