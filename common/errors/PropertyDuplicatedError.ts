/**
 * This error is thrown, when a property should be added to a virtual class that is already present.
 * 
 * @export
 * @class PropertyDuplicatedError
 * @extends {Error}
 */
export class PropertyDuplicatedError extends Error {
    constructor(propName: string, parent: string) {
        super();
        this.message = `The property "${propName}" is duplicated in "${parent}".`;
    }
}
