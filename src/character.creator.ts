import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import './components/cs.advnflaws.component';
import './components/cs.attributes.component';
import './components/cs.basics.component';
import './components/cs.blood.component';
import './components/cs.details.component';
import './components/cs.disciplines.component';
import './components/cs.rhh.component';
import './components/cs.skills.component';
import './components/cs.ttb.component';
import './components/cs.xp.component';
import { Character } from './project.interface';
import { whiteCard } from './directives/white-card.directive';
import { blankCharacter } from './services/commonData';
import appStyles from './styles/app-styles.css';
import whiteCardStyles from './styles/white-card.css';

@customElement('character-creator')
export class CharacterCreatorComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Array }) creationSteps: string[] = [''];

    @property({ type: Number }) currentStep: number = 1;

    @property({ type: Number }) maxSteps: number = 11;

    constructor(
        character: Character,
        characterCreation: boolean
    ) {
        super();
        this.character = character;
        this.characterCreation = characterCreation;
    }

    // Methods
    currentPercent() {
        return Math.round((this.currentStep / this.maxSteps) * 100);
    }

    stepDir(e: any) {
        const dir = e.path[0].innerText.toLowerCase();
        const returnVal = dir.indexOf('next') > -1 ? this.currentStep += 1 : this.currentStep -= 1;
        return returnVal;
    }

    stepDom() {
        // Sections
        const csAdvFlaws = html`<cs-advnflaws .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-advnflaws>`;
        const csAttrbs = html`<cs-attrbs .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-attrbs>`;
        const csBasics = html`<cs-basics .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-basics>`;
        const csBlood = html`<cs-blood .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-blood>`;
        const csDetails = html`<cs-details .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-details>`;
        const csDisciplines = html`<cs-disciplines .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-disciplines>`;
        const csRhh = html`<cs-rhh .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-rhh>`;
        const csSkills = html`<cs-skills .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-skills>`;
        const csTtb = html`<cs-ttb .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-ttb>`;
        const csXp = html`<cs-xp .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-xp>`;
        const csCharacterSheet = html`<character-sheet .character="${this.character}" ?character-creation="${this.characterCreation}"></character-sheet>`;

        const domArray = [csBasics, csAttrbs, csSkills, csDisciplines, csRhh, csTtb, csAdvFlaws, csBlood, csDetails, csXp, csCharacterSheet];
        const thisStepDom = domArray[this.currentStep - 1];


        return html`${whiteCard(thisStepDom)}`;
    };

    // Styles
    static styles = [
        appStyles,
        whiteCardStyles,
        css`
            .character-sheet-container {
                width: 100%;
                display: block;
                max-width: var(--max-width);
            }

            .character-sheet-container * input::placeholder {
                color: var(--theme-light-gray);
            }

            .character-sheet-container .fake-pb {
                background-color: var(--theme-white);
                color: var(--theme-darker-gray);
                font-family: var(--theme-cinzel);
                font-size: 2rem;
                font-weight: 500;
                display: flex;
                flex-direction: row;
                padding: 1em 0.25em;
            }

            .character-sheet-container .fake-pb div {
                width: 33.33%;
            }

            .character-sheet-container .fake-pb .pb-current-step {
                border: 1px solid var(--theme-dark-gray);
                height: 2rem;
                position: relative;
            }

            .character-sheet-container .fake-pb .pb-current-step div {
                background-color: var(--theme-red);
                height: 100%;
            }

            .character-sheet-container .button-row {
                color: var(--theme-dark-gray);
                padding: 2rem;
            }

            .character-sheet-container .button-row button {
                cursor: pointer;
                margin-left: 2rem;
            }

            .character-sheet-container .button-row span.material-icons-outlined {
                color: var(--theme-dark-gray);
                vertical-align: -2px;
            }

            .character-sheet-container .button-row span.material-icons-outlined.next {
                margin-left: 2px;
            }

            .character-sheet-container .button-row span.material-icons-outlined.before {
                margin-right: 2px;
            }

            .character-sheet-container .button-row:last-child {
                margin-left: 0;
            }
        `
    ];

    // DOM
    render() {
        const next = html`<button @click="${this.stepDir}">Next<span class="material-icons-outlined next">navigate_next</span></button>`;
        const previous = html`<button @click="${this.stepDir}"><span class="material-icons-outlined before">navigate_before</span>Previous</button>`;
        let controlButtons: any;

        if (this.currentStep > 1) {
            if (this.currentStep === this.maxSteps) {
                controlButtons = html`${ previous }<button>Finish &amp; Go To Character Sheet</button>`
            } else {
                controlButtons = html`${ previous }${ next }`
            }
        } else {
            controlButtons = html`${ next }`
        }

        return html`
		    <div class="character-sheet-container">
                <div class="bg-white fake-pb">
                    <div>Progress:</div>
                    <div class="pb-current-step">
                        <div style="width: ${this.currentPercent()}% !important"></div>
                    </div>
                    <div class="pb-percent">${this.currentPercent()}%</div>
                </div>
                <div class="bg-white button-row">
                    ${controlButtons}
                </div>
                ${this.stepDom()}
            </div>
		`;
    }
}