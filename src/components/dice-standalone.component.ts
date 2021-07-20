import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element';
import appStyles from '../styles/app-styles.css';

interface ResultsObj {
    beasts?: number,
    difficulty?: number | undefined,
    cleared?: string,
    criticals?: number,
    hungerDice?: Array<number>,
    margin?: number,
    messies?: number,
    outcome?: string | undefined,
    skillDice?: Array<number>,
    successes?: number,
    timestamp: string,
    type?: string
}

export const resultMsgs = {
  beastFail: 'The Beast has taken hold of you...',
  fail: 'Fail!',
  messySuccess: 'MESSY SUCCESS-Y!',
  success: 'Success!',
  totalFail: 'Total Failure!'
}

@customElement('dice-standalone')
export class DiceStandaloneComponent extends LitElement {
  // Properties
  @property({ type: Number }) beastTotal: number = 0;

  @property({ type: Number }) difficulty: any = 1;

  @property({ type: Number }) critTotal: number = 0;

  @property({ type: Number }) hungerDice: any = 1;

  @property({ type: Array }) hungerDiceDom: Array<any> = [];

  @property({ type: Number }) messyTotal: number = 0;

  @property({ type: String }) outcome: string = '';

  @property({ type: Array }) resultsLog: Array<ResultsObj> = [];

  @property({ type: Boolean }) role: boolean = false; // true = Storyteller, false = Player - determines some functions

  @property({ type: Number }) rollTotal: number = 0;

  @property({ type: Number }) skillDice: any = 1;

  @property({ type: Array }) skillDiceDom: Array<any> = [];

  @property({ type: Number }) successTotal: number = 0;

  @property({ type: String }) title: string = '(Unofficial) Vampire the Masquerade 5e Dice Roller';

  @property({ type: Boolean }) useDifficulty: boolean = false;

  constructor() {
    super();
    this.useDifficulty = false;

    this.manageDiceTray();
  }

  // Getters
  // get inputEl(): HTMLInputElement {
  //     return this.shadowRoot!.getElementById('name')! as HTMLInputElement;
  // }

  // Methods
  calcOutcome(hungerRay: Array<number>, skillRay: Array<number>) {
    this.clearVars();
  
    for (let i = 0; i < ((hungerRay.length >= skillRay.length) ? hungerRay.length : skillRay.length); i += 1) {
      const h = hungerRay[i]; const s = skillRay[i];
      if (s >= 6 && s < 10) { this.successTotal += 1; }
        else if (s === 10) { this.critTotal += 1; }
      
      if (h >= 6 && h < 10) { this.successTotal += 1; }
        else if (h === 1) { this.beastTotal += 1; }
        else if (h === 10) { this.messyTotal += 1; }
    }

    // Each crit pair counts as 4 success vs 2, includes messy successies but the outcome is different
    if (this.critTotal >= 2 || (this.critTotal >= 1 && this.messyTotal >= 1)) {
      this.critTotal = Math.floor((this.critTotal + this.messyTotal) / 2);
      this.successTotal += this.critTotal * 4;
    }

    let o: string = '';
    if (this.useDifficulty && this.difficulty > 0) {
      // Should set this.outcome to a string using resultMsgs
      if (this.successTotal >= this.difficulty) {
        if (this.messyTotal > 0) {
          o = resultMsgs.messySuccess;
        } else {
          o = resultMsgs.success;
        }
      } else {
        o = resultMsgs.fail;
      }
    }

    // If we have no Difficulty to compare against, we can still determine Total Failures and Beast Failures
    if (this.successTotal === 0 && this.beastTotal === 0) {
      o = resultMsgs.totalFail;
    } else if (this.beastTotal > this.successTotal) {
      o = resultMsgs.beastFail;
    }

    this.outcome = o;

    this.logResults(hungerRay, skillRay, 'Skill Check');
  }

  clearLog() {
    const ts = new Date();
    const msg = {
      timestamp: ts.toDateString(),
      cleared: 'Log cleared'
    };
    this.resultsLog = [msg];
  }

  clearVars() {
    // Clear values
    this.critTotal = 0;
    this.beastTotal = 0;
    this.messyTotal = 0;
    this.successTotal = 0;
    this.outcome = '';
  }

  dicePoolPlusMinus(event: any) {
    const eObj = event.path.find((o: any) => o.className.indexOf('dice-button') > -1);
    const direction: string = eObj.title;
    const pool: string = eObj.className.indexOf('skill') > -1 ? 'skill' : 'hunger';

    if (pool === 'skill') {
      if (direction === 'plus') {
        this.skillDice += 1;
      } else if (this.skillDice > 0) {
        this.skillDice -= 1;
      }
    } else if (direction === 'plus') {
        this.hungerDice += 1;
      } else if (this.hungerDice > 0) {
        this.hungerDice -= 1;
      }
    this.manageDiceTray();
  }

  static dieRoll(numberDie: number) {
    const resultsRay: Array<number> = [];
    let d = numberDie;
    while (d) {
      const res = Math.floor(Math.random() * 10) + 1;
      resultsRay.push(res);
      d -= 1;
    }
    return resultsRay;
  }

  async logResults(hungerRay: Array<number>, skillRay: Array<number>, type: string) {
    const ts = new Date();
    let m;
    if (this.useDifficulty) {
      m = this.successTotal > this.difficulty ? this.successTotal - this.difficulty : this.difficulty - this.successTotal;
    }
    const newLog: ResultsObj = {
      beasts: this.beastTotal,
      difficulty: (this.useDifficulty) ? this.difficulty : undefined,
      criticals: this.critTotal,
      hungerDice: hungerRay.sort((a: number, b: number) => b - a),
      margin: m,
      messies: this.messyTotal,
      outcome: this.outcome,
      skillDice: skillRay.sort((a: number, b: number) => b - a),
      successes: this.successTotal,
      timestamp: ts.toDateString(),
      type
    };
    this.resultsLog.push(newLog);
    
  }

  makeRoll() {
    // This contains code duplicated in this.manageDiceTray()
    // The reason for this is the re-render is neglibile in terms of performance
    // and its much more reliable based on current state rather than using string
    // manipulation to update existing DOM
    this.hungerDiceDom = [];
    this.skillDiceDom = [];
    let hungerRay: Array<number> = []; let skillRay: Array<number> = [];
    if (this.skillDice > 0) {
      skillRay = DiceStandaloneComponent.dieRoll(this.skillDice);
      for (let i = 0; i < this.skillDice; i += 1) {
        this.skillDiceDom.push(html`<span id="skill${i}" class="die-dom vtm-skill-die"><span>${skillRay[i]}</span></span>`);
      }
    }
    if (this.hungerDice > 0) {
      hungerRay = DiceStandaloneComponent.dieRoll(this.hungerDice);
      for (let i = 0; i < this.hungerDice; i += 1) {
        this.hungerDiceDom.push(html`<span id="hunger${i}" class="die-dom vtm-hunger-die"><span>${hungerRay[i]}</span></span>`);
      }
    }

    this.calcOutcome(hungerRay, skillRay);
  }

  // Preview dice in tray before rolling
  manageDiceTray() {
    this.hungerDiceDom = [];
    this.skillDiceDom = [];

    if (this.skillDice > 0) {
      for (let i = 0; i < this.skillDice; i += 1) {
        this.skillDiceDom.push(html`<span id="skill${i}" class="die-dom vtm-skill-die"></span>`);
      }
    }
    if (this.hungerDice > 0) {
      for (let i = 0; i < this.hungerDice; i += 1) {
        this.hungerDiceDom.push(html`<span id="hunger${i}" class="die-dom vtm-hunger-die"></span>`);
      }
    }
  }

  renderLogResults() {
    if (this.resultsLog.length > 0) {
      return html`${this.resultsLog.map((result: ResultsObj) =>
        html`<div>
        <span>${result.timestamp} - </span>
        <span>Type : ${result.type},</span>
        ${result.difficulty ? html`<span>Difficulty: ${result.difficulty},</span>` : ''}
        ${result.outcome ? html`<span>Outcome: ${result.outcome},</span>` : html``} 
        <span>Skill Dice : ${result.skillDice?.toString()},</span>
        <span>Hunger Dice : ${result.hungerDice?.toString()},</span>
        <span>Success : ${result.successes},</span>
        <span>Crits : ${result.criticals},</span>
        <span>Messy Successies : ${result.messies},</span>
        <span>Beast Fails : ${result.beasts}</span>
        </div>`
      )}`
    } 
      return html`<span>---No Log Results---</span>`
    
  }

  rouseCheck() {
    this.clearVars();
    const res = DiceStandaloneComponent.dieRoll(1);
    this.outcome = res[0] >= 6 ? 'Success!' : 'Failure!';
    this.logResults([], res, 'Rouse Check');
  }
  
  toggleDifficulty(e: any) {
    const $el = e.path.find((el: any) => el.type === 'checkbox');
    if (!$el) { return; }
    this.useDifficulty = !!$el.checked;
  }

  updateDifficulty(e: any) {
    const $el = e.path.find((el: any) => el.type === 'range' || el.type === 'number');
    this.difficulty = $el.value.valueOf();
  }

  // triggerSpecial (specialType: string)

  // @TODO: Media queries for mobile design
  // Styles
  static styles = [
    appStyles,
    css`
        .dice-control-container {
          display: flex;
          flex-direction: row;
        }

        .dice-control {
          flex: 1;
          flex-direction: column;
        }

        .dice-control .dice-control-tray {
          background-color: var(--theme-dark-gray);
          border-radius: 10px;
          padding: 0.5em;
        }

        .dice-control .dice-control-tray.right-margin {
          margin-right: 0.5em;
        }

        .dice-control .dice-control-tray input {
          margin-top: 15px;
          vertical-align: top;
        }

        .dice-control .dice-control-button {
          display: inline-block;
          width: 50px;
          height: 50px;
          position: relative;
        }

        .dice-control .dice-control-button .material-icons-outlined {
          position: absolute;
          top: 10px;
          left: 15.5px;
          font-size: 20px;
        }

        .dice-control .skill-dice-button {
          background: center / contain no-repeat url('../media/skill-die.png');
        }

        .dice-control .hunger-dice-button {
          background: center / contain no-repeat url('../media/hunger-die.png');
        }
    `];

	// DOM
	render() {
		return html`
		<section class="manual-dice-roller">
			<div class="input-slider-container">
				<label for="difficultyRange" id="difficulty-label">
					<span id="difficulty-check-label" style="display: none">Use Difficulty checkbox</span>
					<input class="use-difficulty-box" @input=${this.toggleDifficulty} name="useDifficultyCheck" type="checkbox"
					aria-labelledby="difficulty-check-label" aria-checked="false" tabindex="0" />
					Set Difficulty
				</label>
				<input aria-hidden="true" @input=${this.updateDifficulty} class="difficulty-slider mdl-slider mdl-js-slider" type="range" name="difficultyRange"
					min="0" max="20" .value="${this.difficulty}" step="1" tabindex="-1" data-mdc-auto-init="MDCSlider" ?disabled="${!this.useDifficulty}" />
				<input aria-labelledby="dice-pools difficulty-label" @input=${this.updateDifficulty} class="text-input" type="number" name="difficultyInput"
					min="0" max="20" .value="${this.difficulty}" ?disabled="${!this.useDifficulty}" placeholder="# Difficulty" tabindex="0" />
			</div>

			<h2 class="text-left" id="dice-pools">Dice Pools</h2>
			<div class="dice-control-container">
			<div class="dice-control">
				<label for="skillDiceRange" id="skill-dice-label">Skill</label>
				<div class="dice-control-tray right-margin">
				<span class="dice-control-button skill-dice-button" title="plus" @click=${this.dicePoolPlusMinus} @keyup=${this.dicePoolPlusMinus}>
					<span class="material-icons-outlined">add</span>
				</span>
				<span class="dice-control-button skill-dice-button" title="minus" @click=${this.dicePoolPlusMinus} @keyup=${this.dicePoolPlusMinus}>
					<span class="material-icons-outlined">remove</span>
				</span>
				<input aria-labelledby="dice-pools skill-dice-label" class="text-input"
					type="number" name="skillDiceInput" min="0" max="20" .value="${this.skillDice}" placeholder="# Skill" tabindex="0" />
				</div>
			</div>
			<div class="dice-control">
				<label for="hungerDiceRange" id="hunger-dice-label">Hunger</label>
				<div class="dice-control-tray">
				<span class="dice-control-button hunger-dice-button" title="plus" @click=${this.dicePoolPlusMinus} @keyup=${this.dicePoolPlusMinus}>
					<span class="material-icons-outlined">add</span>
				</span>
				<span class="dice-control-button hunger-dice-button" title="minus" @click=${this.dicePoolPlusMinus} @keyup=${this.dicePoolPlusMinus}>
					<span class="material-icons-outlined">remove</span>
				</span>
				<input aria-labelledby="dice-pools hunger-dice-label" class="text-input"
					type="number" name="hungerDiceInput" min="0" max="20" .value="${this.hungerDice}" placeholder="# Hunger" tabindex="0" />
				</div>
			</div>
			</div>

			<!-- Add an automatic success info tip? If Dice Pool is 2x larger than Difficulty, ST may call it automatic win -->

			<div class="mdc-touch-target-wrapper">
			<button
				class="mdc-button mdc-button--touch"
				aria-label="Roll Dice"
				aria-pressed="false"
				@click=${this.makeRoll}>
				<span class="mdc-button__ripple"></span>
				<span class="mdc-button__label">Roll Dice</span>
				<span class="mdc-button__touch"></span>
			</button>
			</div>

			<div class="dice-tray">
				<div>${this.skillDiceDom}${this.hungerDiceDom}</div>
			</div>

			<div class="text-results">
				<div><strong>Total Successes (including Crits):</strong> ${this.successTotal}</div>
				<div>
				<span><strong>Crits:</strong> ${this.critTotal}</span>
				<span><strong>Messy Successes:</strong> ${this.messyTotal}</span>
				<span><strong>Beast Failures:</strong> ${this.beastTotal}</span>
				</div>
				${this.outcome ? html`<div>
				<strong>Outcome:</strong> <span>${this.outcome}</span>
				</div>` : html``}
			</div>

			<div class="dice-log">
			<p class="cinzel">Results Log</p>
			<span class="log-delete material-icons-outlined" @click="${this.clearLog}" @keyup="${this.clearLog}">delete_outline</span>
			<div class="dice-log-results">
				${this.renderLogResults()}
			</div>
			</div>
		</section>



		`;
	}
}
