declare module '*.svg' {
    const content: any;
    export default content;
}

declare namespace Express {
    export interface Request {
       platform: 'desktop' | 'touch';
    }
}
