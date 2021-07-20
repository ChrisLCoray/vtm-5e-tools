import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as storage from '../services/api.service';
import './cs.attributes.component';
import './cs.basics.component';
import './cs.disciplines.component';
import './cs.skills.component';
import { Character, Chronicle } from '../../src/project.interface';
import { whiteCard } from '../directives/white-card.directive';
import { blankCharacter } from '../services/commonData';
import appStyles from '../styles/app-styles.css';
import whiteCardStyles from '../styles/white-card.css';

@customElement('character-sheet')
export class CharacterComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Array }) creationSteps: string[] = [''];

    constructor(
        character: Character,
        characterCreation: boolean
    ) {
        super();
        this.character = character;
        this.characterCreation = characterCreation;
    }

    // Methods

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
        `
    ];

    // DOM
    render() {
        const csAttrbs = html`<cs-attrbs .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-attrbs>`;
        const csBasics = html`<cs-basics .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-basics>`;
        const csDisciplines = html`<cs-disciplines .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-disciplines>`;
        const csSkills = html`<cs-skills .character="${this.character}" ?character-creation="${this.characterCreation}"></cs-skills>`;
        const csOne = html`<div class="character-sheet-1">${ csBasics }${ csAttrbs }${ csSkills }${ csDisciplines }</div>`;
        const tab1Dom = html`${ whiteCard(csOne) }`;
        const tab2Dom = html`whiteCard(<div class="character-sheet-2"></div>)`;
		return html`
		    <div class="character-sheet-container">
                <div class="character-sheet-tabs-container">
                    ${ tab1Dom }                    
                </div>
            </div>
		`;
	}
}
