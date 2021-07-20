import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle, Resonance } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle, resonances } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';
import { fakeSelect } from '../directives/fake-select.directive';
import { bubbles } from '../directives/bubbles.directive';

// RHH = Resonance, Hunger, Humanity
@customElement('cs-rhh')
export class CharacterRhhComponent extends LitElement {
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
    changeResonance(e: any) {
        console.log(`changeResonance e =`, e);
        const val = Number(e.path[0].dataset.value);
        console.log(`resonance val = ${val}`);
        this.character.resonance = val;
    }

    async initialize() {
        this.editMode = !!this.characterCreation;
    }

    async saveCsData() {

    }

    toggleHunger(e: any) {
        console.log(`toggleHunger e = `, e);
    }

    toggleHumanity(e: any) {
        console.log(`toggleHumanity e = `, e);
    }

    // Styles
    static styles = [
        appStyles,
        css`

        `
    ];


    // DOM
    render() {
        const header = html`<h4>Resonance - Hunger - Humanity</h4>`;
        const resonanceListDom = html`${fakeSelect(resonances, "Resonance", 'resonance', this.changeResonance)}`;
        const resonance: Resonance | undefined = resonances.find((r: Resonance) => r.id === this.character.resonance);

        // <input type="number" value="${Number(this.character.hunger)}" increment="1" max="5" min="0" />
        // <input type="number" value="${Number(this.character.humanity)}" increment="1" max="10" min="0" />

        return html`
            <div class="cs-section cs-basics-container">
                <div class="cs-section-head">
                    ${ this.editMode ? header : html`` }
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap three-col">
                    <div class="cs-resonance-container">
                        ${this.editMode ? html`${resonanceListDom}` : html`Resonance: <span>${resonance?.name}</span>`}
                    </div>
                    <div class="cs-hunger-container">shape: string, startingValue: number, total: number, actionCallback: Function
                        <label for="cs-hunger">Hunger</label>: ${ bubbles('square', Number(this.character.hunger), 10, this.toggleHunger) }
                    </div>
                    <div class="cs-humanity-container">
                        <label for="cs-humanity">Humanity</label>:  ${ bubbles('square', Number(this.character.humanity), 10, this.toggleHumanity) }
                    </div>
                </div>
            </div>
		`;
    }
}
