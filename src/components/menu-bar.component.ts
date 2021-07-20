import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LinkList } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';

@customElement('menu-bar')
export class MenuBar extends LitElement {
    // Properties
    @property({ attribute: false }) personalHTML: HTMLElement = MenuBar.buildPersonal();

    // Methods
    static buildPersonal(): any {
        const personalLinks: LinkList[] = [
            {
                href: 'http://chrislcoray.com/',
                title: 'Personal Site'
            },
            {
                href: 'https://github.com/ChrisLCoray/',
                title: 'GitHub'
            },
            {
                href: 'https://www.linkedin.com/in/chrislcoray/',
                title: 'LinkedIn'
            }
        ];
        const attribution: LinkList[] = [
            {
                href: 'https://unsplash.com/photos/F-BBfrbAkQQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
                title: 'Plywood by Pawel Czerwinski'
            }
        ];
        let linkDom = ``;
        for (let i = 0; i < personalLinks.length; i+=1) {
            const link = personalLinks[i];
            const end = ((i + 1) !== personalLinks.length) ? `, ` : `.` ;
            linkDom += `${link.title}: <a href="${link.href}" target="_blank">${link.href}</a>${end}`;
        }
        return unsafeHTML(linkDom);
    }

    static closeDialog(e: any) {
        e.path.find((el: any) => el.localName === 'dialog').close();
    }

    showInfo() {
        const infoDialog: any = this.shadowRoot!.querySelector('#infoDialog')!;
        if (infoDialog.open) {
            infoDialog.close();
            return;
        }
        if (typeof infoDialog.showModal === "function") {
            infoDialog.showModal();
        }
    }
    
    // Styles
    static styles = [
        appStyles,
        css`
            menu {
                background-color: var(--theme-darker-gray);
                border-bottom: 1px solid var(--theme-red);
                box-shadow: 0 0 2px var(--theme-black);
                font-size: calc(10px + 2vmin);
                width: 100vw;
                position: fixed;
                top: 0;
                left: 0;
                margin: 0;
                padding: 0;
            }

            #app-info {
                margin-right: 0.5em;
            }

            menu span.material-icons-outlined {
                font-size: 0.75em;
                padding: 0.5em;
                margin-left: 0.5em;
            }

            dialog {
                font-size: 0.75em;
            }

            dialog h1 {
                font-size: 1em;
            }

            dialog ul {
                text-align: left;
            }
        `
    ];

    // DOM
    render() {
        return html`
            <menu>
                <span id="menu-bar-toggle"
                    class="material-icons-outlined left">menu</span>
                <span id="app-info" @click=${this.showInfo} @keyup=${this.showInfo}
                    class="material-icons-outlined right">info</span>
                <span class="clearfix"></span>
            </menu>
            <dialog id="infoDialog">
                <h1>Info: (Unofficial) Vampire the Masquerade 5e Dice Roller</h1>
                <section class="instructions">
                    <p>Instructions:</p>
                    <ul>
                        <li>If your Storyteller tells you the difficulty, you can check the box and select
                            the difficulty using the input box or range slider.</li>
                        <li>Choose your correct dice pool(s)</li>
                        <li>Hit "Roll Dice"</li>
                        <li>If you selected a difficulty or if your failures outweigh your success, you will select
                            the outcome below the "dice tray."
                        </li>
                        <li>The results are logged for convenience and can be manually cleared.</li>
                        <li>More instructions coming as functionality is added.</li>
                    </ul>
                </section>
                <section class="about">
                    <p>About:</p>
                    <p>UVtM5e Dice Roller by Chris Coray, written in <a href="https://lit.dev/" target="_blank">Google Lit</a>.</p>
                    <p>${this.personalHTML}</p>
                </section>
                <button id="confirmBtn" @click=${MenuBar.closeDialog}>Close</button>
            </dialog>
        `
    };
}
