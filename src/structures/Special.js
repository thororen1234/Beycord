/**
 * @prop {String} name The name of the special move.
 * @prop {function} requirement The function used to define whether the special is executable.
 * @prop {function} special The actual special move to be executed.
 */

class Special {
    /**
     * 
     * @arg {String} name The name of the special move. 
     * @arg {function} requirement The function used to define whether the special is executable. MUST RETURN A BOOLEAN!
     * @arg {function} special The actual special move to be executed.
     */
    constructor(name, requirement, special){
        this.name = name || "Special",
        this.requirement = requirement || function placeholder(){return false};
        this.special = special || function specialplaceholder(){};
    }
}

module.exports = Special;