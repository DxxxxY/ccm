#!/usr/bin/env node

const chalk = require("chalk")
const download = require('download')
const tabletojson = require('tabletojson').Tabletojson
const fetch = require("node-fetch")
const fs = require("fs")

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

//maybe await is needed
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

switch (process.argv[2]) {
    case "h":
    case "help":
        console.log("ccm <command>\n\nUsage:\n\nccm down <cheat> - downloads the selected cheat\nccm list - shows the name of all cheats available to download\nccm help - shows a help page for beginners")
        break
    case "l":
    case "list":
        console.log("Retrieving list...")
        list()
        break
    case "d":
    case "down":
    case "download":
        (async() => {
            if (!process.argv[3]) return console.log(`Missing <${chalk.redBright("cheat")}> argument`)
            if (await checkOnline()) console.log(`Found [${chalk.cyanBright(process.argv[3])}]`)
            else return console.log(`[${chalk.redBright(process.argv[3])}] not found\nType ${chalk.cyanBright("ccm list")} to view all cheats available for download`)
            console.log(`Downloading [${chalk.cyanBright(process.argv[3])}]...`)
            download(`https://dreamysoft.net/ccm/${process.argv[3]}`, `${__dirname}/files`).then(() => {
                console.log(`Downloaded [${chalk.cyanBright(process.argv[3])}]`)
            }).catch(err => console.log(err))
        })()
        break
    case "i":
    case "inject":
        //check if cheat exists
        //download memject.exe and launch with parameter
        break
    default:
        console.log(`Welcome to ${chalk.cyanBright("ccm b1.0.0")}\nType ${chalk.cyanBright("ccm help")} for more information`)
        return
}