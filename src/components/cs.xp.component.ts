import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';

// XP = E[x]perience [P]oints
@customElement('cs-xp')
export class CharacterXpComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Boolean }) editMode: boolean = false;

    @property({ type: Number }) unspentXp: number = 0;

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
    calcUnspent() {
        const unspent = this.character.totalXp - this.character.spentXp;
        this.unspentXp = unspent > -1 ? unspent : 0;
        this.requestUpdate();
    }

    async initialize() {
        this.editMode = !!this.characterCreation;
    }

    async saveCsData() {
        // @TODO save data
    }

    // Styles
    static styles = [
        appStyles,
        css`

        `
    ];


    // DOM
    render() {
        const header = this.characterCreation ? html`<h4>Experience</h4>` : html``;
        return html`
            <div class="cs-section cs-basics-container">
                <div class="cs-section-head">
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap">
                    <div class="cs-total-xp"><label for="cs-total-xp">Total Experience:</label> <input name="total-xp" id="total-xp" type="number" value=${this.character.totalXp} /></div>
                    <div class="cs-spent-xp"><label for="cs-spent-xp">Spent Experience:</label> <input name="spent-xp" id="spent-xp" type="number" value=${this.character.spentXp} /></div>
                    <div class="cs-unspent-xp"><label>Unspent Experience:</label> <span>${ this.unspentXp }</span></div>
                </div>
            </div>
		`;
    }
}
