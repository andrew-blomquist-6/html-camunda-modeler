// https://github.com/bpmn-io/diagram-js

declare module 'diagram-js/lib/core/EventBus.js' {
  export default class EventBus {
    constructor();

    /**
     * @param [events] either a single event name or list of event names to add the callback as a listener to
     * @param [callback] the function that will be called when any of the passed events are fired
     * @param [that] if set, the callback function will be bound to it
     */
    on(events: string | string[], callback: () => void, that?: any);
    on(events: string | string[], priority: number, callback: () => void, that?: any);

    once(event: string, callback: () => void, that: any);
    once(event: string, priority: number, callback: () => void, that: any);

    off(events: string | string[], callback: () => void);

    createEvent(data: any): InternalEvent;

    /**
     * @param [name] can either be the name of a registered event, or an event object TODO: can we type out an "event" object?
     * @param [additional] arguments to be passed to the callback functions watching the fired event
     */
    fire(name: string | { type: string }, ...additional: any): boolean;

    handleError(error: any): boolean;
  }

  export class InternalEvent {
    constructor();

    stopPropagation();
    preventDefault();
    init(data: any);
  }
}
