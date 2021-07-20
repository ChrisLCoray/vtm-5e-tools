/**
 * This is used for creating the bubbles
 * used to increment/decrement Discipline levels,
 * Advantages & Flaws, Blood Potency, etc.
 */

import { html, TemplateResult } from 'lit';
import { Directive, directive } from 'lit/directive.js';

class BubblesDirective extends Directive {
    // Methods
    genBubbles(shape: string, startingValue: number, total: number, actionCallback: Function) {
        const bubbleFilled = html`<span class="material-icons-outlined" @click=${actionCallback}>radio_button_checked</span>`;
        const bubbleOpen = html`<span class="material-icons-outlined" @click=${actionCallback}>radio_button_unchecked</span>`;
        const squareFilled = html`<span class="square-filled" @click=${actionCallback}><span class="material-icons-outlined">check_box_outline_blank</span><span class="box-fill"></span></span>`;
        const squareOpen = html`<span class="material-icons-outlined" @click=${actionCallback}>check_box_outline_blank</span>`;

        const bubbleRow = [];
        for (let i = 0; i < total; i += 1) {
            const thisShape = (shape === 'bubble') ? (i < total) ? bubbleFilled : bubbleOpen : (i < total) ? squareFilled : squareOpen;
            bubbleRow.push(thisShape);
        }

        return bubbleRow;
    }

    // DOM
    render(shape: string, startingValue: number, total: number, actionCallback: Function) {
        html`${this.genBubbles(shape, startingValue, total, actionCallback)}`;
    }

}

export const bubbles = directive(BubblesDirective);
