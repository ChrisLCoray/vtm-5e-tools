import { LitElement, html, css } from 'lit';
import { property } from 'lit-element';
import middlewareService, * as mws from './services/middleware.service';
import appStyles from './styles/app-styles.css';
import whiteCardStyles from './styles/white-card.css';
import './components/menu-bar.component';
import './components/character-list.component';
import './components/dice-standalone.component';
import './components/character.component';
import './character.creator';
import { Character, Chronicle, Clan, User } from '../src/project.interface';
import { blankCharacter, blankChronicle, blankClan, blankUser, clans } from './services/commonData';

export class VtmTools extends LitElement {
	// Properties
	@property({ type: Object, attribute: 'character' }) character: Character = blankCharacter;

	@property({ type: Boolean, attribute: 'character-creation' }) characterCreation: boolean = false;

	@property({ type: Array, attribute: 'character-list' }) characterList: Character[] = [blankCharacter];

	@property({ type: Array }) chronicleList: Chronicle[] = [blankChronicle];

	@property({ type: Number, attribute: 'character-id' }) characterId: number = 0;

	@property({ type: String }) title: string = '(Unofficial) Vampire the Masquerade 5e Tools';

	@property({ type: Object }) user: User = blankUser;

	constructor() {
		super();
		this.initialize();
	}

	// Methods
	async addNewCharacter() {
		this.character = await mws.createNewCharacter(this.characterList);
		this.characterCreation = true;
	}

	async initialize() {
		this.characterList = await mws.getAllCharacters();
		this.chronicleList = await mws.getAllChronicles();
		// console.log(`this.chronicleList = `, this.chronicleList);
		this.user = await mws.getUserById();
	}

	async loadCharacter(e: any) {
		const cId = e.target.dataset.characterId;
		this.character = await middlewareService.getCharacterById(cId);
	}

	// @TODO: Media queries for mobile design
	// Styles
	static styles = [
		appStyles,
		whiteCardStyles,
		css`
			:host {
				min-height: 93vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				font-size: calc(10px + 2vmin);
				max-width: var(--max-width);
				margin: 0 auto;
				padding: 0;
				text-align: center;
				background-color: var(--vtm-lit-roller-background-color);
			}

			h1 {
				font-size: 1.15em;
				line-height: 1.25em;
			}

			h2 {
				font-size: 0.75em;
			}

			.tool-picker-container {
				display: flex;
				flex: row wrap;
				width: 80vw;
			}

			.tool-picker-container .white-card-container {
				flex: 1 1 50%;
			}

			.tool-picker-container .white-card-container .material-icons-outlined {
				color: var(--theme-black);
				font-size: 45px;
			}

			.tool-picker-container .white-card-container img.img-icon {
				height: 45px;
				width: auto;
			}

			.character-list-container {
                display: flex;
                flex-direction: column;
                font-size: 16px;
                text-align: left;
            }

            .character-list-container ul,
            .character-list-container ul li {
                list-style-type: none;
                margin: 0;
                padding-left: 0;
                width: 100%;
            }

            .character-list-container ul li {
                border-bottom: 1px solid var(--theme-dark-gray);
                padding: 0.5em 0;
            }

            .character-list-container ul li:last-child {
                border-bottom: none;
            }
    	`
	];

	// DOM
	render() {
		return html`
			<menu-bar></menu-bar>
			<main>
				${(this.characterCreation === false && this.character.name === '')
				? html`
						<h1>${ this.title }</h1>
						${ this.characterList.length < 1 ? html`<h4>No Characters Found</h4>` : html`<h4>Character List</h4>` }
						<div class="character-list-container">
							<ul>
							${this.characterList.length > 0
								? this.characterList.map((c: Character) => {
									const image = c && c.image ? html`<img src="${c.image}" alt = "${c.name} portrait" />` : html`<span class="portrait-default"></span>`;
									let chronicle: Chronicle =
										c && this.chronicleList?.length > 0 ? this.chronicleList.find((chron: any) => Number(chron.id) === Number(c.chronicle)) as Chronicle : blankChronicle;
									if (!chronicle) { chronicle = blankChronicle; }
									const foundClan: Clan = c?.clan > -1 ? clans.find((clan: Clan) => clan.id === Number(c.clan)) as Clan : blankClan;
									return html`<li class="pointer" @click=${this.loadCharacter} @keyup=${this.loadCharacter} data-character-id=${c.id}>${image} ${c?.name} | ${chronicle.name} | ${foundClan.name} ${c.concept}</li>`
								})
							: html``
							}
								<li class="pointer" @click=${this.addNewCharacter} @keyup=${this.addNewCharacter}>
									<span class="material-icons-outlined">add</span> Add New Character
								</li>
							</ul>
						</div>
					`
				: html`<character-creator .character="${this.character}" ?character-creation="${this.characterCreation}"></character-creator>`
			}
			</main>

			<footer class="app-footer">
				<img class="wod-logo" src="../media/darkpack_tranparent_logo_500x324.png" alt="World of Darkness Dark Pack Logo" aria-label="World of Darkness Dark Pack Logo" title="World of Darkness Dark Pack Logo" />
				<span class="wod-copy">
					Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission.
					All rights reserved. For more information please visit 
					<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://worldofdarkness.com"
					>worldofdarkness.com</a
					>.
				</span>
			</footer>
		`;
	}
}
