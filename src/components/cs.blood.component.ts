import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';

// Blood Potency, Blood Surge, Mend Amount, etc.
@customElement('cs-blood')
export class CharacterBloodComponent extends LitElement {
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
        const header = this.characterCreation ? html`<h4>Blood-Related Stats</h4>` : html``;
        return html`
            <div class="cs-section cs-basics-container">
                <div class="cs-section-head">
                    ${ this.editMode ? header : html`` }
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap">
                    <div class="cs-blood-potency"><label for="cs-blood-potency">Blood Potency:</label> <input name="blood-potency" id="blood-potency" max="10" step="1" type="number" value=${this.character.bloodPotency} /></div>
                    <div class="cs-blood-surge"><label for="cs-blood-surge">Blood Surge:</label> <input name="blood-surge" id="blood-surge" step="1" type="number" value=${this.character.bloodSurge} /></div>
                    <div class="cs-power-bonus"><label for="cs-power-bonus">Power Bonus:</label> <input name="power-bonus" id="power-bonus" step="1" type="number" value=${this.character.powerBonus} /></div>
                    <div class="cs-feeding-penalty"><label for="cs-feeding-penalty">Feeding Penalty:</label> <input name="feeding-penalty" id="feeding-penalty" step="1" type="number" value=${this.character.feedingPenalty} /></div>
                    <div class="cs-mend-amount"><label for="cs-mend-amount">Mend Amount:</label> <input name="mend-amount" id="mend-amount" step="1" type="number" value=${this.character.mendAmount} /></div>
                    <div class="cs-rouse-reroll"><label for="cs-rouse-reroll">Rouse Re-Roll:</label> <input name="rouse-reroll" id="rouse-reroll" step="1" type="number" value=${this.character.rouseReroll} /></div>
                    <div class="cs-bane-severity"><label for="cs-bane-severity">Bane Severity:</label> <input name="bane-severity" id="bane-severity" step="1" type="number" value=${this.character.baneSeverity} /></div>
                </div>
            </div>
		`;
    }
}
