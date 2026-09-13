// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("fluence");
db.user_datas.updateOne({"username" : "Kunal"}, {$set : {["projects.45"] : {
    "id": 45,
    "name": "builder_presentation",
    "created_by": "Kunal",
    "project_state": {
      "elements_count": 8,
      "names_count": 8,
      "element0": {
        "tagName": "BODY",
        "style": {
          "backgroundColor": "#0f111a",
          "color": "#ffffff",
          "fontFamily": "sans-serif",
          "margin": "0",
          "overflow": "hidden",
          "width": "100vw",
          "height": "100vh",
          "display": "flex",
          "flexDirection": "column"
        },
        "attribute": {},
        "javascript": {},
        "parent": "",
        "children": {
          "element1": "element1",
          "element5": "element5"
        },
        "DOM": {}
      },
      "element1": {
        "tagName": "SECTION",
        "style": {
          "display": "flex",
          "flexDirection": "column",
          "justifyContent": "center",
          "padding": "4rem",
          "width": "100%",
          "height": "100%",
          "position": "absolute"
        },
        "attribute": {
          "className": "slide active"
        },
        "javascript": {},
        "parent": "element0",
        "children": {
          "element2": "element2",
          "element3": "element3",
          "element4": "element4"
        },
        "DOM": {}
      },
      "element2": {
        "tagName": "H1",
        "style": {
          "color": "#2f81f7",
          "fontSize": "3.5rem",
          "marginBottom": "1rem"
        },
        "attribute": {
          "innerText": "Next-Gen Web Builder Platform"
        },
        "javascript": {},
        "parent": "element1",
        "children": {},
        "DOM": {}
      },
      "element3": {
        "tagName": "P",
        "style": {
          "color": "#8b949e",
          "fontSize": "1.5rem"
        },
        "attribute": {
          "innerText": "Deploy and monetize with fluent animations. Tech Stack: HTML, CSS, JavaScript, Express, MongoDB."
        },
        "javascript": {},
        "parent": "element1",
        "children": {},
        "DOM": {}
      },
      "element4": {
        "tagName": "DIV",
        "style": {
          "display": "flex",
          "gap": "1rem",
          "marginTop": "2rem"
        },
        "attribute": {
          "innerText": "UI Panels: Top (Viewport), Left (Warehouse), Right (CSS Props), Bottom (Timeline/Selectors)"
        },
        "javascript": {},
        "parent": "element1",
        "children": {},
        "DOM": {}
      },
      "element5": {
        "tagName": "SECTION",
        "style": {
          "display": "flex",
          "flexDirection": "column",
          "justifyContent": "center",
          "padding": "4rem",
          "width": "100%",
          "height": "100%",
          "position": "absolute"
        },
        "attribute": {
          "className": "slide"
        },
        "javascript": {},
        "parent": "element0",
        "children": {
          "element6": "element6",
          "element7": "element7"
        },
        "DOM": {}
      },
      "element6": {
        "tagName": "H2",
        "style": {
          "color": "#ffffff",
          "fontSize": "2.5rem",
          "borderBottom": "2px solid #30363d",
          "paddingBottom": "1rem"
        },
        "attribute": {
          "innerText": "System Architecture: JSON State Tree"
        },
        "javascript": {},
        "parent": "element5",
        "children": {},
        "DOM": {}
      },
      "element7": {
        "tagName": "P",
        "style": {
          "color": "#8b949e",
          "fontSize": "1.5rem",
          "marginTop": "1.5rem"
        },
        "attribute": {
          "innerText": "Direct DOM manipulation is eliminated. The engine parses flat dictionary nodes recursively, synchronizing state with MongoDB."
        },
        "javascript": {},
        "parent": "element5",
        "children": {},
        "DOM": {}
      }
    },
    "selector_order": [
      {
        "selector": ".slide",
        "index": 1,
        "composition": {
          "id": 0,
          "class": 1,
          "attribute": 0,
          "tag": 0,
          "universal": 0
        },
        "style": {
          "opacity": "0",
          "pointerEvents": "none",
          "transition": "opacity 0.5s ease"
        }
      },
      {
        "selector": ".active",
        "index": 2,
        "composition": {
          "id": 0,
          "class": 1,
          "attribute": 0,
          "tag": 0,
          "universal": 0
        },
        "style": {
          "opacity": "1",
          "pointerEvents": "auto"
        }
      }
    ],
    "directives": {
      "keyframes": {},
      "media": {}
    }
  }}})