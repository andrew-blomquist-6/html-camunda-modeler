
declare module 'bpmn-js/lib/Viewer' {
  import { Module } from 'didi';

  export interface ViewerOptions {
    container: any;
    width?: string | number;
    height?: string | number;
    moddleExtensions?: any;
    modules?: Module[];
    additionalModules?: Module[];
  }

  export type ErrorHandler = (err: Error, warnings?: any[]) => void;
  export type SaveHandler = (err: Error, xml: string) => void;

  export default class Viewer {
    // tslint:disable-next-line:variable-name
    _modules: any[];
    // tslint:disable-next-line:variable-name
    _moddleExtensions: any;

    /**
     * @param [options] configuration options to pass to the viewer
     * @param [options.container] the container to render the viewer in, defaults to body.
     * @param [options.width] the width of the viewer
     * @param [options.height] the height of the viewer
     * @param [options.moddleExtensions] extension packages to provide
     * @param [options.modules] a list of modules to override the default modules
     * @param [options.additionalModules] a list of modules to use with the default modules
     */
    constructor(options?: ViewerOptions);

    /**
     * Parse and render a BPMN 2.0 diagram.
     *
     * Once finished the viewer reports back the result to the
     * provided callback function with (err, warnings).
     *
     * ## Life-Cycle Events
     *
     * During import the viewer will fire life-cycle events:
     *
     *   * import.parse.start (about to read model from xml)
     *   * import.parse.complete (model read; may have worked or not)
     *   * import.render.start (graphical import start)
     *   * import.render.complete (graphical import finished)
     *   * import.done (everything done)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param xml the BPMN 2.0 xml
     * @param [bpmnDiagram] BPMN diagram or id of diagram to render (if not provided, the first one will be rendered)
     * @param [done] invoked with (err, warnings=[])
     */
    // TODO: define ModdleElement<BPMNDiagram|String>
    importXML(xml: string, bpmnDiagram: any, done: ErrorHandler);
    importXML(xml: string, done?: ErrorHandler);

    /**
     * Import parsed definitions and render a BPMN 2.0 diagram.
     *
     * Once finished the viewer reports back the result to the
     * provided callback function with (err, warnings).
     *
     * ## Life-Cycle Events
     *
     * During import the viewer will fire life-cycle events:
     *
     *   * import.render.start (graphical import start)
     *   * import.render.complete (graphical import finished)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param definitions parsed BPMN 2.0 definitions
     * @param [bpmnDiagram] BPMN diagram or id of diagram to render (if not provided, the first one will be rendered)
     * @param [done] invoked with (err, warnings=[])
     */
    // TODO: define ModdleElement<Definitions> and ModdleElement<BPMNDiagram|String>
    importDefinitions(definitions: any, bpmnDiagram: any, done: ErrorHandler);
    importDefinitions(definitions: any, done?: ErrorHandler);

    /**
     * Open diagram of previously imported XML.
     *
     * Once finished the viewer reports back the result to the
     * provided callback function with (err, warnings).
     *
     * ## Life-Cycle Events
     *
     * During switch the viewer will fire life-cycle events:
     *
     *   * import.render.start (graphical import start)
     *   * import.render.complete (graphical import finished)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param [bpmnDiagramOrId] id or the diagram to open
     * @param [done] invoked with (err, warnings=[])
     */
    // TODO: define ModdleElement<BPMNDiagram>
    open(bpmnDiagramOrId: any | string, done?: ErrorHandler);
    // the code technically lets you do this, but bpmn-js will just try to call done passing along an error
    open(done?: ErrorHandler);

    /**
     * Export the currently displayed BPMN 2.0 diagram as
     * a BPMN 2.0 XML document.
     *
     * ## Life-Cycle Events
     *
     * During XML saving the viewer will fire life-cycle events:
     *
     *   * saveXML.start (before serialization)
     *   * saveXML.serialized (after xml generation)
     *   * saveXML.done (everything done)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param [options] export options
     * @param [options.format=false] output formatted XML
     * @param [options.preamble=true] output preamble
     * @param [done] invoked with (err, xml)
     */
    saveXML(options: { format?: boolean, preamble?: boolean }, done: SaveHandler);
    saveXML(done: SaveHandler);

    /**
     * Export the currently displayed BPMN 2.0 diagram as
     * an SVG image.
     *
     * ## Life-Cycle Events
     *
     * During SVG saving the viewer will fire life-cycle events:
     *
     *   * saveSVG.start (before serialization)
     *   * saveSVG.done (everything done)
     *
     * You can use these events to hook into the life-cycle.
     *
     * @param [options] this is not actually used...
     * @param [done] invoked with (err, svgStr)
     */
    saveSVG(options: any, done: SaveHandler);
    saveSVG(done: SaveHandler);

    /**
     * Get a named diagram service.
     *
     * @example
     *
     * var elementRegistry = viewer.get('elementRegistry');
     * var startEventShape = elementRegistry.get('StartEvent_1');
     *
     * @return diagram service instance
     *
     * @method Viewer#get
     */
    get(name: string): any;

    /**
     * Invoke a function in the context of this viewer.
     *
     * @example
     *
     * viewer.invoke(function(elementRegistry) {
     *   var startEventShape = elementRegistry.get('StartEvent_1');
     * });
     *
     * @param [fn] function to be invoked
     *
     * @return the functions return value
     *
     * @method Viewer#invoke
     */
    invoke(fn: (elementRegistry?: any) => any): any;

    _setDefinitions(definitions: any);
    getDefinitions(): any;
    getModules(): any;

    /**
     * Remove all drawn elements from the viewer.
     *
     * After calling this method the viewer can still
     * be reused for opening another diagram.
     *
     * @method Viewer#clear
     */
    clear();

    /**
     * Destroy the viewer instance and remove all its
     * remainders from the document tree.
     */
    destroy();

    /**
     * Register an event listener
     *
     * Remove a previously added listener via {@link #off(event, callback)}.
     */
    on(event: string, priority: number, callback: () => any, target: any);

    /**
     * De-register an event listener
     */
    off(event: string, callback: () => any);

    /**
     * Attach the viewer to a DOM element
     *
     * @param [parentNode] can be a string (for selecting via JQuery) or a DOM Element
     */
    attachTo(parentNode: any | string);

    /**
     * removes the viewer from the DOM
     */
    detach();

    _init(container: any, moddle: any, options: any);

    /**
     * Emit an event on the underlying {@link EventBus}
     *
     * @return event processing result (if any)
     */
    _emit(type: string, event: any): any;

    _createContainer(options: { width: any, height: any, position: any }): HTMLElement;
    _createModdle(options: { moddleExtensions: any }): any;
  }
}
