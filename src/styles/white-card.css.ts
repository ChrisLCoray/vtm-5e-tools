import { css } from 'lit';

export default css`
    .white-card-container {
        background-color: var(--theme-white);
        padding: 1em;
        position: relative;
    }

    .white-card-container h4,
    .wcc-header {
        font-size: 0.7em;
    }

    .white-card {
        background-color: var(--theme-white);
        border: 3px double var(--theme-red);
        color: var(--theme-black);
        height: 100%;
        margin-right: 1em;
        padding: 1em;
        position: relative;
        z-index: 1;
    }

    .white-card:last-child {
        margin-right: 0;
    }

    .white-card .wcb {
        background-color: var(--theme-white);
        display: block;
        position: absolute;
        transform: rotate(45deg);
        height: 25px;
        width: 25px;
        z-index: 10;
    }

    .white-card .tbl {
        border-right: 3px double var(--theme-red);
        left: -13px;
        top: -13px;
    }

    .white-card .tbr {
        border-bottom: 3px double var(--theme-red);
        left: auto;
        right: -13px;
        top: -13px;
    }

    .white-card .bbl {
        border-top: 3px double var(--theme-red);
        left: -13px;
        bottom: -13px;
    }

    .white-card .bbr {
        border-left: 3px double var(--theme-red);
        left: auto;
        right: -13px;
        bottom: -13px;
    }
`;