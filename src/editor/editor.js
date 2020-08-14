// Import mxgraph functions
const mxnSpace = require("mxgraph")()

export default class Editor {

  constructor(containerSelector) {
    this.initialized = false;
    this.containerSelector = containerSelector;
  }


  init() {

    // Resolve container element
    this.container = (typeof this.containerSelector === 'string') ? document.querySelector(this.containerSelector) : this.containerSelector;

    if(!this.container)
    {
      throw new Error(`Unable to find container element ${this.containerSelector}`)
    }

    // Start editor configuration
    this.graph = new mxnSpace.mxGraph(this.container);

    // Disables the built-in context menu
    // mxnSpace.mxEvent.disableContextMenu(this.container);
    // mxnSpace.mxVertexHandler.prototype.rotationEnabled = true;

    this.graph.gridSize = 30;

    // Uncomment the following if you want the container
    // to fit the size of the graph
    // graph.setResizeContainer(true);

    // Enables panning with left mouse button
    // graph.panningHandler.useLeftButtonForPanning = true;
    // graph.panningHandler.ignoreCell = true;
    // graph.container.style.cursor = 'move';
    // this.graph.setPanning(true);

    // Uncomment the following if you want the container
    // to fit the size of the graph
    // graph.setResizeContainer(true);

    // this.graph.collapsedImage = '';
    // this.graph.expandedImage = '';

    // Enables rubberband selection
    // mxnSpace.mxRubberband.prototype.defaultOpacity = 100;
    const rubberBand = new mxnSpace.mxRubberband(this.graph);
    window.rb = rubberBand;
    console.log(rubberBand);

    // Configure Zoom
    this.graph.keepSelectionVisibleOnZoom = true;
    this.graph.centerZoom = true;
    
    this.initialized = true;
  }


  addDemoWidgets() {
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
