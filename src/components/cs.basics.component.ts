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

    @property({ type: Array }) chronicleList: Chronicle[] = [];

    @property({ type: Boolean }) editMode: boolean = false;

    @property({ type: Array }) matchingChronicles: Chronicle[] = [];

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

    get chronicle(): any {
        const selectedChronicle = this.chronicleList.find((c: Chronicle) => c.id === Number(this.character.chronicle));
        return selectedChronicle ? selectedChronicle : blankChronicle;
    }

    set chronicle(chronicleId: any) {
        this.chronicleList.find((c: Chronicle) => c.id === Number(chronicleId));
    }

    get clan(): any {
        const cClan = clans.find((clan: Clan) => clan.id === this.character.clan);
        return cClan !== undefined ? cClan : blankClan;
    }

    set clan(clanId: any) {
        clans.find((c: Clan) => c.id === clanId);
    }

    get predator(): any {
        const cPredator = predatorTypes.find((p: Predator) => p.id === this.character.predator);
        return cPredator !== undefined ? cPredator : blankPredator;
    }

    set predator(predatorId: any) {
        predatorTypes.find((p: Predator) => p.id === predatorId);
    }

    // filter list of chronicles as user types
    filterChronicles(e: any) {
        this.matchingChronicles = [];
        const chronVal = e.path[0].value;
        if (this.chronicleList.length > 0 && chronVal.length > 0) {
            this.matchingChronicles = this.chronicleList.filter((c: Chronicle) => c.name.toLowerCase().indexOf(chronVal.toLowerCase()) > -1);
        }
    }

    async saveCsData(e: any) {
        if (this.character.name && this.character.name.length > 0) {
            // @TODO commented out until things are more solid so we're not saving bad data and having to clear it every load
            // this.character = await mws.populateCharacterData(e, this.character);
        }
    }

    selectChronicle(e: any) {
        this.character.chronicle = Number(e.path[0].dataset.value);
        this.chronicle = this.character.chronicle;
        this.matchingChronicles = [];
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

    updateChronicle(e: any) {
        // chronicle not found, do stuff
        if (this.chronicle.id < 0) {
            const stringVal = e.path[0].value;
            // Double check chronicles
            const match = this.chronicleList.find((c: Chronicle) => c.name === stringVal);

            if (match && match.id > 0) {
                // This assumes user typed in the same string as before and didn't use the drop down to select
                // @TODO: Consider adding an "accuracy" function that uses regex or iteration or something so if there's an 80%+ accuracy,
                // maybe use a pop-up that says "Did you mean <typo'd chronicle name>?"
                this.character.chronicle = match.id;
                this.chronicle = this.character.chronicle;
            } else {
                const newId = this.chronicleList.length + 1;
                // @TODO update with storyteller ID once that integration is done
                const newChronicle = { id: newId, name: stringVal, players: [this.character.id], storyteller: 0 };
                this.chronicleList.push(newChronicle);
            }

            mws.saveAllChronicles(this.chronicleList);
        }
    }

    updateClan(e: any) {
        this.character.clan = Number(e.path[0].dataset.value);
        this.clan = this.character.clan;

        // update values for Bane, Compulsion
        this.character.bane = this.clan.bane ? this.clan.bane : '';
        this.character.compulsion = this.clan.compulsion ? this.clan.compulsion.name : '';

        this.toggleSelect(e);
        mws.saveCharacterById(this.character);

        return this.character.clan;
    }

    updatePredator(e: any) {
        this.character.predator = Number(e.path[0].dataset.value);
        this.predator = this.character.predator;
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

            .cs-section.cs-basics-container .cs-section-body div.cs-basic .floating-select {
                position: absolute;
                height: auto;
                min-height: 20px;
                top: 2.5rem;
                width: 100%;
                z-index: 1000;
            }

            .cs-section.cs-basics-container .cs-section-body div.cs-basic .floating-select .fake-select .fs-dropdown {
                display: block;
            }
        `
    ];

    // DOM
    render() {
        const header = this.characterCreation ? html`<h4 class="wcc-header">Character Basics</h4>` : html``;
        const clanSelectDom = html`${fakeSelect(clans, "Clan *", 'clan', this.updateClan)}`;
        const chronicleSelect = this.matchingChronicles.length > 0
            ? html`<div class="floating-select">
                <div class="fake-select">
                    <div class="fs-dropdown">
                        ${this.matchingChronicles.map((d) => html`<div data-value="${d.id}" @click=${this.selectChronicle}>${d.id < 0 ? html`<strong>${d.name}</strong>` : html`${d.name}`}</div>`)}
                    </div>
                </div></div>`
            : html``;

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
                : html`<strong>Predator Type: </strong><span>${ this.predator.name }</span>`
            }
                    </div>
                    <div class="cs-basic">
                        ${this.editMode
                ? html`<input type="text" name="chronicle" id="chronicle" placeholder="Chronicle"
                            @blur=${this.updateChronicle} @input=${this.filterChronicles} .value=${this.chronicle.name} />${chronicleSelect}`
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
