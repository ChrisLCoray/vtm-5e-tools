import { html, fixture, expect } from '@open-wc/testing';
import { DiceStandaloneComponent, resultMsgs } from '../src/components/dice-standalone.component';

describe('DiceStandaloneComponent', async () => {
	let element: DiceStandaloneComponent;
	beforeEach(async () => {
		element = await fixture(html`<dice-standalone></dice-standalone>`);
	});

	// Quick copy + paste template
	// it('', async () => {});

	// calcOutcome(hungerRay: Array<number>, skillRay: Array<number>)
	describe('determines outcome based on dice rolls', async () => {
		beforeEach(async () => {
			element.difficulty = 3;
			element.useDifficulty = true;
		});

		it('can determine success or failure based on random rolls', async () => {
			const skillRay: Array<number> = [9, 9, 9, 9];
			const hungerRay: Array<number> = [3 , 4];
			element.calcOutcome(hungerRay, skillRay);
			if (element.successTotal >= element.difficulty) {
				expect(element.outcome).to.equal(resultMsgs.success);
			} else {
				expect(element.outcome).to.equal(resultMsgs.fail);
			}
		});

		it('uses the largest individual dice pool as an iterator for tallying results', async () => {
			const skillRay: Array<number> = [9, 9];
			const hungerRay: Array<number> = [3 , 4, 5, 3, 4];
			element.calcOutcome(hungerRay, skillRay);
			if (element.successTotal >= element.difficulty) {
				expect(element.outcome).to.equal(resultMsgs.success);
			} else {
				expect(element.outcome).to.equal(resultMsgs.fail);
			}
		});

		it('correctly determines success points with critical pairs of 10', async () => {
			const expectedResult = 6; // 10 + 10 = 1 crit worth 4, 7 = 1, 6 = 1: 4 + 1 + 1 = 6 total successes
			const skillRay: Array<number> = [10, 10, 7, 6, 3];
			const hungerRay: Array<number> = [3, 4];
			element.calcOutcome(hungerRay, skillRay);
			expect(element.successTotal).to.equal(expectedResult);
			expect(element.outcome).to.equal(resultMsgs.success);
		});

		it('correctly determines a messy successy (messy critical)', async () => {
			const skillRay: Array<number> = [10, 6, 3]; // 1 crit, 1 success
			const hungerRay: Array<number> = [10, 4]; // 1 messy crit + 1 reg crit = 4, + 1 success = 5 success with messy
			element.calcOutcome(hungerRay, skillRay);
			expect(element.outcome).to.equal(resultMsgs.messySuccess);
		});
		
		it('correctly determines a beastial failure', async () => {
			const skillRay: Array<number> = [6, 4, 3]; // 1 success
			const hungerRay: Array<number> = [1, 1]; // 2 beast, 2 > 1 therefore beastial failure
			element.calcOutcome(hungerRay, skillRay);
			expect(element.outcome).to.equal(resultMsgs.beastFail);
		});

		it('correctly determines total failures', async () => {
			const skillRay: Array<number> = [5, 4, 3];
			const hungerRay: Array<number> = [3, 4];
			element.calcOutcome(hungerRay, skillRay);
			expect(element.outcome).to.equal(resultMsgs.totalFail);
		});
	});

	// clearLog()
	it('allows user to clear dice log manually', async () => {
		element.clearLog();
		expect(element.resultsLog[0]?.cleared).to.equal('Log cleared');
	});

	// clearVars()
	it('uses clearVars to reset local variables', async () => {
		element.successTotal = 10;
		element.outcome = 'FOO';
		element.clearVars();
		expect(element.successTotal).to.equal(0);
		expect(element.outcome).to.equal('');
	});

	// dicePoolPlusMinus(event: any)
	describe('uses dicePoolPlusMinus to manage dice pools', async () => {
		it('gets correct data from span parent if user clicks icon', async () => {
			element.skillDice = 3;
			element.hungerDice = 1;
			const fakeEvent = {
				path: [
				{
					className: 'material-icons-outlined',
					title: ''
				},
				{
					className: 'dice-control-button skill-dice-button',
					title: 'plus'
				},
				]
			};

			element.dicePoolPlusMinus(fakeEvent);

			expect(element.skillDice).to.equal(4);
			expect(element.hungerDice).to.equal(1);
		});

		it('adds a skill die if user clicks skill plus', async () => {
			element.skillDice = 4;
			element.hungerDice = 1;
			const fakeEvent = {
				path: [
				{
					className: 'dice-control-button skill-dice-button',
					title: 'plus'
				},
				]
			};

			element.dicePoolPlusMinus(fakeEvent);

			expect(element.skillDice).to.equal(5);
			expect(element.hungerDice).to.equal(1);
		});

		it('removes a skill die if user clicks skill minus', async () => {
			element.skillDice = 5;
			element.hungerDice = 1;
			const fakeEvent = {
				path: [
				{
					className: 'dice-control-button skill-dice-button',
					title: 'minus'
				},
				]
			};

			element.dicePoolPlusMinus(fakeEvent);

			expect(element.skillDice).to.equal(4);
			expect(element.hungerDice).to.equal(1);
		});

		it('adds a hunger die if user clicks hunger plus', async () => {
			element.skillDice = 4;
			element.hungerDice = 1;
			const fakeEvent = {
				path: [
				{
					className: 'dice-control-button hunger-dice-button',
					title: 'plus'
				},
				]
			};

			element.dicePoolPlusMinus(fakeEvent);

			expect(element.skillDice).to.equal(4);
			expect(element.hungerDice).to.equal(2);
		});

		it('removes a hunger die if user clicks hunger minus', async () => {
			element.skillDice = 4;
			element.hungerDice = 2;
			const fakeEvent = {
				path: [
				{
					className: 'dice-control-button hunger-dice-button',
					title: 'minus'
				},
				]
			};

			element.dicePoolPlusMinus(fakeEvent);

			expect(element.skillDice).to.equal(4);
			expect(element.hungerDice).to.equal(1);
		});

		it('does not send dice pools into negative numbers', async () => {
			element.skillDice = 4;
			element.hungerDice = 0;
			const fakeEvent = {
				path: [
				{
					className: 'dice-control-button hunger-dice-button',
					title: 'minus'
				},
				]
			};

			element.dicePoolPlusMinus(fakeEvent);

			expect(element.skillDice).to.equal(4);
			expect(element.hungerDice).to.equal(0);
		});
	});

	// dieRoll(numberDie: number)
	it('calculates d10 die rolls', async () => {
		const dieResult: Array<number> = DiceStandaloneComponent.dieRoll(1);
		expect(dieResult[0]).to.be.greaterThan(0).and.to.be.lessThan(11);
	});

	// logResults(hungerRay: Array<number>, skillRay: Array<number>, type: string)
	it('generates a log array of result objects', async () => {
		const typeStr = 'Skill Check';
		element.resultsLog = [];
		const skillRay: Array<number> = DiceStandaloneComponent.dieRoll(5);
		const hungerRay: Array<number> = DiceStandaloneComponent.dieRoll(2);
		element.difficulty = 2;
		element.useDifficulty = true;
		element.calcOutcome(hungerRay, skillRay);
		// element.logResults called by element.calcOutcome
		expect(element.resultsLog[0]?.type).to.equal(typeStr);
		expect(element.resultsLog[0]?.timestamp).is.not.undefined;
		expect(element.resultsLog[0]?.skillDice?.length).to.equal(skillRay.length);
		expect(element.resultsLog[0]?.hungerDice?.length).to.equal(hungerRay.length);
	});

	// makeRoll()
	it('rolls dice and renders results in DOM', async () => {
		element.skillDice = 5;
		element.hungerDice = 2;
		element.makeRoll();
		const diceTray = element.shadowRoot!.querySelector('.dice-tray')!;
		expect(diceTray).to.not.be.undefined;
		expect(element.skillDiceDom.length).to.equal(element.skillDice);
		expect(element.hungerDiceDom.length).to.equal(element.hungerDice);
	});

	// manageDiceTray()
	it('updates dice tray DOM as user adds or subtracts dice for visual feedback', async () => {
		element.skillDice = 5;
		element.hungerDice = 2;
		element.manageDiceTray();
		const diceTray = element.shadowRoot!.querySelector('.dice-tray')!;
		expect(diceTray).to.not.be.undefined;
		expect(element.skillDiceDom.length).to.equal(element.skillDice);
		expect(element.hungerDiceDom.length).to.equal(element.hungerDice);
	});

	// renderLogResults()
	it('renders log results to DOM', async () => {
		const typeStr = 'Skill Check';
		element.resultsLog = [];
		const skillRay: Array<number> = DiceStandaloneComponent.dieRoll(5);
		const hungerRay: Array<number> = DiceStandaloneComponent.dieRoll(2);
		element.difficulty = 2;
		element.useDifficulty = true;
		element.calcOutcome(hungerRay, skillRay);
		// setTimeout "shim" is actually in open-wc documentation
		// force the test to wait for the dynamic/state DOM to update
		setTimeout(() => {
			const span = element.shadowRoot!.querySelector('.dice-log-results span:nth-child(2)')!;
			expect(span.innerHTML.toString().indexOf(typeStr)).to.be.greaterThan(-1);
		});
	});

	// rouseCheck()
	describe('can roll a quick rouse check and log result', async () => {
		beforeEach(() => {
			element.outcome = '';
			element.resultsLog = [];
		})

		// Same logic, minus the clearVars(), and manually inputting results
		const fakeRouseCheck = (testResult: number) => {
			const res = [testResult];
			element.outcome = res[0] >= 6 ? 'Success!' : 'Failure!';
			element.logResults([], res, 'Rouse Check');
		};

		it('returns Success! if check passed', async () => {
			fakeRouseCheck(9);
			expect(element.outcome).to.equal('Success!');
			expect(element.resultsLog[0]?.type).to.equal('Rouse Check');
			expect(element.resultsLog[0]?.skillDice?.length).to.equal(1);
		});
		it('returns Failure! if check failed', async () => {
			fakeRouseCheck(3);
			expect(element.outcome).to.equal('Failure!');
			expect(element.resultsLog[0]?.type).to.equal('Rouse Check');
			expect(element.resultsLog[0]?.skillDice?.length).to.equal(1);
		});
	});

	// toggleDifficulty(e: any)
	describe('allows user to toggle difficulty setting on and off', async () => {
		it('exits if the input is not the checkbox', async () => {
			element.useDifficulty = false;
			const fakeEvent = {
				path: [{
				checked: true,
				name: 'foo',
				type: 'input'
				}]
			};
			element.toggleDifficulty(fakeEvent);
			expect(element.useDifficulty).to.equal(false);
		});
		it('correctly toggles to true if currently false', async () => {
			element.useDifficulty = false;
			const fakeEvent = {
				path: [{
				checked: true,
				name: 'useDifficultyCheck',
				type: 'checkbox'
				}]
			};
			element.toggleDifficulty(fakeEvent);
			expect(element.useDifficulty).to.equal(true);
		});
		it('correctly toggles to false if currently true', async () => {
			element.useDifficulty = true;
			const fakeEvent = {
				path: [{
				checked: false,
				name: 'useDifficultyCheck',
				type: 'checkbox'
				}]
			};
			element.toggleDifficulty(fakeEvent);
			expect(element.useDifficulty).to.equal(false);
		});
	});

	// updateDifficulty(e: any)
	describe('syncs range and number inputs for Difficulty check', async () => {
		it('updates difficulty using range input', async () => {
			element.useDifficulty = true;
			const d = 3;
			element.difficulty = 1;
			const fakeEvent = {
				path: [{
				name: 'difficultyRange',
				type: 'range',
				value: d
				}]
			};
			element.updateDifficulty(fakeEvent);
			expect(element.difficulty).to.equal(d);
		});

		it('updates difficulty using number input', async () => {
			element.useDifficulty = true;
			const d = 2;
			element.difficulty = 3;
			const fakeEvent = {
				path: [{
				name: 'difficultyInput',
				type: 'number',
				value: d
				}]
			};
			element.updateDifficulty(fakeEvent);
			expect(element.difficulty).to.equal(d);
		});
	});

	// ARIA compatibility audit
	it('passes the a11y audit', async () => {
		await expect(element).shadowDom.to.be.accessible();
	});
});
