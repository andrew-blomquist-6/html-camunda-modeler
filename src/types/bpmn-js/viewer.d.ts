
declare module 'bpmn-js/lib/Viewer' {
  import { Module } from 'didi';
  import { default as Diagram, DiagramOptions } from 'diagram-js';
  import {EventBus} from 'diagram-js/lib/core';

  export interface ViewerOptions extends DiagramOptions {
    container: any;
    canvas?: any;
    width?: string | number;
    height?: string | number;
    position?: string;
    moddleExtensions?: any;
    additionalModules?: Module[];
  }

  export type ErrorHandler = (err: Error, warnings?: any[]) => void;
  export type SaveHandler = (err: Error, xml: string) => void;

  // TODO: inherits from Diagram (from diagram-js)
  export default class Viewer extends Diagram {
    // tslint:disable-next-line:variable-name
    _modules: Module[];
    // tslint:disable-next-line:variable-name
    _moddleExtensions: any;


    /**
     * Register an event listener
     *
     * Remove a previously added listener via {@link #off(event, callback)}.
     */
    on: EventBus['on'];
    off: EventBus['off'];

    /**
     * @param [options] configuration options to pass to the viewer
     * @param [options.container] the container to render the viewer in, defaults to body.
     * @param [options.width] the width of the viewer - defaults to '100%'
     * @param [options.height] the height of the viewer - defaults to '100%'
     * @param [options.position] the position of the viewer - defaults to 'relative'
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

    getDefinitions(): any;
    getModules(): Module[];

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
     * Attach the viewer to a DOM element
     *
     * @param [parentNode] can be a string (for selecting via JQuery) or a DOM Element
     */
    attachTo(parentNode: HTMLElement | string);

    /**
     * removes the viewer from the DOM
     */
    detach();
  }
}
