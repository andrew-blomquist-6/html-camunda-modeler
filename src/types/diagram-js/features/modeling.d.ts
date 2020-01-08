// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/features/modeling' {
  export default class ModelingModule {
    // tslint:disable-next-line:variable-name
    __depends__: any[];
    // tslint:disable-next-line:variable-name
    __init__: any[];
    modeling: any[];
    layouter: any[];
  }
}

declare module 'diagram-js/lib/features/modeling/Modeling.js' {
  import EventBus from 'diagram-js/lib/core/EventBus.js';
  import ElementFactory from 'diagram-js/lib/core/ElementFactory.js';
  import CommandStack from 'diagram-js/lib/command/CommandStack.js';
  import CommandHandler from 'diagram-js/lib/command/CommandHandler.js';
  import {Base, Connection, Root, Shape} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';
  import {AlignElementsAlignment} from 'diagram-js/lib/features/modeling/cmd/AlignElementsHandler.js';
  import {CreateConnectionHints} from 'diagram-js/lib/features/modeling/cmd/CreateConnectionHandler.js';
  import {Label} from 'bpmn-moddle';

  export type ElementDef = Connection | Shape;

  export default class Modeling {
    constructor(eventBus: EventBus, elementFactory: ElementFactory, commandStack: CommandStack);

    /**
     * returns a list of command names and their handlers (each handler is defined in modeling/cmd)
     */
    getHandlers(): { [key: string]: CommandHandler };

    /**
     * registers all the command handlers defined by modeling with the command stack
     *
     * @param commandStack
     */
    registerHandlers(commandStack: CommandStack);

    /** TODO: see if you can't type these params better - uses the MoveShapeHandler (yet to be typed)
     * @param shape
     * @param delta
     * @param newParent
     * @param newParentIndex
     * @param hints
     */
    moveShape(shape: Shape, delta: any, newParent: any, newParentIndex?: number, hints?: any);

    /**
     * Update the attachment of the given shape.
     * @param shape
     * @param newHost
     */
    updateAttachment(shape: Base, newHost: Base);

    /**
     * TODO: better type hints (it becomes part of the context for the elements.move command)
     * @param shapes
     * @param delta
     * @param target
     * @param hints
     */
    moveElements(shapes: ElementDef[], delta: Point, target: Base, hints?: any);

    /**
     * Hints is a dead parameter - it is not used by the handler
     * @param connection
     * @param delta
     * @param newParent
     * @param newParentIndex
     * @param hints
     */
    moveConnection(connection: Connection, delta: Point, newParent: Shape, newParentIndex?: number, hints?: any);

    /**
     * TODO: better type the params (they become part of the context for the connection.layout command)
     * @param connection
     * @param hints
     */
    layoutConnection(connection: any, hints?: any);

    /**
     * Create connection.
     *
     * @param source
     * @param target
     * @param parentIndex
     * @param connection
     * @param parent
     * @param hints
     */
    createConnection(source: Base, target: Base, parentIndex: number, connection: Connection, parent: Base, hints: CreateConnectionHints): Connection;
    createConnection(source: Base, target: Base, connection: Connection, parent: Base, hints: CreateConnectionHints): Connection;

    /**
     * Create a shape at the specified position.
     * TODO: better type hints (it becomes pare of the context for the shape.create command)
     *
     * @param shape
     * @param position
     * @param target
     * @param parentIndex
     * @param hints
     */
    createShape(shape: Shape | object, position: Point, target: Shape | Root, parentIndex?: number, hints?: object): Shape;

    // TODO: better type the arguments (they become part of the context for the elements.create command)
    createElements(elements: ElementDef | ElementDef[], position: any, parent: any, parentIndex?: number, hints?: object): any[];

    // TODO: can we type the return better?
    createLabel(labelTarget: ElementDef, position: Point, label: Label, parent: ElementDef): any;

    /**
     * Append shape to given source, drawing a connection between source and the newly created shape.
     * TODO: hints is not used by the AppendShapeHandler - is it deprecated?
     *
     * @param source
     * @param shape
     * @param position
     * @param target
     * @param hints
     */
    appendShape(source: Shape, shape: Shape | object, position: Point, target: Shape, hints: object): Shape;

    // TODO: better type elements
    removeElements(elements: any);

    // TODO: better type arguments
    distributeElements(groups: any, axis: any, dimension: string);

    // TODO: better type arguments
    removeShape(shape: any, hints?: any);

    // TODO: better type arguments
    removeConnection(connection: any, hints?: any);

    // TODO: better type arguments
    replaceShape(oldShape: any, newShape: any, hints?: any);

    alignElements(elements: ElementDef[], alignment: AlignElementsAlignment);

    // TODO: better type arguments
    resizeShape(shape: any, newBounds: any, minBounds: any, hints: any);

    // TODO: better type arguments
    createSpace(movingShapes: any, resizingShapes: any, delta: any, direction: any);

    // TODO: better type arguments
    updateWaypoints(connection: any, newWaypoints: any, hints?: any);

    // TODO: better type arguments
    reconnect(connection: any, source: any, target: any, dockingOrPoints: any, hints?: any);

    // TODO: better type arguments
    reconnectStart(connection: any, newSource: any, dockingOrPoints: any, hints?: any);

    // TODO: better type arguments
    reconnectEnd(connection: any, newTarget: any, dockingOrPoints: any, hints?: any);

    // TODO: better type arguments
    connect(source: any, target: any, attrs: any, hints: any);
    connect(source: any, target: any, hints: any);

    // TODO: better type arguments
    toggleCollapse(shape: any, hints?: any);
  }
}

// ----------------------------------------------
// -------------- Event Handlers ----------------
// ----------------------------------------------
/**
 * All of the handlers in modeling/cmd/ should (in theory) extend CommandHandler, but do not.
 * While the code follows the CommandHandler pattern, it differs enough on things like return value for that relationship to be incorrect.
 * In addition, the code does not explicitly use the inherits javascript function.
 *
 * TODO: the context objects in these handlers appear to be the same object -
 *  while a pre vs post will expect different things in the context, handlers are manipulating context objects to "prepare" them for future
 *  function calls. We should come back and reconsider our strictly separated context interfaces.
 */

declare module 'diagram-js/lib/features/modeling/cmd/AlignElementsHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import Canvas from 'diagram-js/lib/core/Canvas.js';
  import {Base} from 'diagram-js/lib/model';

  export interface AlignElementsAlignment {
    left?: number;
    right?: number;
    center?: number;
    top?: number;
    bottom?: number;
    middle?: number;
  }

  interface PreExecuteContext {
    elements: Base[];
    alignment: AlignElementsAlignment;
  }

  export default class AlignElements {
    constructor(modeling: Modeling, canvas: Canvas);
    preExecute(context: PreExecuteContext);
    postExecute(context: any);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/AppendShapeHandler.js' {
  import Modeling, {ElementDef} from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Point} from 'diagram-js/lib/util/Geometry.js';
  import {Connection} from 'diagram-js/lib/model';

  interface PreExecuteContext {
    source: ElementDef;
    target?: ElementDef;
    parent: ElementDef;
    shape: ElementDef;
    position: Point;
  }

  interface PostExecuteContext {
    connectionParent?: ElementDef;
    shape: ElementDef;
    source: ElementDef;
    connection: Connection;
    parent: ElementDef;
  }

  export default class AppendShapeHandler {
    constructor(modeling: Modeling);

    preExecute(context: PreExecuteContext);
    postExecute(context: PostExecuteContext);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/CreateConnectionHandler.js' {
  import Canvas from 'diagram-js/lib/core/Canvas.js';
  import BaseLayouter, {LayoutConnectionHints} from 'diagram-js/lib/layout/BaseLayouter.js';
  import {Base, Connection} from 'diagram-js/lib/model';

  export type CreateConnectionHints = LayoutConnectionHints;

  interface ExecuteContext {
    connection: Connection;
    source: Base;
    target: Base;
    parent: Base;
    parentIndex: number;
    hints: CreateConnectionHints;
  }

  interface RevertContext {
    connection: Connection;
  }

  export default class CreateConnectionHandler {
    constructor(canvas: Canvas, layouter: BaseLayouter);

    execute(context: ExecuteContext): Connection;
    revert(context: RevertContext): Connection;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/CreateElementsHandler.js' {
  import Modeling, {ElementDef} from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Base} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';
  import {CreateConnectionHints} from 'diagram-js/lib/features/modeling/cmd/CreateConnectionHandler.js';

  // TODO: hints can also be CreateShapeHints, but we haven't typed out that handler yet
  export type CreateElementsPreExecuteHints = CreateConnectionHints | object;

  interface PreExecuteContext {
    elements: ElementDef[];
    parent: Base;
    parentIndex: number;
    position: Point;
    hints: CreateElementsPreExecuteHints | object;
  }

  export default class CreateElementsHandler {
    constructor(modeling: Modeling);

    preExecute(context: PreExecuteContext);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/CreateLabelHandler.js' {
  import Canvas from 'diagram-js/lib/core/Canvas.js';
  import {ElementDef} from 'diagram-js/lib/features/modeling/Modeling.js';

  // TODO: these context interfaces should probably extend whatever contexts the shape creator needs
  interface ExecuteContext {
    shape: ElementDef;
    labelTarget: ElementDef;
  }

  interface RevertContext {
    shape: ElementDef;
  }

  /**
   * TODO: this should extend create shape handler
   */
  export default class CreateLabelHandler {
    constructor(canvas: Canvas);

    execute(context: ExecuteContext);
    revert(context: RevertContext);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/CreateShapeHandler.js' {
  import Canvas from 'diagram-js/lib/core/Canvas.js';
  import {Base, Shape} from 'diagram-js/lib/model';
  import {Bounds} from 'diagram-js/lib/layout/LayoutUtil.js';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface ExecuteContext {
    shape: Shape;
    position: Bounds | Point;
    parent: Base;
    parentIndex: number;
  }

  interface RevertContext {
    shape: Shape;
  }

  export default class CreateShapeHandler {
    constructor(canvas: Canvas);

    execute(context: ExecuteContext): Shape;
    revert(context: RevertContext): Shape;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/DeleteConnectionHandler.js' {
  import Canvas from 'diagram-js/lib/core/Canvas.js';
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Connection} from 'diagram-js/lib/model';
  import {Shape} from 'bpmn-moddle';

  interface ExecuteContext {
    connection: Connection;
  }

  interface RevertContext {
    connection: Connection;
    parent: Shape;
    parentIndex: number;
    source: Shape;
    target: Shape;
  }

  export default class DeleteConnectionHandler {
    constructor(canvas: Canvas, modeling: Modeling);

    execute(context: ExecuteContext): Connection;
    revert(context: RevertContext): Connection;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/DeleteElementsHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Base} from 'diagram-js/lib/model';
  import ElementRegistry from 'diagram-js/lib/core/ElementRegistry.js';

  interface PostExecuteContext {
    elements: Base[];
  }

  export default class DeleteElementsHandler {
    constructor(modeling: Modeling, elementRegistry: ElementRegistry);

    postExecute(context: PostExecuteContext);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/DeleteShapeHandler.js' {
  import Canvas from 'diagram-js/lib/core/Canvas.js';
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Shape} from 'diagram-js/lib/model';

  interface PreExecuteContext {
    shape: Shape;
  }

  interface ExecuteContext {
    shape: Shape;
    parent: Shape;
  }

  interface RevertContext {
    shape: Shape;
    oldParent: Shape;
    oldParentIndex: number;
  }

  export default class DeleteShapeHandler {
    constructor(canvas: Canvas, modeling: Modeling);

    /**
     * - Remove connections
     * - Remove all direct children
     */
    preExecute(context: PreExecuteContext);
    /**
     * Remove shape and remember the parent
     */
    execute(context: ExecuteContext): Shape;
    revert(context: RevertContext): Shape;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/DistributeElementsHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';

  // TODO: find out who uses Modeling.DistributeElements and type this better
  interface PreExecuteContext {
    groups: any;
    axis: any;
    dimension: string;
  }

  export default class DistributeElements {
    constructor(modeling: Modeling);

    preExecute(context: PreExecuteContext);
    postExecute(context: any);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/LayoutConnectionHandler.js' {
  import BaseLayouter from 'diagram-js/lib/layout/BaseLayouter.js';
  import Canvas from 'diagram-js/lib/core/Canvas.js';
  import {Connection} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface ExecuteContext {
    connection: Connection;
  }

  interface RevertContext {
    connection: Connection;
    oldWaypoints: Point[];
  }

  export default class LayoutConnectionHandler {
    constructor(layouter: BaseLayouter, canvas: Canvas);

    execute(context: ExecuteContext): Connection;
    revert(context: RevertContext): Connection;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/MoveConnectionHandler.js' {
  import {Shape, Connection} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface ExecuteContext {
    connection: Connection;
    delta: Point;
    newParent?: Shape;
    parent: Shape;
    newParentIndex: number;
  }

  interface RevertContext {
    connection: Connection;
    parent: Shape;
    oldParent: Shape;
    oldParentIndex: number;
    delta: Point;
  }

  /**
   * A handler that implements reversible moving of connections.
   *
   * The handler differs from the layout connection handler in a sense
   * that it preserves the connection layout.
   */
  export default class MoveConnectionHandler {
    execute(context: ExecuteContext): Connection;
    revert(context: RevertContext): Connection;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/MoveElementsHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Point} from 'diagram-js/lib/util/Geometry.js';
  import {Base} from 'diagram-js/lib/model';

  interface PreExecuteContext {
    shapes: Base[];
  }

  interface PostExecuteContext {
    hints: {
      primaryShape: any;
      oldParent: any;
    };
    closure: object;
    delta: Point;
    newParent: Base;
    newHost: Base;
  }

  export default class MoveElementsHandler {
    constructor(modeling: Modeling);

    preExecute(context: PreExecuteContext);
    postExecute(context: PostExecuteContext);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/MoveShapeHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Shape} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface ExecuteContext {
    shape: Shape;
    delta: Point;
    newParent?: Shape;
    newParentIndex?: number;
  }

  interface PostExecuteContext {
    shape: Shape;
    delta: Point;
    hints: any;
  }

  interface RevertContext {
    shape: Shape;
    oldParent: Shape;
    oldParentIndex: number;
    delta: Point;
  }

  interface MoveChildrenContext {
    delta: Point;
    shape: Shape;
  }

  interface GetNewParentContext {
    newParent?: Shape;
    shape: Shape;
  }

  export default class MoveShapeHandler {
    constructor(modeling: Modeling);

    execute(context: ExecuteContext): Shape;
    postExecute(context: PostExecuteContext);
    revert(context: RevertContext): Shape;
    moveChildren(context: MoveChildrenContext);
    getNewParent(context: GetNewParentContext);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/NoopHandler.js' {
  export default class NoopHandler {
    execute();
    revert();
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/ReconnectConnectionHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Connection} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface ExecuteContext {
    newSource: any;
    newTarget: any;
    connection: Connection;
    dockingOrPoints: any;
  }

  interface PostExecuteContext {
    connection: Connection;
    newSource: any;
    newTarget: any;
    dockingOrPoints: any;
    hints?: object;
  }

  interface RevertContext {
    oldSource: any;
    oldTarget: any;
    oldWaypoints: Point[];
    connection: Connection;
  }

  export default class ReconnectConnectionHandler {
    constructor(modeling: Modeling);

    execute(context: ExecuteContext): Connection;
    postExecute(context: PostExecuteContext);
    revert(context: RevertContext): Connection;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/ReplaceShapeHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Connection, Shape} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface PreExecuteContext {
    oldShape: Shape;
    newData: {
      type: string;
      x: number;
      y: number;
    };
    hints: any;
  }

  interface PostExecuteContext {
    oldShape: Shape;
    newShape: Shape;
    hints: any;
  }

  export default class ReplaceShapeHandler {
    constructor(modeling: Modeling, rules: any);

    preExecute(context: PreExecuteContext);
    execute(context: any);
    postExecute(context: PostExecuteContext);
    revert(context: any);
    createShape(shape: Shape, position: any, target: any, hints: any);
    reconnectStart(connection: Connection, newSource: any, dockingPoint: Point, hints: any);
    reconnectEnd(connection: Connection, newTarget: any, dockingPoint: Point, hints: any);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/ResizeShapeHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Shape} from 'diagram-js/lib/model';
  import {Bounds} from 'diagram-js/lib/layout/LayoutUtil.js';

  interface ExecuteContext {
    shape: Shape;
    newBounds: Bounds;
    minBounds: Bounds;
  }

  interface PostExecuteContext {
    shape: Shape;
    oldBounds: Bounds;
  }

  interface RevertContext {
    shape: Shape;
    oldBounds: Bounds;
  }

  export default class ResizeShapeHandler {
    constructor(modeling: Modeling);

    execute(context: ExecuteContext): Shape;
    postExecute(context: PostExecuteContext);
    revert(context: RevertContext): Shape;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/SpaceToolHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface PreExecuteContext {
    resizingShapes: any;
    delta: Point;
    direction: any;
  }

  interface PostExecuteContext {
    movingShapes: any;
    delta: Point;
  }

  export default class SpaceToolHandler {
    constructor(modeling: Modeling);

    preExecute(context: PreExecuteContext);
    execute(context: any);
    postExecute(context: PostExecuteContext);
    revert(context: any);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/ToggleShapeCollapseHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Shape} from 'diagram-js/lib/model';

  interface ExecuteContext {
    shape: Shape;
  }

  interface RevertContext {
    shape: Shape;
    oldChildrenVisibility: any;
  }

  export default class ToggleShapeCollapseHandler {
    constructor(modeling: Modeling);

    execute(context: ExecuteContext);
    revert(context: RevertContext);
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/UpdateAttachmentHandler.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Shape} from 'diagram-js/lib/model';

  interface ExecuteContext {
    shape: Shape;
    newHost: any;
  }

  interface RevertContext {
    shape: Shape;
    newHost: any;
    oldHost: any;
    attacherIdx: any;
  }

  export default class UpdateAttachmentHandler {
    constructor(modeling: Modeling);

    execute(context: ExecuteContext): Shape;
    revert(context: RevertContext): Shape;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/UpdateWaypointsHandler.js' {
  import {Connection} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  interface ExecuteContext {
    connection: Connection;
    newWaypoints: Point[];
  }

  interface RevertContext {
    connection: Connection;
    oldWaypoints: Point[];
  }

  export default class UpdateWaypointsHandler {
    execute(context: ExecuteContext): Connection;
    revert(context: RevertContext): Connection;
  }
}

// ----------------------------------------------
// ------------------ Helpers -------------------
// ----------------------------------------------
declare module 'diagram-js/lib/features/modeling/cmd/helper/AnchorsHelper.js' {
  import {Connection, Shape} from 'diagram-js/lib/model';
  import {Bounds} from 'diagram-js/lib/layout/LayoutUtil.js';
  import {Point} from 'diagram-js/lib/util/Geometry.js';

  // TODO: set return types once util/AttachUtil is typed
  export function getResizedSourceAnchor(connection: Connection, shape: Shape, oldBounds: Bounds): any;
  export function getResizedTargetAnchor(connection: Connection, shape: Shape, oldBounds: Bounds): any;
  export function getMovedSourceAnchor(connection: Connection, source: Shape, moveDelta: Point): any;
  export function getMovedTargetAnchor(connection: Connection, source: Shape, moveDelta: Point): any;
}

declare module 'diagram-js/lib/features/modeling/cmd/helper/MoveClosure.js' {
  export default class MoveClosure {
    allShapes: object;
    allConnections: object;
    enclosedElements: object;
    enclosedConnections: object;
    topLevel: object;

    add(element: any, isTopLevel: boolean): MoveClosure;
    addAll(elements: any[], isTopLevel: boolean): MoveClosure;
  }
}

declare module 'diagram-js/lib/features/modeling/cmd/helper/MoveHelper.js' {
  import Modeling from 'diagram-js/lib/features/modeling/Modeling.js';
  import {Base} from 'diagram-js/lib/model';
  import {Point} from 'diagram-js/lib/util/Geometry.js';
  import MoveClosure from 'diagram-js/lib/features/modeling/cmd/helper/MoveClosure.js';

  export default class MoveHelper {
    constructor(modeling: Modeling);

    /**
     * Move the specified elements and all children by the given delta.
     *
     * This moves all enclosed connections, too and layouts all affected
     * external connections.
     *
     * @param  elements
     * @param  delta
     * @param  newParent applied to the first level of shapes
     *
     * @return list of touched elements
     */
    moveRecursive(elements: Base[], delta: Point, newParent: Base): Base[];

    /**
     * Move the given closure of elmements.
     *
     * @param closure
     * @param delta
     * @param newParent
     * @param newHost
     * @param primaryShape
     */
    moveClosure(closure: MoveClosure, delta: Point, newParent: Base, newHost: Base, primaryShape?: Base);

    /**
     * Returns the closure for the selected elements
     *
     * @param elements
     */
    getClosure(elements: Base[]): MoveClosure;
  }
}
