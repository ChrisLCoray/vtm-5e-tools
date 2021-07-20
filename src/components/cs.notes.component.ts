import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';

@customElement('cs-notes')
export class CharacterNotesComponent extends LitElement {
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
        this.initialize();
    }

    // Methods
    async initialize() {
        this.editMode = !!this.characterCreation;
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
        const header = this.characterCreation ? html`<h4>Notes</h4>` : html``;
        return html`
            <div class="cs-section cs-basics-container">
                <div class="cs-section-head">
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap">
                </div>
            </div>
		`;
	}
}
