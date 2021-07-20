/**
 * Directive for creating modal (dialog) boxes with a unified style
 */
import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit-element';
import { Directive, directive } from 'lit/directive.js';

class ModalDirective extends Directive {
    @property(({ type: Function, attribute: 'actionCallback' })) callback: any = undefined;

    // Methods
    static closeDialog(e: any) {
        // add in actionCallback functionality
        e.path.find((el: any) => el.localName === 'dialog').close();
    }

    showInfo(modalId: string) {
        const infoDialog: any = document.getElementById(modalId);
        console.log(`infoDialog = `, infoDialog);
        // const infoDialog: any = LitElement.shadowRoot!.get('#infoDialog')!;
        // if (infoDialog.open) {
        //     infoDialog.close();
        //     return;
        // }
        // if (typeof infoDialog.showModal === "function") {
        //     infoDialog.showModal();
        // }
    }

    callbackWrapper(e: any, actionCallback: Function) {
        ModalDirective.closeDialog(e);
        actionCallback();
    }

    cancelButton(cancellable: boolean) {
        if (cancellable) {
            return html`<button id="cancelBtn" value="cancel"></button>`;
        }
    }

    render(htmlDOM: TemplateResult, modalId: string, cancellable: boolean = false, actionCallback: Function = () => { }) {
        this.callback = actionCallback;
        return html`
            <dialog id="${modalId}">
                ${htmlDOM}
                ${this.cancelButton(cancellable)}
                <button id="confirmBtn" @click=${ModalDirective.closeDialog}>OK</button>
            </dialog>
        `
    }
}

export const modal = directive(ModalDirective);
