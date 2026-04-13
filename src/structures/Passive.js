/**
 * @prop {String} name The name of the passive.
 * @prop {function} requirement The function used to identify whether or not the passive should activate.
 * @prop {function} passive The actual passive.
 */

class Passive {
    /**
     * @arg {String} name The name of the passive.
     * @arg {function} requirement The function used to identify whether or not the passive should activate. MUST RETURN A BOOLEAN!!
     * @arg {function} passive The actual passive.
     */
    constructor(name, requirement, passive){
        this.name = name || "Passive",
        this.requirement = requirement || function placeholder(){return false};
        this.passive = passive || function passiveplaceholder(){};
    }
}

module.exports = Passive;