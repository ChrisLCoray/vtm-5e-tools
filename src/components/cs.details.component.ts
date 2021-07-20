import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter } from '../services/commonData';
import { convertStringDate } from '../services/commonTools';
import { dateSelect } from '../directives/date-select.directive';

@customElement('cs-details')
export class CharacterDetailsComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Boolean }) editMode: boolean = false;

    @property({ type: Number }) currentYear: number = 0;

    constructor(
        character: Character,
        characterCreation: boolean
    ) {
        super();
        this.character = character;
        this.characterCreation = characterCreation;

        const d = new Date();
        this.currentYear = d.getFullYear();
    }

    connectedCallback() {
        super.connectedCallback();
        this.initialize();
    }

    // Methods
    calculateAge() {
        console.log(`this.character.dob = ${this.character.dob}`);
        console.log(`this.character.dod = ${this.character.dod}`);

        if (this.character.dob.length > 0) {
            const today = new Date();
            const dob = new Date(this.character.dob);
            console.log(`dob = `, dob);
            const thisYear = today.getFullYear();
            const birthYear = dob.getFullYear();
            this.character.trueAge = thisYear > birthYear ? (thisYear - birthYear).toString() : '0';

            if (this.character.dod.length > 0) {
                const dod = new Date(this.character.dod);
                console.log(`dod = `, dod);
                const deathYear = dod.getFullYear();
                this.character.apparentAge = deathYear > birthYear ? (deathYear - birthYear).toString() : '0';

                console.log(`this.character.trueAge = ${this.character.trueAge}`);
                console.log(`this.character.apparentAge = ${this.character.apparentAge}`);
                this.requestUpdate();
            }
        }
    }

    convertDate(e: any) {
        const characterKey: string = e.path[2].className.replace('cs-', '');
        const {children} = e.path[1];

        // I don't *love* this but we know the structure of the date select
        const dayValue = children[1].value;
        const monthValue = children[2].value;
        const yearValue = children[3].value;

        if (dayValue.length > 0 && monthValue.length > 0 && yearValue.length > 0) {     
            this.character[characterKey] = `${dayValue  } ${  monthValue  }, ${  yearValue}`;
            this.calculateAge();
        }
    }

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
        const header = this.characterCreation ? html`<h4>Other Details</h4>` : html``;
        return html`
            <div class="cs-section cs-basics-container">
                <div class="cs-section-head">
                    ${ this.editMode ? header : html`` }
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap">
                    <div class="cs-image">
                        ${ this.editMode ? html`<input type="file" name="image" id="image" />` : html`<img src=${this.character.image} />` }
                    </div>
                    <div class="two-col flex-row flex-wrap">
                        <div class="cs-dob">${ dateSelect('Date of Birth', this.convertDate) }</div>
                        <div class="cs-dod">${ dateSelect('Date of Death', this.convertDate) }</div>
                        <div class="cs-true-age"><label for="cs-true-age">True age:</label> <input name="true-age" id="true-age" type="text" .value=${this.character.trueAge} /></div>
                        <div class="cs-apparent-age"><label for="cs-apparent-age">Apparent age:</label> <input name="apparent-age" id="apparent-age" type="text" .value=${this.character.apparentAge} /></div>
                    </div>

                    <div class="three-col">
                        <div class="cs-appearance"><label for="cs-appearance">Appearance:</label> <input name="appearance" id="appearance" type="text" value=${this.character.appearance} /></div>
                        <div class="cs-distinguishing-features"><label for="cs-distinguishing-features">Distinguishing features:</label> <input name="distinguishing-features" id="distinguishing-features" type="text" value=${this.character.distinguishingFeatures} /></div>
                        <div class="cs-history"><label for="cs-history">History:</label> <input name="history" id="history" type="text" value=${this.character.history} /></div>
                    </div>
                </div>
            </div>
		`;
    }
}
