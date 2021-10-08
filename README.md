# CCM
Open-Source CLI for the CS:GO cheating community. Makes your life easier.

# WARNING: SEVERALY OUTDATED SINCE THE RIPTIDE UPDATE, MOST FREE CHEATS DIED AND I NO LONGER PLAY CS. FEEL FREE TO REPLACE `repoDLL` WITH YOUR OWN CDN OF DLLS. USE MY `repoUtils` AT YOUR OWN RISK. VAC-BYPASS MIGHT BE PATCHED (RUMOURS) AND INJECTOR IS THE MOST DETECTED PIECE OF SHIT I'VE EVER SEEN IT'S ONLY UD CAUSE OF BYPASS.

https://user-images.githubusercontent.com/42523606/131750877-876d9f51-dd6a-434d-b8d3-e91869431e23.mp4

## Table of Contents
[Installing](#installing) |
[Features](#features) |
[Commands](#commands) |
[Path](#path) |
[Cheats](#list-of-cheats) |
[Exceptions](#exceptions) |
[Credits](#credits)

## Installing
```
npm install ccm-cli -g
```
Notes:
> You need to start the terminal with administrative permissions.

> You need to add either [path](#path) to your antivirus exclusions.

## Features
It's safe!
> Some other loaders like BetaLoader was exposed for being a rat/btc miner and DarkSpy was exposed for being a discord token grabber.
- It's open-source (no bullshit, it's unobfuscated JavaScript that gets installed to [path](#path) by npm) 

- Cheats are either compiled from github source or taken from yougame.biz (reputable russian cheat forum)

Incredibly lightweight!

- ~3kb to download, excluding stuff it downloads, excluding npm dependencies
## Commands
> There are numerous aliases to the commands, for an example, the first letter of every command.
```
ccm ── Main command / About
ccm help ── Help
ccm list ── List of all cheats hosted online
ccm open ── Opens CS:GO
ccm bypass ── Launches VAC Bypass (may need to be launched twice)
ccm inject <cheat> ── Downloads and injects the selected cheat
```

## Path
Automatically installs to:
> Copy and paste this in your file explorer.
```
%appdata%/npm/node_modules/ccm-cli
```
Cheats, injector and bypass gets downloaded to: 
> Copy and paste this in your file explorer.
```
%appdata%/npm/node_modules/ccm-cli/files
```

## List of cheats (refer to big bright warning tag at the top)
> Accessible through the <kbd>ccm l</kbd> command.

> If you ever want me to add a cheat, open an issue on github (must be from somewhere trusted).
```
├── Name ── Last modified ── Size
├── clarity.dll ── 2021-08-29 14:36 ── 1.4M
├── interium.dll ── 2021-08-29 14:16 ── 10M
├── nixware.dll ── 2021-08-29 14:28 ── 48M
├── osiris.dll ── 2021-08-29 13:48 ── 1.3M
├── otc2.dll ── 2021-08-29 00:50 ── 2.8M
├── otc3.dll ── 2021-08-28 00:24 ── 8.7M
├── supremacy.dll ── 2021-08-29 14:42 ── 1.2M
```

## Exceptions
- interium.dll ── [download, un-zip and drop this folder in %appdata%](https://mega.nz/file/dc8mCC7C#8qkdalh6m-DBOM1gFeD5tgAj8SJMG0eqgW30gka3UK4) (otherwise, cheat will crash)

## Credits
> This project was possible using the help of these programs.
- Injector ── modified version of [martinjanas/RandoInjector](https://github.com/martinjanas/RandoInjector)

- Bypass ── [danielkrupinski/VAC-Bypass-Loader](https://github.com/danielkrupinski/VAC-Bypass-Loader)
