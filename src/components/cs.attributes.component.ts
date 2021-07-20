import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';

@customElement('cs-attrbs')
export class CharacterAttributesComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Boolean }) editMode: boolean = false;

    constructor(
        character: Character,
        characterCreation: boolean
    ) {
        super();
        this.character = character;
        this.characterCreation = characterCreation;
    }

    connectedCallback() {
        super.connectedCallback();
        this.editMode = !!this.characterCreation;
    }

    // Methods
    async saveCsData() {

    }

    // Styles
    static styles = [
        appStyles,
        css`           
            .cs-attrbs-container .cs-section-body .cs-attrbs-col {
                padding: 0;
                width: 33%;
            }

            .cs-attrbs-container .cs-section-body div input {
                border: none;
            }

            .cs-attrbs-container .cs-section-body div input:focus {
                border: 1px solid var(--theme-red);
                border-radius: none;
                outline: none;
            }

            .cs-attrbs-container .cs-section-foot {
                font-size: 14px;
                text-align: right;
            }

            .cs-section .cs-section-body .cs-attrbs-col {
                border-right: 1px solid var(--theme-darker-gray);
                padding-left: 1%;
                width: 33.33%;
            }

            .cs-section-body .cs-attrbs-col:last-child {
                border-right: none;
                margin-right: 0;
            }

            .cs-section-body .cs-attrbs-col .cs-col-header {
                font-style: italic;
                font-weight: 500;
            }

            .cs-attrbs-container .cs-section-body .cs-attrbs-col div {
                margin-bottom: 0.5em;
                text-align: left;
            }

            .cs-attrbs-container .cs-section-body .cs-attrbs-col div input {
                padding: 2px 4px;
                text-align: center;
            }

            .cs-attrbs-container .cs-section-body .cs-attrbs-col div label {
                display: inline-flex;
                flex-grow: 1;
                min-width: 70%;
            }
        `
    ];

    // DOM
    render() {
        const header = this.characterCreation ? html`<h4>Attributes</h4>` : html``;
        return html`
            <div class="cs-section cs-attrbs-container">
                <div class="cs-section-head">
                    ${header}
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap">
                    <div class="cs-attrbs-col flex-col">
                        <span class="cs-col-header">Physical</span>
                        <div>
                            <label for="cs-strength">Strength</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="strength" id="strength"
                                    @input=${this.saveCsData} value="${this.character.attributes?.physical.strength!}" />`
                                : html`<span>${this.character.attributes?.physical.strength}</span>`
                            }
                        </div>
                        <div>
                            <label for="cs-dexterity">Dexterity</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="dexterity" id="dexterity"
                                    @input=${this.saveCsData} value="${this.character.attributes?.physical.dexterity!}" />`
                                : html`<span>${this.character.attributes?.physical.dexterity}</span>`
                            }
                        </div>
                        <div>
                            <label for="cs-stamina">Stamina</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="stamina" id="stamina"
                                    @input=${this.saveCsData} value="${this.character.attributes?.physical.stamina!}" />`
                                : html`<span>${this.character.attributes?.physical.stamina}</span>`
                            }
                        </div>
                    </div>
                    <div class="cs-attrbs-col flex-col">
                        <span class="cs-col-header">Social</span>
                        <div>
                            <label for="cs-charisma">Charisma</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="charisma" id="charisma"
                                    @input=${this.saveCsData} value="${this.character.attributes?.social.charisma!}" />`
                                : html`<span>${this.character.attributes?.social.charisma}</span>`
                            }
                        </div>
                        <div>
                            <label for="cs-manipulation">Manipulation</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="manipulation" id="manipulation"
                                    @input=${this.saveCsData} value="${this.character.attributes?.social.manipulation!}" />`
                                : html`<span>${this.character.attributes?.social.manipulation}</span>`
                            }
                        </div>
                        <div>
                            <label for="cs-charisma">Composure</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="composure" id="composure"
                                    @input=${this.saveCsData} value="${this.character.attributes?.social.composure!}" />`
                                : html`<span>${this.character.attributes?.social.composure}</span>`
                            }
                        </div>
                    </div>
                    <div class="cs-attrbs-col flex-col">
                        <span class="cs-col-header">Mental</span>
                        <div>
                            <label for="cs-intelligence">Intelligence</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="intelligence" id="intelligence"
                                    @input=${this.saveCsData} value="${this.character.attributes?.mental.intelligence!}" />`
                                : html`<span>${this.character.attributes?.mental.intelligence}</span>`
                            }
                        </div>
                        <div>
                            <label for="cs-wits">Wits</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="wits" id="wits"
                                    @input=${this.saveCsData} value="${this.character.attributes?.mental.wits!}" />`
                                : html`<span>${this.character.attributes?.mental.wits}</span>`
                            }
                        </div>
                        <div>
                            <label for="cs-resolve">Resolve</label>
                            ${ this.editMode
                                ? html`<input type="number" min="0" max="5" increment="1" name="resolve" id="resolve"
                                    @input=${this.saveCsData} value="${this.character.attributes?.mental.resolve!}" />`
                                : html`<span>${this.character.attributes?.mental.resolve}</span>`
                            }
                        </div>
                    </div>
                </div>
            </div>
		`;
	}
}
