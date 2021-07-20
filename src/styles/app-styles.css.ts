import { css } from 'lit';

// Theme vars in index.html

export default css`
    h1, h2, h3, h4, h5 {
      font-family: var(--theme-cinzel);
      font-weight: 400;
    }

    button {
      font-family: var(--theme-cinzel);
      font-weight: 600;
    }

    div {
      box-sizing: border-box;
    }

    /* input[type="range"] {
      appearance: none;
      -webkit-appearance: none;
      background: var(--theme-red);
      height: 2px;
      padding: 0;
      outline: 1px solid transparent;
    } */

    input[type=range] {
      -webkit-appearance: none;
      margin: 14px 0;
      width: 100%;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4.4px;
      cursor: pointer;
      background: var(--theme-dark-gray);
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }
    input[type=range]::-webkit-slider-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: 24px;
      width: 24px;
      border-radius: 16px;
      background: #ffffff;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -12px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      background: var(--theme-red);
    }
    input[type=range]::-moz-range-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      background: var(--theme-dark-gray);
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }
    input[type=range]::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: 36px;
      width: 16px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
    }
    input[type=range]::-ms-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      border-width: 16px 0;
      color: transparent;
    }
    input[type=range]::-ms-fill-lower {
      background: #2a6495;
      border: 0.2px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]::-ms-fill-upper {
      background: var(--theme-dark-gray);
      border: 0.2px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]::-ms-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      background: #ffffff;
      cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: var(--theme-red);
    }
    input[type=range]:focus::-ms-fill-upper {
      background: var(--theme-dark-gray);
    }

    input[type=range]:disabled::-webkit-slider-runnable-track,
    input[type=range]:disabled::-moz-range-track {
      background: var(--theme-dark-gray);
    }

	body * input::placeholder {
		color: var(--theme-light-gray) !important;
	}

	main {
		flex-grow: 0.9;
		min-width: 80%;
	}

	menu-bar {
		display: block;
		height: 39px;
		margin-bottom: 2rem;
		width: 100%;
	}

    .cinzel {
    	font-family: var(--theme-cinzel);
    }

	.mono {
		font-family: var(--theme-mono);
	}

	.sans {
		font-family: Arial, Helvetica, sans-serif;
	}

    .clearall {
		clear: both;
		display: block;
    }

    .clearfix {
		clear: both;
		display: block;
		height: 0px;
		width: 0px;
    }

    .left {
      float: left;
    }

    .right {
      float: right;
    }

    .pointer {
      cursor: pointer;
    }

    .text-left {
      text-align: left;
    }

    .text-right {
      text-align: right;
    }

	.three-col,
  .two-col {
		display: flex;
		flex-direction: row;
	}

	.three-col div {
		width: 33%;
	}

  .two-col div {
		width: 50%;
	}

	.add-list-items {
		text-align: left;
	}

	.add-list-items li span.material-icons-outlined {
		color: var(--theme-darker-gray);
		float: right;
		vertical-align: -2px;
	}

	.add-list-items li span.material-icons-outlined::after {
		clear: both;
		content: "";
		display: block;
	}

    .app-footer {
      display: flex;
      flex-direction: row;
      font-size: calc(12px + 0.5vmin);
      font-family: var(--theme-sans);
      align-items: center;
      padding: 0 auto;
      margin: 0 auto;
      flex-grow: 0.1;
    }

    .app-footer img.wod-logo {
      display: flex;
      flex-grow: 0;
      height: 13vh;
      max-height: 120px;
      width: auto;
      margin-right: 1em;
    }

    .app-footer img.wod-logo, .app-footer .wod-copy {
      display: inline-block;
      max-height: 120px;
    }

    .app-footer .wod-copy {
      flex-grow: 1;
      padding-top: 2em;
    }

    .app-footer a {
      margin-left: 5px;
    }

	.bg-white {
		background-color: var(--theme-white) !important;
	}

    .dice-log {
      position: relative;
      text-align: left;
    }

    .dice-log p {
      font-size: 16px;
      font-weight: 400;
    }

    .dice-log .log-delete {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 20px;
    }

    .dice-log .dice-log-results {
      border: 1px solid var(--theme-dark-gray);
      border-radius: 10px;
      display: block;
      padding: 0.25em;
      position: relative;
      min-height: 2em;
    }

    .dice-log .dice-log-results span {
      display: inline-block;
      font-family: var(--theme-mono);
      font-size: 14px;
    }

    .input-slider-container {
      display: flex;
      margin: 1em 0;
      width: 100%;
    }

    .input-slider-container label {
      font-size: 20px;
      margin-right: 1em;
      min-width: 11vw;
      text-align: right;
    }

    .input-slider-container input.mdl-slider {
      flex: 1;
    }

    .input-slider-container input.text-input {
      margin-left: 1em;
      width: 35px;
    }

    .input-slider-container span.output {
      margin-left: 2em;
    }

    .input-slider-container .use-difficulty-container {
      flex: 0;
      margin-right: 0.5em;
    }

    .left {
      text-align: left;
    }

    .material-icons-outlined {
      color: #fff;
      cursor: pointer;
      font-family: 'Material Icons';
    }

	.material-icons-outlined.dark {
		color: var(--theme-darker-gray);
	}

    .section-header {
      display: block;
      font-size: 0.75em;
      position: absolute;
      top: -9px;
      width: 80%;
    }

    .dice-tray {
      background-color: var(--theme-dark-gray);
      border-radius: 10px;
      display: block;
      min-height: 85px;
      height: auto;
      padding: 5px;
      margin: 10px auto;
    }

    .dice-tray .die-dom {
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      display: inline-block;
      position: relative;
      width: 75px;
      height: 75px;
    }

    .dice-tray .die-dom span {
      color: #fff;
      display: block;
      font-family: var(--theme-cinzel);
      font-size: 18px;
      font-weight: 500;
      line-height: 10px;
      text-align: center;
      position: absolute;
      top: 23px;
      width: 100%;
    }

    .dice-tray .die-dom.vtm-hunger-die {
      background-image: url('../media/hunger-die.png');
    }

    .dice-tray .die-dom.vtm-skill-die {
      background-image: url('../media/skill-die.png');
    }

    .flex-container {
      display: flex;
    }

    .flex-row {
      flex-direction: row;
    }

    .flex-col {
      flex-direction: column;
    }

    .flex-wrap {
      flex-wrap: wrap;
    }
    .cs-section {
		display: block;
		margin-bottom: 0.5em;
		position: relative;
    }

	.cs-section .cs-section-head {
		display: block;
		min-height: 25px;
		position: relative;
		width: 100%;
	}

	.cs-section .cs-section-head h4 {
		border-bottom: 1px solid var(--theme-darker-gray);
		font-size: 0.7em;
		margin: 0 0 0.1em 0;
		padding: 0 0 0.1em 0;
		text-align: center;
	}

	.cs-section .cs-section-head .edit-icon {
		color: var(--theme-darker-gray);
		font-size: 18px;
		padding: 0.5em;
		position: absolute;
		right: -0.5em;
		top: -0.25em;
	}

	.cs-section .cs-section-head .edit-icon.disabled {
		color: var(--theme-dark-gray);
	}

	.cs-section .cs-section-body {
		display: flex;
		flex-direction: row;
		font-size: 0.5em;
		width: 100%;
	}

	.cs-section .cs-section-body .fake-select {
		height: 100%;
		padding: 0;
		position: relative;
		vertical-align: middle;
		width: 100%;
	}

	.cs-section.cs-basics-container .cs-section-body .fake-select,
	.cs-section.cs-basics-container .cs-section-body .fake-select div {
		background-color: #FFF;
		cursor: pointer;
		display: flex;
		font-family: var(--theme-sans);
		font-size: 13.333px;
		height: 100%;
		margin: 0;
		text-align: left;
		width: 100%;
	}

	.cs-section.cs-basics-container .cs-section-body .fake-select:first-child {
		color: var(--theme-light-gray);
		display: flex;
		padding: 0.5em;
		position: relative;
		width: 100%;
	}

	.cs-section.cs-basics-container .cs-section-body .fake-select:first-child .material-icons-outlined {
		color: var(--theme-dark-gray);
		display: block;
		position: absolute;
		top: 0.55em;
		right: 0.5em;
	}

	.cs-section.cs-basics-container .cs-section-body .fake-select .fs-dropdown  {
		display: none;
	}

	.cs-section.cs-basics-container .cs-section-body .fake-select.show .fs-dropdown {
		display: block;
		position: absolute;
		left: 0;
		z-index: 100;
		width: 100%;
	}

	.cs-section.cs-basics-container .cs-section-body .fake-select.show .fs-dropdown div {
		padding: 0.5em;
	}

	.cs-section.cs-basics-container .cs-section-body .fake-select span.fs-title.selected {
		color: var(--theme-darker-gray);
	}

	.three-col .list-data-container,
	.list-data-container,
	.three-col .list-data-container .list-data-add {
		width: 100%;
	}

	.list-data-container .list-data-add .material-icons-outlined {
		color: var(--theme-darker-gray);
		display: inline-flex;
	}

	.list-data-container .list-data-add input {
		color: var(--theme-darker-gray);
		display: inline-flex;
	}

	.list-data-container .list-data-add input::placeholder {
		color: var(--theme-gray);
	}
`;
