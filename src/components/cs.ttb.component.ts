import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import * as mws from '../services/middleware.service';
import { Character, Chronicle, Clan } from '../../src/project.interface';
import appStyles from '../styles/app-styles.css';
import { blankCharacter, blankClan, clans } from '../services/commonData';
import { isNullOrUndefined } from '../services/commonTools';
import { infoSource } from '../directives/info-source.directive';
import '../components/add-list.component';

// TTB = Chronicle [T]enents, [T]ouchstones & Convictions, Clan [B]ane
@customElement('cs-ttb')
export class CharacterTtbComponent extends LitElement {
    // Properties
    @property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

    @property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

    @property({ type: Object }) clan: Clan = blankClan;

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
        this.clan = clans[this.character.clan];

        // Update Bane
        if (this.clan.bane && this.clan.source) {
            const clanName = this.clan.bane?.name ? this.clan.bane.name : '';
            this.character.clanBane = clanName.trim();
        }
    }

    async saveCsData() {
        // @TODO Save data
    }

    // Styles
    static styles = [
        appStyles,
        css`
            .cs-ttb-container label {
                display: block;
            }

             .cs-ttb-container .cs-section-body.three-col div textarea,
             .cs-ttb-container .cs-section-body.three-col div.cs-clan-bane-container div {
                min-height: 100px;
                width: 100%;
            }
        `
    ];

    // DOM
    render() {
        const baneInfo = infoSource({ id: this.clan.source, page: this.clan.bane?.page! }, this.clan.bane?.name!);
        const header = html`<h4>Advantages &amp; Flaws</h4>`;

        return html`
            <div class="cs-section cs-basics-container cs-ttb-container">
                <div class="cs-section-head">
                    ${ this.editMode ? header : html`` }
                    <span class="material-icons-outlined edit-icon" @click="${() => { this.editMode = !this.editMode }}">edit</span>
                </div>
                <div class="cs-section-body flex-body flex-container flex-row flex-wrap three-col">
                    <div class="cs-tenets-container">
                        <label for="cs-tenets">Chronicle Tenets</label>
                        <add-list .list-data=${this.character.chronicleTenents} add-title="Chronicle Tenent"></add-list>
                    </div>
                    <div class="cs-touchstones-container">
                        <label for="cs-touchstones-convictions">Touchstones &amp; Convictions</label>
                        <add-list .list-data=${this.character.touchStonesConvictions} add-title="Touchstone / Conviction"></add-list>
                    </div>
                    <div class="cs-clan-bane-container">
                        <label for="cs-clan-bane">Clan Bane</label>
                        ${this.character.clanBane
                ? html`<div id="clan-bane" name="clan-bane">${this.character.clanBane.trim()} ${baneInfo}</div>`
                : html`<textarea name="clan-bane" .value=${this.character.clanBane}></textarea>`
            }
                    </div>
                </div>
            </div>
		`;
    }
}
