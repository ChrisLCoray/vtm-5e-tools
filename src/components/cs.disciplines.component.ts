import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle, Clan, Discipline } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankChronicle, disciplines } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';
import { fakeSelect } from '../directives/fake-select.directive';

@customElement('cs-disciplines')
export class CharacterDisciplinesComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Object }) clan: Clan = mws.getCharacterClan(this.character.clan);

    @property({ type: Array }) clanDisciplines: Discipline[] = [];

    @property({ type: Array }) combinedDisciplines: Discipline[] = [];

    @property({ type: Boolean }) editMode: boolean = false;

    @property({ type: Array }) otherDisciplines: Discipline[] = [];

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
        this.filterDisciplines();
    }

    async changeDiscipline(e: any) {
        // handle looping existing disciplines and add if new
        // disciplines?: { id?: number, value: number, powers: number[] }[],
        console.log('changeDiscipline e = ', e);
        const newDId = Number(e.path[0].dataset.value);
        console.log('changeDiscipline newDId = ', newDId);
        if (this.character.disciplines
            && this.character.disciplines.length > 0
            && !this.character.disciplines.find(d => d.id === newDId)) {
            const newDiscipline = { id: newDId, powers: [], value: 0 };
            this.character.disciplines.push(newDiscipline);
        }

        this.character = await mws.populateCharacterData(e, this.character);
        console.log(`changeDiscipline saveCsData this.character = `, this.character);
    }

    filterDisciplines() {
        // console.log('filterDisciplines clan = ', this.clan);
        const cdIds: number[] = this.clan.disciplines;
        this.clanDisciplines = [];
        this.combinedDisciplines = [];
        this.otherDisciplines = [];
        if (cdIds.length > 0) {
            this.clanDisciplines = disciplines.filter((d: Discipline) => cdIds.includes(d.id));
            this.otherDisciplines = disciplines.filter((d: Discipline) => !cdIds.includes(d.id));

            // combine lists for DOM
            this.combinedDisciplines = [{ id: -1, name: "Clan Disciplines", levels: [] }];
            this.clanDisciplines.map((d: Discipline) => { this.combinedDisciplines.push(d); });
            this.combinedDisciplines.push({ id: -1, name: "Non-Clan Disciplines", levels: [] });
            this.otherDisciplines.map((d: Discipline) => { this.combinedDisciplines.push(d); });
        } else {
            // if there are no listed disciplines, they have to refer to source
            this.combinedDisciplines = [
                { id: -1, name: "Clan Disciplines", levels: [] }
            ];
            disciplines.map((d: Discipline) => { this.combinedDisciplines.push(d); });
        }

        // console.log('this.clanDisciplines = ', this.clanDisciplines);
        // console.log('this.otherDisciplines = ', this.otherDisciplines);
        // console.log('this.combinedDisciplines = ', this.combinedDisciplines);
    }

    async saveCsData() {

    }

    // Styles
    static styles = [
        appStyles,
        css`
            .cs-section-body .cs-disc-box {
                width: 33.33%;
            }
        `
    ];

    // DOM
    render() {
        const header = this.characterCreation ? html`<h4>Disciplines</h4>` : html``;
        const disciplineListDom = html`${fakeSelect(this.combinedDisciplines, "Pick Discipline", 'discipline', this.changeDiscipline)}`;
        const discBoxDom: any[] = [];
        // calculate and return html
        for (let i = 0; i < 6; i++) {
            discBoxDom.push(
                html`
                    <div class="cs-disc-box">
                        ${fakeSelect(this.combinedDisciplines, "Pick Discipline", `discipline[${i}]`, this.changeDiscipline)}
                    </div>
                `
            );
        }

        return html`
            <div class="cs-section cs-basics-container">
                <div class="cs-section-head">
                    ${header}
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap">
                    ${discBoxDom}
                </div>
            </div>
		`;
    }
}
