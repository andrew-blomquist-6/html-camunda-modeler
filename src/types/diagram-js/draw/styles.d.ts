// https://github.com/bpmn-io/diagram-js\

declare module 'diagram-js/lib/Styles.js' {
  export default class Styles {
    cls(className: string, traits: string[], additionalAttrs: any): any;
    style(traits: string[], additionalAttrs: any): any;
    // tslint:disable-next-line:unified-signatures
    computeStyle(custom: any, traits: any, defaultStyles: any): any;
    computeStyle(custom: any, defaultStyles: any): any;
  }
}
