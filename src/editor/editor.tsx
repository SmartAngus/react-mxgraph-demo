// Import mxgraph functions
const mxnSpace = require("mxgraph")()

class Editor {

  initialized: boolean;
  containerSelector: string|Element;
  mxnSpace: any;
  container?: Element|null;
  graph: any; // No TS support for mxgraph

  constructor(containerSelector: string|Element) {
    this.initialized = false;
    this.containerSelector = containerSelector;
    this.mxnSpace = mxnSpace;
  }

  init(): void {
    // Resolve container element
    this.container = (typeof this.containerSelector === 'string') ? document.querySelector(this.containerSelector) : this.containerSelector;

    if (!this.container) {
      throw new Error(`Unable to find container element ${this.containerSelector}`)
    }

    // Start editor configuration
    this.graph = new mxnSpace.mxGraph(this.container);
    this.graph.gridSize = 30;

    // Configure Zoom
    this.graph.keepSelectionVisibleOnZoom = true;
    this.graph.centerZoom = true;

    // Enables rubberband selection
    new mxnSpace.mxRubberband(this.graph);

    // Set state
    this.initialized = true;
  }


  addDemoWidgets(): void {
    const parent = this.graph.getDefaultParent();

    this.graph.getModel().beginUpdate();
    try {
      const v1 = this.graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30);
      const v2 = this.graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
      this.graph.insertEdge(parent, null, '', v1, v2);
    } finally {
      this.graph.getModel().endUpdate();
    }
  }

}


const editor = new Editor('.graph-content');

export default editor;