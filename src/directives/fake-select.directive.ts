/**
 * This is used for creating fake dropdown selects
 * which give us much more control over styling the select box
 */

import { html, TemplateResult } from 'lit';
import { Directive, directive } from 'lit/directive.js';

class FakeSelectDirective extends Directive {
    // Methods
    toggleSelect(e: any) {
        const fakeSelect: any = e.path.find((elms: any) => elms.classList[0] === 'fake-select');
        fakeSelect.classList.toggle('show');

        // Close the dropdown if the user clicks outside of it
        window.onclick = (event: any) => {
            if (!event.target.matches('.fake-select')) {
                const dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    const openDropdown: any = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        fakeSelect.onclick = (event: any) => {
            console.log(`fakeSelect event = `, event);
            const el = event.path[2];
            if (el.matches('.show') > -1) {
                el.classList.remove('show');
                const fsTitle = el.getElementsByClassName('fs-title')[0];
                if (fsTitle) {
                    fsTitle.innerText = event.target.innerText.trim();
                    fsTitle.classList.add('selected');
                }
            }
        }
    }

    render(data: { id: number, name: string }[], title: string, key: string, actionCallback: Function) {
        return html`
            <div class="fake-select" id="fs-dd" @click=${this.toggleSelect}>
                <div data-value="">
                    <span class="fs-title">${title}</span>
                    <span class="material-icons-outlined">expand_more</span>
                </div>
                <div class="fs-dropdown">
                    ${data.map((d) => html`<div data-value="${d.id}" @click=${actionCallback}>${d.id < 0 ? html`<strong>${d.name}</strong>` : html`${d.name}`}</div>`)}
                </div>
                <input type="hidden" name=${key} id=${key} value="" />
            </div>
        `
    }
}

export const fakeSelect = directive(FakeSelectDirective);
