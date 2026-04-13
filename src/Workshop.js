"use strict";

let EventEmitter;
try{
    EventEmitter = require("eventemitter3");
}catch(error){
    EventEmitter = require("events");
}

const fs = require("fs");
const UglifyJS = require("uglify-es");

const Beyblade = require("./Beyblade");
const Passive = require("./structures/Passive");
const Special = require("./structures/Special");
const Mode = require("./structures/Mode");

/**
 * @extends EventEmitter
 * @prop {Object} [options] Workshop options
 * @prop {String} directoryPath File path to the directory that the Workshop should read from to gather data for Bey generations.
 * @prop {String} outputPath File path to the directory that Beys will be generated in.
 */

class Workshop extends EventEmitter {
    /**
     * @arg {String} directoryPath File path to the directory that the Workshop should read from to gather data for Bey generations.
     * @arg {String} outputPath File path to the directory that Beys will be generated in.
     * @arg {Object} [options] Workshop options.
     * @arg {Boolean} [options.generateBeysOnReady] Whether the Workshop should start generating Beys when it is ready. (Only does it once.)
     */
    constructor(directoryPath, outputPath, options){
        super();
        this.options = Object.assign({
            generateBeysOnReady: true
        }, options)
        if(!directoryPath || !fs.existsSync(directoryPath)) throw new Error("Directory to gather Bey data cannot be found!");
        if(!outputPath || !fs.existsSync(outputPath)) throw new Error("Output path to generate Beys in cannot be found!");
        this.directoryPath = directoryPath;
        this.outputPath = outputPath;
        this.on("ready", () => {
            if(this.options.generateBeysOnReady) this.generate();
        });
        this.emit("ready");
    }
    /**
     * Start generating Beys
     * @returns {String} Directory path to view the generated contents.
     */
    generate(){
        let directory = fs.readdirSync(this.directoryPath);
        directory.forEach(name => {
            let bey = require(`${this.directoryPath}/${name}`);
            if(bey instanceof Beyblade !== true) throw new Error(`${this.directoryPath}/${name} is not a Beyblade!`);
            let shortened = bey.name.replace(/\W/g, "");
            let code = `const Beyblade=require("./Beyblade.js");class ${shortened} extends Beyblade{constructor(){super("${bey.name}","${bey.type}","${bey.imageLink}");this.specials=[`;
            for(var i = 0; i < bey.specials.length; i++){
                if(i >= 1) code += ",";
                code += `{name:"${bey.specials[i].name}",requires:${bey.specials[i].requirement},execute:${bey.specials[i].special}}`;
            }
            code += "];this.passives=[";
            for(var i = 0; i < bey.passives.length; i++){
                if(i >= 1) code += ",";
                code += `{name:"${bey.passives[i].name}",requires:${bey.passives[i].requirement},execute:${bey.passives[i].passive}}`;
            }
            code += "];";
            for(var i = 0; i < bey.modes.length; i++){
                code += `this.${bey.modes[i].trim()} = {active:${bey.modes[i].activateOnStart},requires:${bey.modes[i].requirement},boost:${bey.modes[i].mode}};`
            }
            let directions = {"right": 0, "left": 1};
            code += `this.sd=${directions[bey.sd.toLowerCase()] || 0};this.sdchangable=${bey.sdchangable}`;
            code += `}}module.exports=${shortened};`
            let minified = UglifyJS.minify(code)
            fs.writeFileSync(`${this.outputPath}/${shortened}.js`, minified.error || minified.code);
        });
        return this.outputPath;
    }
}

module.exports = Workshop;