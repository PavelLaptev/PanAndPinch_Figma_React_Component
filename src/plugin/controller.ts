figma.showUI(__html__, { width: 500, height: 400 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-rectangles") {
    console.log();
  }
};
