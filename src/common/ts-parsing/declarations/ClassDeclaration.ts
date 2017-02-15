import { NotImplementedYetError } from '../../errors';
import { nodeRange } from '../Node';
import { ConstructorDeclaration } from './ConstructorDeclaration';
import { ExportableDeclaration } from './Declaration';
import { MethodDeclaration } from './MethodDeclaration';
import { PropertyDeclaration } from './PropertyDeclaration';
import { Serializable } from 'ts-json-serializer';
import { CompletionItemKind, Range, TextDocument } from 'vscode-languageserver-types';

/**
 * Class declaration that contains methods, properties and a constructor
 * 
 * @export
 * @class ClassDeclaration
 * @implements {ExportableDeclaration}
 */
@Serializable({
    factory: json => {
        const obj = new ClassDeclaration(json.name, json.isExported, json.start, json.end);
        obj.ctor = json.ctor;
        obj.properties = json.properties;
        obj.methods = json.methods;
        return obj;
    }
})
export class ClassDeclaration implements ExportableDeclaration {
    public ctor: ConstructorDeclaration;
    public properties: PropertyDeclaration[] = [];
    public methods: MethodDeclaration[] = [];

    public get itemKind(): CompletionItemKind {
        return CompletionItemKind.Class;
    }

    public get intellisenseSortKey(): string {
        return `0_${this.name}`;
    }

    constructor(
        public name: string,
        public isExported: boolean,
        public start?: number,
        public end?: number
    ) { }

    /**
     * Calculates the document range of the node in the given document.
     * 
     * @param {TextDocument} document
     * @returns {Range}
     * 
     * @memberOf ClassDeclaration
     */
    public getRange(document: TextDocument): Range {
        return nodeRange(document, this.start, this.end);
    }

    /**
     * Generates typescript code out of the actual import.
     * 
     * @returns {string}
     * 
     * @memberOf ClassDeclaration
     */
    public generateTypescript(): string {
        throw new NotImplementedYetError();
    }
}
