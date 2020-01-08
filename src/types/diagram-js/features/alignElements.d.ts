// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/features/align-elements' {
  export default class AlignElementsModule {
    // tslint:disable-next-line:variable-name
    __init__: any[];
    alignElements: any[];
  }
}

declare module 'diagram-js/lib/features/align-elements/AlignElements.js' {
  type AlignmentType = 'left' | 'right' | 'center' | 'top' | 'bottom' | 'middle';

  export default class AlignElements {
    // TODO: update this once the modeling feature is typed
    constructor(modeling: any);

    // TODO: members of elements have the properties waypoints, host, and labelTarget -- this might be typed in the modeling feature
    /**
     * Executes the alignment of a selection of elements
     * @param elements
     * @param type
     */
    trigger(elements: any[], type: AlignmentType);
  }
}
