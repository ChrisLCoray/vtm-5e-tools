import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
// import * as mws from '../services/middleware.service';
import { Character, VampSkills } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter } from '../services/commonData';

@customElement('cs-skills')
export class CharacterSkillsComponent extends LitElement {
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

    displaySkills() {
        const returnDom: any[] = [];
        const characterSkills: Array<string | keyof VampSkills> = Object.keys(this.character.skills);

        characterSkills.map((skill: any) => {
            const skillName = this.upperString(skill);

            returnDom.push(html`<div class="skill-item"><label for="cs-${skill}">${skillName}</label><span class="dotted"></span>
                ${this.editMode
                    ? html`<input type="number" min="0" max="5" increment="1" name="${skill}" id="${skill}" value="${this.character.skills[skill]}" /></div>`
                    : html`${this.character.skills[skill]}</div>`
                }
                </div>
            `);

            
        });
        return returnDom;
    }

    async saveCsData() {

    }

    upperString(s: string) {
        const sSplit = s.split('');
        sSplit.map((c, i) => {
            if (c.toUpperCase() === c) {
                const prev = sSplit.slice(0, i);
                const remaining = sSplit.slice(i, sSplit.length);
                prev.push(' ');
                const tempArray: string[] = prev.concat(remaining);
                s = tempArray.join('');
            }
        });
        return s.charAt(0).toUpperCase() + s.slice(1, s.length);
    }

    // Styles
    static styles = [
        appStyles,
        css`
            .cs-section.cs-skills-container .cs-section-body div {
                display: flex;
                padding-right: 0.5em;
                margin-top: 0.5em;
                text-align: left;
                width: 33.33%;
            }
            .cs-section.cs-skills-container .cs-section-body div:nth-child(3n) {
                padding-right: 0;
            }
            .cs-section.cs-skills-container .cs-section-body div label,
            .cs-section.cs-skills-container .cs-section-body div input {  
                flex: 0 0 auto;
            }
            .cs-section.cs-skills-container .cs-section-body div label {
                margin-top: auto;
                vertical-align: bottom;
            }
            .cs-section.cs-skills-container .cs-section-body div span.dotted {
                border-bottom: 1px dotted var(--theme-dark-gray);
                flex: 1 1 auto;
                padding: 0;
                margin: 0;
                width: auto;
            }
        `
    ];


    // DOM
    render() {
        const header = this.characterCreation ? html`<h4>Skills</h4>` : html``;

        return html`
            <div class="cs-section cs-skills-container">
                <div class="cs-section-head">
                    ${header}
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap">
                    ${this.displaySkills()}
                </div>
            </div>
		`;
    }
}
