<p align="center">
  <img width="640" src="https://repository-images.githubusercontent.com/377644124/f7b697a6-9262-40cf-bac1-9460e4041f7c"></img>
</p>

## Unofficial VtM 5e Tools by FuzzieChikun

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

<h5>About:</h5>
<p>The concept behind this code repo is to give Vampire the Masquerade (VtM) 5e players a set of tools to simplify their ability to play. It is a work in progress.</p>
<p>I'll be hosting the application on my server once it is in a more useable state. I estimate the Character Creation tool is over 80% complete, there are a few items still TODO, as well as future upgrades planned.</p>
<p>This started as a basic VtM dice roller (which will be included as a separate view for any who just want a digital die roller w/o importing or creating a character sheet), but I wanted users to have the ease of using their actual character stats for quick selection when rolling die. The die roller calculates successes, messy successes, and failures.</p>
<p>I expanded to the full character sheet. Currently all data is saved to the user's local PC, but I wired up the code to easily convert to save to a Mongo server. Since licensing (see below) from Paradox Interactive AB stipulates that I can't charge users, I would need some funds to set up a NodeJS/Express/MongoDB server. In the meantime I'll be putting this up on my server as an application. If the user installs it, they'll be able to use it offline as well.</p>
<p><strong>Future plans / updates:</strong></p>

- Full ARIA compatibility. It would be amazing to have a tool for visually impaired players so they can play VtM.
- NodeJS / Mongo support: Allow a Coterie to be in a linked session and save characters remotely.
- Storyteller view: Give Storytellers the ability to have Character information in front of them with a real-time view of stats (hunger, humanity, damage) and die rolls, hence the need for NodeJS.

## Licensing
License is provided under Apache 2 license. Feel free to clone your own repository and edit as you see fit for personal use, but under the Dark Pack License Agreement provided by Paradox Interactive AB, you may not sell the application, use advertisements, or otherwise monetize beyond a link for users to donate to support development. Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission. All rights reserved Paradox Interactive AB. For more information please visit worldofdarkness.com.

You may not include information that would supplant the need for users to purchase official Vampire the Masquerade source materials. I have used basic descriptions / summaries for quick reference, with expanded reference back to source material. Example from the Predator types data object:

```{ id: PredatorIds.Farmer, description: "You only feed from animals", name: "Farmer", page: 177, source: SourceBookIds.Corebook }```

This includes an internal data ID, a description I summarized from the 5e Sourcebook, the name which appears in a dropdown select during character creation, as well as which sourcebook ID the user can find it in and the page number which is converted into a user-friendly display, e.g. "5e Sourcebook page 177." I *did not* copy/paste the text directly from the book. Again, users will need the source material to fully utilize these tools.

## Requirements

- NodeJS 10 or higher (built using 14.16.x)
- npm 6 or higher (built using 6.14.x)
- All other dependencies are installable npm

To get started:
- Checkout repository

```sh
npm install
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
