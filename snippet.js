let elements_recipe = {          // Stores the element objects that to be rendered on the click of button for all the element creation buttons
    "body" : {
        tagName : "body",
        styles : {"backgroundColor" : "rgba(0,0,0,0.99)",  "width" : "100vw", "height" : "100vh", "display" : "flex", "textAlign" : "left", "alignItems" : "center", "justifyContent" : "flexStart" , "flexDirection" : "column", "overflow" : "auto    ", "padding" : "0", "margin" : "0"},
        children : [],
        attribute : {},
        determine : {"bg-color": false, "color" : false, "dimension" : false, "font-size" : true},
        javascript : {},
    },



        "section" : {
            tagName : "section",
            styles : {
                "boxSizing" : "border-box", "flexWrap" : "wrap", "textAlign" : "left", "flexShrink" : "0", "height" : "30%", "width" : "100%", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "backgroundColor" : "rgba(255, 255, 255, 0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden"
            },
            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },
    
        "container" : {
            tagName : "div",
            styles : {
               "boxSizing" : "border-box", "flexWrap" : "wrap", "textAlign" : "left",  "flexShrink" : "0", "height" : "50%", "width" : "50%",  "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "backgroundColor" : "rgba(255, 255, 255, 0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden" 
            },
            
            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },
    
    
        "grid" : {
            tagName : "div",
            styles : {
               "boxSizing" : "border-box", "flexWrap" : "wrap",  "textAlign" : "left", "flexShrink" : "0", "height" : "50%", "width" : "50%", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "backgroundColor" : "rgba(255, 255, 255, 0.99)", "display" : "grid", "position" : "relative", "overflow" : "hidden", "gridTemplateRows" : "1fr 1fr",  "gridTemplateColumns" : "1fr 1fr",
            },
    
            
            parent : "",
            children : ["grid_child", "grid_child" , "grid_child", "grid_child"],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },
    
        "grid_child" : {
            tagName : "div",
            styles : {
                "boxSizing" : "border-box", "flexWrap" : "wrap", "textAlign" : "left", "flexShrink" : "0", "width" : "90%", "height" : "90%", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", 
            },
    
            
            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },
    
    
        "columns" : {
            tagName : "div",
            styles : {   "boxSizing" : "border-box", "textAlign" : "left", "flexShrink" : "0", "height" : "50%", "width" : "50%", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex" , "flexDirection" : "row", "flexWrap" : "nowrap", "position" : "relative", "overflow" : "hidden", },
    

            parent : "",
            children : ["columns_child" ,"columns_child" ,"columns_child" ],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },
    
    
        "columns_child" : {
            tagName : "div",
            styles : {  "boxSizing" : "border-box",  "textAlign" : "left", "width" : "100%", "height" : "100%", "backgroundColor" : "rgba(128,128,128,0.99)", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "display" : "flex" , "flexDirection" : "column", "flexWrap" : "wrap", "position" : "relative", "overflow" : "hidden", },

            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },


        "heading-h1" : {
            tagName : "h1",
            styles : {
               "alignItems" : "center", "textAlign" : "left", "justifyContent" : "center", "boxSizing" : "border-box", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "20%", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "width" : "100%", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "4rem", "color" : "rgba(0, 0, 0, 0.99)", "margin" : "0px",
            },
            
            determine : {"bg-color": false, "color" : false, "dimension" : true, "font-size" : true},
            parent : "",
            children : [],
            attribute : {"innerText" : "Enter Your Text"},
            javascript : {},
        },

        "paragraph" : {
            tagName : "p",
            styles : {
              "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "50%", "width" : "70%", "display" : "flex", "position" : "relative", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            

            parent : "",
            children : [],
            attribute : {"innerText" : "Enter your text..."},
            determine : {"bg-color": false, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },


        "text-link" : {
            tagName : "a",
            styles : {
              "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "5%", "display" : "flex", "position" : "relative", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(19, 17, 177, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"src" : "", "innerText" : "link"},
            determine : {"bg-color": false, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },


        
        "blockquote" : {
            tagName : "blockquote",
            styles : {
              "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "50%", "width" : "70%", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw",
            },
            
            parent : "",
            children : [],
            attribute : {"innerText" : "Enter your quote here"},
            determine : {"bg-color": false, "color" : true, "dimension" : true, "font-size" : true},
            javascript : {},
        },

        // "blockquote" : {
        //     tagName : "blockquote",
        //     styles : {
        //         "boxSizing" : "border-box", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "30%", "width" : "100%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
        //     },
            
        //     parent : "",
        //     children : [],
        //     attribute : {},
            
        // },
        

        "codeline" : {
            tagName : "code",
            styles : {
               "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "flexShrink" : "0", "height" : "50%", "width" : "50%", "backgroundColor" : "rgba(0, 0, 0, 0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(16, 109, 24, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"innerText" : "//Your code here...//"},
            determine : {"bg-color": false, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },

        "button" : {
            tagName : "button",
            styles : {
              "alignItems" : "center",  "textAlign" : "left", "justifyContent" : "center",  "boxSizing" : "border-box", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "10%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(255, 255, 255, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"innerText" : "button"},
            determine : {"bg-color": true, "color" : true, "dimension" : true, "font-size" : true},
            javascript : {},
        },


        "checkbox" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "10px", "width" : "10px", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(252, 8, 8, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "checkbox"},
            determine : {"bg-color": false, "color" : true, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },

        "multichoice" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "10px", "width" : "10px", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "radio"},
            determine : {"bg-color": true, "color" : true, "dimension" : true, "font-size" : true},
            javascript : {},
        },


        "choice-menu" : {
            tagName : "select",
            styles : {
                "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "10%", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(255, 255, 255, 0.99)"
            },
            
            parent : "",
            children : ["choice-menu-option", "choice-menu-option"],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {"innerText" : "choose"},
        },
        
        
        "choice-menu-option" : {
            tagName : "option",
            styles : {
                "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "100%", "backgroundColor" : "rgba(128,128,128,0.99)", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(255, 255, 255, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"value" : "", "innerText" : "option"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },

        "text-input" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "10%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(255, 239, 239, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "text", "innerText" : "Text here...."},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },

        "password-input" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "10%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(255, 255, 255, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "password"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },

        "comment-box" : {
            tagName : "textarea",
            styles : {
                "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "30%", "width" : "40%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(255, 255, 255, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"innerText" : "Your text here..."},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },


        "search-box" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "10%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "search", "innerText" : "search"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },

        "numeric-input" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "5%", "width" : "5%", "backgroundColor" : "rgba(128,128,128,0.99)", "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "number"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },


        "slider" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "10px", "width" : "20px", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "range", "min" : "0", "max" : "100"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },


        
        "color-picker" : {
            tagName : "input",
            styles : {
                "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "10px", "width" : "10px", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "color"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },

        "date-input" : {
            tagName : "input",
            styles : {
                "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "10px", "width" : "10px", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "date"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },

        
        "file-uploader" : {
            tagName : "input",
            styles : {
               "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "10px", "width" : "10px", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"type" : "file"},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },


        
        "image" : {
            tagName : "img",
            styles : {
              "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "50%", "width" : "50%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },

        
        "video" : {
            tagName : "video",
            styles : {
              "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "50%", "width" : "50%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },


        
        "audio" : {
            tagName : "audio",
            styles : {
               "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)", "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "10%", "width" : "60%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {"src" : "", "controls" : true},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },

        
        "web-page" : {
            tagName : "iframe",
            styles : {
               "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "boxSizing" : "border-box",  "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "50%", "width" : "50%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },


        
        "youtube-video" : {
            tagName : "iframe",
            styles : {
              "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "30%", "width" : "50%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : [],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
        },

        
        "basic-form" : {
            tagName : "form",
            styles : {
              "borderWidth" : "0.4em", "borderStyle" : "dotted", "borderColor" : "rgb(88, 80, 80)",  "boxSizing" : "border-box", "textAlign" : "left", "flexWrap" : "wrap",  "flexShrink" : "0", "height" : "70%", "width" : "50%", "backgroundColor" : "rgba(128,128,128,0.99)", "display" : "flex", "flexDirection" : "column" , "position" : "relative", "overflow" : "hidden", "fontSize" : "1vw", "color" : "rgba(0, 0, 0, 0.99)"
            },
            
            parent : "",
            children : ["text-input", "password-input", "date-input", "button"],
            attribute : {},
            determine : {"bg-color": true, "color" : false, "dimension" : true, "font-size" : true},
            javascript : {},
            
        },                 
  
};
