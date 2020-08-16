// Import mxgraph functions
const mxnSpace = require("mxgraph")()

class Editor {

  initialized: boolean;
  containerSelector: string | Element;
  mxnSpace: any;
  container?: Element | null;
  graph: any; // No TS support for mxgraph

  constructor(containerSelector: string | Element) {
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

    // Resize container
    // this.graph.setResizeContainer(true);

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

  repaintGrid(canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D | null): void {
    var s = 0;
    var gs = 0;
    var tr = new mxnSpace.mxPoint();
    var w = 0;
    var h = 0;
    if (!ctx) {
      throw new Error("GRID REDRAW  - Unable to access context")
    }
    var bounds = this.graph.getGraphBounds();
    var width = Math.max(bounds.x + bounds.width, this.graph.container.clientWidth);
    var height = Math.max(bounds.y + bounds.height, this.graph.container.clientHeight);
    var sizeChanged = width !== w || height !== h;

    if (this.graph.view.scale !== s || this.graph.view.translate.x !== tr.x || this.graph.view.translate.y !== tr.y ||
      gs !== this.graph.gridSize || sizeChanged) {
      tr = this.graph.view.translate.clone();
      s = this.graph.view.scale;
      gs = this.graph.gridSize;
      w = width;
      h = height;

      // Clears the background if required
      if (!sizeChanged) {
        ctx.clearRect(0, 0, w, h);
      }
      else {
        canvas.setAttribute('width', String(w));
        canvas.setAttribute('height', String(h));
      }

      var tx = tr.x * s;
      var ty = tr.y * s;

      // Sets the distance of the grid lines in pixels
      var minStepping = this.graph.gridSize;
      var stepping = minStepping * s;

      if (stepping < minStepping) {
        var count = Math.round(Math.ceil(minStepping / stepping) / 2) * 2;
        stepping = count * stepping;
      }

      var xs = Math.floor((0 - tx) / stepping) * stepping + tx;
      var xe = Math.ceil(w / stepping) * stepping;
      var ys = Math.floor((0 - ty) / stepping) * stepping + ty;
      var ye = Math.ceil(h / stepping) * stepping;

      xe += Math.ceil(stepping);
      ye += Math.ceil(stepping);

      var ixs = Math.round(xs);
      var ixe = Math.round(xe);
      var iys = Math.round(ys);
      var iye = Math.round(ye);

      // Draws the actual grid
      ctx.strokeStyle = '#f6f6f6';
      ctx.beginPath();

      for (var x = xs; x <= xe; x += stepping) {
        x = Math.round((x - tx) / stepping) * stepping + tx;
        var ix = Math.round(x);

        ctx.moveTo(ix + 0.5, iys + 0.5);
        ctx.lineTo(ix + 0.5, iye + 0.5);
      }

      for (var y = ys; y <= ye; y += stepping) {
        y = Math.round((y - ty) / stepping) * stepping + ty;
        var iy = Math.round(y);

        ctx.moveTo(ixs + 0.5, iy + 0.5);
        ctx.lineTo(ixe + 0.5, iy + 0.5);
      }

      ctx.closePath();
      ctx.stroke();
    }
  }

  addGrid(): void {

    try {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.zIndex = '-1';
      this.graph.container.prepend(canvas);

      const ctx = canvas.getContext('2d');

      // Modify event filtering to accept canvas as container
      var mxGraphViewIsContainerEvent = mxnSpace.mxGraphView.prototype.isContainerEvent;
      mxnSpace.mxGraphView.prototype.isContainerEvent = function (evt: any) {
        return mxGraphViewIsContainerEvent.apply(this, arguments) ||
          mxnSpace.mxEvent.getSource(evt) === canvas;
      };

      var mxGraphViewValidateBackground = mxnSpace.mxGraphView.prototype.validateBackground;
      const editorInstance = this;
      mxnSpace.mxGraphView.prototype.validateBackground = function () {
        mxGraphViewValidateBackground.apply(this, arguments);
        editorInstance.repaintGrid(canvas, ctx);
      };


    }
    catch (e) {
      mxnSpace.mxLog.show();
      mxnSpace.mxLog.debug('Using background image');

      // mxnSp.container.style.backgroundImage = 'url(\'editors/images/grid.gif\')';
    }


  }

  removeGrid(): void {
    // @TODO Implement
  }


  fit(): void {
    this.graph.fit()
  }

}


const editor = new Editor('.graph-content');

export default editor;