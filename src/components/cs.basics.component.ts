import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle, Clan, Predator } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle, blankClan, blankPredator, clans, predatorTypes } from '../services/commonData';
import { buildSourcePage, isNullOrUndefined } from '../services/commonTools';
import { fakeSelect } from '../directives/fake-select.directive';
import { infoSource } from '../directives/info-source.directive';

@customElement('cs-basics')
export class CharacterBasicsComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Object }) chronicle: Chronicle = blankChronicle;

    @property({ type: Array }) chronicleList: Chronicle[] = [blankChronicle];

    @property({ type: Object }) clan: Clan = this.getClan();

    @property({ type: Boolean }) editMode: boolean = false;

    @property({ type: Object }) predatorType: Predator = this.getPredator();

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
        this.chronicleList = await mws.getAllChronicles();
        this.editMode = !!this.characterCreation;
    }

    getClan(): Clan {
        const cClan = clans.find((clan: Clan) => clan.id === this.character.clan);
        return cClan !== undefined ? cClan : blankClan;
    }

    getPredator(): Predator {
        const cPredator = predatorTypes.find((p: Predator) => p.id === this.character.predator);
        return cPredator !== undefined ? cPredator : blankPredator;
    }

    // filter list of chronicles as user types
    filterChronicles(e: any) {
        if (this.chronicleList.length > 0) {
            console.log(`filterChronicles e.path[0].dataset.value = `, e.path[0].dataset.value);
            console.log(`e.target = `, e.target);
            // @TODO: filter chronicles using input value and create DOM
        }
    }

    async saveCsData(e: any) {
        this.character = await mws.populateCharacterData(e, this.character);
        console.log(`saveCsData this.character = `, this.character);
    }

    toggleSelect(e: any) {
        const fakeSelect: any = e.path.find((elms: any) => elms.classList[0] === 'fake-select');
        fakeSelect.classList.toggle('show');

        // Close the dropdown if the user clicks outside of it
        window.onclick = (event: any) => {
            if (!event.target.matches('.fake-select')) {
                const dropdowns = document.getElementsByClassName("dropdown-content");
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    const openDropdown: any = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }

    updateClan(e: any) {
        this.character.clan = e.path[0].dataset.value * 1;
        this.clan = this.getClan();

        // Update Compulsion
        if (this.clan.compulsion) {
            this.character.compulsion = this.clan.compulsion ? this.clan.compulsion.name : '';
            // const compSourcePage = buildSourcePage(this.clan.source, this.clan.compulsion?.page);
            // console.log(`compSourcePage = ${compSourcePage}`);
        }

        this.toggleSelect(e);
        mws.saveCharacterById(this.character);

        // update values for Bane, Compulsion,
        return this.character.clan;
    }

    updatePredator(e: any) {
        this.character.predator = e.path[0].dataset.value * 1;
        console.log(`this.character.predator = `, this.character.predator)
        this.predatorType = this.getPredator();
        console.log(`this.predatorType = `, this.predatorType);
        mws.saveCharacterById(this.character);
    }

    // Styles
    static styles = [
        appStyles,
        css`
            .cs-section.cs-basics-container .cs-section-body div.cs-basic {
                display: flex;
                position: relative;
                width: 33.33%;
            }
            .cs-section.cs-basics-container .cs-section-body div.cs-basic input {
                border: none;
                height: 60%;
                padding: 0.5em;
                vertical-align: top;
                width: 100%;
            }

            .cs-section.cs-basics-container .cs-section-body div.cs-basic input:focus {
                border: 1px solid var(--theme-red);
                border-radius: none;
                outline: none;
            }

            .cs-section.cs-basics-container .cs-section-foot {
                font-size: 14px;
                text-align: right;
            }

            input::placeholder {
                color: var(--theme-light-gray);
            }
        `
    ];

    // DOM
    render() {
        const header = this.characterCreation ? html`<h4 class="wcc-header">Character Basics</h4>` : html``;
        const clanSelectDom = html`${fakeSelect(clans, "Clan *", 'clan', this.updateClan)}`;

        return html`
            <div class="cs-section cs-basics-container">
                <div class="cs-section-head">
                    ${ this.editMode ? header : html`` }
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body cs-basics-body flex-body flex-container flex-row flex-wrap">
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="name" id="name" placeholder="Character Name *"
                            @blur=${this.saveCsData} .value=${this.character.name} required />`
                : html`<strong>Name: </strong><span>${this.character.name}</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="concept" id="concept" placeholder="Concept"
                            @blur=${this.saveCsData} .value=${this.character.concept!} />`
                : html`<strong>Concept: </strong><span>${this.character.concept}</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`${fakeSelect(predatorTypes, "Predator Type", 'predator', this.updatePredator)}`
                : html`<strong>Predator Type: </strong><span>${ this.predatorType.name }</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="chronicle" id="chronicle" placeholder="Chronicle"
                            @blur=${this.saveCsData} @input=${this.filterChronicles} .value=${this.character.chronicle} />`
                : html`<strong>Chronicle: </strong><span>${this.chronicle.name}</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="ambition" id="ambition" placeholder="Ambition"
                            @blur=${this.saveCsData} .value=${this.character.ambition!} />`
                : html`<strong>Ambition: </strong><span>${ this.character.ambition }</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode ? html`${clanSelectDom}` : html`<strong>Clan: </strong><span>${ this.clan.name }</span>`}
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="sire" id="sire" placeholder="Sire"
                            @blur=${this.saveCsData} .value=${this.character.sire!} />`
                : html`<strong>Sire: </strong><span>${this.character.sire}</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="desire" id="desire" placeholder="Desire"
                            @blur=${this.saveCsData} .value=${this.character.desire!} />`
                : html`<strong>Desire: </strong><span>${this.character.desire}</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="generation" id="generation" placeholder="Generation"
                            @blur=${this.saveCsData} value="${this.character.generation!}" />`
                : html`<strong>Generation: </strong><span>${this.character.generation}</span>`
            }
                    </div>
                </div>
                <div class="cs-section-foot">
                    * Required field
                </div>
            </div>
		`;
    }
}
