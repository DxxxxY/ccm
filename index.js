#!/usr/bin/env node

const chalk = require("chalk")
const download = require('download')
const tabletojson = require('tabletojson').Tabletojson
const fetch = require("node-fetch")
const fs = require("fs")
const { exec, execSync, spawn, spawnSync } = require("child_process")

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
    case "csgo":
    case "open":
        console.log(`Launching ${chalk.cyanBright("[CS:GO]")}...`)
        exec("start steam://rungameid/730")
        console.log(`Launched ${chalk.cyanBright("[CS:GO]")}`)
        break
    case "b":
    case "bypass":
    case "vac":
        download(`https://dreamysoft.net/utils/VAC-Bypass-Loader.exe`, `${__dirname}/files`).then(() => {
            execSync(`${__dirname}/files/VAC-Bypass-Loader`)
            fs.unlinkSync(`${__dirname}/files/VAC-Bypass-Loader`)
        })
        break
    case "i":
    case "inject":
        //return console.log("In Progress")
        if (!process.argv[3]) return console.log(`Missing <${chalk.redBright("cheat")}> argument`)
        if (fs.existsSync(`${__dirname}/files/${process.argv[3]}`)) {
            download(`https://dreamysoft.net/utils/PE2HEX.py`, `${__dirname}/files`).then(() => {
                let child = spawnSync(`start ${__dirname}/files/PE2HEX.py ${__dirname}/files/${process.argv[3]} --out ${__dirname}/files/temp.txt`, [], { shell: true })
                console.log("1")
                child.on('exit', () => {
                    //fs.unlinkSync(`${__dirname}/files/PE2HEX.py`)
                    console.log("2")
                })
                console.log("3")
                    //console.log("txt")

                //execSync(`start ${__dirname}/files/PE2HEX.py ${__dirname}/files/${process.argv[3]} --out ${__dirname}/files/temp.txt`)
                // fs.unlinkSync(`${__dirname}/files/PE2HEX.py`)
                //after its finished download injector and supply temp.txt
            })
        } else return console.log(`[${chalk.redBright(process.argv[3])}] not found\nMake sure you have downloaded it first`)

        //check if cheat exists
        //download memject.exe and launch with parameter
        break
    default:
        console.log(`Welcome to ${chalk.cyanBright("ccm b1.0.0")}\nType ${chalk.cyanBright("ccm help")} for more information`)
        return
}