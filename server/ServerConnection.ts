import { Observable, Subject } from 'rxjs';
import { ExtensionConfig } from 'typescript-hero-common';
import { GenericRequestHandler } from 'vscode-jsonrpc';
import { DidChangeWatchedFilesParams, IConnection } from 'vscode-languageserver';

/**
 * TODO
 * 
 * @export
 * @class ServerConnection
 */
export class ServerConnection {
    private handler: { [id: string]: Subject<any> } = {};

    constructor(private endpoint: IConnection) { }

    /**
     * TODO
     * 
     * @template T
     * @param {string} method
     * @param {*} params
     * @returns {Thenable<T>}
     * 
     * @memberOf ClientConnection
     */
    public sendRequest<T>(method: string, params: any): Thenable<T> {
        return this.endpoint.sendRequest(method, params);
    }

    /**
     * TODO
     * 
     * @param {string} method
     * @param {...any[]} args
     * 
     * @memberOf ServerConnection
     */
    public sendNotification(method: string, ...args: any[]): void {
        this.endpoint.sendNotification(method, ...args);
    }

    /**
     * TODO
     * 
     * @returns {Observable<void>}
     * 
     * @memberOf ServerConnection
     */
    public onInitialized(): Observable<void> {
        if (!this.handler['initialized']) {
            this.handler['initialized'] = new Subject<void>();
            this.endpoint.onInitialized(() => this.handler['initialized'].next());
        }
        return this.handler['initialized'];
    }

    /**
     * TODO
     * 
     * @template T
     * @param {string} method
     * @returns {Observable<T>}
     * 
     * @memberOf ServerConnection
     */
    public onNotification<T>(method: string): Observable<T> {
        if (!this.handler[method]) {
            this.handler[method] = new Subject<T>();
            this.endpoint.onNotification(method, param => this.handler[method].next(param));
        }
        return this.handler[method];
    }

    /**
     * TODO
     * 
     * @template TResult
     * @template TError
     * @param {string} method
     * @param {GenericRequestHandler<TResult, TError>} handler
     * 
     * @memberOf ServerConnection
     */
    public onRequest<TResult, TError>(
        method: string,
        handler: GenericRequestHandler<TResult, TError>
    ): void {
        this.endpoint.onRequest(method, handler);
    }

    /**
     * TODO
     * 
     * @returns {Observable<DidChangeConfigurationParams>}
     * 
     * @memberOf ServerConnection
     */
    public onDidChangeConfiguration(): Observable<ExtensionConfig> {
        if (!this.handler['onDidChangeConfiguration']) {
            this.handler['onDidChangeConfiguration'] = new Subject<ExtensionConfig>();
            this.endpoint.onDidChangeConfiguration(
                changed => this.handler['onDidChangeConfiguration'].next(changed.settings.typescriptHero)
            );
        }
        return this.handler['onDidChangeConfiguration'];
    }

    /**
     * TODO
     * 
     * @returns {Observable<DidChangeWatchedFilesParams>}
     * 
     * @memberOf ServerConnection
     */
    public onDidChangeWatchedFiles(): Observable<DidChangeWatchedFilesParams> {
        if (!this.handler['workspace/didChangeWatchedFiles']) {
            this.handler['workspace/didChangeWatchedFiles'] = new Subject<DidChangeWatchedFilesParams>();
            this.endpoint.onDidChangeWatchedFiles(
                params => this.handler['workspace/didChangeWatchedFiles'].next(params)
            );
        }
        return this.handler['workspace/didChangeWatchedFiles'];
    }
}
