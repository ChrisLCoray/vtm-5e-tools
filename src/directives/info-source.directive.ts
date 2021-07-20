/**
 * This is used for creating an info icon
 * with a title property that shows source and page number on mouseover / screen reader
 * or a modal on click in a white card
 */

import { html, TemplateResult } from 'lit';
import { Directive, directive } from 'lit/directive.js';
import { buildSourcePage } from '../services/commonTools';
import { ModalDialogComponent } from '../components/modal.component';

 '../components/modal.component';

class InfoSourceDirective extends Directive {
    // Methods
    openDialog(e: any) {
        // console.log('openDialog e.path = ', e.path)
        const infoDialog: any = e.path.find((elem: any) => elem.id === "this-modal");
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

    // DOM
    render(data: { id: number, page: number }, title: string, actionCallback: Function = () => { }) {
        if (data && title) {
            const titleId: string | number = title ? title.toLowerCase().replace(/ /g, '-') : Math.floor(Math.random() * 1000) + 1;
            const titleString: string = `${title}${buildSourcePage(data.id, data.page)} `;
            const modalDom = html`<p>${titleString}</p>`;
            const modalId: string = `modal-${titleId}`;

            return html`
            <span class="material-icons-outlined info-icon" style="color: var(--theme-darker-gray); vertical-align: -2px;" 
                title=${titleString} @click=${this.openDialog}>info</span>
            <modal-d .inner-dom=${modalDom} modal-id="this-modal" modal-title=${title}></modal-d>
            `;
        } 
            return html``;
        

    }

}

export const infoSource = directive(InfoSourceDirective);
