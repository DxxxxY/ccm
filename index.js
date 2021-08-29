#!/usr/bin/env node

const chalk = require("chalk")
const download = require('download')
const tabletojson = require('tabletojson').Tabletojson
const fetch = require("node-fetch")
const fs = require("fs")
const { exec, execSync } = require("child_process")

const list = () => {
    fetch("https://dreamysoft.net/ccm")
        .then(res => res.text())
        .then(text => {
            console.log("├── Name ── Last modified ── Size")
            tabletojson.convert(text)[0].forEach(obj => {
                if (obj.Name === "Parent Directory") return
                console.log(`├── ${obj.Name} ── ${obj["Last modified"]} ── ${obj.Size}`)
            })
        })
}

const checkOnline = async() => {
    let found = false
    await fetch("https://dreamysoft.net/ccm")
        .then(res => res.text())
        .then(text => {
            tabletojson.convert(text)[0].forEach(obj => {
                if (obj.Name === "Parent Directory") return
                if (obj.Name === process.argv[3]) found = true
            })
        })
    return found
}

const inject = async() => {
    if (await checkOnline()) console.log(`Found [${chalk.cyanBright(process.argv[3])}]`)
    else return console.log(`[${chalk.redBright(process.argv[3])}] not found\nType ${chalk.cyanBright("ccm list")} to view all cheats available for download`)
    console.log(`Downloading [${chalk.cyanBright(process.argv[3])}]...`)
        //if (fs.existsSync(`${__dirname}/files/${process.argv[3]}`)) fs.unlinkSync(`${__dirname}/files/${process.argv[3]}`)
    download(`https://dreamysoft.net/ccm/${process.argv[3]}`, `${__dirname}/files`).then(() => {
        console.log(`Downloaded [${chalk.cyanBright(process.argv[3])}]`)
        console.log(`Downloading [${chalk.cyanBright("Injector")}]...`)
        download(`https://dreamysoft.net/utils/RandoInjector.exe`, `${__dirname}/files`).then(() => {
            console.log(`Downloaded [${chalk.cyanBright("Injector")}]`)
            console.log(`Injecting...`)
            execSync(`start ${__dirname}/files/RandoInjector.exe ${__dirname}/files/${process.argv[3]}`, [], { shell: true })
                //fs.unlinkSync(`${__dirname}/files/RandoInjector.exe`)
                //fs.unlinkSync(`${__dirname}/files/${process.argv[3]}`)
        })
    }).catch(err => console.log(err))
}

switch (process.argv[2]) {
    case "h":
    case "help":
        console.log(`
ccm ── Main command / About
ccm help ── Help
ccm list ── List of all cheats hosted online
ccm down <cheat> ── Downloads the selected cheat
ccm open ── Opens CS:GO
ccm bypass ── Launches VAC Bypass (may need to be launched twice)
ccm inject ── Injects the selected cheat (needs to be downloaded first)`)
        break
    case "l":
    case "list":
        console.log("Retrieving list...")
        list()
        break
    case "o":
    case "open":
        console.log(`Launching ${chalk.cyanBright("[CS:GO]")}...`)
        exec("start steam://rungameid/730")
        console.log(`Launched ${chalk.cyanBright("[CS:GO]")}`)
        break
    case "b":
    case "bypass":
        console.log(`Downloading [${chalk.cyanBright("VAC Bypass")}]...`)
        download(`https://dreamysoft.net/utils/VAC-Bypass-Loader.exe`, `${__dirname}/files`).then(() => {
            console.log(`Downloaded [${chalk.cyanBright("VAC Bypass")}]`)
            execSync(`start ${__dirname}/files/VAC-Bypass-Loader.exe`)
            console.log("If steam does not open, re-execute the command")
            console.log("You should see a message box informing you of the bypass")
            fs.unlinkSync(`${__dirname}/files/VAC-Bypass-Loader.exe`)
        })
        break
    case "i":
    case "inject":
        if (!process.argv[3]) return console.log(`Missing <${chalk.redBright("cheat")}> argument`)
        inject()
        break
    default:
        console.log(`Welcome to ${chalk.cyanBright("ccm b1.0.0")}\nType ${chalk.cyanBright("ccm help")} for more information`)
        return
}