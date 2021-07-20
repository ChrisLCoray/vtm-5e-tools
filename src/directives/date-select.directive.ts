/**
 * This is used for creating fake dropdown selects
 * which give us much more control over styling the select box
 */

import { html, TemplateResult } from 'lit';
import { Directive, directive } from 'lit/directive.js';
import { titleToId } from '../services/commonTools';

const monthsEn: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class DateSelectDirective extends Directive {
    // Methods
    loopDays() {
        const output: any[] = [];
        for (let i = 1; i < 32; i += 1) {
            output.push(html`<option value="${i}">${i}</option>`)
        }
        return html`${output}`;
    }

    loopMonths() {
        const output: any[] = [];
        for (let i = 0; i < monthsEn.length; i += 1) {
            output.push(html`<option value="${monthsEn[i]}">${monthsEn[i]}</option>`)
        }
        return html`${output}`;
    }

    render(title: string, actionCallback: Function) {
        return html`
            <div class="date-select" id=${titleToId('date-select', title)}>
                <label>${ title }: </label>
                <select class="day-select" @change=${actionCallback}>
                    <option value="">Day</option>
                    ${ this.loopDays() }
                </select>
                <select class="month-select" @change=${actionCallback}>
                    <option value="">Month</option>
                    ${ this.loopMonths() }
                </select>
                <input @blur=${actionCallback} type="number" class="date-year" placeholder="Year" value="" />
            </div>
        `
    }
}

export const dateSelect = directive(DateSelectDirective);
