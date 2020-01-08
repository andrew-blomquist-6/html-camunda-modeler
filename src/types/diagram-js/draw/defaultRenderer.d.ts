// https://github.com/bpmn-io/diagram-js\

declare module 'diagram-js/lib/DefaultRenderer.js' {
  import EventBus from 'diagram-js/lib/core/EventBus.js';
  import Styles from 'diagram-js/lib/Styles.js';
  import BaseRenderer from 'diagram-js/lib/BaseRenderer.js';

  export default class DefaultRenderer extends BaseRenderer {
    constructor(eventBus: EventBus, styles: Styles);
  }
}
