import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import { MDCList } from '@material/list';
import * as mws from '../services/middleware.service';
import { Character, Chronicle } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';

@customElement('modal-d')
export class ModalDialogComponent extends LitElement {
    // Properties
    @property({ type: String, attribute: 'callback-func' }) actionCallback: Function | any = () => { };

    @property({ type: Boolean, attribute: 'cancellable' }) cancellable: boolean = false;

    @property({ type: String, attribute: 'inner-dom' }) htmlDOM: string | any = '';

    @property({ type: String, attribute: 'modal-id' }) modalId: string = '';

    @property({ type: String, attribute: 'modal-title' }) modalTitle: string = '';

    constructor(
        actionCallback: Function,
        cancellable: boolean,
        htmlDOM: string,
        modalId: string,
        modalTitle: string,
    ) {
        super();

    }

    connectedCallback() {
        super.connectedCallback();
        this.initialize();
    }

    // Methods
    cancelButton(cancellable: boolean) {
        if (cancellable) {
            return html`<button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="close">
                            <div class="mdc-button__ripple"></div>
                            <span class="mdc-button__label">Cancel</span>
                        </button>`;
        }
    }

    static closeDialog(e: any) {
        // add in actionCallback functionality
        e.path.find((el: any) => el.localName === 'dialog').close();
    }

    openDialog(e: any) {
        console.log(`openDialog e = `, e);
        // const infoDialog: any = document.getElementById(modalId);
        // console.log(`infoDialog = `, infoDialog);
        // const infoDialog: any = LitElement.shadowRoot!.get('#infoDialog')!;
        // if (infoDialog.open) {
        //     infoDialog.close();
        //     return;
        // }
        // if (typeof infoDialog.showModal === "function") {
        //     infoDialog.showModal();
        // }
    }

    async initialize() {

    }

    async saveCsData() {

    }

    // Styles
    static styles = [
        appStyles,
        css`

        `
    ];


    // DOM
    render() {
        const modalDialog = new MDCList(document.querySelector(`#${this.modalId}`)!);
        modalDialog.listen('MDCDialog:opened', () => {
            console.log('modalDialog opened');
        });
        modalDialog.listen('MDCDialog:closing', () => {
            if (this.actionCallback) {
                this.actionCallback();
            }
        });

        /*
            <dialog id="${this.modalId}">
                ${this.htmlDOM}
                ${this.cancelButton(this.cancellable)}
                <button id="confirmBtn">OK</button>
            </dialog>
        */

        return html`
            <div class="mdc-dialog" id=${this.modalId}>
                <div class="mdc-dialog__container">
                    <div class="mdc-dialog__surface"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="my-dialog-title"
                        aria-describedby="my-dialog-content">
                    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
                    <h2 class="mdc-dialog__title" id="my-dialog-title">${this.modalTitle}</h2>
                    <div class="mdc-dialog__content" id="my-dialog-content">
                       ${this.htmlDOM}
                    </div>
                    <div class="mdc-dialog__actions">
                        ${this.cancelButton(this.cancellable)}
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="accept">
                            <div class="mdc-button__ripple"></div>
                            <span class="mdc-button__label">OK</span>
                        </button>
                    </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim"></div>
                </div>
		`;
    }
}
