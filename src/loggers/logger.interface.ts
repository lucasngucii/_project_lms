export interface ILogger {
   setContext(context: string): void;
   log(message: any, context?: string): void;
   error(message: any, trace?: string, context?: string): void;
   warn(message: any, context?: string): void;
   debug(message: any, context?: string): void;
   verbose(message: any, context?: string): void;
}
