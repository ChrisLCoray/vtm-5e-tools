import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';

@customElement('add-list')
export class AddListComponent extends LitElement {
    // Properties
    @property({ type: String, attribute: 'add-title' }) addTitle: string = '';

    @property({ type: Array, attribute: 'list-data' }) listData: string[] = [];

    constructor(
        addTitle: string,
        listData: string[],
    ) {
        super();

        this.addTitle = addTitle || '';
        this.listData = listData || [];

        console.log(`this.list = `, this.listData);
        console.log(`this.addTitle = ${this.addTitle}`);
    }

    connectedCallback() {
        super.connectedCallback();
    }

    // Methods
    addItem(e: any) {
        const input = e.path[1].querySelector('.list-data-add-input');
        if (input?.value && this.listData.indexOf(input.value) < 0) {
            this.listData.push(input.value.trim());
        }
        input.value = '';
        input.focus();
        this.requestUpdate();
    }

    createListItems() {
        // @TODO: This could use a more thorough regex for replacing special chars
        const addId = this.addTitle ? this.addTitle.toLowerCase().replace(/\/|\&|\s+/g, '-') : 'my-id';
        console.log(`addId = ${addId}`);
        if (this.listData?.length > 0) {
            return html`<ul class="add-list-items sans" id="${addId}">${this.listData.map((item: any) => html`<li>${item} <span class="material-icons-outlined dark list-data-remove" @click="${this.removeItem}" title="Remove ${this.addTitle}">remove</span></li>`)}</ul>`;
        }
        return html``;
    }

    removeItem(e: any) {
        const valueArray = e.path[1].innerText.trim().split('\nremove');
        this.listData.splice(this.listData.indexOf(valueArray[0]), 1);
        this.requestUpdate();
    }

    async saveCsData() {
        // @TODO: save data
    }

    // Styles
    static styles = [
        appStyles,
        css`

        `
    ];


    // DOM
    render() {
        return html`
            <div class="list-data-container">
                ${this.createListItems()}
                <div class="list-data-add">
                    <input class="list-data-add-input" placeholder="Add New ${this.addTitle}" type="text" value="" />
                    <span class="material-icons-outlined" style="vertical-align: -2px;" @click="${this.addItem}">add</span>
                </div>
            </div>
        `
    }
}
