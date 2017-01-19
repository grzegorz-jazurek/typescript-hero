import { TsDeclaration } from '../';

/**
 * Type that defines information about a declaration.
 * Contains the declaration and the origin of the declaration.
 */
export type DeclarationInfo = { declaration: TsDeclaration, from: string };