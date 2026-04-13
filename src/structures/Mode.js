/**
 * @prop {String} name The name of the mode.
 * @prop {function} requirement The function used to identify whether or not the mode should activate.
 * @prop {function} mode Stuff to do when the Bey has entered the mode.
 * @prop {Boolean} activateOnStart Whether the mode should already be activated / on when the battle starts.
 */

class Mode {
    /**
     * @arg {String} name The name of the mode.
     * @arg {function} requirement The function used to identify whether or not the mode should activate. MUST RETURN A BOOLEAN!!
     * @arg {function} mode Stuff to do when the Bey has entered the mode. (OPTIONAL)
     * @arg {Boolean} activateOnStart Whether the mode should already be activated / on when the battle starts. (OPTIONAL | DEFAULT = FALSE)
     */
    constructor(name, requirement, mode, activateOnStart){
        this.name = name || "Mode",
        this.requirement = requirement || function placeholder(){return false};
        this.mode = mode || function Modeplaceholder(){};
        this.activateOnStart = activateOnStart || false;
    }
}

module.exports = Mode;