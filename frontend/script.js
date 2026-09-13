let user_data = {
    "username" : "tester"
}
let doc = undefined;
let bg_blur = document.createElement("div");
bg_blur.classList.add("bg-blur");
// document.body.append(bg_blur);


function browser_cache(){
    localStorage.setItem("auth", user_data.auth);
    localStorage.setItem("username", user_data.username);
}

async function state_persistance(){
    let auth = localStorage.getItem("auth");
    let username = localStorage.getItem("username");
    user_data = await fetch('/login/auth', {method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({"auth" : auth, "username" : username})});
    user_data = await user_data.json();
    if(user_data != 0){
        document.body.append(bg_blur);
        slide_transition(bg_blur);
    }
    else home_page_in();
}

function wordInsert(string, word, index){               // index = -1 is head and index = -99 is tail
    if(word == "") return string; 
    if(index == -1) return word + string;
    if(index == -99) return string + word;

    let i = 0, j = 0, wordCount = -1;

    while(j < string.length){
        if(j + 1 == string.length){
            wordCount++;
            break;
        }
        if(string[j] != " " && string[j+1] == " "){
            wordCount++;
            if(index == wordCount) break;
        }
        if(j != 0 && (string[j] == " " && string[j+1] != " ")) i = j+1;
        j++;
    }
    if(wordCount == index) return string.substring(0, i) + word + string.substring(j + 1, string.length);
    else return string;
}

function wordFetcher(string, index){
    let i = 0, j = 0, wordCount = -1;
    while(j < string.length){
        if(j + 1 == string.length){
            wordCount++;
            break;
        }
        if(string[j] != " " && string[j+1] == " "){
            wordCount++;
            if(index == wordCount) break;
        }
        if(j != 0 && (string[j] == " " && string[j+1] != " ")) i = j+1;
        j++;
    }
    if(wordCount == index) return string.substring(i, j+1);
    else return "none";
}




let nav_left = document.querySelector(".nav-left");
// let styles_tab_global = {};
let home_page_in = () => {
    document.querySelector(".logo").style.left = 0;
    nav_left.style.right = 0;
    document.querySelector(".main-tab1").style.opacity = 1;
    document.querySelector(".lower-tab1").style.bottom = 0;
}

let project = {};
let elements = new Map();

if(localStorage.getItem("auth") == null){
     home_page_in();
}

let home_page_out = () => {
    document.querySelector(".logo").style.left = `-14%`;
    nav_left.style.right = `-25%`;
    document.querySelector(".main-tab1").style.opacity = 0
    document.querySelector(".lower-tab1").style.bottom = `-34%`;
}

let builder_page_in = () => {

}

let builder_page_out = () => {

}

function unitValueFetcher(string){
    if(string == "none" || string == "normal" || string == "" || string=="auto") return {"value" : "", "unit" : ""};
    let ans = {
        value : "",
        unit : "",
    };

    let i = string.length-1;
    for(; i >= 0; i--) if(string[i] >= '0' && string[i] <= '9') break;
    
    ans.value = string.slice(0, i+1);
    ans.unit = string.slice(i+1, string.length);
    return ans;
}

function project_tile(name){
    let tile = document.createElement("div");
    tile.innerHTML = `<span class="project-tile-logo"></span>
    <div class="project-tile-content">
        <h1 class="project-tile-title">${name}</h1>
        <div class="project-tile-properties">
            <button class="project-tile-edit"><svg class="project-title-edit-logo" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA33F7"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
        </div>
    </div>
    <div class="project-tile-overlay"></div>
    `

    tile.classList.add("project-tile");
    return tile;
}


function typeValueFetcher(string){
    if(string == "none" || string == "normal" || string=="" || string=="auto") return {"value" : "", "type" : ""};
    let ans = {};
    let i = 0, j = 0;
    for(; i < string.length; i++){
        if(string[i] == `"`){
            ans["type"] = string.slice(0, i-1);
            break;
        }
        else if(string[i] == "(" && string[i+1] != `"`){
            ans["type"] = string.slice(0, i);
            break;
        }
    }

    j = i+1;
    for(; j < string.length; j++){ 
        if(string[j] == `"`){
            ans["value"] = string.slice(i+1, j);
            break;
        }
        else if(string[j] == `)`){
            ans["value"] = string.slice(i+1, j);
            break;
        }
    }

    return ans;
}


function colorFetcher(color){
    if(color == "") return {"red" : "", "green" : "", "blue" : "", "opacity" : ""};
    let r = "", g = "", b = "", a = "";
    let curr = 0;
    for(let i = 0; i < color.length; i++){
        if(color[i] >= '0' && color[i] <= '9' || color[i] == '.'){
            if(curr == 0) r += color[i];
            if(curr == 1) g += color[i];
            if(curr == 2) b += color[i];
            if(curr == 3) a += color[i];
        }
        else if(color[i] == ',') curr++;
    }
    return {"red" : r, "green" : g, "blue" : b, "opacity" : a};
}

function hexFetcher(color){
    if(color == "none" || color == "normal" || color == "" || color=="auto") return "#000000";
    let rgb = colorFetcher(color);
    let arr = [Number(rgb.red).toString(16).padStart(2, '0'),  Number(rgb.green).toString(16).padStart(2, '0'), Number(rgb.blue).toString(16).padStart(2, '0')];
    return `#${arr[0]}${arr[1]}${arr[2]}`;
}

function hexRgbFetcher(color, opacity=1){
    if(opacity == "") opacity = 1;
    let r = parseInt(color.slice(1, 3), 16).toString(10), g = parseInt(color.slice(3, 5), 16).toString(10), b = parseInt(color.slice(5, 7), 16).toString(10);
    return `rgba(${r},${g},${b},${opacity})`;
    
}


function rgbaOpacityEditor(color, opacity){
    let i = color.length-1;
    for(; i >= 0; i--) if(color[i] == ',') break;
    return color.slice(0, i+1) + `${opacity})`;
}




let slide1 = document.querySelector(".slide1");
let text = ["<\Deploy and monetize>", "<\Fluent and smooth animations>", "<\Variety of templates>", "<\No coding required>"];
let display_text = document.querySelector(".display-text");
let main_tab1_top = document.querySelector(".main-tab1-top");
let main_tab1_bottom_tab = document.querySelector(".main-tab1-bottom-tab");
let main_tab1 = document.querySelector(".main-tab1");
let idx = -1;


function password_validity(password_value) {                     // Needs Optimization
    // let p = password_value;
    // let U_count = 0;
    // let L_count = 0;
    // let S_count = 0;
    // let N_count = 0;

    // for (let i = 0; i < p.length; i++) {
    //     if (p[i] >= 'A' && p[i] <= 'Z') U_count++;
    //     if (p[i] >= 'a' && p[i] <= 'z') L_count++;
    //     if ((p[i] >= '!' && p[i] <= '/') || (p[i] >= ':' && p[i] <= '@') || (p[i] >= '[' && p[i] <= '`') || (p[i] >= '{' && p[i] <= '~')) S_count++;
    //     if (p[i] >= '0' && p[i] <= '9') N_count++;
    // }


    // if (p.length >= 8 && U_count >= 1 && L_count >= 1 && S_count >= 1 && N_count >= 1) return true;
    // else return false;

    if(password_value.length > 0) return true;
    else false;

}


function username_validity(username_value) {
    if (username_value.length >= 1) return true;
    else return false;
}


function email_validity(email_value) {
    let length = email_value.length;
    if (email_value[0] == '@' || email_value[length - 1] == '@' || email_value[0] == '.') return false;

    let is_after_domain = false;
    let a_symbol_count = 0;
    let dot_after_domain = 0;

    for (let i = 0; i < length; i++) {
        if (email_value[i] == '@') a_symbol_count++;
        if (a_symbol_count > 1) return false;
        if (is_after_domain == true && email_value[i] == '.' && ((length - (i + 1)) < 2)) return false;
        if (email_value[i] == '@' && (email_value[i - 1] == '.' || email_value[i + 1] == '.')) return false;
        if (email_value[i] == '@') {
            is_after_domain = true;
            continue;
        }
        if ((is_after_domain == false) && (email_value[i] == '!' || email_value[i] == '#' || email_value[i] == '$' || email_value[i] == '%' || email_value[i] == '^' || email_value[i] == '&' || email_value[i] == '*' || email_value[i] == '(' || email_value[i] == ')' || email_value[i] == '/' || email_value[i] == '=' || email_value[i] == '?')) return false;
        if ((is_after_domain == true) && ((email_value[i] < 'A' || email_value[i] > 'Z') && (email_value[i] < 'a' || email_value[i] > 'z') && (email_value[i] != '-') && (email_value[i] != '.'))) return false;
        if (is_after_domain == true && email_value[i] == '.') dot_after_domain++;
    }

    if (a_symbol_count == 1 && dot_after_domain >= 1) return true;
}





function random(begin, end) {
    let divi = 1 / (end - begin);
    let rand = Math.random();
    return Math.floor((rand / divi) + begin);
}

let text_selector = () => {
    let rand = random(0, 4);
    if (idx != rand) idx = rand;
    else text_selector();
    display_text.innerText = text[idx];
}
let text_animation_remove = () => {
    main_tab1_top.setAttribute("style", "animation:none");
}

let text_animation = () => {
    setTimeout(text_selector, 2000);
    setTimeout(text_animation_remove, 4000);
    main_tab1_top.setAttribute("style", "animation: slide 2s linear 2 alternate");
}

setInterval(text_animation, 8000);





let login = document.querySelector(".login");        // Logic Box Structure
let about_us = document.querySelector(".about-us");
let get_started = document.querySelector(".get-started");
let register = document.querySelector(".register");
let username_value = undefined;
let password_value = undefined;
let validity = false;
let is_logged = false;



async function builder(type = "new", id = undefined){
    let project_obj = undefined;

    if(type == "new"){
        if(get_started.value.length == 0){
            alert("Name field cannot be empty");
            return;
        }

        project_obj = await fetch('/project/initiallize', {method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({
        "name" : get_started.value,
        "created_by" : user_data.username,
        "auth" : user_data.auth
        })});
    }
    else if(type == "existing"){
        project_obj = await fetch('/project/load', {method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({"created_by" : user_data.username, "auth" : user_data.auth, "project_id" : id})});

    }

    project_obj = await project_obj.json();


    if(project_obj == -1){
        alert("Session Expired, Login again!");
        return;
    }

    if(project_obj == 0){
        alert("An unknown error ocurred");
        return;
    }

    project_obj["auth"] = user_data.auth;

    home_page_out();
    setTimeout(()=>{
        slide1.classList.add('slide2');
        slide1.classList.remove('slide1');

        slide1.innerHTML = `
          <div class="builder-nav">
    <div class="builder-nav-left">
        <img src="logo2.png" alt="" class="builder-logo">
    </div>
    <div class="builder-nav-middle">
        <button class="zoom-switch"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="rgba(220, 16, 169, 0.758)"><path d="M800-600v-120H680v-80h120q33 0 56.5 23.5T880-720v120h-80Zm-720 0v-120q0-33 23.5-56.5T160-800h120v80H160v120H80Zm600 440v-80h120v-120h80v120q0 33-23.5 56.5T800-160H680Zm-520 0q-33 0-56.5-23.5T80-240v-120h80v120h120v80H160Zm80-160v-320h480v320H240Zm80-80h320v-160H320v160Zm0 0v-160 160Z"/></svg></button>
        <div class="resolution-control-presets">
            <button class="phone-view"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6e5074"><path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v124q18 7 29 22t11 34v80q0 19-11 34t-29 22v404q0 33-23.5 56.5T680-40H280Zm0-80h400v-720H280v720Zm0 0v-720 720Zm228.5-51.5Q520-183 520-200t-11.5-28.5Q497-240 480-240t-28.5 11.5Q440-217 440-200t11.5 28.5Q463-160 480-160t28.5-11.5Z"/></svg></button>
            <button class="tablet-view"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6e5074"><path d="M508.5-151.5Q520-163 520-180t-11.5-28.5Q497-220 480-220t-28.5 11.5Q440-197 440-180t11.5 28.5Q463-140 480-140t28.5-11.5ZM200-40q-33 0-56.5-23.5T120-120v-720q0-33 23.5-56.5T200-920h560q33 0 56.5 23.5T840-840v720q0 33-23.5 56.5T760-40H200Zm0-200v120h560v-120H200Zm0-80h560v-400H200v400Zm0-480h560v-40H200v40Zm0 0v-40 40Zm0 560v120-120Z"/></svg></button>
            <button class="desktop-view"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="rgba(220, 16, 169, 0.758)"><path d="M334-120v-60h86v-100H140q-24 0-42-18t-18-42v-440q0-24 18-42t42-18h680q24 0 42 18t18 42v440q0 24-18 42t-42 18H540v100h86v60H334ZM140-340h680v-440H140v440Zm0 0v-440 440Z"/></svg></button>
        </div>

        <div style="display:none;" class="resolution-control-custom">
            <input type="text" class="resolution-width" placeholder="width">
            <input type="text" class="resolution-height" placeholder="height">
            <div class="resolution-zoom-div">
                <input type="text" class="resolution-zoom-value" placeholder="zoom">
                <p class="resolution-zoom-unit">%</p>
            </div>
        </div>
        <button class="dynamic-switch"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6e5074"><path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/></svg></button>
    </div>
    <div class="builder-nav-right">
        <button style="opacity:0;" class="undo">&lt undo</button>
        <button style="opacity:0;" class="redo">redo &gt</button>
        <button class="save">Save</button>
        <button class="preview">Preview</button>
    </div>
</div>

  <div style="display:none;" class="attributes-menu">
  <div class="attributes-nav">
    <h1 class="attributes-title">Attributes</h1>
    <div class="clipboard-operations">
        <button title="paste" class="paste"><svg class="clipboard-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm308.5-571.5Q520-783 520-800t-11.5-28.5Q497-840 480-840t-28.5 11.5Q440-817 440-800t11.5 28.5Q463-760 480-760t28.5-11.5Z"/></svg></button>
        <button title="copy" class="copy"><svg class="clipboard-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg></button>
        <button title="cut" class="cut"><svg class="clipboard-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M760-120 480-400l-94 94q8 15 11 32t3 34q0 66-47 113T240-80q-66 0-113-47T80-240q0-66 47-113t113-47q17 0 34 3t32 11l94-94-94-94q-15 8-32 11t-34 3q-66 0-113-47T80-720q0-66 47-113t113-47q66 0 113 47t47 113q0 17-3 34t-11 32l494 494v40H760ZM600-520l-80-80 240-240h120v40L600-520ZM296.5-663.5Q320-687 320-720t-23.5-56.5Q273-800 240-800t-56.5 23.5Q160-753 160-720t23.5 56.5Q207-640 240-640t56.5-23.5ZM494-466q6-6 6-14t-6-14q-6-6-14-6t-14 6q-6 6-6 14t6 14q6 6 14 6t14-6ZM296.5-183.5Q320-207 320-240t-23.5-56.5Q273-320 240-320t-56.5 23.5Q160-273 160-240t23.5 56.5Q207-160 240-160t56.5-23.5Z"/></svg></button>
        <button title="duplicate" class="duplicate"><svg class="clipboard-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M560-320h80v-120h120v-80H640v-120h-80v120H440v80h120v120ZM240-140Q131-178 65.5-271.5T0-480q0-115 65.5-208.5T240-820v88q-74 35-117 103T80-480q0 81 43 149t117 103v88Zm219.5-8.5q-65.5-28.5-114-77t-77-114Q240-405 240-480t28.5-140.5q28.5-65.5 77-114t114-77Q525-840 600-840t140.5 28.5q65.5 28.5 114 77t77 114Q960-555 960-480t-28.5 140.5q-28.5 65.5-77 114t-114 77Q675-120 600-120t-140.5-28.5ZM600-480Zm0 280q117 0 198.5-81.5T880-480q0-117-81.5-198.5T600-760q-117 0-198.5 81.5T320-480q0 117 81.5 198.5T600-200Z"/></svg></button>
        <button title="delete" class="delete"><svg class="clipboard-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        <button style="display:none;" title="make component" class="make-component"><svg class="clipboard-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="m196-120-6-51-8-4q-4-2-11-7l-48 20-44-76 41-31v-21l-41-32 44-76 48 20q5-3 9.5-6t9.5-5l6-51h88l6 51 4 2 4 2q2 1 5 3l6 4 48-20 44 76-41 31v22l219-127-45 79 12 9-158 92-31 54-48-20q-5 3-9.5 6t-9.5 5l-6 51h-88Zm1.5-202.5Q180-305 180-280t17.5 42.5Q215-220 240-220t42.5-17.5Q300-255 300-280t-17.5-42.5Q265-340 240-340t-42.5 17.5ZM396-560l-6-51q-2-2-5-3t-5-3v220l-15-26-45 19v-204l-40-70 40-31v-21l-41-32 44-76 48 20q5-3 9.5-6t9.5-5l6-51h88l6 51 8 4q4 2 11 7l48-20 44 76-41 31v21l41 32-44 76-48-20q-5 3-9.5 6t-9.5 5l-6 51h-88Zm1.5-202.5Q380-745 380-720t17.5 42.5Q415-660 440-660t42.5-17.5Q500-695 500-720t-17.5-42.5Q465-780 440-780t-42.5 17.5ZM676-120l-6-51-8-4q-4-2-11-7l-48 20-44-76 41-31v-21l-41-31 44-77 48 20q3-2 4-2.5l15-7.5-216-152h48l4-36 195 136h63l6 51 4 2 4 2q2 1 5 3l6 4 48-20 44 76-41 31v21l41 32-44 76-48-20q-5 3-9.5 6t-9.5 5l-6 51h-88Zm1.5-202.5Q660-305 660-280t17.5 42.5Q695-220 720-220t42.5-17.5Q780-255 780-280t-17.5-42.5Q745-340 720-340t-42.5 17.5Z"/></svg></button>
        <button title="more" class="clipboard-more"><svg class="clipboard-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg></button>
    </div>
</div>

<div class="attributes-properties">

    <span class="class-list attribute-input" data-property="className" data-apply="class-list-fetch">
        <div class="attribute-list-tile animation-list-tile">class1</div>
    </span>

    <span class="inner-text-area attribute-span" data-property="innerText">
        <p>Text:</p>
        <textarea name="" id="" class="inner-text-area-value attribute-input" data-property="innerText" data-apply="direct" placeholder="Enter element's text here"></textarea>
    </span>

    <span class="tag-name attribute-span" data-property="tagName">
        <p>Tag:</p>
        <select name="" id="" class="tag-name-select type-input attribute-input" data-property="tagName" data-apply="tag-change">
            <option value="DIV">Div</option>
            <option value="HEADER">Header</option>
            <option value="FOOTER">Footer</option>
            <option value="NAV">Nav</option>
            <option value="MAIN">Main</option>
            <option value="SECTION">Section</option>
            <option value="ARTICLE">Article</option>
            <option value="ASIDE">ASIDE</option>
            <option value="ADDRESS">Address</option>
            <option value="FIGURE">Figure</option>
        </select>
    </span>

    <span class="heading-type attribute-span" data-property="tagNameH">
        <p>Heading Type:</p>
        <select name="" id="" class="heading-type-select type-input attribute-input" data-property="tagName" data-apply="tag-change">
            <option value="H1">1</option>
            <option value="H2">2</option>
            <option value="H3">3</option>
            <option value="H4">4</option>
            <option value="H5">5</option>
            <option value="H6">6</option>
        </select>
    </span>

    <span class="class">
        <p>Class:</p>
        <span class="class-inner-span input-select-button">
            <button class="class-remove" data-property="className" data-apply="class-remove">-</button>
            <input type="text" class="class-value" data-apply="none">
            <button class="class-add" data-property="className" data-apply="class-add">+</button>
        </span>
    </span>

    <span class="id">
        <p>Id:</p>
        <input type="text" class="id-value type-input attribute-input" data-property="id" data-apply="direct">
    </span>

    <span class="name attribute-span" data-property="name">
        <p>Name:</p>
        <input type="text" class="name-value type-input attribute-input" data-property="name" data-apply="direct">
    </span>

    <span class="hover-text" >
        <p>Hover Text:</p>
        <input type="text" class="hover-text-value type-input attribute-input" data-property="title" data-apply="direct">
    </span>

    <span class="visibility">
        <p>Visibility:</p>
        <select name="" id="" class="visibility-select type-input attribute-input" data-property="hidden" data-apply="direct">
            <option value="true">hidden</option>
            <option value="false">visible</option>
        </select>
    </span>

        <span class="url attribute-span" data-property="action">
            <p>Request To:</p>
            <input type="text" class="url-value type-input attribute-input" data-property="action" data-apply="direct">
        </span>

        <span class="method attribute-span" data-property="method">
            <p>Method:</p>
            <select name="" id="" class="method-select type-input attribute-input" data-property="method" data-apply="direct">
                <option value="POST">POST</option>
                <option value="GET">GET</option>
            </select>
        </span>

        <span class="enctype attribute-span" data-property="enctype">
            <p>Enctype:</p>
            <select name="" id="" class="enctype-select type-input attribute-input" data-property="enctype" data-apply="direct">
                <option value="application/x-www-form-urlencoded">application</option>
                <option value="multipart/form-data">multipart</option>
                <option value="text/plain">text</option>
            </select>
        </span>

        <span class="type attribute-span" data-property="type">
            <p>Type:</p>
            <select name="" id="" class="type-select type-input attribute-input" data-property="type" data-apply="direct">
                <option value="text">text</option>
                <option value="password">password</option>
                <option value="email">email</option>
                <option value="number">number</option>
                <option value="checkbox">checkbox</option>
                <option value="radio">radio</option>
                <option value="file">file</option>
                <option value="submit">submit</option>
                <option value="button">button</option>
            </select>
        </span>

        <span class="value attribute-span" data-property="value">
            <p>Value:</p>
            <input type="text" class="value-value type-input attribute-input" data-property="value" data-apply="direct">
        </span>

        <span class="placeholder attribute-span" data-property="placeholder">
            <p>Placeholder:</p>
            <input type="text" class="placeholder-value type-input attribute-input" data-property="placeholder" data-apply="direct">
        </span>

        <span class="functionality attribute-span" data-property="disabled">
            <p>Functionality:</p>
            <select name="" id="" class="functionality-select type-input attribute-input" data-property="disabled" data-apply="direct">
                <option value="false">enabled</option>
                <option value="true">disabled</option>
            </select>
        </span>

        <span class="readonly attribute-span" data-property="readonly">
            <P>Read only:</P>
            <input type="checkbox" class="readonly-value type-checkbox attribute-input" data-property="readOnly" data-apply="check">
        </span>

        <span class="required attribute-span" data-property="required">
            <p>Required:</p>
            <input type="checkbox" class="required-value type-checkbox attribute-input" data-property="required" data-apply="check">
        </span>

        <span class="checked attribute-span" data-property="checked">
            <p>Checked:</p>
            <input type="checkbox" class="checked-value type-checkbox attribute-input" data-property="checked" data-apply="check">
        </span>

        <span class="min-max-step attribute-span" data-property="min">
            <p>Value Range:</p>
            <span class="min-max-inner-span sequential-values">
                <input type="text" class="min-value attribute-input" data-property="min" data-apply="direct" placeholder="min">
                <input type="text" class="max-value attribute-input" data-property="max" data-apply="direct"  placeholder="max">
                <input type="text" class="step-value attribute-input" data-property="step" data-apply="direct"  placeholder="step">
              
            </span>
        </span>

        <span class="max-length attribute-span" data-property="maxlength">
            <p>Max Length:</p>
            <input type="text" class="max-length-value type-input attribute-input" data-property="maxLength" data-apply="direct">
        </span>

        <span class="validation-pattern attribute-span" data-property="pattern">
            <p>Validation Pattern:</p>
            <input type="text" class="validation-pattern-value type-input attribute-input" data-property="pattern" data-apply="direct">
        </span>

        <span class="src attribute-span" data-property="src">
            <p>Src:</p>
            <span class="src-inner-span value-unit">
                <input type="text" class="src-value attribute-input" data-property="src" data-apply="direct">
                <input type="file" class="src-file">
            </span>
        </span>

        <span class="thumbnail attribute-span" data-property="poster">
            <p>Thumbnail:</p>
            <span class="thumbmnail-inner-span value-unit">
                <input type="text" class="thumbnail-value attribute-input" data-property="poster" data-apply="direct">
                <input type="file" class="thumbnail-file">
            </span>
        </span>

        <span class="alt attribute-span" data-property="alt">
            <p>Alt:</p>
            <input type="text" class="alt-value type-input attribute-input" data-property="alt" data-apply="direct">
        </span>

        <span class="base-dimensions attribute-span" data-property="height">
            <p>Base Dimension:</p>
            <span class="base-dimensions-inner-span sequential-value-units">
                <p>
                    <span>
                        <input type="text" class="base-height-value attribute-input" data-property="height" data-apply="direct" placeholder="height">
                        <input type="text" value="px" readonly class="base-height-unit">
                    </span>
                </p>

                <p>
                    <span>
                        <input type="text" class="base-width-value attribute-input" data-property="width" data-apply="direct" placeholder="width">
                        <input type="text" value="px" readonly class="base-width-unit">
                    </span>
                </p>
            </span>
        </span> 

        <span class="controls attribute-span" data-property="controls">
            <p>Controls:</p>
            <input type="checkbox" class="controls-value type-checkbox attribute-input" data-property="controls" data-apply="check">
        </span>

        <span class="autoplay attribute-span" data-property="autoplay">
            <p>Autoplay:</p>
            <input type="checkbox" class="autoplay-value type-checkbox attribute-input" data-property="autoplay" data-apply="check">
        </span>

        <span class="loop attribute-span" data-property="loop">
            <p>Loop:</p>
            <input type="checkbox" class="loop-value type-checkbox attribute-input" data-property="loop" data-apply="check">
        </span>

        <span class="muted attribute-span" data-property="muted">
            <p>Muted:</p>
            <input type="checkbox" class="muted-value type-checkbox attribute-input" data-property="muted" data-apply="check">
        </span>

        <span class="href attribute-span" data-property="href">
            <p>Destination Link:</p>
            <input type="text" class="href-value type-input attribute-input" data-property="href" data-apply="direct">
        </span>

        <span class="target attribute-span" data-property="target">
            <p>Page Open In:</p>
            <select name="" id="" class="target-select type-input attribute-input" data-property="target" data-apply="direct">
                <option value="_self">same tab</option>
                <option value="_blank">new tab</option>
            </select>
        </span>

        <span class="rel attribute-span" data-property="rel">
            <p>Relationship:</p>
            <input type="text" class="rel-value type-input attribute-input" data-property="rel" data-apply="direct">
        </span>

        <span class="download attribute-span" data-property="download">
            <p>File Name:</p>
            <input type="text" class="download-value type-input attribute-input" data-property="download" data-apply="direct">
        </span>

        <span class="col-row-span attribute-span" data-property="rowspan">
            <p>Structure:</p>
            <span class="col-row-span-inner-span sequential-values">
                <input type="text" class="row-span-value attribute-input" data-property="rowSpan" data-apply="direct" placeholder="row size">
                <input type="text" class="col-span-value attribute-input" data-property="colSpan" data-apply="direct" placeholder="col size">
            </span>
        </span>

        <div style="display:none" class="custom-attributes">
        <p class="custom-attributes-title">Custom Attributes</p>
        <span class="custom-attributes-property">
            <p>Type:
                <select value="src" name="" id="" class="custom-attribute-type" data-property="none">
                    <option value="innerText">innerText</option>
                    <option value="src">src</option>
                </select>
            </p>

            <p>Value:
                <input type="text" class="custom-attribute-value" data-property="none">
            </p>

            <button class="custom-attribute-add" data-property="none" data-apply="direct">+</button>
        </span>

        <span class="custom-attribute-applied"> 
            <span style="display:none;" class="custom-attribute-applied-properties">
                <p class="custom-attribute-applied-name">Property:</p>
                <input data-property="" data-apply="custom" type="text" class="custom-attribute-applied-value">
            </span>
        </span>
    </div>
    </div>

    
</div>

</div>
</div>


<div class="builder-main">
    <div class="category">
        <div class="category-top">
            <button class="utility"></button>
            <button class=""></button>
            <button class=""></button>
            <button class=""></button>
            <button class=""></button>
            <button class=""></button>
        </div>
        <div class="category-bottom">
            <button class="chat"></button>
            <button class="questions"></button>
            <button class="external-tab-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6e5074"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
        </div>
    </div>

    <div class="warehouse">
        <h1 class="warehouse-title">Warehouse</h1>
        <div class="warehouse-category-selector">
            <button class="elements enabled-category" data-function="open_elements_tab">Elements</button>
            <button class="components" data-function="open_components_tab">Components</button>
        </div>

        <div class="warehouse-category">
            <div class="warehouse-category-elements">
                <div class="layout">
                    <h1 class="layout-title">Layout</h1>
                    <button class="section">
                        <img src="./icons/rectangle.png" alt="">
                        <h3>Section</h3>
                    </button>

                    <button class="container">
                        <img src="./icons/square.png" alt="">
                        <h3>Container</h3>
                    </button>

                    <button class="grid">
                        <img src="./icons/grid.png" alt="">
                        <h3>Grid</h3>
                    </button>

                    <button class="columns">
                        <img src="./icons/column.png" alt="">
                        <h3>Columns</h3>
                    </button>
                </div>


                <div class="typography">
                    <h1 class="typography-title">Typography</h1>
                    <button class="heading-h1">
                        <img src="./icons/heading.png" alt="">
                        <h3>Heading</h3>
                    </button>

                    <button class="paragraph">
                        <img src="./icons/para.png" alt="">
                        <h3>Paragraph</h3>
                    </button>

                    <button class="text-link">
                        <img src="./icons/link.png" alt="">
                        <h3>Text Link</h3>
                    </button>

                    <button class="blockquote">
                        <img src="./icons/quote.png" alt="">
                        <h3>Quotes</h3>
                    </button>

                    <button class="codeline">
                        <img src="./icons/codeline.png" alt="">
                        <h3>Codeline</h3>
                    </button>
                </div>

                <div class="interactives">
                    <h1 class="interactives-title">Interactives</h1>
                    <button class="button">
                        <img src="./icons/button.png" alt="">
                        <h3>Button</h3>
                    </button>

                    <button class="checkbox">
                        <img src="./icons/checkbox.png" alt="">
                        <h3>Checkbox</h3>
                    </button>

                    <button class="multichoice">
                        <img src="./icons/multichoice.png" alt="">
                        <h3>Multichoice</h3>
                    </button>

                    <button class="choice-menu">
                        <img src="./icons/choiceMenu.png" alt="">
                        <h3>Choice Menu</h3>
                    </button>

                    <button class="text-input">
                        <img src="./icons/textInput.png" alt="">
                        <h3>Text Input</h3>
                    </button>

                    <button class="password-input">
                        <img src="./icons/passInput.png" alt="">
                        <h3>Password Input</h3>
                    </button>

                    <button class="comment-box">
                        <img src="./icons/comment.png" alt="">
                        <h3>Comment Box</h3>
                    </button>

                    <button class="search-box">
                        <img src="./icons/search.png" alt="">
                        <h3>Search Box</h3>
                    </button>

                    <button class="numeric-input">
                        <img src="./icons/numeric.png" alt="">
                        <h3>Numeric Input</h3>
                    </button>

                    <button class="slider">
                        <img src="./icons/slider.png" alt="">
                        <h3>Slider</h3>
                    </button>
                    
                    <button class="color-picker">
                        <img src="./icons/color.png" alt="">
                        <h3>Color Picker</h3>
                    </button>

                    <button class="date-input">
                        <img src="./icons/date.png" alt="">
                        <h3>Date Input</h3>
                    </button>

                    <button class="file-uploader">
                        <img src="./icons/fileUpload.png" alt="">
                        <h3>File Uploader</h3>
                    </button>
                </div>



                

                <div class="multimedia">
                    <h1 class="multimedia-title">Multimedia</h1>
                    <button class="image">
                        <img src="./icons/image.png" alt="">
                        <h3>Image</h3>
                    </button>

                    <button class="video">
                        <img src="./icons/video.png" alt="">
                        <h3>Video</h3>
                    </button>

                    <button class="audio">
                        <img src="./icons/audio.png" alt="">
                        <h3>Audio</h3>
                    </button>

                    <button class="web-page">
                        <img src="./icons/webpage.png" alt="">
                        <h3>Webpage Viewer</h3>
                    </button>
                </div>


                

                <div class="form">
                    <h1 class="form-title">Form</h1>
                    <button class="basic-form">
                        <img src="./icons/form.png" alt="">
                        <h3>Basic Form</h3>
                    </button>

                </div>



            </div>
            <div class="warehouse-category-components warehouse-category-elements">
                    <select class="components-select">
                        <option value="0">My Components</option>
                        <option value="1">My Animations</option>
                        <option value="2">My Selectors</option>
                    </select>
               <div  class="components-container">
               </div>
               <div style="display:none" class="animations-container">
               </div>
               <aside style="display:none" class="selectors-container">
            
               </aside>
            </div>
        </div>
    </div>

    <div class="preview-tab">
        <iframe class="preview-tab-screen"></iframe>
        <iframe style="display:none; height:100% width:100%" class="editor-tab-screen"></iframe>
        <div class="external-css">
            <button data-function="keyframes" class="keyframes"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M280-260q-91.67 0-155.83-64.14Q60-388.28 60-479.91q0-91.63 64.17-155.86Q188.33-700 280-700q62.15 0 115.23 33 53.08 33 80.46 87H900v200h-80v120H620v-120H475.69q-27.38 54-80.46 87T280-260Zm0-60q66 0 106-40.5t48-79.5h246v120h80v-120h80v-80H434q-8-39-48-79.5T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-95.39q26.65 0 45.63-18.98 18.98-18.98 18.98-45.63 0-26.65-18.98-45.63-18.98-18.98-45.63-18.98-26.65 0-45.63 18.98-18.98 18.98-18.98 45.63 0 26.65 18.98 45.63 18.98 18.98 45.63 18.98Zm0-64.61Z"/></svg></button>
            <button style="display:none;" data-function="responsiveness" class="responsiveness"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#66496c"><path d="M136.54-140q-30.31 0-51.31-21-21-21-21-51.31v-75.38q0-30.31 21-51.31 21-21 51.31-21h227.31q30.3 0 51.3 21 21 21 21 51.31v75.38q0 30.31-21 51.31-21 21-51.3 21H136.54Zm460 0q-30.31 0-51.31-21-21-21-21-51.31v-535.38q0-30.31 21-51.31 21-21 51.31-21h227.3q30.31 0 51.31 21 21 21 21 51.31v535.38q0 30.31-21 51.31-21 21-51.31 21h-227.3Zm-460-60h227.31q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-75.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H136.54q-5.39 0-8.85 3.46t-3.46 8.85v75.38q0 5.39 3.46 8.85t8.85 3.46Zm460 0h227.3q5.39 0 8.85-3.46t3.46-8.85v-535.38q0-5.39-3.46-8.85t-8.85-3.46h-227.3q-5.39 0-8.85 3.46t-3.46 8.85v535.38q0 5.39 3.46 8.85t8.85 3.46ZM710-251.54q14.69 0 24.65-9.96 9.96-9.96 9.96-24.65 0-14.31-9.96-24.47-9.96-10.15-24.65-10.15-14.31 0-24.46 10.15-10.16 10.16-10.16 24.47 0 14.69 10.16 24.65 10.15 9.96 24.46 9.96ZM136.54-447.69q-30.31 0-51.31-21-21-21-21-51.31v-227.69q0-30.31 21-51.31 21-21 51.31-21h227.69q30.31 0 51.31 21 21 21 21 51.31V-520q0 30.31-21 51.31-21 21-51.31 21H136.54Zm157.69-195.39q14.69 0 24.66-10.15 9.96-10.15 9.96-24.46 0-14.69-9.96-24.66-9.97-9.96-24.66-9.96t-24.65 9.96q-9.96 9.97-9.96 24.66 0 14.31 9.96 24.46t24.65 10.15Zm-170 123.93 83.08-111.62L300-507.69h64.23q5.39 0 8.85-3.46t3.46-8.85v-227.69q0-5.39-3.46-8.85t-8.85-3.46H136.54q-5.39 0-8.85 3.46t-3.46 8.85v228.54ZM250.39-250Zm459.99-230ZM250.39-633.85Z"/></svg></button>
            <button data-function="selector" class="selector"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#6e5074"><path d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35H560Zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80H280Z"/></svg></button>    
        </div>

          <div class="animation-editor">
            <input type="text" class="keystamp-value" value="0">
<div class="keystamp-slider-container">
    <input type="range" class="keystamp-slider" min="0" max="100" step="1" value="0">
</div>
<button class="key-remove">-</button>
<button class="key-add">+</button>
        </div>
    </div>

    <div class="properties-tab">
        <h1 class="properties-tab-title">Styling <select name="" id="" class="selector-select">
    <option value="-1">inline</option>
</select></h1>
        <div class="properties">
            <div class="background">
    <h1 class="background-title">Background</h1>
    <div class="background-css">
        <span class="background-color">
            <p>Backround Color: </p>
            <input class="bg-color-css style-input" data-dependency="bg-opc-value" data-property="backgroundColor" data-apply="hex-fetch" type="color">
        </span>

        <span class="background-image">
            <span>
                <p>Background Image: </p>
                <input class="bg-img-url style-input" type="url" data-property="backgroundImage" data-apply="url-fetch" placeholder="Enter image url">
                <input class="bg-img style-input" type="image" data-property="backgroundImage">
            </span>

            <span>
                <span class="background-position">
                    <p>Background Position:</p>

                    <p>X: &nbsp
                        <select data-property="backgroundPositionX" data-apply="direct" class="bg-pos-x style-input">
                            <option value="left">left</option>
                            <option value="right">right</option>
                            <option value="center">center</option>
                        </select>
                    </p>


                    <p>Y: &nbsp
                        <select data-property="backgroundPositionY" data-apply="direct" class="bg-pos-y style-input">
                            <option value="top">top</option>
                            <option value="bottom">bottom</option>
                            <option value="center">center</option>
                        </select>
                    </p>

                </span>

                <span class="background-size">
                    <p>Background Size: </p>
                    <select name="" id="" class="bg-size style-input"  data-property="backgroundSize" data-apply="direct">
                        <option value="auto">auto</option>
                        <option value="cover">cover</option>
                        <option value="contain">contain</option>
                        <option value="initial">initial</option>
                        <option value="inherit">inherit</option>
                    </select>
                </span>

                <span class="background-repeat background-size">
                    <p>Background Repeat:</p>
                    <select name="" id="" class="bg-repeat bg-size style-input"  data-property="backgroundRepeat" data-apply="direct">
                        <option value="repeat">repeat</option>
                        <option value="repeat-x">horizontal</option>
                        <option value="repeat-y">vertical</option>
                        <option value="no-repeat">none</option>
                        <option value="initial">inherit</option>
                        <option value="inherit">inherit</option>
                    </select>
                </span>

            </span>

        </span>

        <span class="background-opacity">
            <p>Background Opacity: </p>
            <input type="range" min="0" max="100" data-property="backgroundColor" data-dependency="bg-color-css" data-apply="color-fetch-a*100"  data-sync = ["bg-opc-value"] class="bg-opc-slider style-input sync">
            <input type="text" min="0" max="1" data-property="backgroundColor" data-dependency="bg-color-css" data-apply="color-fetch-a" data-sync = ["bg-opc-slider"] class="bg-opc-value style-input sync">
        </span>

        <span class="opacity background-opacity">
            <p>Opacity:</p>
            <input type="range" min="0" max="100" data-property="opacity"  data-apply="fetch*100"  data-sync = ["opc-value"] class="opc-slider style-input sync">
            <input type="text" min="0" max="1" data-property="opacity"  data-apply="direct" data-sync = ["opc-slider"] class="opc-value style-input sync">
        </span>

        <span class="background-filter">
            <p>Background filter: </p>
            <p>type:
                <select name="" id="" class="bg-filter-type style-input" data-dependency="bg-filter-value" data-property="filter" data-apply="bracket-type-fetch">
                    <option value="none">none</option>
                    <option value="blur">blur</option>
                    <option value="brightness">brightness</option>
                    <option value="contrast">contrast</option>
                    <option value="shadow">shadow</option>
                    <option value="grayscale">grayscale</option>
                    <option value="hue">hue</option>
                    <option value="invert">invert</option>
                    <option value="opacity">opacity</option>
                    <option value="sepia">sepia</option>
                    <option value="saturate">saturate</option>
                </select>
            </p>
            <p>value:
                <input type="text" class="bg-filter-value style-input" data-dependency="bg-filter-type" data-property="filter" data-apply="bracket-value-fetch">
                
            </p>

        </span>
    </div>

</div>





<div class="dimension">
    <h1 class="dimension-title">Dimensions</h1>
    <div class="dimension-css">
        <span class="height">
            <p>Height: </p>
            <span>
                <input type="text" class="height-value style-input" data-dependency="height-unit" data-property="height" data-apply="value-fetch">
                <select name="" id="" class="height-unit style-input" data-dependency="height-value" data-property="height" data-apply="unit-fetch">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>

        </span>


         <span class="min-height">
            <p>Min Height: </p>
            <span>
                <input type="text" class="min-height-value style-input" data-dependency="min-height-unit" data-property="minHeight" data-apply="value-fetch">
                <select name="" id="" class="min-height-unit style-input" data-dependency="min-height-value" data-property="minHeight" data-apply="unit-fetch">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>

        </span>


        <span class="max-height">
            <p>Max Height: </p>
            <span>
                <input type="text" class="max-height-value style-input" data-dependency="max-height-unit" data-property="maxHeight" data-apply="value-fetch">
                <select name="" id="" class="max-height-unit style-input" data-property="maxHeight" data-dependency="max-height-value" data-apply="unit-fetch">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>

        </span>

        <span class="width">
            <p>Width: </p>
            <span>
                <input type="text" class="width-value style-input" data-property="width" data-dependency="width-unit" data-apply="value-fetch">
                <select name="" id="" class="width-unit style-input" data-property="width" data-dependency="width-value" data-apply="unit-fetch">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>

        </span>


         <span class="min-width">
            <p>Min Width: </p>
            <span>
                <input type="text" class="min-width-value style-input" data-dependency="min-width-unit" data-property="minWidth" data-apply="value-fetch">
                <select name="" id="" class="min-width-unit style-input" data-property="minWidth" data-dependency="min-width-value" data-apply="unit-fetch">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>

        </span>


        <span class="max-width">
            <p>Max Width: </p>
            <span>
                <input type="text" class="max-width-value style-input" data-dependency="max-width-unit" data-property="maxWidth" data-apply="value-fetch">
                <select name="" id="" class="max-width-unit style-input" data-property="maxWidth" data-dependency="max-width-value" data-apply="unit-fetch">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>

        </span>


        <span class="margin">
          <span>
            <p>Margin:  </p>
                <span>
                    <input type="text" class="margin-value style-input sync" data-dependency="margin-unit" data-sync=["margin-left-value","margin-right-value","margin-top-value","margin-bottom-value"] data-property="margin" data-apply="value-fetch">
                    <select name="" id="" class="margin-unit style-input sync" data-dependency="margin-value" data-sync=["margin-left-unit","margin-right-unit","margin-top-unit","margin-bottom-unit"] data-property="margin" data-apply="unit-fetch">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>

                <button class="margin-more-button">></button>
            </span>
           

            <div class="margin-more">
              <span>
                <p>Left: </p>
                    <span>
                        <input type="text" class="margin-left-value style-input" data-dependency="margin-left-unit" data-property="marginLeft" data-apply="value-fetch">
                        <select name="" id="" class="margin-left-unit style-input" data-dependency="margin-left-value" data-property="marginLeft" data-apply="unit-fetch">
                             <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                    </span>
                </span>
                

                <span>
                <p>Right:   </p>
                    <span>
                        <input type="text" class="margin-right-value style-input" data-dependency="margin-right-unit" data-property="marginRight" data-apply="value-fetch">
                        <select name="" id="" class="margin-right-unit style-input" data-dependency = "margin-right-value" data-property="marginRight" data-apply="unit-fetch">
                            <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                        </select>
                    </span>
                </span>

                <span>
                <p>Top:    </p>
                    <span>
                        <input type="text" class="margin-top-value style-input" data-dependency="margin-top-unit" data-property="marginTop" data-apply="value-fetch">
                        <select name="" id="" class="margin-top-unit style-input" data-dependency="margin-top-value" data-property="marginTop" data-apply="unit-fetch">
                            <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>            
                        </select>
                    </span>
                </span>


                <span>
                <p>Bottom: </p>
                    <span>
                        <input type="text" class="margin-bottom-value style-input" data-dependency="margin-bottom-unit" data-property="marginBottom" data-apply="value-fetch">
                        <select name="" id="" class="margin-bottom-unit style-input" data-dependency="margin-bottom-value" data-property="marginBottom" data-apply="unit-fetch">
                            <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                        </select>
                    </span>
                </span>



            </div>


        </span>



        <span class="padding">
          <span>
            <p>Padding:    </p>
                <span>
                    <input type="text" class="padding-value style-input sync" data-dependency="padding-unit" data-sync=["padding-left-value","padding-right-value","padding-top-value","padding-bottom-value"] data-property="padding" data-apply="value-fetch">
                    <select name="" id="" class="padding-unit style-input sync" data-dependency="padding-value" data-sync=["padding-left-unit","padding-right-unit","padding-top-unit","padding-bottom-unit"] data-property="padding" data-apply="unit-fetch">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                    </select>
                </span>

                <button class="padding-more-button">></button>

            </span>

            <div class="padding-more">
                <span>
                <p>Left: </p>
                    <span>
                        <input type="text" class="padding-left-value style-input" data-dependency="padding-left-unit" data-property="paddingLeft" data-apply="value-fetch">
                        <select name="" id="" class="padding-left-unit style-input" data-dependency="padding-left-value" data-property="paddingLeft" data-apply="unit-fetch">
                            <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                        </select>
                    </span>
                </span>


                <span>
                <p>Right: </p>
                    <span>
                        <input type="text" class="padding-right-value style-input" data-dependency="padding-right-unit" data-property="paddingRight" data-apply="value-fetch">
                        <select name="" id="" class="padding-right-unit style-input" data-dependency="padding-right-value" data-property="paddingRight" data-apply="unit-fetch">
                           <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                        </select>
                    </span>
                </span>

                <span>
                <p>Top: </p>
                    <span>
                        <input type="text" class="padding-top-value style-input" data-dependency="padding-top-unit" data-property="paddingTop" data-apply="value-fetch">
                        <select name="" id="" class="padding-top-unit style-input" data-property="paddingTop" data-dependency="padding-top-value" data-apply="unit-fetch">
                           <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                        </select>
                    </span>
                </span>


                <span>
                <p>Bottom: </p>
                    <span>
                        <input type="text" class="padding-bottom-value style-input" data-dependency="padding-bottom-unit" data-property="paddingBottom" data-apply="value-fetch">
                        <select name="" id="" class="padding-bottom-unit style-input" data-property="paddingBottom" data-dependency="padding-bottom-value" data-apply="unit-fetch">
                           <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                        </select>
                    </span>
                </span>
            </div>
        </span>
    </div>
</div>



<div class="layout">
    <h1 class="layout-title">Layout</h1>
    <div class="layout-css">
        <span>
        <p class="content-diection">Content Direction: </p>
            <select name="" id="" class="content-direction-select style-input" data-property="flexDirection" data-apply="direct">
                <option value="row">row</option>
                <option value="column">column</option>
            </select>
        </span>

        <span>
        <p class="content-alignment">Content Alignment: </p>
        <p>X: <select name="" id="" class="content-alignment-select-x style-input" data-property="justifyContent" data-apply="direct">              
                <option value="start">left</option>
                <option value="center">center</option>
                <option value="end">right</option>
            </select></p>

        <p>Y: <select name="" id="" class="content-alignment-select-y style-input" data-property="alignItems" data-apply="direct">
                <option value="start">top</option>
                <option value="center">center</option>
                <option value="end">bottom</option>
            </select></p>
        </span>


        <span>
        <p class="self-alignment">Self Alignment: </p>
        <p>X: <select name="" id="" class="self-alignment-select-x style-input" data-property="justifySelf" data-apply="direct">
                <option value="start">left</option>
                <option value="center">center</option>
                <option value="end">right</option>
            </select></p>


        <p>Y: <select name="" id="" class="self-alignment-select-y style-input" data-property="alignSelf" data-apply="direct">
                <option value="start">top</option>
                <option value="center">center</option>
                <option value="end">bottom</option>
            </select></p>
        </span>


        <span>
        <p class="space-bw-content">Space b/w Content: </p>
        <p>X: <input type="text" class="space-bw-content-value-x style-input" data-property="columnGap" data-dependency="space-bw-content-unit-x" data-apply="value-fetch">
            <select name="" id="" class="space-bw-content-unit-x style-input" data-property="columnGap" data-dependency="space-bw-content-value-x" data-apply="unit-fetch">
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="vmin">vmin</option>
                <option value="vmax">vmax</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
            </select>
        </p>

        <p>Y: <input type="text" class="space-bw-content-value-y style-input" data-dependency="space-bw-content-unit-y" data-property="rowGap" data-apply="value-fetch">
            <select name="" id="" class="space-bw-content-unit-y style-input" data-dependency="space-bw-content-value-y" data-property="columnGap" data-apply="unit-fetch">
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="vmin">vmin</option>
                <option value="vmax">vmax</option>
                <option value="em">em</option>
                <option value="rem">rem</option>
            </select>
        </p>

        </span>


        <span>
        <p class="content-overflow">Content Overflow: </p>
        <p class="content-overflow-x">X: <select name="" id="" class="content-overflow-select-x style-input" data-property="overflowX" data-apply="direct">
                <option value="hidden">hidden</option>
                <option value="scroll">scroll</option>
                <option value="auto">auto</option>
                <option value="initial">initial</option>
                <option value="inherit">inherit</option>
                <option value="visible">visible</option>
            </select>
        </p>


        <p class="content-overflow-y">Y: <select name="" id="" class="content-overflow-select-y style-input" data-property="overflowY" data-apply="direct">
                <option value="hidden">hidden</option>
                <option value="scroll">scroll</option>
                <option value="auto">auto</option>
                <option value="initial">initial</option>
                <option value="inherit">inherit</option>
                <option value="visible">visible</option>
            </select>
        </p>

        </span>



        <span class="advance-layout-options">
            <span class="advance-layout-options-title-span">
                <h3 class="advance-layout-options-title">Advance Options:</h3>
                <button class="advance-layout-options-button">></button>
            </span>

            <h5 class="advance-layout-options-display">Display: <select name="" id="" class="display-select content-direction-select style-input" data-property="display" data-apply="direct">
                    <option value="flex">flex</option>
                    <option value="grid">grid</option>
                    <option value="block">block</option>
                    <option value="inline">inline block</option>
                    <option value="none">none</option>
                </select></h5>
            <div class="display-flex-properties">
                <p>Direction: <select name="" id="" class="display-flex-direction content-direction-select style-input" data-property="flexDirection" data-apply="direct">
                        <option value="row">row</option>
                        <option value="column">column</option>
                        <option value="row-reverse">row reverse</option>
                        <option value="column-reverse">col reverse</option>
                    </select></p>

                <p>Justify: <select name="" id="" class="display-flex-justify content-direction-select style-input" data-property="justifyContent" data-apply="direct">
                        <option value="start">start</option>
                        <option value="center">center</option>
                        <option value="end">end</option>
                        <option value="space-between">space between</option>
                    </select></p>


                <p>Align: <select name="" id="" class="display-flex-align content-direction-select style-input" data-property="alignItems" data-apply="direct">
                        <option value="start">start</option>
                        <option value="center">center</option>
                        <option value="end">end</option>
                        <option value="stretch">stretch</option>
                    </select></p>
               
                <p class="display-flex-wrap">Wrap:
                    <select name="" id="" class="display-flex-wrap-value content-direction-select style-input" data-property="flexWrap" data-apply="direct">
                        <option value="nowrap">no</option>
                        <option value="wrap">wrap</option>
                        <option value="wrap-reverse">reverse</option>
                        <option value="initial">initial</option>
                        <option value="inherit">inherit</option>
                    </select>
                </p>

                <p class="display-flex-grow">Grow:
                    <select name="" id="" class="display-flex-grow-value content-direction-select style-input" data-property="flexGrow" data-apply="direct">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </p>

                <p class="display-flex-shrink">Shrink:
                    <select name="" id="" class="display-flex-shrink-value content-direction-select style-input" data-property="flexShrink" data-apply="direct">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </p>

                <p class="display-flex-order">Order:
                    <input type="text" name="" id="" class="display-flex-order-value content-direction-select style-input" data-property="order" data-apply="direct">
                </p>
            </div>

            <div class="display-grid-properties display-flex-properties">
            </div>
        </span>
    </div>
</div>



          <div class="positioning">
    <h1 class="positioning-title">Positioning</h1>
    <div class="positioning-css">
        <span class="position">
           <span class="position-inner-span">
            <p class="position-title">Position:</p>
            <select name="" id="" class="position-select content-direction-select style-input" data-property="position" data-runwith=["left-value","top-value"] data-apply="direct">
                <option value="static">static</option>
                <option value="absolute">absolute</option>
                <option value="relative">relative</option>
                <option value="fixed">fixed</option>
                <option value="sticky">sticky</option>
                <option value="initial">initial</option>
                <option value="inherit">inherit</option>
            </select>
           </span>

           <span class="position-more">
            <p class="left-p">Left:
                <span class="left-p-inner-span">
                    <input type="text" class="left-value style-input" data-property="left" data-clashwith="right-value" data-apply="value-fetch" data-dependency="left-unit">
                    <select name="" id="" class="left-unit style-input" data-property="left" data-clashwith="right-unit" data-apply="unit-fetch" data-dependency="left-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </p>


            <p class="right-p">Right:
                <span class="right-p-inner-span">
                    <input type="text" class="right-value style-input" data-property="right" data-clashwith="left-value" data-apply="value-fetch" data-dependency="right-unit">
                    <select name="" id="" class="right-unit style-input" data-property="right" data-clashwith="left-unit" data-apply="unit-fetch" data-dependency="right-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </p>


            <p class="top-p">Top:
                <span class="top-p-inner-span">
                    <input type="text" class="top-value style-input" data-clashwith="bottom-value" data-property="top" data-apply="value-fetch" data-dependency="top-unit">
                    <select name="" id="" class="top-unit style-input" data-clashwith="bottom-unit" data-property="top" data-apply="unit-fetch" data-dependency="top-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </p>


            <p class="bottom-p">Bottom:
                <span class="bottom-p-inner-span">
                    <input type="text" class="bottom-value style-input" data-clashwith="top-value" data-property="bottom" data-apply="value-fetch" data-dependency="bottom-unit">
                    <select name="" id="" class="bottom-unit style-input" data-clashwith="top-unit" data-property="bottom" data-apply="unit-fetch" data-dependency="bottom-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </p>

           </span>
        </span>


        <span class="z-index">
            <p>Z Index:</p>
            <input type="text" class="z-index-value content-direction-select style-input" data-property="zIndex" data-apply="direct">
        </span>

        <span class="float">
            <p>Float:</p>
            <select name="" id="" class="float-select content-direction-select style-input" data-property="float" data-apply="direct">
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="none">none</option>
            </select>
        </span>

        <span class="clear">
            <p>Clear:</p>
            <select name="" id="" class="clear-select content-direction-select style-input" data-property="clear" data-apply="direct">
                <option value="both">both</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="none">none</option>
            </select>
        </span>

        <span class="object-fit">
            <p>Object Fit:</p>
            <select name="" id="" class="object-fit-select content-direction-select style-input" data-property="objectFit" data-apply="direct">
                <option value="fill">fill</option>
                <option value="contain">contain</option>
                <option value="cover">cover</option>
                <option value="scale-down">scale down</option>
                <option value="none">none</option>
                <option value="initial">initial</option>
                <option value="inherit">inherit</option>
            </select>
        </span>


        <span class="object-position">
            <p>Object Position:</p>
            <select name="" id="" class="object-position-select content-direction-select style-input" data-property="objectPosition" data-apply="direct">
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="center">center</option>
            </select>

            <span class="object-position-inner-span">
                <p class="object-position-x">X:
                    <span class="object-position-x-inner-span">
                        <input type="text" class="object-position-x-value">
                        <select name="" id="" class="object-position-x-unit">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                    </span>
                </p>

                <p class="object-position-y">Y:
                    <span class="object-position-y-inner-span">
                        <input type="text" class="object-position-y-value">
                        <select name="" id="" class="object-position-y-unit">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                    </span>
                </p>
            </span>

            <button class="object-position-switch"></button>
        </span>

    </div>

    
</div>


        <div class="border">
    <h1 class="border-title">Border</h1>
    <div class="border-css">
        <span class="border-style position">
            <span class="border-style-all position-inner-span">
                <p class="border-style-p position-title">Border:</p>
                <span class="border-style-all-property-span">
                    <select name="" id="" class="border-style-select content-direction-select sync style-input" data-sync=["border-style-left-select","border-style-right-select","border-style-top-select","border-style-bottom-select"]  data-property="borderStyle" data-apply="direct">
                        <option value="none">none</option>
                        <option value="solid">solid</option>
                        <option value="dashed">dashed</option>
                        <option value="dotted">dotted</option>
                        <option value="double">double</option>
                    </select>

                    <input type="color" class="border-style-color color-input sync style-input" data-sync=["border-style-left-color","border-style-right-color","border-style-top-color","border-style-bottom-color"] data-property="borderColor" data-apply="hex-fetch">

                    <button class="border-style-more-button more-button"></button>
                </span>
            </span>

            <span class="border-style-more position-more">
                <p class="border-style-left">Left:
                    <span class="border-style-left-inner-span">
                        <select name="" id="" class="border-style-left-select style-input" data-property="borderLeftStyle" data-apply="direct">
                            <option value="none">none</option>
                            <option value="solid">solid</option>
                            <option value="dashed">dashed</option>
                            <option value="dotted">dotted</option>
                            <option value="double">double</option>
                        </select>

                        <input type="color" class="border-style-left-color style-input" data-property="borderLeftColor" data-apply="hex-fetch">
                    </span>
                </p>


                <p class="border-style-right">Right:
                    <span class="border-style-right-inner-span">
                        <select name="" id="" class="border-style-right-select style-input" data-property="borderRightStyle" data-apply="direct">
                            <option value="none">none</option>
                            <option value="solid">solid</option>
                            <option value="dashed">dashed</option>
                            <option value="dotted">dotted</option>
                            <option value="double">double</option>
                        </select>

                        <input type="color" class="border-style-right-color style-input" data-property="borderRightColor" data-apply="hex-fetch">
                    </span>
                </p>


                <p class="border-style-top">Top:
                    <span class="border-style-top-inner-span">
                        <select name="" id="" class="border-style-top-select style-input" data-property="borderTopStyle" data-apply="direct">
                            <option value="none">none</option>
                            <option value="solid">solid</option>
                            <option value="dashed">dashed</option>
                            <option value="dotted">dotted</option>
                            <option value="double">double</option>
                        </select>

                        <input type="color" class="border-style-top-color style-input" data-property="borderTopColor" data-apply="hex-fetch">
                    </span>
                </p>
                

                <p class="border-style-bottom">Bottom:
                    <span class="border-style-bottom-inner-span">
                        <select name="" id="" class="border-style-bottom-select style-input" data-property="borderBottomStyle" data-apply="direct">
                            <option value="none">none</option>
                            <option value="solid">solid</option>
                            <option value="dashed">dashed</option>
                            <option value="dotted">dotted</option>
                            <option value="double">double</option>
                        </select>

                        <input type="color" class="border-style-bottom-color style-input" data-property="borderBottomColor" data-apply="hex-fetch">
                    </span>
                </p>
    
               </span>
            </span>


            <span class="border-width position">
                <span class="border-width-all position-inner-span">
                    <p class="border-width-all-p">Border Width:</p>
                    <span class="border-width-all-property-span border-style-all-property-span input-select-button">
                        <input type="text" class="border-width-value style-input sync"  data-sync=["border-width-left-value","border-width-right-value","border-width-top-value","border-width-bottom-value"] data-property="borderWidth" data-apply="value-fetch" data-dependency="border-width-unit">
                        <select name="" id="" class="border-width-unit style-input sync" data-sync=["border-width-left-unit","border-width-right-unit","border-width-top-unit","border-width-bottom-unit"] data-property="borderWidth" data-apply="unit-fetch" data-dependency="border-width-value">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                        <button class="border-width-more-button">></button>
                    </span>
                </span>

                <span class="border-width-more position-more">
                    <p class="border-width-left">Left:
                        <span class="border-width-left-inner-span">

                            <input type="text" class="border-width-left-value style-input" data-property="borderLeftWidth" data-apply="value-fetch" data-dependency="border-width-left-unit">

                            <select name="" id="" class="border-width-left-unit" data-property="borderLeftWidth" data-apply="unit-fetch" data-dependency="border-width-left-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>

                    <p class="border-width-right">Right:
                        <span class="border-width-right-inner-span">

                            <input type="text" class="border-width-right-value style-input" data-property="borderRightWidth" data-apply="value-fetch" data-dependency="border-width-right-unit">

                            <select name="" id="" class="border-width-right-unit style-input" data-property="borderRightWidth" data-apply="unit-fetch" data-dependency="border-width-right-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>

                    <p class="border-width-top">Top:
                        <span class="border-width-top-inner-span">

                            <input type="text" class="border-width-top-value style-input" data-property="borderTopWidth" data-apply="value-fetch" data-dependency="border-width-top-unit">

                            <select name="" id="" class="border-width-top-unit style-input" data-property="borderTopWidth" data-apply="unit-fetch" data-dependency="border-width-top-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>

                    <p class="border-width-bottom">Bottom:
                        <span class="border-width-bottom-inner-span">

                            <input type="text" class="border-width-bottom-value style-input" data-property="borderBottomWidth" data-apply="value-fetch" data-dependency="border-width-bottom-unit">

                            <select name="" id="" class="border-width-bottom-unit style-input" data-property="borderBottomWidth" data-apply="unit-fetch" data-dependency="border-width-bottom-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>
                </span>
            </span>


            <span class="border-radius position">
                <span class="border-radius-all position-inner-span">
                    <p class="border-radius-all-p">Border Radius:</p>
                    <span class="border-radius-all-property-span border-style-all-property-span input-select-button">
                        <input type="text" class="border-radius-value style-input sync" data-sync=["border-radius-top-left-value","border-radius-top-right-value","border-radius-bottom-right-value","border-radius-bottom-left-value"] data-property="borderRadius" data-apply="value-fetch" data-dependency="border-radius-unit">
                        <select name="" id="" class="border-radius-unit style-input sync" data-sync=["border-radius-top-left-unit","border-radius-top-right-unit","border-radius-bottom-right-unit","border-radius-bottom-left-unit"] data-property="borderRadius" data-apply="unit-fetch" data-dependency="border-radius-value">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                        <button class="border-radius-more-button">></button>
                    </span>
                </span>

                <span class="border-radius-more position-more">
                    <p class="border-radius-top-left">Top &nbsp Left:
                        <span class="border-radius-top-left-inner-span">

                            <input type="text" class="border-radius-top-left-value style-input" data-property="borderTopLeftRadius" data-apply="value-fetch" data-dependency="border-radius-top-left-unit">

                            <select name="" id="" class="border-radius-top-left-unit style-input" data-property="borderTopLeftRadius" data-apply="unit-fetch" data-dependency="border-radius-top-left-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>

                    <p class="border-radius-top-right">Top Right:
                        <span class="border-radius-top-right-inner-span">

                            <input type="text" class="border-radius-top-right-value style-input" data-property="borderTopRightRadius" data-apply="value-fetch" data-dependency="border-radius-top-right-unit">

                            <select name="" id="" class="border-radius-top-right-unit style-input" data-property="borderTopRightRadius" data-apply="unit-fetch" data-dependency="border-radius-top-right-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>

                    <p class="border-radius-bottom-right">Bottom Right:
                        <span class="border-radius-bottom-right-inner-span">

                            <input type="text" class="border-radius-bottom-right-value style-input" data-property="borderBottomRightRadius" data-apply="value-fetch" data-dependency="border-radius-bottom-right-unit">

                            <select name="" id="" class="border-radius-bottom-right-unit style-input" data-property="borderBottomRightRadius" data-apply="unit-fetch" data-dependency="border-radius-bottom-right-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>

                    <p class="border-radius-bottom-left">Bottom Left:
                        <span class="border-radius-bottom-left-inner-span">

                            <input type="text" class="border-radius-bottom-left-value style-input" data-property="borderBottomLeftRadius" data-apply="value-fetch" data-dependency="border-radius-bottom-left-unit">

                            <select name="" id="" class="border-radius-bottom-left-unit style-input" data-property="borderBottomLeftRadius" data-apply="unit-fetch" data-dependency="border-radius-bottom-left-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>
                </span>
            </span>



    </div>
</div>

        <div class="text">
    <h1 class="text-title">Text</h1>
    <div class="text-css">
        <span class="font-color">
            <p>Text Color:</p>
            <input type="color" class="font-color-value content-direction-select style-input" data-property="color" data-apply="hex-fetch">
        </span>

        <span class="font position">
            <span class="font-property position-inner-span">
                <p>Font: </p>
                <span class="font-inner-span input-select-button">
                    <select name="" id="" class="font-value style-input" data-property="fontFamily" data-apply="direct">
                        <option value="auto">auto</option>
                        <option value="cursive">cursive</option>
                        <option value="emoji">emoji</option>
                        <option value="fangsong">fangsong</option>
                        <option value="fantasy">fantasy</option>
                        <option value="maths">maths</option>
                        <option value="monospace">monospace</option>
                        <option value="sans-serif">sans serif</option>
                        <option value="inherit">inherit</option>
                        <option value="initial">initial</option>
                    </select>
                    <button class="font-more-button">></button>
                    <button class="font-add">+</button>
                </span>
            </span>

            <input type="text" class="font-family content-direction-select" placeholder="Custom Font Family">
        </span>

        <span class="font-size">
            <p>Font Size:</p>
            <span class="font-size-inner-span value-unit">
                <input type="text" class="font-size-value style-input" data-property="fontSize" data-apply="value-fetch" data-dependency="font-size-unit">
                <select name="" id="" class="font-size-unit style-input" data-property="fontSize" data-apply="unit-fetch" data-dependency="font-size-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                </select>
            </span>
        </span>

        <span class="font-weight position">
            <span class="font-weight-property position-inner-span">
                <p>Font Weight:</p>
                <span class="font-weight-inner-span value-unit">
                    <select name="" id="" class="font-weight-select style-input" data-property="fontWeight" data-apply="direct">
                        <option value="100">thin</option>
                        <option value="400">normal</option>
                        <option value="700">bold</option>
                    </select>

                    <button class="font-weight-more-button">></button>
                </span>
            </span>

            <span class="font-weight-more slider-value">
                <input type="range" min="0" max="1000" class="font-weight-slider style-input sync" data-property="fontWeight" data-apply="direct" data-sync=["font-weight-value"]>
                <input type="text" class="font-weight-value style-input sync" data-property="fontWeight" data-apply="direct" data-sync=["font-weight-slider"]>
            </span>
        </span>

        <span class="font-style">
            <p>Font Style:</p>
            <select name="" id="" class="font-style-select content-direction-select style-input" data-property="fontStyle" data-apply="direct">
                <option value="normal">normal</option>
                <option value="italic">italic</option>
                <option value="oblique">oblique</option>
                <option value="initial">initial</option>
                <option value="inherit">inherit</option>
            </select>
        </span>

        <span class="text-align">
            <p>Text Align:</p>
            <form class="text-align-inner-span sequential-buttons style-input" data-property="textAlign" data-apply="radio-fetch">
               <label for="text-align-left" class="text-align-label-left"><input style="display: none;" data-property="textAlign" data-apply="direct" type="radio" name="text-align-radio" id="text-align-left" value="left"></label>
               <label for="text-align-center" class="text-align-label-center"><input style="display: none;" data-property="textAlign" data-apply="direct" type="radio" name="text-align-radio" id="text-align-center" value="center"></label>
               <label for="text-align-right" class="text-align-label-right"><input style="display: none;" data-property="textAlign" data-apply="direct" type="radio" name="text-align-radio" id="text-align-right" value="right"></label>
               <label for="text-align-justify" class="text-align-label-justify"><input style="display: none;" data-property="textAlign" data-apply="direct" type="radio" name="text-align-radio" id="text-align-justify" value="justify"></label>
            </form>
        </span>

        <span class="spacing">
            <p>Spacing:</p>
            <span class="spacing-inner-span sequential-value-units">
                <p class="spacing-letter">Letter:
                    <span>
                        <input type="text" class="spacing-letter-value style-input" data-property="letterSpacing" data-apply="value-fetch" data-dependency="spacing-letter-unit">
                        <select name="" id="" class="spacing-letter-unit style-input" data-property="letterSpacing" data-apply="unit-fetch" data-dependency="spacing-letter-value">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                    </span>
                </p>

                <p class="spacing-line">Line:
                    <span>
                        <input type="text" class="spacing-line-value style-input" data-property="lineHeight" data-apply="value-fetch" data-dependency="spacing-line-unit">
                        <select name="" id="" class="spacing-line-unit style-input" data-property="lineHeight" data-apply="unit-fetch" data-dependency="spacing-line-value">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                    </span>
                </p>

                <p class="spacing-word">Word:
                    <span>
                        <input type="text" class="spacing-word-value style-input" data-property="wordSpacing" data-apply="value-fetch" data-dependency="spacing-word-unit">
                        <select name="" id="" class="spacing-word-unit style-input" data-property="wordSpacing" data-apply="unit-fetch" data-dependency="spacing-word-value">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                    </span>
                </p>
            </span>
        </span>


        <span class="text-decoration position">
            <span class="text-decoration-property position-inner-span">
                <p>Text Decoration:</p>
                <select name="" id="" class="text-decoration-select content-direction-select style-input" data-property="textDecorationLine" data-apply="direct">
                    <option value="none">none</option>
                    <option value="underline">underline</option>
                    <option value="overline">overline</option>
                    <option value="line-through">line through</option>
                    <option value="initial">initial</option>
                    <option value="inherit">inherit</option>
                </select>
            </span>

            <span class="text-decoration-more position-more">
                <span class="text-decoration-style-span position-inner-span">
                    <p>Decoration Style:</p>
                    <span class="text-decoration-style-inner-span value-unit style-input" data-property="textDecorationStyle" data-apply="value-fetch" data-dependency="text-decoration-style-select">
                    <select name="" id="" class="text-decoration-style-select style-input" data-property="textDecorationStyle" data-apply="unit-fetch" data-dependency="text-decoration-style-inner-span">
                        <option value="solid">solid</option>
                        <option value="double">double</option>
                        <option value="dotted">dotted</option>
                        <option value="dashed">dashed</option>
                        <option value="wavy">wavy</option>
                        <option value="initial">initial</option>
                        <option value="inherit">inherit</option>
                    </select>

                    <input type="color" class="text-decoration-style-color style-input" data-property="textDecorationColor" data-apply="hex-fetch">
                    </span>
                </span>

                <span class="text-decoration-thickness position-inner-span">
                    <p>Decoration Thickness:</p>
                    <span class="text-decoration-thickness-inner-span value-unit">
                        <input type="text" class="text-decoration-thickness-value style-input" data-property="textDecorationThickness" data-apply="value-fetch" data-dependency="text-decoration-thickness-unit">
                        <select name="" id="" class="text-decoration-thickness-unit style-input" data-property="textDecorationThickness" data-apply="unit-fetch" data-dependency="text-decoration-thickness-value style-input">
                            <option value="px">px</option>
                            <option value="%">%</option>
                            <option value="vw">vw</option>
                            <option value="vh">vh</option>
                            <option value="vmin">vmin</option>
                            <option value="vmax">vmax</option>
                            <option value="em">em</option>
                            <option value="rem">rem</option>
                        </select>
                    </span>
                </span>
            </span>
            
        </span>

        <span class="text-transform">
            <p>Text Transform:</p>
            <select name="" id="" class="text-transform-select content-direction-select style-input" data-property="textTransform" data-apply="direct">
                <option value="none">none</option>
                <option value="capitalize">capitalize</option>
                <option value="uppercase">uppercase</option>
                <option value="lowercase">lowercase</option>
                <option value="initial">initial</option>
                <option value="inherit">inherit</option>
            </select>
        </span>

        <span class="text-wrap">
            <p>Text Wrap:</p>
            <select name="" id="" class="text-wrap-select content-direction-select style-input" data-property="textWrap" data-apply="direct">
                <option value="wrap">wrap</option>
                <option value="nowrap">no wrap</option>
                <option value="balance">balance</option>
                <option value="pretty">pretty</option>
                <option value="stable">stable</option>
            </select>
        </span>

        <span class="text-direction">
            <p>Text Direction:</p>
            <select name="" id="" class="text-direction-select content-direction-select style-input" data-property="direction" data-apply="direct">
                <option value="ltr">--&gt</option>
                <option value="rtl">&lt--</option>
            </select>
        </span>

        <span class="text-shadow position">
          <span class="text-shadow-more position-more">
            <span class="text-shadow-position">
                <p>Shadow Position:</p>
                <span class="text-shadow-position-inner-span sequential-value-units">
                    <p class="text-shadow-position-x">X:
                        <span>
                            <input type="text" class="text-shadow-position-x-value style-input" data-shorthead="0" data-sync=["custom-text-shadow-value","text-shadow-custom","text-shadow-select"] data-property="textShadow" data-apply="value-fetch" data-dependency="text-shadow-position-x-unit">
                            <select name="" id="" class="text-shadow-position-x-unit style-input" data-shorthead="0" data-sync=["custom-text-shadow-value","text-shadow-custom","text-shadow-select"] data-property="textShadow" data-apply="unit-fetch" data-dependency="text-shadow-position-x-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>

                    <p class="text-shadow-position-y">Y:
                        <span>
                            <input type="text" class="text-shadow-position-y-value style-input" data-shorthead="1" data-sync=["custom-text-shadow-value","text-shadow-custom","text-shadow-select"] data-property="textShadow" data-apply="value-fetch" data-dependency="text-shadow-position-y-unit">
                            <select name="" id="" class="text-shadow-position-y-unit style-input" data-shorthead="1" data-sync=["custom-text-shadow-value","text-shadow-custom","text-shadow-select"] data-property="textShadow" data-apply="unit-fetch" data-dependency="text-shadow-position-y-value">
                                <option value="px">px</option>
                                <option value="%">%</option>
                                <option value="vw">vw</option>
                                <option value="vh">vh</option>
                                <option value="vmin">vmin</option>
                                <option value="vmax">vmax</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                            </select>
                        </span>
                    </p>
                </span>
            </span>

            <span class="text-shadow-blur">
                <p>Shadow Blur:</p>
                <span class="text-shadow-blur-inner-span value-unit">
                    <input type="text" class="text-shadow-blur-value style-input" data-shorthead="2" data-sync=["custom-text-shadow-value","text-shadow-custom","text-shadow-select"] data-property="textShadow" data-apply="value-fetch" data-dependency="text-shadow-blur-unit">
                    <select name="" id="" class="text-shadow-blur-unit style-input" data-shorthead="2" data-sync=["custom-text-shadow-value","text-shadow-custom","text-shadow-select"] data-property="textShadow" data-apply="unit-fetch" data-dependency="text-shadow-blur-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </span>


            <span class="text-shadow-color">
                <p>Shadow Color:</p>
                <input type="color" class="text-shadow-color-value content-direction-select style-input" data-shorthead="3" data-sync=["custom-text-shadow-value","text-shadow-custom","text-shadow-select"] data-property="textShadow" data-apply="hex-fetch">
            </span>
          </span>
        </span>
    </div>
</div>


        <div class="transform">
    <h1 class="transform-title">Transform</h1>
    <div class="transform-css">
        <span class="transform-type">
            <p>Transform:</p>
            <select name="" id="" class="transform-type-select content-direction-select" data-property="none">
                <option id="translate" value="translate">translate</option>
                <option id="rotate"  value="rotate">rotate</option>
                <option id="scale" value="scale">scale</option>
                <option id="skew" value="skew">skew</option>
            </select>
        </span>

        <span style="display:flex;" class="transform-more-translate transform-more">
        <span class="transform-x">
            <p>X:</p>
            <span class="transform-x-inner-span slider-value-unit">
                <input type="range" min="0" max="100" class="transform-translate-x-slider style-input sync" data-sync=["transform-translate-x-value"] data-property="translate" data-apply="value-fetch" data-dependency="transform-translate-x-unit" data-shorthead="0">
                <span class="transform-x-inner-span-inner">
                    <input type="text" class="transform-translate-x-value style-input sync" data-sync=["transform-translate-x-slider"] data-property="translate" data-apply="value-fetch" data-shorthead="0" data-dependency="transform-translate-x-unit">
                    <select name="" id="" class="transform-translate-x-unit style-input" data-property="translate" data-apply="unit-fetch" data-shorthead="0" data-dependency="transform-translate-x-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </span>
        </span>

         <span class="transform-y">
            <p>Y:</p>
            <span class="transform-y-inner-span slider-value-unit">
                <input type="range" min="0" max="100" class="transform-translate-y-slider style-input sync" data-sync=["transform-translate-y-value"] data-property="translate" data-apply="value-fetch" data-shorthead="1" data-dependency="transform-translate-y-unit">
                <span class="transform-y-inner-span-inner">
                    <input type="text" class="transform-translate-y-value style-input sync" data-sync=["transform-translate-y-slider"] data-property="translate" data-apply="value-fetch" data-shorthead="1" data-dependency="transform-translate-y-unit">
                    <select name="" id="" class="transform-translate-y-unit style-input" data-property="translate" data-apply="unit-fetch" data-shorthead="1" data-dependency="transform-translate-y-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </span>
        </span>


         <span class="transform-z">
            <p>Z:</p>
            <span class="transform-z-inner-span slider-value-unit">
                <input type="range" min="0" max="100" class="transform-translate-z-slider style-input sync" data-sync=["transform-translate-z-value"] data-property="translate" data-apply="value-fetch" data-shorthead="2" data-dependency="transform-translate-z-unit">
                <span class="transform-z-inner-span-inner">
                    <input type="text" class="transform-translate-z-value style-input sync" data-sync=["transform-translate-z-slider"]  data-property="translate" data-apply="value-fetch" data-shorthead="2" data-dependency="transform-translate-z-unit">
                    <select name="" id="" class="transform-translate-z-unit style-input" data-property="translate" data-apply="unit-fetch" data-shorthead="2" data-dependency="transform-translate-z-value">
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vw">vw</option>
                        <option value="vh">vh</option>
                        <option value="vmin">vmin</option>
                        <option value="vmax">vmax</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                </span>
            </span>
        </span>
        </span>


        <span style="display:none;" class="transform-more-rotate transform-more">
        <span class="transform-x">
            <p>X:</p>
            <span class="transform-x-inner-span slider-value-unit">
                <input type="range" min="0" max="360" class="transform-rotate-x-slider style-input sync" data-sync=["transform-rotate-x-value"] data-property="transform" data-apply="value-fetch" data-dependency="transform-rotate-x-unit" data-shorthead="1">
                <span class="transform-x-inner-span-inner">
                    <input type="text" class="transform-rotate-x-value style-input sync" data-sync=["transform-rotate-x-slider"] data-property="transform" data-apply="value-fetch" data-shorthead="1" data-dependency="transform-rotate-x-unit">
                    <select name="" id="" class="transform-rotate-x-unit style-input" data-property="transform" data-apply="unit-fetch" data-shorthead="1" data-dependency="transform-rotate-x-value">
                        <option value="deg">deg</option>
                        <option value="grad">grad</option>
                        <option value="rad">rad</option>
                        <option value="turn">turn</option>
                    </select>
                </span>
            </span>
        </span>

         <span class="transform-y">
            <p>Y:</p>
            <span class="transform-y-inner-span slider-value-unit">
                <input type="range" min="0" max="360" class="transform-rotate-y-slider style-input sync" data-sync=["transform-rotate-y-value"] data-property="transform" data-apply="value-fetch" data-shorthead="4" data-dependency="transform-rotate-y-unit">
                <span class="transform-y-inner-span-inner">
                    <input type="text" class="transform-rotate-y-value style-input sync" data-sync=["transform-rotate-y-slider"] data-property="transform" data-apply="value-fetch" data-shorthead="4" data-dependency="transform-rotate-y-unit">
                    <select name="" id="" class="transform-rotate-y-unit style-input" data-property="transform" data-apply="unit-fetch" data-shorthead="4" data-dependency="transform-rotate-y-value">
                        <option value="deg">deg</option>
                        <option value="grad">grad</option>
                        <option value="rad">rad</option>
                        <option value="turn">turn</option>
                    </select>
                </span>
            </span>
        </span>


         <span class="transform-z">
            <p>Z:</p>
            <span class="transform-z-inner-span slider-value-unit">
                    <input type="range" min="0" max="360" class="transform-rotate-z-slider style-input sync" data-sync=["transform-rotate-z-value"] data-property="transform" data-apply="value-fetch" data-shorthead="7" data-dependency="transform-rotate-z-unit">
                <span class="transform-z-inner-span-inner">
                    <input type="text" class="transform-rotate-z-value style-input sync" data-sync=["transform-rotate-z-slider"]  data-property="transform" data-apply="value-fetch" data-shorthead="7" data-dependency="transform-rotate-z-unit">
                    <select name="" id="" class="transform-rotate-z-unit style-input" data-property="transform" data-apply="unit-fetch" data-shorthead="7" data-dependency="transform-rotate-z-value">
                        <option value="deg">deg</option>
                        <option value="grad">grad</option>
                        <option value="rad">rad</option>
                        <option value="turn">turn</option>
                    </select>
                </span>
            </span>
        </span>
        </span>


        <span style="display:none;" class="transform-more-scale transform-more">
        <span class="transform-x">
            <p>X:</p>
            <span class="transform-x-inner-span slider-value-unit">
                <input type="range" min="0" max="2" step="0.1" class="transform-scale-x-slider style-input sync" data-sync=["transform-scale-x-value"] data-property="scale" data-apply="direct" data-shorthead="0">
                <span class="transform-x-inner-span-inner">
                    <input type="text" class="transform-scale-x-value style-input sync" data-sync=["transform-scale-x-slider"] data-property="scale" data-apply="direct" data-shorthead="0">
                    <select value="x" name="" id="" class="transform-scale-x-unit"></select>
                </span>
            </span>
        </span>

         <span class="transform-y">
            <p>Y:</p>
            <span class="transform-y-inner-span slider-value-unit">
                <input type="range" min="0" max="2" step="0.1" class="transform-scale-y-slider style-input sync" data-sync=["transform-scale-y-value"] data-property="scale" data-apply="direct" data-shorthead="1">
                <span class="transform-y-inner-span-inner">
                    <input type="text" class="transform-scale-y-value style-input sync" data-sync=["transform-scale-y-slider"] data-property="scale" data-apply="direct" data-shorthead="1">
                    <select value="x" name="" id="" class="transform-scale-y-unit">
                    </select>
                </span>
            </span>
        </span>


         <span class="transform-z">
            <p>Z:</p>
            <span class="transform-z-inner-span slider-value-unit">
                <input type="range" min="0" max="2" step="0.1" class="transform-scale-z-slider style-input sync" data-sync=["transform-scale-z-value"] data-property="scale" data-apply="direct" data-shorthead="2">
                <span class="transform-z-inner-span-inner">
                    <input type="text" class="transform-scale-z-value style-input sync" data-sync=["transform-scale-z-slider"]  data-property="scale" data-apply="direct" data-shorthead="2">
                    <select value="x" name="" id="" class="transform-scale-z-unit">
                    </select>
                </span>
            </span>
        </span>
        </span>


        <span style="display:none;" class="transform-more-skew transform-more">
        <span class="transform-x">
            <p>X:</p>
            <span class="transform-x-inner-span slider-value-unit">
                <input type="range" min="0" max="360" class="transform-skew-x-slider style-input sync" data-sync=["transform-skew-x-value"] data-property="transform" data-apply="value-fetch" data-dependency="transform-skew-x-unit" data-shorthead="10">
                <span class="transform-x-inner-span-inner">
                    <input type="text" class="transform-skew-x-value style-input sync" data-sync=["transform-skew-x-slider"] data-property="transform" data-apply="value-fetch" data-shorthead="10" data-dependency="transform-skew-x-unit">
                    <select name="" id="" class="transform-skew-x-unit style-input" data-property="transform" data-apply="unit-fetch" data-shorthead="10" data-dependency="transform-skew-x-value">
                        <option value="deg">deg</option>
                        <option value="grad">grad</option>
                        <option value="rad">rad</option>
                        <option value="turn">turn</option>
                    </select>
                </span>
            </span>
        </span>

         <span class="transform-y">
            <p>Y:</p>
            <span class="transform-y-inner-span slider-value-unit">
                <input type="range" min="0" max="360" class="transform-skew-y-slider style-input sync" data-sync=["transform-skew-y-value"] data-property="transform" data-apply="value-fetch" data-shorthead="13" data-dependency="transform-skew-y-unit">
                <span class="transform-y-inner-span-inner">
                    <input type="text" class="transform-skew-y-value style-input sync" data-sync=["transform-skew-y-slider"] data-property="transform" data-apply="value-fetch" data-shorthead="13" data-dependency="transform-skew-y-unit">
                    <select name="" id="" class="transform-skew-y-unit style-input" data-property="transform" data-apply="unit-fetch" data-shorthead="13" data-dependency="transform-skew-y-value">
                        <option value="deg">deg</option>
                        <option value="grad">grad</option>
                        <option value="rad">rad</option>
                        <option value="turn">turn</option>
                    </select>
                </span>
            </span>
        </span>

        </span>



        
        <span class="perspective">
    <p>Perspective:</p>
    <span class="perspective-inner-span value-unit">
        <input type="text" class="perspective-value style-input" data-property="perspective" data-apply="value-fetch" data-dependency="perspective-unit">
        <select name="" id="" class="perspective-unit style-input" data-property="perspective" data-apply="unit-fetch" data-dependency="perspective-value">
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="vw">vw</option>
            <option value="vh">vh</option>
            <option value="vmin">vmin</option>
            <option value="vmax">vmax</option>
            <option value="em">em</option>
            <option value="rem">rem</option>
        </select>
    </span>
</span>

<span class="origin text-shadow-position">
    <p>Origin:</p>
    <span class="origin-inner-span sequential-value-units text-shadow-position-inner-span">
        <p>X:
            <span>
                <input type="text" class="origin-x-value style-input" data-property="transformOrigin" data-shorthead="0" data-apply="value-fetch" data-dependency="origin-x-unit">
                <select name="" id="" class="origin-x-unit style-input" data-property="transformOrigin" data-shorthead="0" data-apply="unit-fetch" data-dependency="origin-x-value">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>
        </p>

        <p>Y:
            <span>
                <input type="text" class="origin-y-value style-input" data-property="transformOrigin" data-shorthead="1" data-apply="value-fetch" data-dependency="origin-y-unit">
                <select name="" id="" class="origin-y-unit style-input" data-property="transformOrigin" data-shorthead="1" data-apply="unit-fetch" data-dependency="origin-y-value">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>
        </p>

        <p>Z:
            <span>
                <input type="text" class="origin-z-value style-input" data-property="transformOrigin" data-shorthead="2" data-apply="value-fetch" data-dependency="origin-z-unit">
                <select name="" id="" class="origin-z-unit style-input" data-property="transformOrigin" data-shorthead="2" data-apply="unit-fetch" data-dependency="origin-z-value">
                    <option value="px">px</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>
        </p>
    </span>
</span>


<span class="perspective-origin text-shadow-position">
    <p>Perspective Origin:</p>
    <span class="perspective-origin-inner-span sequential-value-units text-shadow-position-inner-span">
        <p>X:
            <span>
                <input type="text" class="perspective-origin-x-value style-input" data-property="perspectiveOrigin" data-shorthead="0" data-apply="value-fetch" data-dependency="perspective-origin-x-unit">
                <select name="" id="" class="perspective-origin-x-unit style-input" data-property="perspectiveOrigin" data-shorthead="0" data-apply="unit-fetch" data-dependency="perspective-origin-x-value">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>
        </p>

        <p>Y:
            <span>
                <input type="text" class="perspective-origin-y-value style-input" data-property="perspectiveOrigin" data-shorthead="1" data-apply="value-fetch" data-dependency="perspective-origin-y-unit">
                <select name="" id="" class="perspective-origin-y-unit style-input" data-property="perspectiveOrigin" data-shorthead="1" data-apply="unit-fetch" data-dependency="perspective-origin-y-value">
                    <option value="px">px</option>
                    <option value="%">%</option>
                    <option value="vw">vw</option>
                    <option value="vh">vh</option>
                    <option value="vmin">vmin</option>
                    <option value="vmax">vmax</option>
                    <option value="em">em</option>
                    <option value="rem">rem</option>
                </select>
            </span>
        </p>
    </span>
</span>

  
      <span class="transform-style">
            <p>Transform Style:</p>
            <select name="" id="" class="transform-style-select content-direction-select style-input" data-property="transformStyle" data-apply="direct">
                <option value="flat">2D</option>
                <option value="preserve-3d">3D</option>
            </select>
        </span>


        
    </div>
</div>

<div class="transition">
    <h1 class="transition-title">Transition</h1>
    <div class="transition-css">
        
        <span class="transition-list-tile-container style-input" data-property="transition" data-apply="transition-list-fetch">
        </span>
        
        <span class="transition-property">
            <p>Transition Property:</p>
            <span class="transition-property-inner-span input-select-button">
                <select name="" id="" class="transition-property-select transition-input" data-property="transitionProperty" data-apply="none">
                    <option value="none">none</option>
                    <option value="left">left</option>
                    <option value="right">right</option>
                    <option value="bottom">bottom</option>
                    <option value="top">top</option>
                </select>

                <button class="transition-add" data-property="transition" data-apply="transition-fetch">+</button>
                <button class="transition-del" data-property="transition" data-apply="transition-fetch">-</button>
            </span>
        </span>

        <span class="transition-timing-function">
            <p>Timing Function:</p>
            <select name="" id="" class="transition-timing-function-select content-direction-select transition-input" data-property="transitionTimingFunction">
                <option value="ease">ease</option>
                <option value="ease-in">ease in</option>
                <option value="ease-out">ease out</option>
                <option value="linear">linear</option>
            </select>
        </span>

        <span class="transition-duration">
            <p>Transition Duration:</p>
            <span class="transition-duration-inner-span value-unit">
                <input type="text" class="transition-duration-value transition-input" data-property="transitionDuration">
                <input type="text" value="sec" class="transition-duration-unit" readonly>
            </span>
        </span>

        <span class="transition-delay">
            <p>Start Delay:</p>
            <span class="transition-delay-inner-span value-unit">
                <input type="text" class="transition-delay-value transition-input" data-property="transitionDelay">
                <input type="text" value="sec"  class="transition-delay-unit" readonly>
            </span>
        </span>

    </div>
</div>


<div class="animation">
    <h1 class="animation-title">Animation</h1>
    <div class="animation-css">
        
        <span class="animation-list-tile-container style-input" data-property="animation" data-apply="animation-list-fetch">
        </span>
        
        <span class="animation-name">
            <p>Animation Name:</p>
            <span class="animation-name-inner-span input-select-button">
                <select name="" id="" class="animation-name-select animation-input" data-property="animationName" data-apply="none">
                    <option value="none">none</option>
                </select>

                <button class="animation-add" data-property="animation" data-apply="animation-fetch">+</button>
                <button class="animation-del" data-property="animation" data-apply="animation-fetch">-</button>
            </span>
        </span>

        <span class="animation-timing-function">
            <p>Timing Function:</p>
            <select name="" id="" class="animation-timing-function-select content-direction-select animation-input" data-property="animationTimingFunction">
                <option value="ease">ease</option>
                <option value="ease-in">ease in</option>
                <option value="ease-out">ease out</option>
                <option value="linear">linear</option>
            </select>
        </span>

        <span class="animation-play-state">
            <p>Play State:</p> 
            <select name="" id="" class="animation-play-state-select content-direction-select animation-input" data-property="animationPlayState">
                <option value="running">Running</option>
                <option value="paused">Paused</option>
            </select>
        </span>

        <span class="animation-duration">
            <p>Animation Duration:</p>
            <span class="animation-duration-inner-span value-unit">
                <input type="text" class="animation-duration-value animation-input" data-property="animationDuration">
                <input type="text" value="sec" class="animation-duration-unit" readonly>
            </span>
        </span>

        <span class="animation-delay">
            <p>Start Delay:</p>
            <span class="animation-delay-inner-span value-unit">
                <input type="text" class="animation-delay-value animation-input" data-property="animationDelay">
                <input type="text" value="sec"  class="animation-delay-unit" readonly>
            </span>
        </span>

        <span class="animation-direction">
            <p>Animation Direction:</p>
            <select name="" id="" class="animation-direction-select content-direction-select animation-input" data-property="animationDirection">
                <option value="normal">normal</option>
                <option value="reverse">reverse</option>
                <option value="alternate">alternate</option>
                <option value="alternate-reverse">alternate reverse</option>
            </select>
        </span>

        <span class="animation-fill-mode">
            <p>Fill Mode:</p>
            <select name="" id="" class="animation-fill-mode-select content-direction-select animation-input" data-property="animationFillMode">
                <option value="none">none</option>
                <option value="forwards">forwards</option>
                <option value="backwards">backwards</option>
                <option value="both">both</option>
            </select>
        </span>

        <span class="animation-iteration-count">
            <p>Animation Repeat:</p>
            <span class="animation-iteration-count-inner-span value-unit">
                <input type="text" class="animation-iteration-count-value animation-input" data-property="animationIterationCount">
                <button value="infinite" class="animation-iteration-count-value-infinite">OO</button>
            </span>
        </span>
    </div>
</div>

<div style="display:none" class="custom-styles">
    <h1 class="custom-styles-title">Custom Styles</h1>
    <div class="custom-styles-css">
        <span class="style-type">
            <p>Style:</p>
            <select name="" id="" class="style-type-select content-direction-select">
                <option value="">none</option>
                <option value="backgroundColor">Background Color</option>
                <option value="height">Height</option>
                <option value="width">Width</option>
            </select>
        </span>

        <span class="style-value">
            <p>Value:</p>
            <input type="text" class="style-value-value content-direction-select">
        </span>

        <span class="style-control">
            <button class="style-control-add" data-apply="direct">+</button>
            <button class="style-control-del">-</button>
        </span>
    </div>
</div>


        </div>

    </div>
                    <div style="display:none;" class="viewport-selector selector-box">
                        <div class="top-dot"></div>
                        <div class="right-dot"></div>
                        <div class="bottom-dot"></div>
                        <div class="left-dot"></div>
                    </div>

                    <div class="selector-manager-box">
    <h1 class="selector-manager-title">Selector Manager</h1>
    <div class="selector-manager-inner-box">
        <div class="selector-tile">
            <select name="" id="" class="selector-type selector-input">
                <option value="*">Universal</option>
                <option value="">Tag</option>
                <option value=".">Class</option>
                <option value="#">ID</option>
                <option value="[">Attribute</option>
            </select>
            <div class="selector-name-box">
                <input type="text" class="selector-name selector-input" placeholder="">
                <input style="display:none;" type="text" class="selector-attribute-type selector-input" placeholder="attribute">
                <input style="display:none;" type="text" class="selector-attribute-value selector-input" placeholder="value">
            </div>
        </div>

    </div>
    <div class="selector-manager-control-panel selector-manager-inner-box">
        <div class="selector-add-box">
            <button class="selector-add">+</button>
            <input type="text" class="specificity" placeholder="specificity" readonly>
        </div>
        <input type="text" class="selector-string" placeholder="selector">
        <div class="selector-controls">
            <button class="selector-deny"></button>
            <button class="selector-accept"></button>
        </div>
    </div>
</div>
</div>
            `;

            
            const DEFAULT_STYLES = {
                "backgroundColor": "rgba(0,0,0,1)",
                "color": "rgba(0,0,0,1)",
                "opacity": "1",
                "filter": "none",
                "backgroundImage": "none",
                "backgroundPositionX": "left",
                "backgroundPositionY": "top",
                "backgroundSize": "auto",
                "backgroundRepeat": "repeat",
                "width": "auto",
                "height": "auto",
                "minWidth": "0px",
                "minHeight": "0px",
                "maxWidth": "none",
                "maxHeight": "none",
                "margin": "0px",
                "marginLeft": "0px",
                "marginRight": "0px",
                "marginTop": "0px",
                "marginBottom": "0px",
                "padding": "0px",
                "paddingLeft": "0px",
                "paddingRight": "0px",
                "paddingTop": "0px",
                "paddingBottom": "0px",
                "display": "block",
                "flexDirection": "row",
                "justifyContent": "start",
                "alignItems": "start",
                "justifySelf": "auto",
                "alignSelf": "auto",
                "flexWrap": "nowrap",
                "flexGrow": "0",
                "flexShrink": "1",
                "order": "0",
                "columnGap": "0px",
                "rowGap": "0px",
                "overflowX": "visible",
                "overflowY": "visible",
                "position": "static",
                "top": "0%",
                "bottom": "0%",
                "left": "0%",
                "right": "0%",
                "zIndex": "auto",
                "float": "none",
                "clear": "none",
                "objectFit": "fill",
                "objectPosition": "50% 50%",
                "borderStyle": "none",
                "borderLeftStyle": "none",
                "borderRightStyle": "none",
                "borderTopStyle": "none",
                "borderBottomStyle": "none",
                "borderColor": "rgba(0,0,0,1)",
                "borderLeftColor": "rgba(0,0,0,1)",
                "borderRightColor": "rgba(0,0,0,1)",
                "borderTopColor": "rgba(0,0,0,1)",
                "borderBottomColor": "rgba(0,0,0,1)",
                "borderWidth": "0px",
                "borderLeftWidth": "0px",
                "borderRightWidth": "0px",
                "borderTopWidth": "0px",
                "borderBottomWidth": "0px",
                "borderRadius": "0px",
                "borderTopLeftRadius": "0px",
                "borderTopRightRadius": "0px",
                "borderBottomRightRadius": "0px",
                "borderBottomLeftRadius": "0px",
                "fontFamily": "auto",
                "fontSize": "16px",
                "fontWeight": "400",
                "fontStyle": "normal",
                "textAlign": "left",
                "letterSpacing": "0px",
                "lineHeight": "16px",
                "wordSpacing": "0px",
                "textDecorationLine": "none",
                "textDecorationStyle": "solid",
                "textDecorationColor": "rgba(0,0,0,1)",
                "textDecorationThickness": "0px",
                "textTransform": "none",
                "textWrap": "wrap",
                "direction": "ltr",
                "textShadow": "0px 0px 0px rgba(0,0,0,1)",
                "transform": "rotateX( 0deg ) rotateY( 0deg ) rotateZ( 0deg ) skewX( 0deg ) skewY( 0deg )",
                "translate": "0px 0px 0px",
                "scale": "1 1 1",
                "perspective": "0px",
                "transformOrigin": "50% 50% 0px",
                "perspectiveOrigin": "50% 50%",
                "transformStyle": "flat"
            };
            
            let display_type_select = document.querySelector(".display-select");
            let grid_display_container = document.querySelector(".display-grid-properties");
            let flex_display_container = document.querySelector(".display-flex-properties");
            let preview_doc = undefined;
            let selectors_container = document.querySelector(".selectors-container");
            let animation_list = {};
            let transition_list = {};
            let selector_index = new Map();
            let selector_index_rev = new Map();
            let saving = 0;
            let project_state = project_obj.project_state;
            project = project_state;
            let directives = project_obj.directives;
            if("directives" in project_obj == false) directives = {"keyframes" : {}, "media" : {}};
            let viewport = document.querySelector(".preview-tab-screen");
            let viewport_container = document.querySelector(".preview-tab");
            viewport.srcdoc = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style id="preview-stylesheet">
    body *{
      cursor:pointer;
    }

    
    *::-webkit-scrollbar{
        width:6px;
    }

    *::-webkit-scrollbar-track{
        background-color:rgba(0, 0, 0, 0);
    }

    *::-webkit-scrollbar-thumb{
        background-color:   rgb(69, 58, 71);
        border-radius:10px;
    }

    *{
      padding:0;
      box-sizing:border-box;
    }

     </style>
</head>

<body> 
</body>

</html>
            `;
            let style_inputs = document.querySelectorAll(".style-input");
            let attribute_inputs = document.querySelectorAll(".attribute-input");

            let camel_to_kebab = {
                "backgroundColor" : "background-color",
                "height" : "height",
                "width" : "width"
            }

            let selector_tile_index = new Map();

            let selector_controller = {
                "selector_index" : {},
                "selected_element" : undefined,
                "selector_toggle" : document.querySelector(".selector-select"),
                "toggle_state" : new Map(),
                "selector" : undefined,
                "dummy_element" : undefined,

                update_selector_index(){
                    for(let i in this.selector_index) this.selector_index[i].clear();
                    for(let i = 0; i < selector_manager.selector_order.length; i++) for(let j of preview_doc.querySelectorAll(selector_manager.selector_order[i].selector)) this.selector_index[elements_index.get(j)].add(i);
                },

                update_selector_index_one(element){
                    this.selector_index[elements_index.get(element)] = new Set();
                    for(let i = 0; i < selector_manager.selector_order.length; i++) if(element.matches(selector_manager.selector_order[i].selector))this.selector_index[elements_index.get(element)].add(i);
                },

                update_selector_toggle(element){
                    this.selected_element = element;
                    this.selector_toggle.innerHTML = `<option value="-1">inline</option>`;
                    let name = elements_index.get(element);
                    for(let i of this.selector_index[name]){
                        let option = document.createElement('option');
                        option.innerText = selector_manager.selector_order[i].selector;
                        this.selector_toggle.append(option);
                        option.title = selector_manager.selector_order[i].selector;
                        option.value = i;
                    }
                    if(this.toggle_state.has(this.selected_element)) this.select(this.toggle_state.get(element));
                    else this.select(-1);
                },

                select(index){
                    if(my_selectors.selected != undefined){
                        my_selectors.selected.style.border = "none";
                        let target_elements = preview_doc.querySelectorAll(selector_manager.selector_order[parseInt(my_selectors.selected.dataset.index)].selector);
                        for(let i of target_elements) despawn_selector(i);
                        my_selectors.selected = undefined;
                    }
                    if(elements_index.has(this.dummy_element)) elements_index.delete(this.dummy_element);
                    this.dummy_element = undefined;
                    if("element-1" in project_state) delete project_state["element-1"];
                    this.selector = index;  
                    this.selector_toggle.value = index;
                    if(this.selector_index[elements_index.get(this.selected_element)].has(parseInt(index)) || index == "-1"){
                        this.toggle_state.set(this.selected_element, index);
                    }
                    if(index == -1){
                        if(curr_focus != this.selected_element) draw_focus(this.selected_element);
                        return;
                    }
                    this.dummy_element = preview_doc.createElement("DIV");
                    project_state["element-1"] = selector_manager.selector_order[parseInt(index)];
                    project_state["element-1"]["DOM"] = this.dummy_element;
                    elements_index.set(this.dummy_element, "element-1");
                    draw_focus(this.dummy_element);
                    let order = (selector_manager.selector_order.length - index) - 1;
                    my_selectors.selected = selectors_container.children[order];
                    my_selectors.selected.style.border = "2px solid var(--builder-pink)";
                    let target__elements = preview_doc.querySelectorAll(selector_manager.selector_order[index].selector);
                    for(let i of target__elements) spawn_selector(i);
                },

                unselect(){
                    if(my_selectors.selected == undefined) return;
                    my_selectors.selected.style.border = "none";
                    let target_elements = preview_doc.querySelectorAll(selector_manager.selector_order[parseInt(my_selectors.selected.dataset.index)].selector);
                    for(let i of target_elements) despawn_selector(i);
                    my_selectors.selected = undefined;
                    this.select("-1");
                },
            }

            let selector_manager = {
                "selector_manager" : document.querySelector(".selector-manager-box"),
                "selector_scroll_list" : document.querySelector(".selector-manager-inner-box"),
                "deny" : document.querySelector(".selector-deny"),
                "accept" : document.querySelector(".selector-accept"),
                "selector_add" : document.querySelector(".selector-add"),
                "selector_string" : document.querySelector(".selector-string"),
                "specificity" : document.querySelector(".specificity"),
                "composition" : undefined,
                "selector_order" : new Array(),
                "mode" : 0,         // if(0) creating new selector, if(1) editing existing selector
                "index" : undefined,
                "my_selectors" : undefined,
                "order" : undefined,
                "selector_object" : undefined,

                initiallize(){
                    this.composition = {"id" : 0, "class" : 0, "attribute" : 0, "tag" : 0, "universal" : 0};
                    this.selector_manager.style.display = "flex";
                    setTimeout(()=>{this.selector_manager.style.opacity = 1;},100);
                    selector_tile_index.set(this.selector_scroll_list.firstElementChild.firstElementChild, this.selector_scroll_list.firstElementChild.children[1]);
                    this.selector_type(this.selector_scroll_list.firstElementChild.firstElementChild);
                    this.selector_to_string();
                },

                event_handler(e){
                    if(e.target == this.accept) this.export();
                    if(e.target == this.deny){
                        if(this.mode == 1){
                            let new_array = new Array(this.selector_order.length + 1);
                            for(let i = 0; i < new_array.length; i++){
                                if(i == this.index) new_array[i] = this.selector_object;
                                else if(i > this.index) new_array[i] = this.selector_order[i-1];
                                else new_array[i] = this.selector_order[i];
                            }
                            this.selector_order = new_array;
                            for(let i of preview_doc.querySelectorAll(this.selector_object.selector)) selector_controller.selector_index[elements_index.get(i)].add(this.index);
                        }
                        this.destructor();
                    }
                    if(e.target == this.selector_add) this.add_selector();
                    if(selector_tile_index.has(e.target)) this.selector_type(e.target);
                    if(e.target.classList[0] == "selector-name" || e.target.classList[0] == "relation" || e.target.classList[0] == "selector-attribute-type" || e.target.classList[0] == "selector-attribute-value") this.selector_to_string();
                    if(e.target == this.selector_string){
                        try{this.string_to_selector();}
                        catch{console.log("invalid string");}
                    }
                },

                destructor(){
                    this.order = undefined;
                    this.mode = 0;
                    this.index = undefined;
                    this.composition = undefined;
                    this.selector_object = undefined;
                    this.selector_manager.style.opacity = 0;
                    setTimeout(()=>{
                        this.selector_manager.style.display = "none";
                        this.selector_scroll_list.innerHTML = `<div class="selector-tile">
                        <select name="" id="" class="selector-type selector-input">
                            <option value="*">Universal</option>
                            <option value="">Tag</option>
                            <option value=".">Class</option>
                            <option value="#">ID</option>
                            <option value="[">Attribute</option>
                        </select>
                        <div class="selector-name-box">
                            <input type="text" class="selector-name selector-input" placeholder="Enter class name here">
                            <input style="display:none;" type="text" class="selector-attribute-type selector-input" placeholder="attribute">
                            <input style="display:none;" type="text" class="selector-attribute-value selector-input" placeholder="value">
                        </div>
                    </div>
                        ` 

                    },500);
                    selector_tile_index.clear();
                },

                add_selector(){
                    let tile = document.createElement("DIV");
                    tile.classList.add("selector-tile");
                    tile.innerHTML = `
    <select name="" id="" class="relation selector-input">
        <option value=" ">Descendent</option>
        <option value=">">Direct Child</option>
        <option value="+">Adjacent Sibling</option>
        <option value="~">General Sibling</option>
    </select>
    <select name="" id="" class="selector-type selector-input">
        <option value="*">Universal</option>
        <option value="">Tag</option>
        <option value=".">Class</option>
        <option value="#">ID</option>
        <option value="[">Attribute</option>
    </select>
    <div class="selector-name-box">
        <input type="text" class="selector-name selector-input" placeholder="">
        <input style="display:none;" type="text" class="selector-attribute-type selector-input" placeholder="attribute">
        <input style="display:none;" type="text" class="selector-attribute-value selector-input" placeholder="value">
    </div>`

                this.selector_scroll_list.append(tile);
                selector_tile_index.set(tile.children[1], tile.children[2]);
                this.selector_type(tile.children[1]);
                this.selector_to_string();
                },
                
                selector_type(type){
                    let selector_div = selector_tile_index.get(type);
                    if(type.value != "["){
                        selector_div.children[1].value = "";
                        selector_div.children[2].value = "";
                    }
                    selector_div.children[0].style.display = "flex";
                    selector_div.children[1].style.display = "none";
                    selector_div.children[2].style.display = "none";
                    selector_div.classList.remove("type_universal");
                    selector_div.firstElementChild.placeholder = "";
                    if(type.value == "*"){
                        selector_div.classList.add("type_universal");
                        selector_div.firstElementChild.value = "";
                    }
                    if(type.value == "") selector_div.firstElementChild.placeholder = "Enter tag name";
                    if(type.value == ".") selector_div.firstElementChild.placeholder = "Enter class name";
                    if(type.value == "#") selector_div.firstElementChild.placeholder = "Enter ID";
                    if(type.value == "["){
                        selector_div.children[0].style.display = "none";
                        selector_div.children[0].value = "";
                        selector_div.children[1].style.display = "flex";
                        selector_div.children[2].style.display = "flex";
                    }
                    this.update_specificity();
                    this.selector_to_string();
                },

                selector_to_string(){
                    let output = "";
                    let selector_inputs = document.querySelectorAll(".selector-input");
                    for(let i of selector_inputs) if(i.value != ""){
                        if(i.classList[0] == "selector-attribute-type") output = output + `${i.value}=`;
                        else if(i.classList[0] == "selector-attribute-value") output = output + `"${i.value}"]`;
                        else output = output + i.value;
                    }
                    this.selector_string.value = output;
                },

                async string_to_selector(){
                    this.selector_scroll_list.innerHTML = `<div class="selector-tile">
                    <select name="" id="" class="selector-type selector-input">
                        <option value="*">Universal</option>
                        <option value="">Tag</option>
                        <option value=".">Class</option>
                        <option value="#">ID</option>
                        <option value="[">Attribute</option>
                    </select>
                    <div class="selector-name-box type_universal">
                        <input type="text" class="selector-name selector-input" placeholder="">
                        <input style="display:none;" type="text" class="selector-attribute-type selector-input" placeholder="attribute">
                        <input style="display:none;" type="text" class="selector-attribute-value selector-input" placeholder="value">
                    </div>
                </div>
                    ` 
                    selector_tile_index.clear();
                    selector_tile_index.set(this.selector_scroll_list.firstElementChild.firstElementChild, this.selector_scroll_list.firstElementChild.children[1]);
                    let string = this.selector_string.value;

                    for(let i = 0; i < string.length; i++){  // Validator
                        if(i == 0 && (string[i] == ">" || string[i] == " " || string[i] == "~" || string[i] == "+")) return;
                        if(i != 0) if((string[i] == ">" || string[i] == " " || string[i] == "~" || string[i] == "+") && (string[i-1] == ">" || string[i-1] == " " || string[i-1] == "~" || string[i-1] == "+")) return;
                        if(i != string.length-1) if((string[i] == ">" || string[i] == " " || string[i] == "~" || string[i] == "+") && (string[i+1] == ">" || string[i+1] == " " || string[i+1] == "~" || string[i+1] == "+")) return;
                    }

                    let tile_index = 0;
                    let curr_tile = this.selector_scroll_list.children[tile_index];
                    for(let i = 0; i < string.length; i++){
                        // if(string[i] == ">" || string[i] == " " || string[i] == "~" || string[i] == "+"){
                        // }

                        if(i == 0){
                            if(string[i] == "*" || string[i] == "." || string[i] == "#"){
                                curr_tile.children[0].value = string[i];
                                this.selector_type(curr_tile.children[0]);
                                this.selector_string.value = string;
                                let j = i+1;
                                while(string[j] != ">" && string[j] != " " && string[j] != "~" && string[j] != "+" && j < string.length){
                                    curr_tile.children[1].firstElementChild.value =  curr_tile.children[1].firstElementChild.value + string[j];
                                    j++;
                                }
                                i = j;
                                if(i >= string.length) break;
                                i--;
                            }
                            else if(string[i] == "["){
                                curr_tile.children[0].value = "[";
                                this.selector_type(curr_tile.children[0]);
                                this.selector_string.value = string;
                                let j = i+1;
                                while(string[j] != "=" && j < string.length){
                                    curr_tile.children[1].children[1].value =  curr_tile.children[1].children[1].value + string[j];
                                    j++;
                                }
                                j++;
                                while(string[j] != "]" && j < string.length){
                                    curr_tile.children[1].children[2].value =  curr_tile.children[1].children[2].value + string[j];
                                    j++;
                                }
                                i = j+1;
                                if(i >= string.length) break;
                                i--;
                            }
                            else{
                                curr_tile.children[0].value = "";
                                this.selector_type(curr_tile.children[0]);
                                this.selector_string.value = string;
                                let j = i;
                                while(string[j] != ">" && string[j] != " " && string[j] != "~" && string[j] != "+" && j < string.length){
                                    curr_tile.children[1].firstElementChild.value =  curr_tile.children[1].firstElementChild.value + string[j];
                                    j++;
                                }
                                i = j;
                                if(i >= string.length) break;
                                i--;
                            }
                        }
                        else if(string[i-1] == ">" || string[i-1] == " " || string[i-1] == "~" || string[i-1] == "+"){
                            this.add_selector();
                            tile_index++;
                            curr_tile = this.selector_scroll_list.children[tile_index];
                            curr_tile.firstElementChild.value = string[i-1];
                            if(string[i] == "*" || string[i] == "." || string[i] == "#"){
                                curr_tile.children[1].value = string[i];
                                this.selector_type(curr_tile.children[1]);
                                this.selector_string.value = string;
                                let j = i+1;
                                while(string[j] != ">" && string[j] != " " && string[j] != "~" && string[j] != "+" && j < string.length){
                                    curr_tile.children[2].firstElementChild.value =  curr_tile.children[2].firstElementChild.value + string[j];
                                    j++;
                                }
                                i = j;
                                if(i >= string.length) break;
                                i--;
                            }
                            else if(string[i] == "["){
                                curr_tile.children[1].value = "[";
                                this.selector_type(curr_tile.children[1]);
                                this.selector_string.value = string;
                                let j = i+1;
                                while(string[j] != "=" && j < string.length){
                                    curr_tile.children[2].children[1].value =  curr_tile.children[2].children[1].value + string[j];
                                    j++;
                                }
                                j++;
                                while(string[j] != "]" && j < string.length){
                                    curr_tile.children[2].children[2].value =  curr_tile.children[2].children[2].value + string[j];
                                    j++;
                                }
                                i = j+1;
                                if(i >= string.length) break;
                                i--;
                            }
                            else{
                                curr_tile.children[1].value = "";
                                this.selector_type(curr_tile.children[1]);
                                this.selector_string.value = string;
                                let j = i;
                                while(string[j] != ">" && string[j] != " " && string[j] != "~" && string[j] != "+" && j < string.length){
                                    curr_tile.children[2].firstElementChild.value =  curr_tile.children[2].firstElementChild.value + string[j];
                                    j++;
                                }
                                i = j;
                                if(i >= string.length) break;
                                i--;    
                            }
                        }

                    }
                },

                update_composition(){
                    this.composition = {"id" : 0, "class" : 0, "attribute" : 0, "tag" : 0, "universal" : 0};
                    let selector_types = document.querySelectorAll(".selector-type");
                    for(let i of selector_types){
                        if(i.value == "*") this.composition.universal++;
                        else if(i.value == "#") this.composition.id++;
                        else if(i.value == "[") this.composition.attribute++;
                        else if(i.value == ".") this.composition.class++;
                        else this.composition.tag++;
                    }
                },

                async update_specificity(){
                    this.update_composition();
                    let i;
                    for(i = 0; i < this.selector_order.length; i++){
                        let composition = this.selector_order[i].composition;
                        if(this.composition.id > composition.id) continue;
                        else if(this.composition.id < composition.id) break;

                        if((this.composition.class + this.composition.attribute) > (composition.class + composition.attribute)) continue;
                        else if((this.composition.class + this.composition.attribute) < (composition.class + composition.attribute)) break;

                        if(this.composition.tag > composition.tag) continue;
                        else if(this.composition.tag < composition.tag) break;

                        if(this.composition.universal > composition.universal) continue;
                        else if(this.composition.universal < composition.universal) break;

                        if(this.mode == 0) continue;    // if(0) creating new selector, if(1) editing existing selector
                        else {
                            // console.log(this.selector_order, " ", this.index);
                            if(this.selector_order[i].index > this.selector_object.index) break;
                            else continue;
                        }
                    }
                    this.specificity.value = `${i + 1}`;
                    return i + 1;
                },

                load_selector(index){
                    this.selector_object = this.selector_order[index];
                    this.initiallize();
                    this.index = index;
                    this.order = this.selector_order[index].index;
                    this.mode = 1;
                    this.selector_string.value = this.selector_order[index].selector;
                    for(let i of preview_doc.querySelectorAll(this.selector_object.selector)) selector_controller.selector_index[elements_index.get(i)].delete(index);
                    let new_array = new Array(this.selector_order.length - 1);
                    for(let i = 0; i < new_array.length; i++){                   // Removing from old position
                        if(i >= this.index) new_array[i] = this.selector_order[i + 1];
                        else new_array[i] = this.selector_order[i];
                    }
                    this.selector_order = new_array;
                    this.string_to_selector();
                },
                
                async initiallize_selectors(){
                    let new_array = [...this.selector_order];
                    new_array.sort((a, b) => a.index - b.index);
                    for(let i = 0; i < new_array.length; i++){
                        let dummy = preview_doc.createElement("DIV");
                        for(let j in new_array[i].style) dummy.style[j] = new_array[i].style[j];
                        let rule = `${new_array[i].selector}{ ${dummy.style.cssText}}`;
                        new_array[i].index = preview_stylesheet.insertRule(rule, preview_stylesheet.cssRules.length);
                    }
                    let index_array = new Array();
                    for(let i = 0; i < this.selector_order.length; i++) index_array.push(this.selector_order[i].index); 
                    await fetch('/project/selectors/rule_idx_update', {"method" : "POST", "headers" : {"Content-Type" : "application/json"}, "body" : JSON.stringify({"created_by" : project_obj.created_by, "auth" : project_obj.auth, "selector_rule_order" : index_array, "id" : project_obj.id})});
                    this.my_selectors.refresh_selectors_container();
                },

                async save_selector(index){
                    let response = await fetch('/project/selectors/save', {"method" : "POST", "headers" : {"Content-Type" : "application/json"}, "body" : JSON.stringify({"created_by" : project_obj.created_by, "auth" : project_obj.auth, "id" : project_obj.id, "selector_obj" : this.selector_order[index], "index" : index, "mode" : this.mode, "old_index" : this.index})});
                    response = await response.json();
                },

                async export(){
                    let rule = `${this.selector_string.value}{}`;
                    let index = undefined;

                    if(rule[0] == '*' || rule[0] == " "){
                        alert("You can't select root element");
                        return;
                    }

                    if(this.mode == 0){
                        try{
                            index = preview_stylesheet.insertRule(rule, preview_stylesheet.cssRules.length);
                        }
                        catch{
                            popup.warning("Invalid Selector");
                            return;
                        }
                    }
                    else{
                        try{
                            preview_stylesheet.deleteRule(this.order);
                            index = preview_stylesheet.insertRule(rule, this.order);
                        }
                        catch{
                            popup.warning("Invalid Selector");
                            return;
                        }
                    }
                    let specificity = await this.update_specificity();     // Specificity - 1 = index of array 
                    let new_array = new Array(this.selector_order.length + 1);
                    for(let i = 0; i < new_array.length; i++){
                        if(i == specificity - 1) new_array[i] = {"selector" : this.selector_string.value, "index" : index, "composition" : this.composition, "style" : {}};
                        else if(i > specificity - 1) new_array[i] = this.selector_order[i-1];
                        else new_array[i] = this.selector_order[i];
                    }
                    this.selector_order = new_array;
                    this.my_selectors.refresh_selectors_container();
                    this.save_selector(specificity - 1);
                    selector_controller.update_selector_index();
                    selector_controller.update_selector_toggle(selector_controller.selected_element);
                    this.destructor();
                },
            }

            let my_selectors = {
                "selected" : undefined,

                add(index){
                    let tile = document.createElement("DIV");
                    tile.classList.add("selector-string-tile");
                    tile.innerHTML = `<h1 class="selector-string-display"></h1>
                    <button class="edit-selector"><svg style="height:100%; width:100%; pointer-events:none;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#dc10a9"><path d="m405.38-120-14.46-115.69q-19.15-5.77-41.42-18.16-22.27-12.38-37.88-26.53L204.92-235l-74.61-130 92.23-69.54q-1.77-10.84-2.92-22.34-1.16-11.5-1.16-22.35 0-10.08 1.16-21.19 1.15-11.12 2.92-25.04L130.31-595l74.61-128.46 105.93 44.61q17.92-14.92 38.77-26.92 20.84-12 40.53-18.54L405.38-840h149.24l14.46 116.46q23 8.08 40.65 18.54 17.65 10.46 36.35 26.15l109-44.61L829.69-595l-95.31 71.85q3.31 12.38 3.7 22.73.38 10.34.38 20.42 0 9.31-.77 19.65-.77 10.35-3.54 25.04L827.92-365l-74.61 130-107.23-46.15q-18.7 15.69-37.62 26.92-18.92 11.23-39.38 17.77L554.62-120H405.38ZM440-160h78.23L533-268.31q30.23-8 54.42-21.96 24.2-13.96 49.27-38.27L736.46-286l39.77-68-87.54-65.77q5-17.08 6.62-31.42 1.61-14.35 1.61-28.81 0-15.23-1.61-28.81-1.62-13.57-6.62-29.88L777.77-606 738-674l-102.08 42.77q-18.15-19.92-47.73-37.35-29.57-17.42-55.96-23.11L520-800h-79.77l-12.46 107.54q-30.23 6.46-55.58 20.81-25.34 14.34-50.42 39.42L222-674l-39.77 68L269-541.23q-5 13.46-7 29.23t-2 32.77q0 15.23 2 30.23t6.23 29.23l-86 65.77L222-286l99-42q23.54 23.77 48.88 38.12 25.35 14.34 57.12 22.34L440-160Zm38.92-220q41.85 0 70.93-29.08 29.07-29.07 29.07-70.92t-29.07-70.92Q520.77-580 478.92-580q-42.07 0-71.04 29.08-28.96 29.07-28.96 70.92t28.96 70.92Q436.85-380 478.92-380ZM480-480Z"></path></svg></button>
                </div>`
                    tile.dataset["index"] = index;
                    tile.children[1].dataset["index"] = index;
                    tile.firstElementChild.innerText = selector_manager.selector_order[index].selector;
                    tile.title = selector_manager.selector_order[index].selector;
                    selectors_container.append(tile);
                },

                refresh_selectors_container(){
                    selectors_container.innerHTML = "";
                    for(let i = selector_manager.selector_order.length - 1; i >= 0; i--) this.add(i);
                },

                edit(index){
                    selector_controller.unselect();
                    selector_manager.load_selector(index);
                },

                event_handler(e){
                    if(e.target.classList == "selector-string-tile"){
                        if(this.selected != e.target) selector_controller.select(e.target.dataset.index);
                        else  if(this.selected == e.target) selector_controller.unselect();
                    }
                    if(e.target.classList == "edit-selector") this.edit(parseInt(e.target.dataset.index));
                }
            }

            function display_select(target){
                if(target.value == "flex"){
                    grid_display_container.style.display = "none";
                    flex_display_container.style.display = "flex";
                }
                else if(target.value == "grid"){
                    grid_display_container.style.display = "flex";
                    flex_display_container.style.display = "none";
                }
                else{
                    grid_display_container.style.display = "none";
                    flex_display_container.style.display = "none";
                }
            }

            let ui_director = {
                "transform-type-select" : transform_type_select,
                "custom-attribute-type" : custom_attribute_type,
                "custom-attribute-value" : custom_attribute_value,
                "class-value" : class_value,
                "keyframes" : keyframes,
                "responsiveness" : responsiveness,
                "animation-name-select" : animation_name_select,
                "transition-property-select" : transition_property_select,
                "transition-add" : transition_list_refresh,
                "transition-del" : transition_list_refresh,
                "animation-add" : animation_list_refresh,
                "animation-del" : animation_list_refresh,
                "style-type-select" : style_type_select,
                "style-value-value" : style_value_value,
                "style-control-del" : style_control_del,
                "display-select" : display_select,

                open_components_tab(){
                    document.querySelector(".components").classList.add("enabled-category");
                    document.querySelector(".elements").classList.remove("enabled-category");
                    document.querySelector(".warehouse-category-elements").style.display = "none";
                    document.querySelector(".warehouse-category-components").style.display = "flex";


                },  

                open_elements_tab(){
                    document.querySelector(".elements").classList.add("enabled-category");
                    document.querySelector(".components").classList.remove("enabled-category");
                    document.querySelector(".warehouse-category-components").style.display = "none";
                    document.querySelector(".warehouse-category-elements").style.display = "flex";
                }
            }

            let editor_viewport = document.querySelector(".editor-tab-screen");
            editor_viewport.srcdoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>

    *::-webkit-scrollbar{
        width:6px;
    }

    *::-webkit-scrollbar-track{
        background-color:rgba(0, 0, 0, 0);
    }

    *::-webkit-scrollbar-thumb{
        background-color:   rgb(69, 58, 71);
        border-radius:10px;
    }

    *{
        padding:0;
        margin:0;
        box-sizing:border-box;
    }

body{
        display:flex;
        justify-content:center;
        align-item:center;
        height:100vh;
        width:100vw;
        position:relative;
}

body *{
      cursor:pointer;
    }

.editor-screen{
    height:100%;
    width:100%;
    position:absolute; 
    background-color:black;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:999;
}

.editor-screen-save-controls{
    position:absolute;
    top:-6%;
    height:6%;
    width:30%;
    background-color: rgb(33, 28, 34);
    border:2px solid rgba(102, 73, 108, 0.301);
    border-top:none;
    display:flex;
    z-index:999;
    border-radius: 0px 0px 50px 50px;
    justify-content:center;
    transition:top 1s ease-out;
}

.editor-screen-save-controls > button{
    height:100%;
    width:20%;
    border:none;
    position:absolute;
}

.editor-title{
    height:100%;
    width:60%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    font-size:1.4vw;
    font-family: sans-serif;
}

.editor-exit{
    left:0%;
    border-radius: 0px 0px 0px 50px;
    background-color:rgba(255, 255, 255, 0.288);
}

.editor-save-exit{
    right:0%;
    border-radius: 0px 0px 50px 0px;
    background-color: rgba(220, 16, 169, 0.758);
}

.editor-screen-preview{
    height:100%;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:black;
}
    </style>
</head>
<body>
                
                 <div class="editor-screen">
    <div class="editor-screen-save-controls">
        <button class="editor-exit"></button>
        <h1 class="editor-title">Component</h1>
        <button class="editor-save-exit"></button>
    </div>

    <div class="editor-screen-preview" style="perspective:1000px;"></div>
</div>

</body>
</html>`    

            document.querySelector(".animation-iteration-count-value-infinite").addEventListener("click", (e)=>{document.querySelector(".animation-iteration-count-value").value="infinite";});
            let curr_focus = undefined;
            let body = undefined;
            let external_css = document.querySelector(".external-css");

            let resolution_presets = {
                "desktop" : {"height" : 1080, "width" : 1920},
                "tablet" : {"height" : 1024, "width" : 768},
                "phone" : {"height" : 915, "width" : 412}
            }

            let viewport_free_drag_controller = {
                selector : document.querySelector(".viewport-selector"),
                intitialX : undefined,
                initialY : undefined,
                clicked_dot : undefined,
                viewport_height : undefined,
                viewport_width : undefined,

                initiallize(){
                    this.selector.style.display = "flex";
                    this.sync_selector();
                },

                sync_selector(){
                    let pos_left = viewport.getBoundingClientRect().left;
                    let pos_top = viewport.getBoundingClientRect().top;
                    let pos_right = viewport.getBoundingClientRect().right;
                    let pos_bottom = viewport.getBoundingClientRect().bottom;
                    this.selector.style.left = `${pos_left}px`;
                    this.selector.style.top = `${pos_top}px`;
                    this.selector.style.height = `${pos_bottom - pos_top}px`;
                    this.selector.style.width = `${pos_right - pos_left}px`;
                },

                destructor(){
                    this.selector.style.display = "none";
                },

                drag_top(e){
                    let displacement = this.intitialY - e.screenY;
                    let new_height = this.viewport_height + (displacement / resolution_controller.scalling);
                    if(new_height > (resolution_controller.max_height / resolution_controller.scalling)) resolution_controller.viewport_update(this.viewport_width, resolution_controller.max_height / resolution_controller.scalling, resolution_controller.scalling * 100);
                    else resolution_controller.viewport_update(this.viewport_width, new_height, resolution_controller.scalling * 100);
                    this.sync_selector();
                },

                drag_right(e){
                    let displacement = e.screenX - this.intitialX;
                    let new_width = this.viewport_width + (displacement / resolution_controller.scalling);
                    if(new_width > (resolution_controller.max_width / resolution_controller.scalling)) resolution_controller.viewport_update(resolution_controller.max_width / resolution_controller.scalling, this.viewport_height, resolution_controller.scalling * 100);
                    else resolution_controller.viewport_update(new_width, this.viewport_height, resolution_controller.scalling * 100);
                    this.sync_selector();
                },

                drag_bottom(e){
                    let displacement = e.screenY - this.intitialY;
                    let new_height = this.viewport_height + (displacement / resolution_controller.scalling);
                    if(new_height > (resolution_controller.max_height / resolution_controller.scalling)) resolution_controller.viewport_update(this.viewport_width, resolution_controller.max_height / resolution_controller.scalling, resolution_controller.scalling * 100);
                    else resolution_controller.viewport_update(this.viewport_width, new_height, resolution_controller.scalling * 100);
                    this.sync_selector();
                },

                drag_left(e){
                    let displacement = this.intitialX - e.screenX;
                    let new_width = this.viewport_width + (displacement / resolution_controller.scalling);
                    if(new_width > (resolution_controller.max_width / resolution_controller.scalling)) resolution_controller.viewport_update(resolution_controller.max_width / resolution_controller.scalling, this.viewport_height, resolution_controller.scalling * 100);
                    else resolution_controller.viewport_update(new_width, this.viewport_height, resolution_controller.scalling * 100);
                    this.sync_selector();
                }
            }

            let resolution_controller = {
                resolution_control_panel : document.querySelector(".builder-nav-middle"),
                resolution_control_preset : document.querySelector(".resolution-control-presets"),
                resolution_control_custom : document.querySelector(".resolution-control-custom"),
                desktop_preset : document.querySelector(".desktop-view"),
                tablet_preset : document.querySelector(".tablet-view"),
                phone_preset : document.querySelector(".phone-view"),
                dynamic_switch : document.querySelector(".dynamic-switch"),
                selected_preset : document.querySelector(".desktop-view"),
                selected_panel : document.querySelector(".resolution-control-presets"),
                height : document.querySelector(".resolution-height"),
                width : document.querySelector(".resolution-width"),
                zoom : document.querySelector(".resolution-zoom-value"),
                zoom_switch : document.querySelector(".zoom-switch"),
                max_width : parseFloat(window.getComputedStyle(viewport_container).width),
                max_height : parseFloat(window.getComputedStyle(viewport_container).height),
                fit_screen : 1,
                scalling : undefined,

                event_handler(e){
                    if((e.target == this.width || e.target == this.height || e.target == this.zoom) && (this.zoom.value != "")) this.viewport_update(this.width.value, this.height.value, this.zoom.value);
                    if(e.target == this.dynamic_switch) this.switch_panel(); 
                    if(e.target == this.desktop_preset || e.target == this.tablet_preset || e.target == this.phone_preset) this.select_preset(e.target);
                    if(e.target == this.zoom_switch) this.switch_fit_screen();
                },

                select_preset(preset){
                    this.selected_preset.style.borderBottom = "none";
                    this.selected_preset.firstElementChild.style.fill = "#6e5074";
                    this.selected_preset = preset;
                    this.selected_preset.firstElementChild.style.fill = "var(--builder-pink)";
                    this.selected_preset.style.borderBottom = "2px solid var(--builder-pink)";

                    if(preset == this.desktop_preset) this.viewport_update(resolution_presets.desktop.width, resolution_presets.desktop.height);
                    else if(preset == this.tablet_preset) this.viewport_update(resolution_presets.tablet.width, resolution_presets.tablet.height);
                    else if(preset == this.phone_preset) this.viewport_update(resolution_presets.phone.width, resolution_presets.phone.height);
                },

                viewport_update(width, height, zoom){
                    if(width == "" || height == "" || zoom == "") return;
                    viewport.style.height = `${height}px`;
                    viewport.style.width = `${width}px`;
                    editor_viewport.style.height = `${height}px`;
                    editor_viewport.style.width = `${width}px`;
                    this.height.value = parseInt(height);
                    this.width.value = parseInt(width);
                    if(this.fit_screen == 1) zoom = (Math.min(this.max_width/width, this.max_height/height)) * 100;   // Auto adjust zoom
                    viewport.style.transform = `scale(${zoom/100})`;
                    editor_viewport.style.transform = `scale(${zoom/100})`;
                    this.scalling = zoom/100;
                    this.zoom.value = `${parseInt(zoom)}`;
                    relative_x_global = viewport.getBoundingClientRect().left;
                    relative_y_global = viewport.getBoundingClientRect().top;
                    sync_selector(curr_focus);
                    if(animation_editor_controls.animation_name != undefined) sync_selector(animation_editor_controls.preview_element);
                    viewport_free_drag_controller.sync_selector();
                },

                switch_panel(){
                    if(this.selected_panel == this.resolution_control_preset){
                        this.resolution_control_preset.style.display = "none";
                        this.resolution_control_custom.style.display = "flex";
                        this.selected_panel = this.resolution_control_custom;
                        viewport_free_drag_controller.initiallize();
                    }
                    else{
                        this.resolution_control_custom.style.display = "none";
                        this.resolution_control_preset.style.display =   "flex";
                        this.selected_panel = this.resolution_control_preset;
                        this.select_preset(this.selected_preset);
                        viewport_free_drag_controller.destructor();
                        if(this.fit_screen == 0) this.switch_fit_screen();
                    }
                },

                switch_fit_screen(){
                    if(this.fit_screen == 0){
                        this.fit_screen = 1;
                        this.zoom_switch.firstElementChild.style.fill = "var(--builder-pink)";
                    }
                    else{
                        this.fit_screen = 0;
                        this.zoom_switch.firstElementChild.style.fill = "#6e5074";
                    }
                    this.viewport_update(this.width.value, this.height.value, this.scalling * 100);
                }
            }
    
            let animation_editor_controls = {
                "animation_name" : undefined,
                "control_tab" : document.querySelector(".animation-editor"),
                "keystamp_value" : document.querySelector(".keystamp-value"),
                "keystamp_slider" : document.querySelector(".keystamp-slider"),
                "key_add" : document.querySelector(".key-add"),
                "key_remove" : document.querySelector(".key-remove"),
                "key_index" : new Map(),
                "key_order" : new Array(101).fill(undefined),
                "head" : undefined,
                "tail" : undefined,
                "backup_style" : undefined,
                "preview_element" : undefined,
                "intital_frame" : {},

                initiallize(animation_name, preview_element){    
                    this.animation_name = animation_name,
                    this.control_tab.addEventListener("click", animation_event_handler);
                    this.control_tab.addEventListener("input", animation_event_handler);
                    this.control_tab.addEventListener("change", animation_preview_handler);
                    this.backup_style = JSON.parse(JSON.stringify(project_state[elements_index.get(preview_element)].style));
                    this.preview_element = preview_element;
                    this.control_tab.style.display = "flex";
                    setTimeout(()=>{this.control_tab.style.bottom = "2%"}, 1);
                    resolution_controller.resolution_control_panel.style.pointerEvents = "none";
                    this.load_animation();
                },

                destructor(){
                    for(let keystamp in directives.keyframes[this.animation_name].animation){
                        directives.keyframes[this.animation_name].animation[keystamp].next = undefined;
                        directives.keyframes[this.animation_name].animation[keystamp].prev = undefined;
                    }
                    this.animation_name = undefined;
                    this.control_tab.removeEventListener("click", animation_event_handler);
                    this.control_tab.removeEventListener("input", animation_event_handler);
                    this.control_tab.removeEventListener("change", animation_preview_handler);
                    this.keystamp_slider.value = "0";
                    this.keystamp_value.value = "0";
                    this.key_order = new Array(101).fill(undefined);
                    this.head = undefined;
                    this.tail = undefined;
                    this.backup_style = undefined;
                    this.preview_element = undefined;
                    this.intital_frame = {};
                    for(let i of this.key_index) i[0].remove();
                    this.key_index = new Map();
                    this.control_tab.style.bottom = "-5%"
                    setTimeout(()=>{this.control_tab.style.display = "none"}, 500);
                    resolution_controller.resolution_control_panel.style.pointerEvents = "all";
                },

                sync(value){
                    this.keystamp_value.value = value;
                    this.keystamp_slider.value = value
                },

                key_adder(){
                    let order = parseInt(this.keystamp_value.value);
                    this.keystamp_value.value = `${order}`;
                    if(this.keystamp_value.value in directives.keyframes[this.animation_name].animation) return;
                    let key = document.createElement("DIV");
                    key.classList.add("key");
                    key.style.left = `${this.keystamp_value.value}%`;
                    directives.keyframes[this.animation_name].animation[this.keystamp_value.value] = {"style" : {} ,"DOM" : key, "order" : order, "next" : undefined, "prev" : undefined};
                    this.key_index.set(key, this.keystamp_value.value);    
                    this.keystamp_slider.parentElement.append(key);
                    this.key_order[order] = directives.keyframes[this.animation_name].animation[this.keystamp_value.value];
                    if(this.head == undefined){
                        this.head = this.key_order[order];
                        this.tail = this.key_order[order];
                        return;
                    }

                    let temp = this.head;
                    while(temp != undefined){
                        if(temp.order > order) break;
                        temp = temp.next;
                    }
                    
                    if(temp == undefined){
                        this.tail.next = this.key_order[order];
                        this.key_order[order].prev = this.tail;
                        this.tail = this.tail.next;
                        return;
                    }

                    if(temp == this.head){
                        this.key_order[order].next = this.head;
                        this.head.prev = this.key_order[order];
                        this.head = this.head.prev;
                        return;
                    }

                    temp.prev.next = this.key_order[order];
                    this.key_order[order].prev = temp.prev;
                    temp.prev = this.key_order[order];
                    this.key_order[order].next = temp;
                },

                key_remover(){
                    if(this.keystamp_value.value in directives.keyframes[this.animation_name].animation == false) return;
                    let order = parseInt(this.keystamp_value.value);
                    this.key_index.delete(directives.keyframes[this.animation_name].animation[this.keystamp_value.value].DOM);
                    directives.keyframes[this.animation_name].animation[this.keystamp_value.value].DOM.remove();
                    delete directives.keyframes[this.animation_name].animation[this.keystamp_value.value];
                    if(this.key_order[order].next != undefined) this.key_order[order].next.prev = this.key_order[order].prev;
                    if(this.key_order[order].prev != undefined) this.key_order[order].prev.next = this.key_order[order].next;
                    if(this.key_order[order] == this.head) this.head = this.head.next;
                    if(this.key_order[order] == this.tail) this.tail = this.tail.prev;
                    this.key_order[order] = undefined;
                    if(this.key_index.size == 0){
                        for(let i in this.intital_frame){
                            for(let j of styles_tab[i]){
                                style_update(j, this.intital_frame[i]);
                                user_input(j);
                            }
                        }
                    }
                    this.update_preview();
                },

                animation_input(property, value){
                    if(property == "none") return;
                    if(this.keystamp_value.value in directives.keyframes[this.animation_name].animation == false) this.key_adder();
                    directives.keyframes[this.animation_name].animation[this.keystamp_value.value].style[property] = value;
                    if(property in this.intital_frame == false) this.intital_frame[property] = this.backup_style[property];
                },

                update_preview(){
                    let keystamp = parseInt(this.keystamp_value.value);
                    let forward = keystamp, backward = keystamp;

                    while(forward < 101 || backward > -1){
                        if(backward > -1) if(this.key_order[backward] != undefined) break;
                        if(forward < 101) if(this.key_order[forward] != undefined) break;
                        forward++;
                        backward--;
                    }
                    if(forward > 100 && backward < 0) return;
                    let styles = {};
                    if(backward > -1) if(this.key_order[backward] != undefined){
                        let temp = this.key_order[backward];
                        while(temp != undefined){
                            for(let i in temp.style) if(i in styles == false) styles[i] = temp.style[i];
                            temp = temp.prev;
                        }

                        temp = this.key_order[backward].next;
                        // for(let i in this.intital_frame){
                        //     if(i in styles == false) styles[i] = this.initital_frame[i];
                        // }
                        
                        for(let i in this.intital_frame){
                            for(let j of styles_tab[i]){
                                if(i in styles) style_update(j, styles[i]);
                                else{
                                    if(this.intital_frame[i] == undefined) style_update(j, DEFAULT_STYLES[i]);
                                    else style_update(j, this.intital_frame[i]);
                                }
                                user_input(j);
                            }
                        }
                        return;
                    }

                    if(forward < 101) if(this.key_order[forward] != undefined){
                        let temp = this.key_order[forward].prev;
                        while(temp != undefined){
                            for(let i in temp.style) if(i in styles == false) styles[i] = temp.style[i];
                            temp = temp.prev;
                        }

                        temp = this.key_order[forward];

                        for(let i in this.intital_frame){
                            for(let j of styles_tab[i]){
                                if(i in styles) style_update(j, styles[i]);
                                else{
                                    if(this.intital_frame[i] == undefined) style_update(j, DEFAULT_STYLES[i]);
                                    else style_update(j, this.intital_frame[i]);
                                }
                                user_input(j);
                            }
                        }
                        return;
                    }


                },

                export_animation(){
                    let rule = `@keyframes ${this.animation_name}{`;
                    for(let key in directives.keyframes[this.animation_name].animation){
                        let dummy = document.createElement("DIV");
                        let keyframe = `${key}%{`;
                        for(let i in directives.keyframes[this.animation_name].animation[key].style) dummy.style[i] = directives.keyframes[this.animation_name].animation[key].style[i];
                        keyframe += dummy.style.cssText;
                        keyframe += `}`;
                        rule += keyframe;
                    }
                    rule = rule += `}`;
                    return rule;
                },

                load_animation(){
                    for(let keystamp in directives.keyframes[this.animation_name].animation){
                        let order = parseInt(keystamp);
                        for(let i in directives.keyframes[this.animation_name].animation[keystamp].style) if(i in this.intital_frame == false) this.intital_frame[i] = this.backup_style[i];
                        let key = document.createElement("DIV");
                        key.classList.add("key");
                        key.style.left = `${keystamp}%`;
                        directives.keyframes[this.animation_name].animation[keystamp] = {"style" : directives.keyframes[this.animation_name].animation[keystamp].style ,"DOM" : key, "order" : order, "next" : undefined, "prev" : undefined};
                        this.key_index.set(key, keystamp);    
                        this.keystamp_slider.parentElement.append(key);
                        this.key_order[order] = directives.keyframes[this.animation_name].animation[keystamp];
                        if(this.head == undefined){
                            this.head = this.key_order[order];
                            this.tail = this.key_order[order];
                            continue;
                        }
    
                        let temp = this.head;
                        while(temp != undefined){
                            if(temp.order > order) break;
                            temp = temp.next;
                        }
                        
                        if(temp == undefined){
                            this.tail.next = this.key_order[order];
                            this.key_order[order].prev = this.tail;
                            this.tail = this.tail.next;
                            continue;
                        }
    
                        if(temp == this.head){
                            this.key_order[order].next = this.head;
                            this.head.prev = this.key_order[order];
                            this.head = this.head.prev;
                            continue;
                        }
    
                        temp.prev.next = this.key_order[order];
                        this.key_order[order].prev = temp.prev;
                        temp.prev = this.key_order[order];
                        this.key_order[order].next = temp;
                    }
                    
                }
            }

            let external_css_tab = {
                "visibility" : 0,
                "selected" : undefined,
                "buttons" : new Set([document.querySelector(".keyframes"), document.querySelector(".responsiveness")]),
                "external_css_tab" : external_css,

                initiallize(){
                    this.external_css_tab.style.display = "flex"
                    this.visibility = 1;
                    setTimeout(()=>{this.external_css_tab.style.bottom = "2%"}, 1);
                },

                select(e){
                    if(e.target == this.selected) return;
                    if(this.selected != undefined) this.selected.style.border = "none";
                    this.selected = e.target;
                    this.selected.style.border = "1px solid rgba(220, 16, 169, 0.758)";
                    
                    if(e.target.dataset.function == "keyframes"){
                        keyframes("generic");
                    }

                    if(e.target.dataset.function == "selector") selector();
                },
                
                destructor(){
                    if(this.selected != undefined) this.selected.style.border = "none";
                    this.selected = undefined;
                    this.external_css_tab.style.bottom = "-5%"
                    setTimeout(()=>{this.external_css_tab.style.display = "none"}, 500);
                    this.visibility = 0;
                }
            }
    
            let editor_doc = undefined;
            let editor_body = undefined;
            let editor = undefined;

            editor_viewport.onload = ()=>{
                editor_doc = editor_viewport.contentWindow.document;
                editor_body = editor_doc.body;
                editor = {
                    "editor_screen" : editor_doc.querySelector(".editor-screen"),
                    "editor_screen_preview" : editor_doc.querySelector(".editor-screen-preview"),
                    "editor_screen_save_controls" : editor_doc.querySelector(".editor-screen-save-controls"),
                    "title" : undefined,
                    "editor_exit" : editor_doc.querySelector(".editor-exit"),
                    "editor_save_exit" : editor_doc.querySelector(".editor-save-exit"),
    
                    initiallize(title="untitled"){
                        this.title = title;
                        saving = 1;
                        viewport.style.display = "none";
                        editor_viewport.style.display = "flex";
                        this.editor_screen.firstElementChild.children[1].innerText = title;
                        project_state["editor"] = {
                            "DOM" : this.editor_screen_preview,
                            "children" : {}
                        };
                        elements_index.set(this.editor_screen_preview, "editor");
                        setTimeout(()=>{this.editor_screen.firstElementChild.style.top = "0%";},500);
                    },
    
                    destructor(){
                        for(let i in project_state["editor"].children) delete_element(project_state[i].DOM);
                        delete project_state["editor"];
                        elements_index.delete(editor)
                        this.editor_screen.firstElementChild.style.top = "-6%";
                        this.flush_editor();
                        setTimeout(()=>{
                            editor_viewport.style.display = "none";
                            viewport.style.display = "block";
                            this.editor_screen_save_controls.lastElementChild.remove();
                            let new_save_clone = editor_doc.createElement("button");
                            new_save_clone.classList.add("editor-save-exit")
                            this.editor_screen_save_controls.append(new_save_clone);
                            this.editor_save_exit = new_save_clone;
        
                            this.editor_screen_save_controls.firstElementChild.remove();
                            new_save_clone = editor_doc.createElement("button");
                            new_save_clone.classList.add("editor-exit")
                            this.editor_screen_save_controls.prepend(new_save_clone);
                            this.editor_exit = new_save_clone;
                        },1000);
                        saving = 0;
                        withdraw_focus();
                    },
    
                    flush_editor(){
                        this.editor_screen.lastElementChild.innerHTML = "";
                    }
                }

                editor.editor_screen_preview.addEventListener("click", (e)=>{
                    e.preventDefault();
                    if(e.target == editor.editor_screen_preview) return;
                    else draw_focus(e.target);
                });

                editor_doc.addEventListener("scroll", ()=>{
                    for(let i of selector_index) sync_selector(i[0]);   
                });

                editor_doc.addEventListener("contextmenu", right_click);
            }
            
            
            // let relative_x_global = parseFloat(window.getComputedStyle(document.querySelector(".warehouse")).width) + parseFloat(window.getComputedStyle(document.querySelector(".category")).width);
            // let relative_y_global = parseFloat(window.getComputedStyle(document.querySelector(".builder-nav")).height);
            let relative_x_global = viewport.getBoundingClientRect().left;
            let relative_y_global = viewport.getBoundingClientRect().top;
            let elements_count = project_state["elements_count"];
            let styles_tab = {};
            let attributes_tab = {};
            let warehouse_tab = {};
            let synced_elements = new Map();
            let attributes_span = document.querySelectorAll(".attribute-span");
            let attributes_input = document.querySelectorAll(".attribute-input");
            let components_container = document.querySelector(".components-container");
            let animations_container = document.querySelector(".animations-container");
            let components_tab_switch = document.querySelector(".components-select");
            let selected_component_tab = components_container;
            let synced_elements_inputs = Array.from(document.querySelectorAll(".sync"));
            let components_index = {};
            resolution_controller.select_preset(resolution_controller.desktop_preset);

            let backup = {
                backup_storage : {},

                store(backup_name, backup_object){
                    this.backup_storage[backup_name] = JSON.stringify(backup_object);
                    return 1;
                },

                delete(backup_name){
                    this.backup_storage[backup_name] = {};
                    delete this.backup_storage[backup_name];
                    return 1;
                },

                restore(backup_name, destination){
                    destination[backup_name] = JSON.parse(this.backup_storage[backup_name]);
                }
            }

            let arr = Array.from(document.querySelectorAll(".style-input"));
            for(let i = 0; i < arr.length; i++) styles_tab[arr[i].dataset.property] = new Set();
            for(let i = 0; i < arr.length; i++) styles_tab[arr[i].dataset.property].add(arr[i]);

            for(let i = 0; i < synced_elements_inputs.length; i++){
                let syncedWith = JSON.parse(synced_elements_inputs[i].dataset.sync);
                for(let j = 0; j < syncedWith.length; j++) syncedWith[j] = document.querySelector(`.${syncedWith[j]}`);
                synced_elements.set(synced_elements_inputs[i], syncedWith);
            }

            
            let popup = {

                permission(message){
                    return confirm(message);
                },

                warning(message, duration){
                    alert(message);
                },

                ask(message){
                    return prompt(message);
                }
            }

           

            let free_drag_controller = {
                "hold_btn" : {"function" : undefined, "pos_x" : undefined, "pos_y" : undefined, "target" : undefined, "target_height" : undefined, "target_width" : undefined, "inline_target_height" : undefined, "inline_target_width" : undefined},
                "functionality" : false,

                drag_top(e){
                    if(this.hold_btn.inline_target_height[0] == '0'){            // Safety Check for Preventing 0/0 Condition During Re-Calculation
                        this.hold_btn.inline_target_height = `${1}${unitValueFetcher(this.hold_btn.inline_target_height).unit}`;
                        for(let i of styles_tab["height"]){
                            style_update(i,  this.hold_btn.inline_target_height);
                            user_input(i);
                        }
                        this.hold_btn.target_height = window.getComputedStyle(this.hold_btn.target).height;
                    }

                    let displacement = -1 * (e.screenY - this.hold_btn.pos_y);
                    let new_height = parseFloat(this.hold_btn.target_height) + displacement;
                    if(new_height < 0) return;
                    new_height = `${new_height}px`;
                    for(let i of styles_tab["height"]){
                        style_update(i, new_height);
                        user_input(i);
                    }
                },

                drag_bottom(e){
                    if(this.hold_btn.inline_target_height[0] == '0'){            // Safety Check for Preventing 0/0 Condition During Re-Calculation
                        this.hold_btn.inline_target_height = `${1}${unitValueFetcher(this.hold_btn.inline_target_height).unit}`;
                        for(let i of styles_tab["height"]){
                            style_update(i,  this.hold_btn.inline_target_height);
                            user_input(i);
                        }
                        this.hold_btn.target_height = window.getComputedStyle(this.hold_btn.target).height;
                    }

                    let displacement = e.screenY - this.hold_btn.pos_y;
                    let new_height = parseFloat(this.hold_btn.target_height) + displacement;
                    if(new_height < 0) return;
                    new_height = `${new_height}px`;
                    for(let i of styles_tab["height"]){
                        style_update(i, new_height);
                        user_input(i);
                    }
                },
   
                drag_left(e){
                    if(this.hold_btn.inline_target_width[0] == '0'){            // Safety Check for Preventing 0/0 Condition During Re-Calculation
                        this.hold_btn.inline_target_width = `${1}${unitValueFetcher(this.hold_btn.inline_target_width).unit}`;
                        for(let i of styles_tab["width"]){
                            style_update(i,  this.hold_btn.inline_target_width);
                            user_input(i);
                        }
                        this.hold_btn.target_width = window.getComputedStyle(this.hold_btn.target).width;
                    }

                    let displacement = -1 * (e.screenX - this.hold_btn.pos_x);
                    let new_height = parseFloat(this.hold_btn.target_width) + displacement;
                    if(new_height < 0) return;
                    new_height = `${new_height}px`;
                    for(let i of styles_tab["width"]){
                        style_update(i, new_height);
                        user_input(i);
                    }
                },

                drag_right(e){
                    if(this.hold_btn.inline_target_width[0] == '0'){            // Safety Check for Preventing 0/0 Condition During Re-Calculation
                        this.hold_btn.inline_target_width = `${1}${unitValueFetcher(this.hold_btn.inline_target_width).unit}`;
                        for(let i of styles_tab["width"]){
                            style_update(i,  this.hold_btn.inline_target_width);
                            user_input(i);
                        }
                        this.hold_btn.target_width = window.getComputedStyle(this.hold_btn.target).width;
                    }

                    let displacement = e.screenX - this.hold_btn.pos_x;
                    let new_height = parseFloat(this.hold_btn.target_width) + displacement;
                    if(new_height < 0) return;
                    new_height = `${new_height}px`;
                    for(let i of styles_tab["width"]){
                        style_update(i, new_height);
                        user_input(i);
                    }
                },

                drag_move(e){
                    if(this.hold_btn.inline_target_left[0] == '0'){            // Safety Check for Preventing 0/0 Condition During Re-Calculation
                        this.hold_btn.inline_target_left = `${1}${unitValueFetcher(this.hold_btn.inline_target_left).unit}`;
                        for(let i of styles_tab["left"]){
                            style_update(i,  this.hold_btn.inline_target_left);
                            user_input(i);
                        }
                        this.hold_btn.target_left = window.getComputedStyle(this.hold_btn.target).left;
                    }

                    if(this.hold_btn.inline_target_top[0] == '0'){            // Safety Check for Preventing 0/0 Condition During Re-Calculation
                        this.hold_btn.inline_target_top = `${1}${unitValueFetcher(this.hold_btn.inline_target_top).unit}`;
                        for(let i of styles_tab["top"]){
                            style_update(i,  this.hold_btn.inline_target_top);
                            user_input(i);
                        }
                        this.hold_btn.target_top = window.getComputedStyle(this.hold_btn.target).top;
                    }


                    let displacement_X = e.screenX - this.hold_btn.pos_x;
                    let displacement_Y = e.screenY - this.hold_btn.pos_y;
                    let new_left = `${parseFloat(this.hold_btn.target_left) + displacement_X}px`;
                    let new_top = `${parseFloat(this.hold_btn.target_top) + displacement_Y}px`;
                    for(let i of styles_tab["left"]){
                        style_update(i, new_left);
                        user_input(i);
                    }

                    for(let i of styles_tab["top"]){
                        style_update(i, new_top);
                        user_input(i);
                    }
                }
            }

            let components = {};
            let names_count = undefined;
            if("names_count" in project_state) names_count = project_state.names_count;
            else names_count =  project_state.elements_count;

            if("components" in project_obj) components = project_obj.components;

            for(let i in components){
                components_index[i] = new Set();
                component_button_gen(i);
            }

            for(let i in directives.keyframes) animation_button_gen(i);

            let compatibility_list = {
                "FORM" : new Set(["action", "method", "enctype",]),
                "INPUT" : new Set(["type", "name", "value", "placeholder", "readonly", "disabled", "required", "checked", "min", "max", "step", "maxlength", "pattern"]),
                "BUTTON" : new Set(["disabled", "innerText"]),
                "TEXTAREA" : new Set(["name", "value", "placeholder", "readonly", "disabled", "required", "maxlength"]),
                "SELECT" : new Set(["name", "value", "disabled", "required"]),
                "OPTION" : new Set(["name", "value", "disabled"]),
                "IMG" : new Set(["src", "alt", "height"]),
                "VIDEO" : new Set(["src", "height", "controls", "autoplay", "loop", "muted", "poster"]),
                "IFRAME" : new Set(["src", "height"]),
                "AUDIO" : new Set(["src", "controls", "autoplay", "loop", "muted"]),
                "A" : new Set(["href", "target", "rel", "download", "innerText"]),
                "LINK" : new Set(["href", "rel"]),
                "TD" : new Set(["rowspan", "colspan"]),
                "TH" : new Set(["rowspan", "colspan"]),
                "DIV" : new Set(["tagName"]),
                "SECTION" : new Set(["tagName"]),
                "HEADER" : new Set(["tagName"]),
                "FOOTER" : new Set(["tagName"]),
                "NAV" : new Set(["tagName"]),
                "MAIN" : new Set(["tagName"]),
                "ARTICLE" : new Set(["tagName"]),
                "ASIDE" : new Set(["tagName"]),
                "ADDRESS" : new Set(["tagName"]),
                "FIGURE" : new Set(["tagName"]),
                "H1" : new Set(["tagNameH", "innerText"]),
                "H2" : new Set(["tagNameH", "innerText"]),
                "H3" : new Set(["tagNameH", "innerText"]),
                "H4" : new Set(["tagNameH", "innerText"]),
                "H5" : new Set(["tagNameH", "innerText"]),
                "H6" : new Set(["tagNameH", "innerText"]),
                "CODE" : new Set(["innerText"]),
                "BLOCKQUOTE" : new Set(["innerText"]),
            }

            function style_type_select(target){
                document.querySelector(".style-control-add").dataset["property"] = target.value;
                document.querySelector(".style-control-del").dataset["property"] = target.value;
            }

            function style_value_value(target){
                document.querySelector(".style-control-add").value = target.value;   
            }

            function style_control_del(target){
                curr_focus.style.removeProperty(camel_to_kebab[target.dataset.property]);
                delete project_state[elements_index.get(curr_focus)].style[target.dataset.property];    
            }

            function flush_drag_controller(){
                
                let element_styles = window.getComputedStyle(free_drag_controller.hold_btn.target);
                let initial_dimension = undefined;        // Computed
                let final_dimension = undefined;          // Computed
                let initial_inline_dimension = undefined; // Inline
                let dimension_type = undefined;

                if(free_drag_controller.hold_btn.function == "drag_top" || free_drag_controller.hold_btn.function == "drag_bottom"){
                    initial_dimension = parseFloat(free_drag_controller.hold_btn.target_height);
                    final_dimension = parseFloat(element_styles.height);
                    initial_inline_dimension = unitValueFetcher(free_drag_controller.hold_btn.inline_target_height);
                    dimension_type = {"type" : "single", "name" : "height"};
                }
                else if(free_drag_controller.hold_btn.function == "drag_left" || free_drag_controller.hold_btn.function == "drag_right"){
                    initial_dimension = parseFloat(free_drag_controller.hold_btn.target_width);
                    final_dimension = parseFloat(element_styles.width);
                    initial_inline_dimension = unitValueFetcher(free_drag_controller.hold_btn.inline_target_width);
                    dimension_type = {"type" : "single", "name" : "width"};
                }
                else{
                    initial_dimension = {"left" : parseFloat(free_drag_controller.hold_btn.target_left), "top" : parseFloat(free_drag_controller.hold_btn.target_top)};
                    final_dimension = {"left" : parseFloat(element_styles.left), "top" : parseFloat(element_styles.top)};
                    initial_inline_dimension = {"left" : unitValueFetcher(free_drag_controller.hold_btn.inline_target_left), "top" : unitValueFetcher(free_drag_controller.hold_btn.inline_target_top)};
                    dimension_type = {"type" : "multiple", "name" : ["left", "top"]};
                }


                if(dimension_type.type == "single"){
                    if(initial_inline_dimension.unit == "%" || initial_inline_dimension.unit == "vw" || initial_inline_dimension.unit == "vh" || initial_inline_dimension.unit == "vmin" || initial_inline_dimension.unit == "vmax"){
                        let parentDimension = (initial_dimension * 100) / parseFloat(initial_inline_dimension.value); 
                        let recalculated_dimension = `${(final_dimension * 100) / parentDimension}${initial_inline_dimension.unit}`;
                        for(let i of styles_tab[dimension_type.name]){
                            style_update(i, recalculated_dimension);
                            user_input(i);
                        }
                    }
                }
                else if(dimension_type.type == "multiple"){
                    for(let i of dimension_type.name){
                        if(initial_inline_dimension[i].unit == "%" || initial_inline_dimension[i].unit == "vw" || initial_inline_dimension[i].unit == "vh" || initial_inline_dimension[i].unit == "vmin" || initial_inline_dimension[i].unit == "vmax"){
                            let parentDimension = (initial_dimension[i] * 100) / parseFloat(initial_inline_dimension[i].value);
                            let recalculated_dimension = `${(final_dimension[i] * 100) / parentDimension}${initial_inline_dimension[i].unit}`;
                            for(let j of styles_tab[i]){
                                style_update(j, recalculated_dimension);
                                user_input(j);
                            }
                        }
                    }
                }

                document.removeEventListener("mouseup", flush_drag_controller);
                preview_doc.removeEventListener("mouseup", flush_drag_controller);
                editor_doc.removeEventListener("mouseup", flush_drag_controller);
                document.removeEventListener("mousemove", mouse_drag_global);
                preview_doc.removeEventListener("mousemove", mouse_drag);
                editor_doc.removeEventListener("mousemove", mouse_drag);

                if(animation_editor_controls.animation_name != undefined){
                    if(dimension_type.type == "single") animation_editor_controls.animation_input(dimension_type.name, project_state[elements_index.get(free_drag_controller.hold_btn.target)].style[dimension_type.name]);
                    else for(let i of dimension_type.name) animation_editor_controls.animation_input(i, project_state[elements_index.get(free_drag_controller.hold_btn.target)].style[i]);
                }

                free_drag_controller.hold_btn = {"function" : undefined, "pos_x" : undefined, "pos_y" : undefined, "target" : undefined, "target_height" : undefined, "target_width" : undefined, "inline_target_height" : undefined, "inline_target_width" : undefined};
                if(my_selectors.selected == undefined) curr_focus = selector_controller.selected_element;
                else curr_focus = project_state["element-1"].DOM;
                return;
            }


            function free_drag_permission(){
                if(free_drag_controller.functionality == false){
                    free_drag_controller.functionality = popup.permission("Using free drag resizing or positioning is generally not recommended for responsive layouts. Do you still want to use it?");
                    return false;
                }
    
                if(project_state[elements_index.get(free_drag_controller.hold_btn.target)].style.position == "static"){
                    popup.warning("Free drag can't be used with elements whose position property is set to static", 5);
                    return false;
                }
                return true;
            }


            function mouse_drag(e){
               free_drag_controller[free_drag_controller.hold_btn.function](e);
            }

            function mouse_drag_global(e){
                let modified_e = {"screenX" : (e.screenX  - relative_x_global) / resolution_controller.scalling, "screenY" : (e.screenY - relative_y_global) / resolution_controller.scalling};
                free_drag_controller[free_drag_controller.hold_btn.function](modified_e);
            }
        
            function  transform_type_select(target){
                let input = document.querySelector(".transform-type-select");
                let selected_box = `transform-more-${input.value}`; 
                for(let i of document.querySelectorAll(".transform-more")){
                    if(i.classList[0] == selected_box) i.style.display = "flex";
                    else i.style.display = "none";
                }
            }

            function class_value(target){
                document.querySelector(".class-add").value = target.value;
                document.querySelector(".class-remove").value = target.value;
            }

            function custom_attribute_type(target){
                document.querySelector(".custom-attribute-add").dataset.property = document.querySelector(".custom-attribute-type").value
            }

            function custom_attribute_value(target){
                document.querySelector(".custom-attribute-add").value = document.querySelector(".custom-attribute-value").value;
            }

            function animation_name_select(target){
                let animation_obj = undefined;
                if(animation_list[elements_index.get(curr_focus)][target.value] == undefined) animation_obj = {"animationDuration" : "", "animationTimingFunction" : "", "animationDelay" : "", "animationIterationCount" : "", "animationDirection" : "", "animationFillMode" : "", "animationPlayState" : "", "animationName" : target.value};
                else animation_obj = animation_list[elements_index.get(curr_focus)][target.value];
                let animation_prop = document.querySelectorAll(".animation-input");
                for(let i of animation_prop){
                    if(i.dataset.property == "animationDuration" || i.dataset.property == "animationDelay") i.value = unitValueFetcher(animation_obj[i.dataset.property]).value;
                    else i.value = animation_obj[i.dataset.property];
                }
            }

            function transition_property_select(target){
                let transition_obj = undefined;
                if(transition_list[elements_index.get(curr_focus)][target.value] == undefined) transition_obj = {"transitionDuration" : "", "transitionTimingFunction" : "", "transitionDelay" : "", "transitionProperty" : target.value};
                else transition_obj = transition_list[elements_index.get(curr_focus)][target.value];
                let transition_prop = document.querySelectorAll(".transition-input");
                for(let i of transition_prop){
                    if(i.dataset.property == "transitionDuration" || i.dataset.property == "transitionDelay") i.value = unitValueFetcher(transition_obj[i.dataset.property]).value;
                    else i.value = transition_obj[i.dataset.property];
                }
            }

            async function attribute_input(target){
                if("instance_of" in project_state[elements_index.get(curr_focus)] && target.dataset.property in project_state[elements_index.get(curr_focus)].attribute) project_state[elements_index.get(curr_focus)].attribute[target.dataset.property] = project_state[elements_index.get(curr_focus)].attribute[target.dataset.property].value;
                if(target.classList[0] in ui_director) ui_director[target.classList[0]](target);

                if(target.dataset.apply == "none") return;

                if(target.dataset.apply == "direct"){
                    project_state[elements_index.get(curr_focus)].attribute[target.dataset.property] = target.value;
                    curr_focus[target.dataset.property] =  project_state[elements_index.get(curr_focus)].attribute[target.dataset.property];
                }

                if(target.dataset.apply == "check"){
                    project_state[elements_index.get(curr_focus)].attribute[target.dataset.property] = target.checked;
                    curr_focus[target.dataset.property] =  project_state[elements_index.get(curr_focus)].attribute[target.dataset.property];
                }

                if(target.dataset.apply == "class-add"){
                    curr_focus.classList.remove("selected-element");
                    curr_focus.classList.add(target.value);
                    project_state[elements_index.get(curr_focus)].attribute["className"] = curr_focus["className"];
                    curr_focus.classList.add("selected-element");
                    attributes_update(curr_focus);
                }

                if(target.dataset.apply == "class-remove"){
                    curr_focus.classList.remove("selected-element");
                    curr_focus.classList.remove(target.value);
                    project_state[elements_index.get(curr_focus)].attribute["className"] = curr_focus["className"];
                    curr_focus.classList.add("selected-element");
                    attributes_update(curr_focus);
                }

                if(target.dataset.apply == "tag-change") tag_changer(curr_focus, target.value);
                if("instance_of" in project_state[elements_index.get(curr_focus)] && target.dataset.property in project_state[elements_index.get(curr_focus)].attribute) project_state[elements_index.get(curr_focus)].attribute[target.dataset.property] = {"value" : project_state[elements_index.get(curr_focus)].attribute[target.dataset.property]};
                selector_controller.update_selector_index_one(curr_focus);
                selector_controller.update_selector_toggle(curr_focus);
                await autosave();
            }


            async function animation_list_add(animation_name){
                let option = document.createElement("option");
                option.value = animation_name;
                option.innerText = animation_name;
                document.querySelector(".animation-name-select").append(option);
                return;
            }

            function transition_to_string(transition_obj){
                let output =  "";
                let str = undefined;
                for(let i in transition_obj){
                    str = `${transition_obj[i]["transitionDuration"]} ${transition_obj[i]["transitionTimingFunction"]} ${transition_obj[i]["transitionDelay"]} ${transition_obj[i]["transitionProperty"]}`; 
                    if(output != "") output += ",";
                    output += str;
                }
                return output;
            }

            function animation_to_string(animation_obj){
                let output =  "";
                let str = undefined;
                for(let i in animation_obj){
                    str = `${animation_obj[i]["animationDuration"]} ${animation_obj[i]["animationTimingFunction"]} ${animation_obj[i]["animationDelay"]} ${animation_obj[i]["animationIterationCount"]} ${animation_obj[i]["animationDirection"]} ${animation_obj[i]["animationFillMode"]} ${animation_obj[i]["animationPlayState"]} ${animation_obj[i]["animationName"]}`; 
                    if(output != "") output += ",";
                    output += str;
                }
                return output;
            }


           async function user_input(target){
                project_state[elements_index.get(curr_focus)].style[target.dataset.property] = get_safe_style(elements_index.get(curr_focus), target.dataset.property);
                if(target.classList[0] in ui_director) ui_director[target.classList[0]](target);
                let final_value = undefined;

                if(document.querySelector(".content-direction-select").value == "row"){
                    document.querySelector(".content-alignment-select-x").dataset.property = "justifyContent";
                    document.querySelector(".content-alignment-select-y").dataset.property = "alignItems";
                 
                }
                else if(document.querySelector(".content-direction-select").value == "column"){
                    document.querySelector(".content-alignment-select-x").dataset.property = "alignItems";
                    document.querySelector(".content-alignment-select-y").dataset.property = "justifyContent";

                }

                if(target.dataset.apply == "none") return;
                

                if(target.dataset.apply == "direct" || target.dataset.apply == "radio-fetch"){
                    final_value = target.value;
                }

                if(target.dataset.apply == "unit-fetch"){
                    let dependency = document.querySelector(`.${target.dataset.dependency}`);
                    final_value = dependency.value + target.value;
                }

                
                if(target.dataset.apply == "value-fetch"){
                    let dependency = document.querySelector(`.${target.dataset.dependency}`);
                    final_value = target.value + dependency.value;
                }

                
                if(target.dataset.apply == "url-fetch"){
                    final_value = `url("${target.value}")`;
                   
                }

                
                if(target.dataset.apply == "hex-fetch"){
                    final_value = hexRgbFetcher(target.value, colorFetcher(project_state[elements_index.get(curr_focus)].style[target.dataset.property]).opacity);
                }

                
                if(target.dataset.apply == "bracket-value-fetch"){
                    let dependency = document.querySelector(`.${target.dataset.dependency}`);
                    final_value = `${dependency.value}(${target.value})`;
                   
                }

                
                if(target.dataset.apply == "bracket-type-fetch"){
                    let dependency = document.querySelector(`.${target.dataset.dependency}`);
                    final_value = `${target.value}(${dependency.value})`;
                   
                }

                if(target.dataset.apply == "color-fetch-a"){
                    final_value = rgbaOpacityEditor(project_state[elements_index.get(curr_focus)].style[target.dataset.property], target.value);
                  
                }

                if(target.dataset.apply == "color-fetch-a*100"){
                    final_value = rgbaOpacityEditor(project_state[elements_index.get(curr_focus)].style[target.dataset.property], `${Number(target.value)/100}`);
                }

                if(target.dataset.apply == "fetch*100"){
                    final_value = target.value/100;
                }

                if(target.dataset.apply == "animation-fetch"){
                    let animation_obj = {};
                    let animation_properties = document.querySelectorAll(".animation-input");
                    for(let i of animation_properties){
                        if(i.value == ""){
                            if(i.dataset.property == "animationDelay" || i.dataset.property == "animationDuration") animation_obj[i.dataset.property] = "0";
                            else if(i.dataset.property == "animationDirection") animation_obj[i.dataset.property] = "normal";
                            else if(i.dataset.property == "animationFillMode") animation_obj[i.dataset.property] = "none";
                            else if(i.dataset.property == "animationIterationCount") animation_obj[i.dataset.property] = "1";
                            else if(i.dataset.property == "animationPlayState") animation_obj[i.dataset.property] = "running";
                        }
                        else animation_obj[i.dataset.property] = i.value; 
                    }
                    animation_obj["animationDelay"] += "s";
                    animation_obj["animationDuration"] += "s";

                    if(animation_obj["animationName"] == "none") return;
                    if(elements_index.get(curr_focus) in animation_list == false) animation_list[elements_index.get(curr_focus)] = {};
                    if(target.classList[0] == "animation-add"){
                        animation_list[elements_index.get(curr_focus)][animation_obj.animationName] = animation_obj;
                        final_value = animation_to_string(animation_list[elements_index.get(curr_focus)]);
                    }
                    else{
                        delete animation_list[elements_index.get(curr_focus)][animation_obj.animationName];
                        final_value = animation_to_string(animation_list[elements_index.get(curr_focus)]);
                    }
                }

                if(target.dataset.apply == "transition-fetch"){
                    let transition_obj = {};
                    let transition_properties = document.querySelectorAll(".transition-input");
                    for(let i of transition_properties){
                        if(i.value == ""){
                            if(i.dataset.property == "transitionDelay" || i.dataset.property == "transitionDuration") transition_obj[i.dataset.property] = "0";
                        }
                        else transition_obj[i.dataset.property] = i.value; 
                    }
                    transition_obj["transitionDelay"] += "s";
                    transition_obj["transitionDuration"] += "s";

                    if(transition_obj["transitionProperty"] == "none") return;
                    if(elements_index.get(curr_focus) in transition_list == false) transition_list[elements_index.get(curr_focus)] = {};
                    if(target.classList[0] == "transition-add"){
                        transition_list[elements_index.get(curr_focus)][transition_obj.transitionProperty] = transition_obj;
                        final_value = transition_to_string(transition_list[elements_index.get(curr_focus)]);
                    }
                    else{
                        delete transition_list[elements_index.get(curr_focus)][transition_obj.transitionProperty];
                        final_value = transition_to_string(transition_list[elements_index.get(curr_focus)]);
                    }
                }
                
                if(target.dataset.clashwith){
                    let clash = document.querySelector(`.${target.dataset.clashwith}`);
                    delete project_state[elements_index.get(curr_focus)].style[clash.dataset.property];
                    curr_focus.style.removeProperty(`${clash.dataset.property}`);
                    clash.value = "";
                }


                if(target.dataset.shorthead == undefined){
                    project_state[elements_index.get(curr_focus)].style[target.dataset.property] = final_value; 
                    curr_focus.style[target.dataset.property] = project_state[elements_index.get(curr_focus)].style[target.dataset.property];
                }
                else{           // Shorthead Property Handler
                    project_state[elements_index.get(curr_focus)].style[target.dataset.property] = wordInsert(project_state[elements_index.get(curr_focus)].style[target.dataset.property], final_value, parseInt(target.dataset.shorthead));
                    curr_focus.style[target.dataset.property] = project_state[elements_index.get(curr_focus)].style[target.dataset.property];
                }

                if(target.dataset.runwith){
                    let runwith = JSON.parse(target.dataset.runwith);
                    for(let i = 0; i < runwith.length; i++) user_input(document.querySelector(`.${runwith[i]}`));
                }

                if(selector_index.has(curr_focus)) sync_selector(curr_focus);

                // Automatically detects and deletes non-required properties from DOM as well as from project_state
                if(CSS.supports(camelToKebab(target.dataset.property), project_state[elements_index.get(curr_focus)].style[target.dataset.property]) == false) delete_property(curr_focus, target.dataset.property);

                if(elements_index.get(curr_focus) == "element-1"){
                    for(let i of preview_doc.querySelectorAll(selector_manager.selector_order[parseInt(selector_controller.selector)].selector)){
                        if(target.dataset.property in project_state[elements_index.get(i)].style) delete project_state[elements_index.get(i)].style[target.dataset.property];
                        i.style.removeProperty(camelToKebab(target.dataset.property));
                    }
                    let dummy = selector_controller.dummy_element;
                    for(let i in project_state["element-1"].style) dummy.style[i] = project_state["element-1"].style[i];
                    let rule = `${project_state["element-1"].selector}{ ${dummy.style.cssText}}`;
                    preview_stylesheet.deleteRule(project_state["element-1"].index);
                    preview_stylesheet.insertRule(rule, project_state["element-1"].index);
                }

                
               if(saving == 0){         // Preventing Spam Save Requests on Backend, For Continuous Input Types Like Sliders and Color Pickers
                    saving = 1;
                    setTimeout(()=>{
                        saving = 0;
                        if(selector_controller.selector !== -1 && selector_controller.selector !== undefined) save_selector();
                        autosave();
                    }, 5000);
               }

            }

            function delete_property(element, property){
                delete project_state[elements_index.get(element)].style[property];
                element.style.removeProperty(camelToKebab(property));
            }

            function camelToKebab(str) {
                return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
            }

            async function save_selector(){
                let response = await fetch('/project/selectors/save', {"method" : "POST", "headers" : {"Content-Type" : "application/json"}, "body" : JSON.stringify({"created_by" : project_obj.created_by, "auth" : project_obj.auth, "id" : project_obj.id, "selector_obj" : project_state["element-1"], "index" : selector_controller.selector, "mode" : 2})});        //if(mode == 2) overwrite
                response = await response.json();
            }
                
            let display_x = parseFloat(window.getComputedStyle(document.querySelector(".preview-tab")).width);
            let display_y = parseFloat(window.getComputedStyle(document.querySelector(".preview-tab")).height);
            let root = undefined;
            let preview_stylesheet = undefined;
            let builder_stylesheet = undefined;
            let preview_win = undefined;
            let attributes_menu = undefined;
            let clipboard = {"name" : "", "content" : {}, "type" : ""};

                viewport.onload = async () => {
                preview_win = viewport.contentWindow;
                preview_doc = viewport.contentWindow.document;
                preview_stylesheet = preview_doc.getElementById("preview-stylesheet").sheet;
                builder_stylesheet = document.getElementById("builder-stylesheet").sheet;
                doc = preview_doc;
                root = preview_doc.getElementsByTagName("html")[0];
                attributes_menu = document.querySelector(".attributes-menu");
                body = preview_doc.getElementsByTagName("body")[0];
                if("element0" in project_state == false) render_recipe("body", root);
                else render_project("element0", root);
                load_keyframes();
                curr_focus = body;
                withdraw_focus(body);
                if("selector_order" in project_obj){
                    selector_manager.selector_order = project_obj.selector_order;
                    // selector_controller.selector_order = project_obj.selector_order;
                    selector_controller.update_selector_index();
                }
                selector_manager.my_selectors = my_selectors;
                if("selector_order" in project_obj) await selector_manager.initiallize_selectors();
                selector_controller.update_selector_toggle(selector_controller.selected_element);
                for(let i in components_index){            // Redefining all the references used in instances
                    for(let j of components_index[i]) refresh_instance_references(j);
                }
                document.querySelector(".slide2").style.pointerEvents = 'all';
            
                body.addEventListener("click", (e)=>{
                    // if(my_selectors.selected != undefined) return;
                    e.preventDefault();
                    let target = e.target;
                    if(target == curr_focus) withdraw_focus();
                    else if(target == selector_controller.selected_element) selector_controller.select("-1");
                    else draw_focus(target);
                })

                document.querySelector(".properties").addEventListener("input", async (e) =>{
                    await user_input(e.target);
                    if(animation_editor_controls.animation_name != undefined) animation_editor_controls.animation_input(e.target.dataset.property, project_state[elements_index.get(curr_focus)].style[e.target.dataset.property]);
                    if(e.target.classList[2] == "sync") sync_input(e.target);
                    user_input(e.target);
                });

                document.querySelector(".properties").addEventListener("click", async (e) =>{
                    await user_input(e.target);
                    if(animation_editor_controls.animation_name != undefined) animation_editor_controls.animation_input(e.target.dataset.property, project_state[elements_index.get(curr_focus)].style[e.target.dataset.property]);
                    if(e.target.classList[2] == "sync") sync_input(e.target);
                    user_input(e.target);
                });

                document.querySelector(".attributes-properties").addEventListener("input", (e) => {
                    attribute_input(e.target);
                }); 

                document.querySelector(".attributes-properties").addEventListener("click", (e) => {
                    if(e.target.tagName != "BUTTON") return;
                    attribute_input(e.target);
                
                }); 


                preview_doc.addEventListener("keyup", async (e) => {
                    e.preventDefault();         
                    if(e.key == "Delete" && curr_focus != body){
                        delete_element(curr_focus);
                        await autosave();
                        // curr_focus = body;
                        withdraw_focus();
                    }
    
                });

                document.addEventListener("keyup", async (e) => {
                    e.preventDefault();         
                    if(e.key == "Delete" && curr_focus != body){
                        delete_element(curr_focus);
                        await autosave();
                        // curr_focus = body;
                        withdraw_focus();
                    }
    
                });

                preview_doc.addEventListener("scroll", ()=>{
                    for(let i of selector_index) sync_selector(i[0]);   
                });

                preview_doc.addEventListener("contextmenu", right_click);

                for(let i = 0; i <= 3; i++){
                    viewport_free_drag_controller.selector.children[i].addEventListener("mousedown", (e)=>{
                        viewport_free_drag_controller.intitialX = e.screenX;
                        viewport_free_drag_controller.intitialY = e.screenY;
                        viewport_free_drag_controller.clicked_dot = e.target;
                        viewport_free_drag_controller.viewport_height = parseInt(viewport.style.height);
                        viewport_free_drag_controller.viewport_width = parseInt(viewport.style.width);
                        preview_doc.addEventListener("mouseup", flush_viewport_drag);
                        preview_doc.addEventListener("mousemove", viewport_mouse_drag);
                        document.addEventListener("mouseup", flush_viewport_drag);
                        document.addEventListener("mousemove", viewport_mouse_drag_global);
                    });
                }
                preview_doc.addEventListener("keydown", shortcut_handler);
                await autosave();
            }
         

            function compatibility_check(element){
                let tag = element.tagName;
                if(tag in compatibility_list == false){
                    for(let i = 0; i < attributes_span.length; i++) attributes_span[i].style.display = "none";
                    return;
                }

                for(let i = 0; i < attributes_span.length; i++){
                    if(compatibility_list[tag].has(attributes_span[i].dataset.property)) attributes_span[i].style.display = "flex";
                    else attributes_span[i].style.display = "none";
                }
            }

         
            

            let elements_recipe = {
                "body": {
                    tagName: "body",
                    styles: { "backgroundColor": "rgba(255,255,255,1)", "width": "100vw", "height": "100vh", "display": "flex", "textAlign": "left", "alignItems": "flex-start", "justifyContent": "flex-start", "flexDirection": "column", "overflow": "auto", "padding": "0px", "margin": "0px", "fontFamily": "sans-serif", "color": "rgba(0,0,0,1)" },
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": false, "font-size": true },
                    javascript: {},
                },
            
                "section": {
                    tagName: "section",
                    styles: { "boxSizing": "border-box", "flexWrap": "nowrap", "textAlign": "left", "flexShrink": "0", "height": "40%", "width": "100%", "borderWidth": "1px", "borderStyle": "dashed", "borderColor": "rgba(209, 213, 219, 1)", "backgroundColor": "rgba(255, 255, 255, 0)", "display": "flex", "flexDirection": "column", "position": "relative", "overflow": "visible", "padding": "24px" },
                    parent: "",
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": true },
                    javascript: {},
                },
            
                "container": {
                    tagName: "div",
                    styles: { "boxSizing": "border-box", "flexWrap": "nowrap", "textAlign": "left", "flexShrink": "0", "height": "50%", "width": "80%", "borderWidth": "1px", "borderStyle": "dashed", "borderColor": "rgba(209, 213, 219, 1)", "backgroundColor": "rgba(255, 255, 255, 0)", "display": "flex", "flexDirection": "column", "position": "relative", "overflow": "visible" },
                    parent: "",
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": true },
                    javascript: {},
                },
            
                "grid": {
                    tagName: "div",
                    styles: { "boxSizing": "border-box", "flexWrap": "nowrap", "textAlign": "left", "flexShrink": "0", "height": "50%", "width": "100%", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "backgroundColor": "rgba(255, 255, 255, 0)", "display": "grid", "position": "relative", "overflow": "visible", "gridTemplateRows": "1fr 1fr", "gridTemplateColumns": "1fr 1fr", "columnGap": "16px", "rowGap": "16px" },
                    parent: "",
                    children: ["grid_child", "grid_child", "grid_child", "grid_child"],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": true },
                    javascript: {},
                },
            
                "grid_child": {
                    tagName: "div",
                    styles: { "boxSizing": "border-box", "flexWrap": "nowrap", "textAlign": "left", "flexShrink": "0", "width": "100%", "height": "100%", "borderWidth": "1px", "borderStyle": "dashed", "borderColor": "rgba(209, 213, 219, 1)", "backgroundColor": "rgba(249, 250, 251, 1)", "display": "flex", "flexDirection": "column", "position": "relative", "overflow": "hidden" },
                    parent: "",
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": true },
                    javascript: {},
                },
            
                "columns": {
                    tagName: "div",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexShrink": "0", "height": "30%", "width": "100%", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "backgroundColor": "rgba(255, 255, 255, 0)", "display": "flex", "flexDirection": "row", "flexWrap": "nowrap", "columnGap": "16px", "position": "relative", "overflow": "visible" },
                    parent: "",
                    children: ["columns_child", "columns_child", "columns_child"],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": true },
                    javascript: {},
                },
            
                "columns_child": {
                    tagName: "div",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "width": "33.33%", "height": "100%", "backgroundColor": "rgba(249, 250, 251, 1)", "borderWidth": "1px", "borderStyle": "dashed", "borderColor": "rgba(209, 213, 219, 1)", "display": "flex", "flexDirection": "column", "flexWrap": "nowrap", "position": "relative", "overflow": "hidden" },
                    parent: "",
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": true },
                    javascript: {},
                },
            
                "heading-h1": {
                    tagName: "h1",
                    styles: { "alignItems": "flex-start", "textAlign": "left", "justifyContent": "flex-start", "boxSizing": "border-box", "flexWrap": "nowrap", "flexShrink": "0", "height": "15%", "width": "100%", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "display": "flex", "position": "relative", "overflow": "visible", "fontSize": "48px", "color": "rgba(17, 24, 39, 1)", "marginTop": "0px", "marginBottom": "16px" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    parent: "",
                    children: [],
                    attribute: { "innerText": "Heading Text" },
                    javascript: {},
                },
            
                "paragraph": {
                    tagName: "p",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "20%", "width": "100%", "display": "flex", "position": "relative", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "overflow": "visible", "fontSize": "16px", "lineHeight": "24px", "color": "rgba(55, 65, 81, 1)", "marginTop": "0px", "marginBottom": "16px" },
                    parent: "",
                    children: [],
                    attribute: { "innerText": "Enter your paragraph text here. Keep lines readable and clear." },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "text-link": {
                    tagName: "a",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "5%", "width": "20%", "display": "flex", "position": "relative", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "overflow": "visible", "fontSize": "16px", "color": "rgba(37, 99, 235, 1)", "textDecorationLine": "underline" },
                    parent: "",
                    children: [],
                    attribute: { "src": "", "innerText": "Text link" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "blockquote": {
                    tagName: "blockquote",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "20%", "width": "100%", "borderWidth": "0px", "borderLeftWidth": "4px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "backgroundColor": "rgba(243, 244, 246, 1)", "display": "flex", "alignItems": "center", "position": "relative", "overflow": "hidden", "fontSize": "18px", "fontStyle": "italic", "paddingLeft": "16px" },
                    parent: "",
                    children: [],
                    attribute: { "innerText": "Enter your quote here." },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "codeline": {
                    tagName: "code",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(229, 231, 235, 1)", "borderRadius": "6px", "flexShrink": "0", "height": "10%", "width": "50%", "backgroundColor": "rgba(243, 244, 246, 1)", "display": "flex", "alignItems": "center", "position": "relative", "overflow": "hidden", "fontSize": "14px", "color": "rgba(220, 38, 38, 1)", "paddingLeft": "8px" },
                    parent: "",
                    children: [],
                    attribute: { "innerText": "console.log('Hello');" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "button": {
                    tagName: "button",
                    styles: { "alignItems": "center", "textAlign": "center", "justifyContent": "center", "boxSizing": "border-box", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "borderRadius": "6px", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "20%", "backgroundColor": "rgba(37, 99, 235, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "fontWeight": "600", "color": "rgba(255, 255, 255, 1)", "cursor": "pointer" },
                    parent: "",
                    children: [],
                    attribute: { "innerText": "Button" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "checkbox": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "16px", "width": "16px", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "cursor": "pointer" },
                    parent: "",
                    children: [],
                    attribute: { "type": "checkbox" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "multichoice": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "16px", "width": "16px", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "cursor": "pointer" },
                    parent: "",
                    children: [],
                    attribute: { "type": "radio" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "choice-menu": {
                    tagName: "select",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "30%", "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "borderRadius": "6px", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "paddingLeft": "8px" },
                    parent: "",
                    children: ["choice-menu-option", "choice-menu-option"],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: { "innerText": "choose" },
                },
            
                "choice-menu-option": {
                    tagName: "option",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "5%", "width": "100%", "backgroundColor": "rgba(255, 255, 255, 1)", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)" },
                    parent: "",
                    children: [],
                    attribute: { "value": "", "innerText": "option" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "text-input": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "40%", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "borderRadius": "6px", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "paddingLeft": "8px" },
                    parent: "",
                    children: [],
                    attribute: { "type": "text", "placeholder": "Text here..." },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "password-input": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "40%", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "borderRadius": "6px", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "paddingLeft": "8px" },
                    parent: "",
                    children: [],
                    attribute: { "type": "password", "placeholder": "Password" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "comment-box": {
                    tagName: "textarea",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "30%", "width": "60%", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "borderRadius": "6px", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "paddingLeft": "8px", "paddingTop": "8px" },
                    parent: "",
                    children: [],
                    attribute: { "placeholder": "Your text here..." },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "search-box": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "40%", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "borderRadius": "6px", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "paddingLeft": "8px" },
                    parent: "",
                    children: [],
                    attribute: { "type": "search", "placeholder": "Search..." },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "numeric-input": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "20%", "backgroundColor": "rgba(255, 255, 255, 1)", "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "borderRadius": "6px", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "paddingLeft": "8px" },
                    parent: "",
                    children: [],
                    attribute: { "type": "number", "placeholder": "0" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "slider": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10px", "width": "40%", "backgroundColor": "rgba(255, 255, 255, 0)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(0, 0, 0, 1)", "cursor": "pointer" },
                    parent: "",
                    children: [],
                    attribute: { "type": "range", "min": "0", "max": "100" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "color-picker": {
                    tagName: "input",
                    styles: { "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "40px", "width": "40px", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0,0,0,1)", "cursor": "pointer" },
                    parent: "",
                    children: [],
                    attribute: { "type": "color" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "date-input": {
                    tagName: "input",
                    styles: { "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "borderRadius": "6px", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "30%", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "paddingLeft": "8px" },
                    parent: "",
                    children: [],
                    attribute: { "type": "date" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "file-uploader": {
                    tagName: "input",
                    styles: { "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "40%", "backgroundColor": "rgba(255, 255, 255, 0)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)" },
                    parent: "",
                    children: [],
                    attribute: { "type": "file" },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "image": {
                    tagName: "img",
                    styles: { "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "50%", "width": "50%", "backgroundColor": "rgba(243, 244, 246, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(0, 0, 0, 1)", "objectFit": "cover" },
                    parent: "",
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "video": {
                    tagName: "video",
                    styles: { "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "50%", "width": "50%", "backgroundColor": "rgba(0, 0, 0, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(0, 0, 0, 1)" },
                    parent: "",
                    children: [],
                    attribute: { "controls": true },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "audio": {
                    tagName: "audio",
                    styles: { "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "10%", "width": "60%", "backgroundColor": "rgba(243, 244, 246, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(0, 0, 0, 1)" },
                    parent: "",
                    children: [],
                    attribute: { "src": "", "controls": true },
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "web-page": {
                    tagName: "iframe",
                    styles: { "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "50%", "width": "80%", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(0, 0, 0, 1)" },
                    parent: "",
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "youtube-video": {
                    tagName: "iframe",
                    styles: { "borderWidth": "0px", "borderStyle": "solid", "borderColor": "rgba(0, 0, 0, 1)", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "40%", "width": "60%", "backgroundColor": "rgba(0, 0, 0, 1)", "display": "flex", "position": "relative", "overflow": "hidden", "fontSize": "16px", "color": "rgba(0, 0, 0, 1)" },
                    parent: "",
                    children: [],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                },
            
                "basic-form": {
                    tagName: "form",
                    styles: { "borderWidth": "1px", "borderStyle": "solid", "borderColor": "rgba(209, 213, 219, 1)", "boxSizing": "border-box", "textAlign": "left", "flexWrap": "nowrap", "flexShrink": "0", "height": "60%", "width": "50%", "backgroundColor": "rgba(255, 255, 255, 1)", "display": "flex", "flexDirection": "column", "position": "relative", "overflow": "visible", "fontSize": "16px", "color": "rgba(17, 24, 39, 1)", "padding": "24px", "rowGap": "16px", "borderRadius": "8px" },
                    parent: "",
                    children: ["text-input", "password-input", "date-input", "button"],
                    attribute: {},
                    determine: { "bg-color": false, "color": false, "dimension": true, "font-size": false },
                    javascript: {},
                }
            };


            let elements_index = new Map();    // Stores the references to all the elements that are created so far in project
            elements = elements_index;

            function style_update(input, value){
                if(input.dataset.property == "none") return;
                if(input.dataset.shorthead != undefined) value =  wordFetcher(value, input.dataset.shorthead);
                if(input.dataset.apply == "direct"){
                    input.value = value;
                }

                if(input.dataset.apply == "url-fetch"){
                    input.value = typeValueFetcher(value).value;
                }

                if(input.dataset.apply == "color-fetch-a"){
                    input.value = colorFetcher(value).opacity;
                }

                if(input.dataset.apply == "color-fetch-a*100"){
                    input.value = colorFetcher(value).opacity * 100;
                }

                if(input.dataset.apply == "bracket-type-fetch"){
                    input.value = typeValueFetcher(value).type;
                }

                if(input.dataset.apply == "bracket-value-fetch"){
                    input.value = typeValueFetcher(value).value;
                }

                if(input.dataset.apply == "value-fetch"){
                    input.value = unitValueFetcher(value).value;
                }

                if(input.dataset.apply == "unit-fetch"){
                    input.value = unitValueFetcher(value).unit;
                }

                if(input.dataset.apply == "hex-fetch"){
                    input.value = hexFetcher(value);
                }

                if(input.dataset.apply == "fetch*100"){
                    input.value = value*100;
                }

                if(input == display_type_select) display_select(input);
              
            }

            function get_safe_style(element_obj_name, property) {
                let style_obj = project_state[element_obj_name].style;
                if(style_obj && style_obj[property] !== undefined) return style_obj[property];
                return DEFAULT_STYLES[property] || "";
            }


            function styles_update(element){
                for(let i of arr){
                    if(i.dataset.property == "none") continue;  
                    let final_value = get_safe_style(elements_index.get(element), i.dataset.property);
                    if(final_value === "") continue;

                    if(i.dataset.shorthead != undefined) final_value = wordFetcher(final_value, i.dataset.shorthead);
                    if(i.dataset.apply == "radio-fetch"){
                        i.elements[i.firstElementChild.firstElementChild.name].value = final_value;
                    }

                    if(i.dataset.apply == "direct"){
                        i.value = final_value;
                    }

                    if(i.dataset.apply == "url-fetch"){
                        i.value = typeValueFetcher(final_value).value;
                    }

                    if(i.dataset.apply == "color-fetch-a"){
                        i.value = colorFetcher(final_value).opacity;
                    }

                    if(i.dataset.apply == "color-fetch-a*100"){
                        i.value = colorFetcher(final_value).opacity * 100;
                    }

                    if(i.dataset.apply == "bracket-type-fetch"){
                        i.value = typeValueFetcher(final_value).type;
                    }

                    if(i.dataset.apply == "bracket-value-fetch"){
                        i.value = typeValueFetcher(final_value).value;
                    }

                    if(i.dataset.apply == "value-fetch"){
                        i.value = unitValueFetcher(final_value).value;
                    }

                    if(i.dataset.apply == "unit-fetch"){
                        i.value = unitValueFetcher(final_value).unit;
                    }

                    if(i.dataset.apply == "hex-fetch"){
                        i.value = hexFetcher(final_value);
                    }

                    if(i.dataset.apply == "fetch*100"){
                        i.value = final_value*100;
                    }

                    if(i.dataset.apply == "transition-list-fetch"){
                        i.innerHTML = "";
                        if(elements_index.get(element) in transition_list == false) continue;
                        for(let j in transition_list[elements_index.get(element)]){
                            let tile = document.createElement("div");
                            tile.classList.add("animation-list-tile");
                            tile.innerText = j;
                            i.append(tile);
                        }
                    }

                    if(i.dataset.apply == "animation-list-fetch"){
                        i.innerHTML = "";
                        if(elements_index.get(element) in animation_list == false) continue;
                        for(let j in animation_list[elements_index.get(element)]){
                            let tile = document.createElement("div");
                            tile.classList.add("animation-list-tile");
                            tile.innerText = j;
                            i.append(tile);
                        }
                    }

                    if(i == display_type_select) display_select(i);
                }

            }

            async function animation_list_refresh(target){
                let i = document.querySelector(".animation-list-tile-container");
                let element = curr_focus;
                i.innerHTML = "";
                for(let j in animation_list[elements_index.get(element)]){
                    let tile = document.createElement("div");
                    tile.classList.add("animation-list-tile");
                    tile.innerText = j;
                    i.append(tile);
                }
            }

            async function transition_list_refresh(target){
                let i = document.querySelector(".transition-list-tile-container");
                let element = curr_focus;
                i.innerHTML = "";
                for(let j in transition_list[elements_index.get(element)]){
                    let tile = document.createElement("div");
                    tile.classList.add("animation-list-tile");
                    tile.innerText = j;
                    i.append(tile);
                }
            }

            function attributes_update(element){
                compatibility_check(element);
                for(let target of attributes_input){
                    if(target.dataset.apply == "none") continue;
                    // if(target.dataset.property in project_state[elements_index.get(element)].attribute == false && target.dataset.property in project_state[elements_index.get(element)] == false){
                    //     target.value = "";
                    //     continue;
                    // }
                    if("instance_of" in project_state[elements_index.get(element)] && target.dataset.property in project_state[elements_index.get(element)].attribute) project_state[elements_index.get(element)].attribute[target.dataset.property] = project_state[elements_index.get(element)].attribute[target.dataset.property].value;
                    if(target.dataset.apply == "direct"){
                        target.value = project_state[elements_index.get(element)].attribute[target.dataset.property];
                    }

                    if(target.dataset.apply == "check"){
                        target.checked = project_state[elements_index.get(element)].attribute[target.dataset.property];
                    }
            
                    if(target.dataset.apply == "tag-change"){
                        target.value = project_state[elements_index.get(element)][target.dataset.property];
                    }

                    if(target.dataset.apply == "class-list-fetch"){
                        target.innerHTML = "";
                        for(let j of element.classList){
                            if(j == "selected-element") continue;
                            let tile = document.createElement("div");
                            tile.classList.add("animation-list-tile");
                            tile.innerText = j;
                            target.append(tile);
                        }
                    }

                    if("instance_of" in project_state[elements_index.get(element)] && target.dataset.property in project_state[elements_index.get(element)].attribute) project_state[elements_index.get(element)].attribute[target.dataset.property] = {"value" : project_state[elements_index.get(element)].attribute[target.dataset.property]};
                }
            }


            function name_generator(){
                names_count++;
                return `element${names_count}`;
            }

            function draw_focus(element){
                despawn_selector(curr_focus);
                flush_styles_tab();
                flush_attributes_tab();
                curr_focus = element;
                styles_update(element);
                if(elements_index.get(element) != "element-1"){
                    spawn_selector(element);
                    attributes_update(element);
                    selector_controller.update_selector_toggle(element);
                }
            }

            function flush_styles_tab(){
                for(let i of style_inputs){
                    i.value = "";
                    if(i.dataset.apply == "animation-list-fetch" || i.dataset.apply == "transition-list-fetch") i.innerHTML = "";
                }
            }

            function flush_attributes_tab(){
                for(let i of attribute_inputs){
                     i.value = "";
                     if(i.dataset.apply == "class-list-fetch") i.innerHTML = "";
                }

            }

            function withdraw_focus(){
                despawn_selector(curr_focus);
                curr_focus = body;
                flush_styles_tab();
                flush_attributes_tab();
                spawn_selector(body);
                styles_update(body);
                attributes_update(body);
                selector_controller.update_selector_toggle(body);
            }

            async function sync_selector(element){
                let relative_x = relative_x_global;
                let relative_y = relative_y_global;
                let pos_left = relative_x + (element.getBoundingClientRect().left * resolution_controller.scalling);
                let pos_top = relative_y + (element.getBoundingClientRect().top * resolution_controller.scalling);
                let pos_right = relative_x + (element.getBoundingClientRect().right * resolution_controller.scalling);
                let pos_bottom = relative_y + (element.getBoundingClientRect().bottom * resolution_controller.scalling);
                
                let selector = selector_index.get(element);
                selector.style.left = `${pos_left}px`;
                selector.style.top = `${pos_top}px`;
                selector.style.height = `${pos_bottom - pos_top}px`;
                selector.style.width = `${pos_right - pos_left}px`;
            }

            function spawn_selector(element, functionality = 1){
                let element_styles = window.getComputedStyle(element);
                let selector = document.createElement("DIV");
                selector.innerHTML = `
                    <div class="top-dot"></div>
                    <div class="right-dot"></div>
                    <div class="bottom-dot"></div>
                    <div class="left-dot"></div>
                    <div class="move-dot"><svg class="move-dot-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-80 310-250l57-57 73 73v-166h80v165l72-73 58 58L480-80ZM250-310 80-480l169-169 57 57-72 72h166v80H235l73 72-58 58Zm460 0-57-57 73-73H560v-80h165l-73-72 58-58 170 170-170 170ZM440-560v-166l-73 73-57-57 170-170 170 170-57 57-73-73v166h-80Z"/></svg></div>
                `
                selector.className = "selector-box";
                if(element.tagName == "BODY") selector.style.display = "none";
                document.body.append(selector);
                if(selector_index.has(element) == false) selector_index.set(element, selector);
                if(selector_index_rev.has(selector) == false) selector_index_rev.set(selector, element);
                sync_selector(element);
                
                if(functionality == 0) return;
                let selector_dots = selector.children;
                selector_dots[0].addEventListener("mousedown", (e)=>{
                    curr_focus = selector_index_rev.get(e.target.parentElement);
                    free_drag_controller.hold_btn = {"function" : "drag_top", "pos_x" : (e.screenX - relative_x_global) / resolution_controller.scalling, "pos_y" : (e.screenY - relative_y_global)  / resolution_controller.scalling, "target" : element, "target_height" : element_styles.height, "target_width" : element_styles.width, "inline_target_height" : get_safe_style(elements_index.get(element), "height"), "inline_target_width" : get_safe_style(elements_index.get(element), "width")};
                    if(typeof(free_drag_controller.hold_btn.inline_target_height) == 'object') free_drag_controller.hold_btn.inline_target_height = free_drag_controller.hold_btn.inline_target_height.value;
                    if(typeof(free_drag_controller.hold_btn.inline_target_width) == 'object') free_drag_controller.hold_btn.inline_target_width = free_drag_controller.hold_btn.inline_target_width.value;
                    document.addEventListener("mouseup", flush_drag_controller);
                    preview_doc.addEventListener("mouseup", flush_drag_controller);
                    document.addEventListener("mousemove", mouse_drag_global);
                    preview_doc.addEventListener("mousemove", mouse_drag);
                    editor_doc.addEventListener("mouseup", flush_drag_controller);
                    editor_doc.addEventListener("mousemove", mouse_drag);
                });

                selector_dots[1].addEventListener("mousedown", (e)=>{
                    curr_focus = selector_index_rev.get(e.target.parentElement);
                    free_drag_controller.hold_btn = {"function" : "drag_right", "pos_x" : (e.screenX - relative_x_global)  / resolution_controller.scalling , "pos_y" : (e.screenY -  relative_y_global)  / resolution_controller.scalling, "target" : element, "target_height" : element_styles.height, "target_width" : element_styles.width, "inline_target_height" : get_safe_style(elements_index.get(element), "height"), "inline_target_width" : get_safe_style(elements_index.get(element), "width")};
                    if(typeof(free_drag_controller.hold_btn.inline_target_height) == 'object') free_drag_controller.hold_btn.inline_target_height = free_drag_controller.hold_btn.inline_target_height.value;
                    if(typeof(free_drag_controller.hold_btn.inline_target_width) == 'object') free_drag_controller.hold_btn.inline_target_width = free_drag_controller.hold_btn.inline_target_width.value;
                    document.addEventListener("mouseup", flush_drag_controller);
                    preview_doc.addEventListener("mouseup", flush_drag_controller);
                    document.addEventListener("mousemove", mouse_drag_global);
                    preview_doc.addEventListener("mousemove", mouse_drag);
                    editor_doc.addEventListener("mouseup", flush_drag_controller);
                    editor_doc.addEventListener("mousemove", mouse_drag);
                });

                selector_dots[2].addEventListener("mousedown", (e)=>{
                    curr_focus = selector_index_rev.get(e.target.parentElement);
                    free_drag_controller.hold_btn = {"function" : "drag_bottom", "pos_x" : (e.screenX - relative_x_global)  / resolution_controller.scalling, "pos_y" : (e.screenY - relative_y_global)  / resolution_controller.scalling, "target" : element, "target_height" : element_styles.height, "target_width" : element_styles.width, "inline_target_height" : get_safe_style(elements_index.get(element), "height"), "inline_target_width" : get_safe_style(elements_index.get(element), "width")};
                    if(typeof(free_drag_controller.hold_btn.inline_target_height) == 'object') free_drag_controller.hold_btn.inline_target_height = free_drag_controller.hold_btn.inline_target_height.value;
                    if(typeof(free_drag_controller.hold_btn.inline_target_width) == 'object') free_drag_controller.hold_btn.inline_target_width = free_drag_controller.hold_btn.inline_target_width.value;
                    document.addEventListener("mouseup", flush_drag_controller);
                    preview_doc.addEventListener("mouseup", flush_drag_controller);
                    document.addEventListener("mousemove", mouse_drag_global);
                    preview_doc.addEventListener("mousemove", mouse_drag);
                    editor_doc.addEventListener("mouseup", flush_drag_controller);
                    editor_doc.addEventListener("mousemove", mouse_drag);
                });

                selector_dots[3].addEventListener("mousedown", (e)=>{
                    curr_focus = selector_index_rev.get(e.target.parentElement);
                    free_drag_controller.hold_btn = {"function" : "drag_left", "pos_x" : (e.screenX - relative_x_global)  / resolution_controller.scalling, "pos_y" : (e.screenY - relative_y_global)  / resolution_controller.scalling, "target" : element, "target_height" : element_styles.height, "target_width" : element_styles.width, "inline_target_height" : get_safe_style(elements_index.get(element), "height"), "inline_target_width" : get_safe_style(elements_index.get(element), "width")};
                    if(typeof(free_drag_controller.hold_btn.inline_target_height) == 'object') free_drag_controller.hold_btn.inline_target_height = free_drag_controller.hold_btn.inline_target_height.value;
                    if(typeof(free_drag_controller.hold_btn.inline_target_width) == 'object') free_drag_controller.hold_btn.inline_target_width = free_drag_controller.hold_btn.inline_target_width.value;
                    document.addEventListener("mouseup", flush_drag_controller);
                    preview_doc.addEventListener("mouseup", flush_drag_controller);
                    document.addEventListener("mousemove", mouse_drag_global);
                    preview_doc.addEventListener("mousemove", mouse_drag);
                    editor_doc.addEventListener("mouseup", flush_drag_controller);
                    editor_doc.addEventListener("mousemove", mouse_drag);
                });

                selector_dots[4].addEventListener("mousedown", (e)=>{
                    curr_focus = selector_index_rev.get(e.target.parentElement);
                    free_drag_controller.hold_btn = {"function" : "drag_move", "pos_x" : (e.screenX - relative_x_global)  / resolution_controller.scalling, "pos_y" :(e.screenY - relative_y_global)  / resolution_controller.scalling, "target" : element, "target_left" : element_styles.left, "target_top" : element_styles.top, "inline_target_left" : get_safe_style(elements_index.get(element), "left"), "inline_target_top" : get_safe_style(elements_index.get(element), "top")};
                    if(free_drag_permission() == false) return;
                    document.addEventListener("mouseup", flush_drag_controller);
                    preview_doc.addEventListener("mouseup", flush_drag_controller);
                    document.addEventListener("mousemove", mouse_drag_global);
                    preview_doc.addEventListener("mousemove", mouse_drag);
                    editor_doc.addEventListener("mouseup", flush_drag_controller);
                    editor_doc.addEventListener("mousemove", mouse_drag);
                });

            }

            function despawn_selector(element){
                if(selector_index.has(element)){
                    selector_index_rev.delete(selector_index.get(element));
                    selector_index.get(element).remove();
                    selector_index.delete(element);
                }

            }

            function determine(element, parent){
                let parentStyle = preview_win.getComputedStyle(parent);
                let parentHeight = unitValueFetcher(parentStyle.height);
                let parentWidth = unitValueFetcher(parentStyle.width);
                let childHeight = unitValueFetcher(elements_recipe[element].styles["height"]);
                let childWidth = unitValueFetcher(elements_recipe[element].styles["width"]);
                let ans = {};

                if(childHeight.unit == '%'){
                    if(parent.style.height != '') ans["height"] = elements_recipe[element].styles["height"];
                    else ans["height"] = `${(Number(childHeight.value) * Number(parentHeight.value)) / 100}px`;
                }
                else ans["height"] = elements_recipe[element].styles["height"];
                

                if(childWidth.unit == '%'){
                    if(parent.style.width != '') ans["width"] = elements_recipe[element].styles["width"];
                    else ans["width"] = `${(Number(childWidth.value) * Number(parentWidth.value)) / 100}px`;
                }
                else ans["width"] = elements_recipe[element].styles["width"];
                return ans;
            }

            function sync_input(input){
                let arr = synced_elements.get(input);
                for(let i = 0; i < arr.length; i++){
                    style_update(arr[i], project_state[elements_index.get(curr_focus)].style[input.dataset.property]);
                    user_input(arr[i]);
                }   
            }

            function animation_button_gen(name){
                let button = document.createElement("BUTTON");
                button.innerHTML = `
                        <svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M205.46-205.46q-70.08-70.08-70.08-169.92 0-99.85 70.08-169.93 70.08-70.07 169.92-70.07 99.85 0 169.93 70.07 70.07 70.08 70.07 169.93 0 99.84-70.07 169.92-70.08 70.08-169.93 70.08-99.84 0-169.92-70.08Zm311.42-28.42q58.5-58.5 58.5-141.5t-58.5-141.5q-58.5-58.5-141.5-58.5t-141.5 58.5q-58.5 58.5-58.5 141.5t58.5 141.5q58.5 58.5 141.5 58.5t141.5-58.5Zm153.43-127.35q.46-3.69.46-6.85v-7.3q0-122.24-86.58-208.81-86.57-86.58-208.81-86.58h-7.3q-3.16 0-6.85.46 19.85-58.77 79.27-106.54 59.42-47.77 144.12-47.77 99.84 0 169.92 70.08 70.08 70.08 70.08 169.92 0 84.7-47.77 144.12t-106.54 79.27Z"/></svg>
                        <h3>${name}</h3>
                        <button data-type="demo" style="height:30%; width:30%; background-color: #ffffff17; border: none; border-radius: 0px 0px 0px 10px; position:absolute; top:0%; right:0%" class="component-edit"><svg style="height:100%; width:100%; pointer-events:none;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#dc10a9"><path d="M360-272.31v-415.38L686.15-480 360-272.31ZM400-480Zm0 134 211.54-134L400-614v268Z"/></svg></button>
                        `
                button.lastElementChild.dataset["animation_name"] = name;
                button.dataset["animation_name"] = name;
                button.dataset["type"] = "animation";
                animations_container.append(button);
            }

            function component_button_gen(name){
                let button = document.createElement("BUTTON");
                button.innerHTML = `
                        <svg style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M460-171.46v-297.08L200-619.08v283.23q0 6.16 3.08 11.54 3.07 5.39 9.23 9.23L460-171.46Zm40 0 247.69-143.62q6.16-3.84 9.23-9.23 3.08-5.38 3.08-11.54v-283.23L500-468.54v297.08Zm-20-331.46 257-148.54-244.69-141.62q-6.16-3.84-12.31-3.84t-12.31 3.84L223-651.46l257 148.54ZM192.31-279.69q-15.16-8.69-23.73-23.62-8.58-14.92-8.58-32.31v-288.76q0-17.39 8.58-32.31 8.57-14.93 23.73-23.62l255.38-147.15q15.16-8.69 32.31-8.69 17.15 0 32.31 8.69l255.38 147.15q15.16 8.69 23.73 23.62 8.58 14.92 8.58 32.31v288.76q0 17.39-8.58 32.31-8.57 14.93-23.73 23.62L512.31-132.54q-15.16 8.69-32.31 8.69-17.15 0-32.31-8.69L192.31-279.69ZM480-480Z"></path></svg>
                        <h3>${name}</h3>
                        <button data-type="edit" style="height:30%; width:30%; background-color: #ffffff17; border: none; border-radius: 0px 0px 0px 10px; position:absolute; top:0%; right:0%" class="component-edit"><svg style="height:100%; width:100%; pointer-events:none;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#dc10a9"><path d="m405.38-120-14.46-115.69q-19.15-5.77-41.42-18.16-22.27-12.38-37.88-26.53L204.92-235l-74.61-130 92.23-69.54q-1.77-10.84-2.92-22.34-1.16-11.5-1.16-22.35 0-10.08 1.16-21.19 1.15-11.12 2.92-25.04L130.31-595l74.61-128.46 105.93 44.61q17.92-14.92 38.77-26.92 20.84-12 40.53-18.54L405.38-840h149.24l14.46 116.46q23 8.08 40.65 18.54 17.65 10.46 36.35 26.15l109-44.61L829.69-595l-95.31 71.85q3.31 12.38 3.7 22.73.38 10.34.38 20.42 0 9.31-.77 19.65-.77 10.35-3.54 25.04L827.92-365l-74.61 130-107.23-46.15q-18.7 15.69-37.62 26.92-18.92 11.23-39.38 17.77L554.62-120H405.38ZM440-160h78.23L533-268.31q30.23-8 54.42-21.96 24.2-13.96 49.27-38.27L736.46-286l39.77-68-87.54-65.77q5-17.08 6.62-31.42 1.61-14.35 1.61-28.81 0-15.23-1.61-28.81-1.62-13.57-6.62-29.88L777.77-606 738-674l-102.08 42.77q-18.15-19.92-47.73-37.35-29.57-17.42-55.96-23.11L520-800h-79.77l-12.46 107.54q-30.23 6.46-55.58 20.81-25.34 14.34-50.42 39.42L222-674l-39.77 68L269-541.23q-5 13.46-7 29.23t-2 32.77q0 15.23 2 30.23t6.23 29.23l-86 65.77L222-286l99-42q23.54 23.77 48.88 38.12 25.35 14.34 57.12 22.34L440-160Zm38.92-220q41.85 0 70.93-29.08 29.07-29.07 29.07-70.92t-29.07-70.92Q520.77-580 478.92-580q-42.07 0-71.04 29.08-28.96 29.07-28.96 70.92t28.96 70.92Q436.85-380 478.92-380ZM480-480Z"/></svg></button>
                        `
                button.lastElementChild.dataset["component_name"] = name;
                button.dataset["component_name"] = name;
                button.dataset["type"] = "instance";
                components_container.append(button);
            }

            function determine_color(parent){
                let color = preview_win.getComputedStyle(parent).backgroundColor;
                let r = "";
                let g = "";
                let b = "";
                let curr = 0;
                for(let i = 0; i < color.length; i++){
                    if(color[i] >= '0' && color[i] <= '9'){
                        if(curr == 0) r += color[i];
                        if(curr == 1) g += color[i];
                        if(curr == 2) b += color[i];
                    }
                    else if(color[i] == ',') curr++;
                }

                r = Number(r);
                g = Number(g);
                b = Number(b);

                if(r + 100 > 255) r = r - 100;
                else r = r + 100;

                if(g + 100 > 255) g = g - 100;
                else g = g + 100;

                if(b + 100 > 255) b = b - 100;
                else b = b + 100;

                return `rgb(${r}, ${g}, ${b}, 0.99)`

            }

            async function save_component(component_name){
                let response = await fetch('/project/component/save', {method : 'POST', headers : {"Content-Type" : 'application/json'}, body : JSON.stringify({"id" : project_obj.id, "created_by" : project_obj.created_by, "auth" : project_obj.auth, "component_name" : component_name, "component_content" : components[component_name]})});
                response = await response.json();
            }

            function delete_element(element){
                if(element.tagName == "BODY") return;
                let name = elements_index.get(element);
                for(let i of Object.keys(project_state[name].children)) delete_element(project_state[i].DOM);
                delete project_state[project_state[name].parent].children[name];
                delete project_state[name];
                if(name in animation_list) delete animation_list[name];
                if(name in selector_controller.selector_index) delete selector_controller.selector_index[name];
                elements_index.delete(element);
                element.remove();
                elements_count--;
            }


            function flush_clipboard(){            // Must Be called before called before calling copy() or cut()
                clipboard = {"name" : "", "content" : {}, "type" : ""};
                return;
            }

            function objectify(object){
                for(let i in object) object[i] = {"value" : object[i]};
            }

            function refresh_instance_references(obj){
                for(let i in project_state[obj].style) if(i in components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].style) if(project_state[obj].style[i].value == components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].style[i].value) project_state[obj].style[i] = components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].style[i];               // Re-Intiallizing  
                for(let i in project_state[obj].attribute) if(i in components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].attribute) if(project_state[obj].attribute[i].value == components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].attribute[i].value) project_state[obj].attribute[i] = components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].attribute[i];
                for(let i in project_state[obj].javascript) if(i in components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].javascript) if(project_state[obj].javascript[i].value == components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].javascript[i].value) project_state[obj].javascript[i] = components[project_state[obj].instance_of].content[project_state[obj].component_standard_name].javascript[i];
                for(let i in project_state[obj].children) refresh_instance_references(i);
            }

            async function make_component(element){
                if(element.tagName == "BODY") return;
                let component_name = popup.ask("Enter Component's name");
                if(component_name == null) return;
                if(component_name.length < 1){
                    popup.warning("Name should be atleast one character long", 5);
                    return;
                }
                let temp_clipboard = clipboard;
                flush_clipboard();
                copy(element);

                for(let i in clipboard.content){
                    objectify(clipboard.content[i].style);
                    objectify(clipboard.content[i].attribute);
                    objectify(clipboard.content[i].javascript);
                }

                let response = await fetch("/project/component/create", {'method' : 'POST', 'headers' : {'Content-Type' : 'application/json'}, 'body' : JSON.stringify({"id" : project_obj.id, "created_by" : project_obj.created_by, "auth" : project_obj.auth, "component_name" : component_name, "component_content" : clipboard })});
                response = await response.json();
    
                if(response == 1){ 
                    components[component_name] = clipboard;
                    components_index[component_name] = new Set();
                    component_button_gen(component_name);
                    popup.warning("Component created successfully", 5);
                }
                else if(response == -1) popup.warning("Component with this name already exists");
                else if(response == -2) popup.warning("Name should be atleast one character long", 5);
                else popup.warning("Component can't be created at this moment", 5);
                clipboard = temp_clipboard;
            }


            function duplicate(element){
                if(element.tagName == "BODY") return;
                let temp_clipboard = clipboard;
                flush_clipboard();
                copy(element);
                paste(elements_index.get(element), elements_index.get(element.parentElement));
                clipboard = temp_clipboard;
            }

            function cut(element){
                if(element.tagName == "BODY") return;
                copy(element);  
                delete_element(element);
                withdraw_focus();
            }

            function copy(element){
                if(element.tagName == "BODY") return;
                let element_obj = elements_index.get(element);
                if(clipboard.name == "") clipboard.name = element_obj;
                if(clipboard.type == "") clipboard.type = "copy";
                clipboard.content[element_obj] = JSON.parse(JSON.stringify(project_state[element_obj]));
                for(let i in project_state[element_obj].children) copy(project_state[i].DOM);
                return;
            }

            function paste(element, parent){
                if(clipboard.name == "") return;
                let copy = JSON.stringify(clipboard.content[element]);
                let new_name = name_generator();
                project_state[new_name] = JSON.parse(copy);
                project_state[new_name].parent = parent;
                project_state[parent].children[new_name] = new_name;
                project_state[new_name].children = {};
                for(let i in clipboard.content[element].children) paste(i, new_name);
            
                if(element == clipboard.name){
                    render_project(new_name, project_state[parent].DOM);
                    selector_controller.update_selector_index_one(project_state[new_name].DOM);
                    draw_focus(project_state[new_name].DOM);
                }
                elements_count++;
            }


            function edit_component(component_name){
                backup.store(component_name, components[component_name]);
                editor.initiallize(component_name);
                create_instance(component_name, components[component_name].name, "editor", "shallow");
                editor.editor_exit.addEventListener("click", ()=>{
                    backup.restore(component_name, components);
                    editor.destructor();
                    backup.delete(component_name);
                });

                editor.editor_save_exit.addEventListener("click", ()=>{
                    editor.destructor();
                    backup.delete(component_name);
                    save_component(component_name);
                });
            }


            function create_instance(component_name, element, parent, type="hybrid"){ 
                let new_name = name_generator();
                let instance_obj = {
                    "instance_of" : component_name,
                    "DOM" : {},   
                    "attribute" : {},
                    "javascript" : {},
                    "style" : {},
                    "children" : {},
                    "parent" : parent,
                    "tagName" : components[component_name].content[element]["tagName"],
                    "component_standard_name" : element,
                    "instance_type" : type
                }

                
                for(let i in components[component_name].content[element].style) instance_obj.style[i] = components[component_name].content[element].style[i];
                for(let i in components[component_name].content[element].attribute) instance_obj.attribute[i] = components[component_name].content[element].attribute[i];
                for(let i in components[component_name].content[element].javascript) instance_obj.javascript[i] = components[component_name].content[element].javascript[i];
            

                project_state[new_name] = instance_obj;
                project_state[parent].children[new_name] = new_name;
                for(let i in components[component_name].content[element].children) create_instance(component_name, i, new_name, type);
                if(element == components[component_name].name){
                    autosave();
                    render_project(new_name, project_state[parent].DOM);

                }
                elements_count++;
            }



            async function autosave(){
                if(saving == 1) return;
                saving = 1;
                project_state.names_count = names_count;
                project_state.elements_count = elements_count;
                let project_save = {"created_by" : project_obj.created_by, "auth" : project_obj.auth, "id" : project_obj.id, "project_state" : project_obj.project_state};
                let response = await fetch('/project/save', {method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(project_save)});
                response = await response.json();
                if(response == 0) alert("Autosave not working");
                if(response == -1) alert("Session expired, Login again!");
                saving = 0;
            }

            function tag_changer(element, tag){
                let parent = project_state[project_state[elements_index.get(element)].parent].DOM;
                let temp_div = preview_doc.createElement("DIV");
                temp_div.style.display = "none";
                project_state[elements_index.get(element)].tagName = tag;
                while(element.children.length) temp_div.append(element.firstElementChild);
                let new_element = render_project(elements_index.get(element), parent, 0);
                parent.insertBefore(new_element, element);
                while(temp_div.children.length) new_element.append(temp_div.firstElementChild);
                
                draw_focus(new_element);
                element.remove();
                elements_index.delete(element);
                temp_div.remove();
            }


            function load_keyframes(){
                for(let i in directives.keyframes){
                    animation_list_add(i);  
                    animation_editor_controls.animation_name = i;
                    let rule = animation_editor_controls.export_animation();
                    let index = preview_stylesheet.insertRule(rule, preview_stylesheet.cssRules.length);
                    directives.keyframes[i]["index"] = index;
                }
                animation_editor_controls.animation_name = undefined;
                return;
            }

            function render_project(obj, parent, recursive = 1){
                try{
                let element = undefined;
                if(obj == "element0") element = preview_doc.getElementsByTagName("body")[0];
                else element = preview_doc.createElement(project_state[obj].tagName);

                if("instance_of" in project_state[obj]){                               // For Instances
                    if(components[project_state[obj].instance_of].name == project_state[obj].component_standard_name) components_index[project_state[obj].instance_of].add(obj);
                    for(let i in project_state[obj].style) element.style[i] = project_state[obj].style[i].value;
                    for(let i in project_state[obj].attribute) element[i] = project_state[obj].attribute[i].value;
                    for(let i in project_state[obj].javascript) element[i] = project_state[obj].javascript[i].value;
                }
                else{
                    for(let i in project_state[obj].style) element.style[i] = project_state[obj].style[i];
                    for(let i in project_state[obj].attribute) element[i] = project_state[obj].attribute[i];
                    for(let i in project_state[obj].javascript) element[i] = project_state[obj].javascript[i];
                }

                if("animation" in project_state[obj].style && project_state[obj].style.animation != ""){ 
                    animation_list[obj] = {};
                    let animation_prop = {"animationDuration" : "", "animationTimingFunction" : "", "animationDelay" : "", "animationIterationCount" : "", "animationDirection" : "", "animationFillMode" : "", "animationPlayState" : "", "animationName" : ""};
                    let counter = 0;         
                    for(let i of project_state[obj].style.animation){
                        if(i == " "){
                            counter++;
                            continue;
                        }
                        if(i == ","){
                            animation_list[obj][animation_prop["animationName"]] = animation_prop;
                            animation_prop = {"animationDuration" : "", "animationTimingFunction" : "", "animationDelay" : "", "animationIterationCount" : "", "animationDirection" : "", "animationFillMode" : "", "animationPlayState" : "", "animationName" : ""};
                            counter = 0;
                            continue;
                        }
                        if(counter == 0) animation_prop["animationDuration"] += i;
                        if(counter == 1) animation_prop["animationTimingFunction"] += i;
                        if(counter == 2) animation_prop["animationDelay"] += i;
                        if(counter == 3) animation_prop["animationIterationCount"] += i;
                        if(counter == 4) animation_prop["animationDirection"] += i;
                        if(counter == 5) animation_prop["animationFillMode"] += i;
                        if(counter == 6) animation_prop["animationPlayState"] += i;
                        if(counter == 7) animation_prop["animationName"] += i;
                    }
                    animation_list[obj][animation_prop["animationName"]] = animation_prop;
                    animation_prop = {"animationDuration" : "", "animationTimingFunction" : "", "animationDelay" : "", "animationIterationCount" : "", "animationDirection" : "", "animationFillMode" : "", "animationPlayState" : "", "animationName" : ""};
                    counter = 0;
                } 

                if("transition" in project_state[obj].style && project_state[obj].style.transition != ""){
                    transition_list[obj] = {};
                    let transition_prop = {"transitionDuration" : "", "transitionTimingFunction" : "", "transitionDelay" : "", "transitionProperty" : ""};
                    let counter = 0;         
                    for(let i of project_state[obj].style.transition){
                        if(i == " "){
                            counter++;
                            continue;
                        }
                        if(i == ","){
                            transition_list[obj][transition_prop["transitionProperty"]] = transition_prop;
                            transition_prop = {"transitionDuration" : "", "transitionTimingFunction" : "", "transitionDelay" : "", "transitionProperty" : ""};
                            counter = 0;
                            continue;
                        }
                        if(counter == 0) transition_prop["transitionDuration"] += i;
                        if(counter == 1) transition_prop["transitionTimingFunction"] += i;
                        if(counter == 2) transition_prop["transitionDelay"] += i;
                        if(counter == 3) transition_prop["transitionProperty"] += i;
                    }
                    transition_list[obj][transition_prop["transitionProperty"]] = transition_prop;
                    transition_prop = {"transitionDuration" : "", "transitionTimingFunction" : "", "transitionDelay" : "", "transitionProperty" : ""};
                    counter = 0;
                } 
                
                if(obj != "element0" && recursive == 1) parent.append(element);
                elements_index.set(element, obj);
                selector_controller.selector_index[obj] = new Set();
                project_state[obj].DOM = element;
                
                if(recursive == 1) for(let i in project_state[obj].children) render_project(i, element);
                else return element;

                return;
                }
                catch{
                    return;
                }
            }

            function global_export(){
                let external_style_tag = preview_doc.getElementById("preview-stylesheet");
                let rules = "";
                let structure = body.outerHTML;
                for(let i of preview_stylesheet.cssRules) rules = rules + (i.cssText + "\n\n");
                let output = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project_obj.name}</title>
    <style>
       ${rules}
    </style>
</head>

${structure}

</html>`
                let file_obj = new Blob([output], {type : "text/html"});
                let file_url = URL.createObjectURL(file_obj);
                let link = preview_doc.createElement("a");
                link.href = file_url;
                link.download = `project${project_obj.id}.html`;
                link.click();
                URL.revokeObjectURL(file_url);
            }

            function render_recipe(obj, parent){
                let element = undefined;
                if(obj == "body") element = preview_doc.getElementsByTagName("body")[0];
                else element = preview_doc.createElement(elements_recipe[obj].tagName);
                let computedStyles = preview_win.getComputedStyle(element);
                for(let i in elements_recipe[obj].styles) element.style[i] = elements_recipe[obj].styles[i];
                for(let i in elements_recipe[obj].attribute) element[i] = elements_recipe[obj].attribute[i];
                for(let i in elements_recipe[obj].javascript) element[i] = elements_recipe[obj].javascript[i];

                let dim = determine(obj, parent);
                // if(elements_recipe[obj].determine["bg-color"] == true) element.style.backgroundColor = determine_color(parent);  
                if(elements_recipe[obj].determine["dimension"] == true) element.style.height = dim.height;
                if(elements_recipe[obj].determine["dimension"] == true) element.style.width = dim.width;
                // if(elements_recipe[obj].determine["color"] == true) element.style.color = determine_color(element);
                // if(elements_recipe[obj].determine["font-size"] == true) element.style.fontSize = determine_fontSize();

                let name = name_generator();
                elements_index.set(element, name);
                selector_controller.selector_index[name] = new Set();
                if(obj != "body") parent.append(element);
                selector_controller.update_selector_index_one(element);

                let element_obj = {
                    tagName : element.tagName,
                    style : {},                             
                    attribute : {},
                    javascript : {},
                    parent : "",
                    children : {},
                    DOM : element
                };

                if(obj != "body") element_obj.parent =  elements_index.get(parent);

                for(let i in elements_recipe[obj].styles) element_obj.style[i] = elements_recipe[obj].styles[i];
                for(let i in elements_recipe[obj].attribute) element_obj.attribute[i] = elements_recipe[obj].attribute[i];
                for(let i in elements_recipe[obj].javascript) element_obj.javascript[i] = elements_recipe[obj].javascript[i];
                
                if(obj != "body") project_state[elements_index.get(parent)].children[name] = name;
                project_state[name] = element_obj;
                for(let i of elements_recipe[obj].children){
                    render_recipe(i, element);
                }
                draw_focus(project_state[name].DOM);
                elements_count++;
                return;
            };
            
            document.querySelector(".warehouse-category-elements").addEventListener("click", async (e) => {
                if(e.target.parentElement.tagName == "BUTTON") render_recipe(e.target.parentElement.classList[0], curr_focus);
                await autosave();
            });

            function ui_function_caller(e){
                ui_director[e.target.dataset.function]();
            }

            animations_container.addEventListener("click", (e)=>{
                if(e.target.dataset.type == "demo"){
                    e.stopPropagation();                   
                }
                else{
                    if(directives.keyframes[e.target.dataset.animation_name].type == "generic") edit_animation_generic(e.target.dataset.animation_name);
                    else edit_animation_generic(e.target.dataset.animation_name);
                }
            });

            components_container.addEventListener("click", (e)=>{
                if(e.target.dataset.type == "edit"){
                    e.stopPropagation();
                    edit_component(e.target.dataset.component_name);                    
                }
                else create_instance(e.target.dataset.component_name, components[e.target.dataset.component_name].name ,elements_index.get(curr_focus));
            });
            document.querySelector(".warehouse-category-selector").addEventListener("click", ui_function_caller);
            components_tab_switch.addEventListener("input", ()=>{
                selected_component_tab.style.display = "none";
                if(components_tab_switch.value == "0") selected_component_tab = components_container;
                if(components_tab_switch.value == "1") selected_component_tab = animations_container;
                if(components_tab_switch.value == "2") selected_component_tab = selectors_container;
                selected_component_tab.style.display = "flex";
            });

           setInterval(autosave, 60000);

            let keypress = (e)=>{
                if(e.key === "Escape"){
                    builder_page_out();

                    setTimeout(()=>{
                        document.removeEventListener("keyup", keypress);
                        slide1.innerHTML = `
                            <div class="navigation">
                                <h1 class="logo">Fluence</h1>
                                <div class="after-login-nav-left">
                                    <button class="account"><img src="kunal.png"></button>
                                    <div class="account-name-tab"><h1 class="account-name">Kunal Mishra</h1></div>
                                </div>
                            </div>

                            <div class="main-tab1">
                                <div class="main-tab1-top">
                                    <h1 class="display-text">
                                        &ltBuild flawless websites&gt
                                    </h1>
                            </div>
                            <div class="main-tab1-bottom">
                                    <h3>A faithful implementation of Fluence Design System</h3>
                                            <div class="main-tab1-bottom-tab">
                                        <button class="get-started">New Project</button>   
                                        <button class="about-us">My Projects</button>
                                    </div>
                                </div>
                            </div>

                            <div class="lower-tab1">
                                <div class="gray-box1">
                                    <h1>1. Register</h1>
                                    <video src="" class="v-register"></video>
                                </div>
                                <div class="gray-box2">
                                    <h1>2. Purchase</h1>
                                    <video src="" class="purchase"></video>
                                </div>
                                <div class="gray-box3">
                                    <h1>3. Build</h1>
                                    <video src="" class="build"></video>
                                </div>
                                <div class="gray-box4">
                                    <h1>4. Deploy</h1>
                                    <video src="" class="deploy"></video>
                                </div>
                            </div>`

                            
                            slide1.classList.add('slide1');
                            slide1.classList.remove('slide2');
                            nav_left = document.querySelector(".after-login-nav-left");
                            display_text = document.querySelector(".display-text");                 
                            main_tab1 = document.querySelector(".main-tab1");
                            main_tab1_top = document.querySelector(".main-tab1-top");
                            main_tab1_bottom_tab = document.querySelector(".main-tab1-bottom-tab");
                            get_started = document.querySelector(".get-started");
                            about_us = document.querySelector(".about-us");
                            
                            

                            setTimeout(()=>{home_page_in();}, 100);
                            get_started.addEventListener("click", () => {new_project();});
                            about_us.addEventListener("click", () => {my_projects();});


                    }, 500);

                }
            }


        function edit_animation_generic(animation_name){
            backup.store("animation", directives.keyframes[animation_name].animation);
            editor.initiallize(animation_name);
            render_recipe("container", project_state["editor"].DOM);
            let preview_element = undefined;
            for(let i in project_state["editor"].children){
                preview_element = project_state[i].DOM;
                draw_focus(project_state[i].DOM);
            }
            external_css_tab.destructor();
            animation_editor_controls.initiallize(animation_name, preview_element);
            editor.editor_exit.addEventListener("click", ()=>{
                backup.restore("animation", directives.keyframes[animation_name]);
                animation_editor_controls.destructor();
                external_css_tab.initiallize();
                editor.destructor();
            });

            editor.editor_save_exit.addEventListener("click", ()=>{
                let animation_rule = animation_editor_controls.export_animation();
                preview_stylesheet.deleteRule(directives.keyframes[animation_name].index);
                let index = preview_stylesheet.insertRule(animation_rule, directives.keyframes[animation_name].index);
                directives.keyframes[animation_name].index = index;
                save_keyframe(animation_editor_controls.animation_name);
                animation_editor_controls.destructor();
                external_css_tab.initiallize();
                editor.destructor();
                backup.delete("animation");
            });
        }

        async function save_keyframe(name){
            let animation_obj = {};
            for(let i in directives.keyframes[name].animation) animation_obj[i] = {"style" : directives.keyframes[name].animation[i].style};
            fetch("/project/keyframes/save", {method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({"created_by" : project_obj.created_by, "auth" : project_obj.auth, "id" : project_obj.id, "keyframe_name" : name, "animation" : animation_obj})});
            return;
        }

        function selector(){
            external_css_tab.destructor();
            selector_manager.initiallize();
        }

        async function keyframes(type){
            let name = popup.ask("Enter the name of the animation");
            let response = await fetch('/project/keyframes/create', {method : 'POST', headers : {"Content-Type" : "application/json"}, body : JSON.stringify({"created_by" : project_obj.created_by, "auth" : project_obj.auth, "id" : project_obj.id, "keyframe_name" : name, "keyframe_type" : type})});
            response = await response.json();
            if(response == 0){
                external_css_tab.destructor();
                return;
            }
            animation_list_add(name);   
            let index = preview_stylesheet.insertRule(`@keyframes ${name}{}`, preview_stylesheet.cssRules.length);
            directives.keyframes[name] = {"animation" : {}, "index" : index, "type" : type};
            animation_button_gen(name);
            if(type == "generic") edit_animation_generic(name);
        }

        function responsiveness(){
        }

        function animation_event_handler(e){
            e.stopPropagation();
            if(e.target == animation_editor_controls.keystamp_slider || e.target == animation_editor_controls.keystamp_value){
                animation_editor_controls.sync(e.target.value);
                return;
            }
            if(e.target == animation_editor_controls.key_add){
                animation_editor_controls.key_adder();
                return;
            }
            if(e.target == animation_editor_controls.key_remove) animation_editor_controls.key_remover();

            if(e.target.className == "key"){
                animation_editor_controls.sync(animation_editor_controls.key_index.get(e.target));
                animation_editor_controls.update_preview();
            }
        }

        function animation_preview_handler(e){
            e.stopPropagation();
            animation_editor_controls.update_preview();
        }

        function right_click(e){
            e.preventDefault();
            let pointer_x = relative_x_global + e.screenX * resolution_controller.scalling;
            let pointer_y = relative_y_global + e.screenY * resolution_controller.scalling;
            let box_width = parseFloat(window.getComputedStyle(attributes_menu).width);
            let box_height = parseFloat(window.getComputedStyle(attributes_menu).height);

            if(e.screenX >= (display_x - box_width)) pointer_x = pointer_x - box_width;
            if(e.screenY >= (display_y - box_height)) pointer_y = pointer_y - box_height;

            if(attributes_menu.style.display == "none"){
                attributes_menu.style.left = `${pointer_x}px`;
                attributes_menu.style.top = `${pointer_y}px`;
                attributes_menu.style.display = "flex";
                setTimeout(()=>{attributes_menu.style.opacity = 1;},100);
            }
            else{
                despawn_attribute_menu();
                right_click(e);
                return;
            }

            function despawn_attribute_menu(){
                preview_doc.removeEventListener("click", despawn_attribute_menu);
                preview_doc.removeEventListener("keyup", keypress);
                attributes_menu.style.opacity = 0;
                attributes_menu.style.display = "none";
            }

            function keypress(e){
                if(e.key == "Escape") despawn_attribute_menu();
            }

            preview_doc.addEventListener("click", despawn_attribute_menu);
            editor_doc.addEventListener("click", despawn_attribute_menu);
            preview_doc.addEventListener("keyup", keypress);
        }

        function clipboard_operations(e){
            if(e.target.parentElement.className == "copy" || e.target.className == "copy"){
                flush_clipboard();
                copy(curr_focus);
            }

            if(e.target.parentElement.className == "paste" || e.target.className == "paste"){
                if(clipboard.content == "") return;
                paste(clipboard.name, elements_index.get(curr_focus));
            } 

            if(e.target.parentElement.className == "duplicate" || e.target.className == "duplicate"){
                duplicate(curr_focus);
            
            }

            if(e.target.parentElement.className == "cut" || e.target.className == "cut"){
                flush_clipboard();
                cut(curr_focus);
            }

            
            if(e.target.parentElement.className == "delete" || e.target.className == "delete"){
                delete_element(curr_focus);
                withdraw_focus();
            
            }

            if(e.target.parentElement.className == "make-component" || e.target.className == "make-component"){
                make_component(curr_focus);
            }

            sync_selector(curr_focus);
            autosave();
        }

        document.querySelector(".external-tab-button").addEventListener("click", ()=>{
            if(external_css_tab.visibility == 1) external_css_tab.destructor(); 
            else external_css_tab.initiallize();
        });

        external_css.addEventListener("click", (e)=>{
            if(e.target == external_css) return;
            external_css_tab.select(e);
        });

        function viewport_mouse_drag_global(e){
            if(resolution_controller.fit_screen == 1) resolution_controller.switch_fit_screen();
            if(viewport_free_drag_controller.clicked_dot.className == "top-dot") viewport_free_drag_controller.drag_top(e);
            if(viewport_free_drag_controller.clicked_dot.className == "right-dot") viewport_free_drag_controller.drag_right(e);
            if(viewport_free_drag_controller.clicked_dot.className == "bottom-dot") viewport_free_drag_controller.drag_bottom(e);
            if(viewport_free_drag_controller.clicked_dot.className == "left-dot") viewport_free_drag_controller.drag_left(e);
        }

        function viewport_mouse_drag(e){
            if(resolution_controller.fit_screen == 1) resolution_controller.switch_fit_screen();
            let modified_e = {"screenX" : (e.screenX * resolution_controller.scalling) + relative_x_global, "screenY" : (e.screenY * resolution_controller.scalling) + relative_y_global};
            if(viewport_free_drag_controller.clicked_dot.className == "top-dot") viewport_free_drag_controller.drag_top(modified_e);
            if(viewport_free_drag_controller.clicked_dot.className == "right-dot") viewport_free_drag_controller.drag_right(modified_e);
            if(viewport_free_drag_controller.clicked_dot.className == "bottom-dot") viewport_free_drag_controller.drag_bottom(modified_e);
            if(viewport_free_drag_controller.clicked_dot.className == "left-dot") viewport_free_drag_controller.drag_left(modified_e);
        }

        function flush_viewport_drag(){
            viewport_free_drag_controller.intitialX = undefined;
            viewport_free_drag_controller.intitialY = undefined;
            viewport_free_drag_controller.clicked_dot = undefined;
            document.removeEventListener("mousemove", viewport_mouse_drag_global);
            document.removeEventListener("mouseup", flush_viewport_drag);
            preview_doc.removeEventListener("mouseup", flush_viewport_drag);
            preview_doc.removeEventListener("mousemove", viewport_mouse_drag);
            viewport_free_drag_controller.viewport_height = undefined;
            viewport_free_drag_controller.viewport_width = undefined;
        }

        function control_keyup(e){
            if(e.key == "Control"){
                document.removeEventListener("keyup", control_keyup);
                document.removeEventListener("keydown", control_keydown);
                preview_doc.removeEventListener("keyup", control_keyup);
                preview_doc.removeEventListener("keydown", control_keydown);
            }
        }

        function control_keydown(e){
            let activeTag = e.target.tagName;
            if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") {
            return; 
            }
            
            e.preventDefault();
            if(e.key == "C" || e.key == "c"){
                flush_clipboard();
                copy(curr_focus);
            }

            if(e.key == "V" || e.key == "v"){
                if(clipboard.content == "") return;
                paste(clipboard.name, elements_index.get(curr_focus));
            } 

            if(e.key == "D" || e.key == "d"){
                duplicate(curr_focus);
            }

            if(e.key == "X" || e.key == "x"){
                flush_clipboard();
                cut(curr_focus);
            }
        }

        function shortcut_handler(e){
            if(e.key == "Control"){
                document.addEventListener("keyup", control_keyup);
                document.addEventListener("keydown", control_keydown);
                preview_doc.addEventListener("keyup", control_keyup);
                preview_doc.addEventListener("keydown", control_keydown);
            }
        }

        document.addEventListener("keyup", keypress);
        document.querySelector(".clipboard-operations").addEventListener("click", clipboard_operations);
        resolution_controller.resolution_control_panel.addEventListener("input", (e)=>{resolution_controller.event_handler(e);});
        resolution_controller.resolution_control_panel.addEventListener("click", (e)=>{resolution_controller.event_handler(e);});
        selector_manager.selector_manager.addEventListener("click", (e)=>{
            selector_manager.event_handler(e);
        });
        selector_manager.selector_manager.addEventListener("input", (e)=>{
            selector_manager.event_handler(e);
        });
        selectors_container.addEventListener("click", (e)=>{my_selectors.event_handler(e)});
        selector_controller.selector_toggle.addEventListener("input", (e)=>{selector_controller.select(e.target.value)});
        document.addEventListener("keydown", shortcut_handler);
        document.querySelector(".save").addEventListener("click", global_export);
    }, 500);
}


function new_project(){
    get_started.removeEventListener("click", new_project);
    about_us.removeEventListener("click", my_projects);
    main_tab1_bottom_tab.innerHTML = `<input type="text" placeholder="Enter project name" class="get-started">
                                      <button class="about-us">-></button>`
    get_started = document.querySelector(".get-started");
    about_us = document.querySelector(".about-us");
    setTimeout(()=>{
        // about_us.innerText = '->';
        get_started.style.width = '90%';
        get_started.focus();
        get_started.style.paddingLeft = '3%';
        get_started.style.background =  'linear-gradient(90deg,rgba(128, 128, 128, 0.245) 0%,rgba(128, 128, 128, 0.302) 100%)';
        about_us.style.background = 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)';
        main_tab1_bottom_tab.style.gap = '1%';
        about_us.style.width = '10%';
    }, 10);


    let keypress = (e) => {
        if(e.key === "Escape"){
            get_started.style.width = '45%';
            about_us.style.backgroundColor = 'rgba(255, 255, 255, 0.299)';
            main_tab1_bottom_tab.style.gap = '10%';
            about_us.style.width = '45%';

            setTimeout(()=>{
                main_tab1_bottom_tab.innerHTML = `<button class="get-started">New Project</button>
                                                  <button class="about-us">My Projects</button>`
                get_started = document.querySelector(   ".get-started");
                about_us = document.querySelector(".about-us");
                get_started.addEventListener("click", new_project);
                about_us.removeEventListener("click", About_us);
                about_us.addEventListener("click", my_projects);
                document.removeEventListener("keyup", keypress);
            },500);
        }
    }

    document.addEventListener("keyup", keypress);

    get_started.addEventListener("keyup", (e) => {
        if(e.key === "Enter") builder();
    });

    about_us.addEventListener("click", ()=>{builder();});

    
}

let About_us = () => {
    alert(`
        Developer : Kunal Mishra,
        Education : Pursuing Btech in AIML,
        University : ADGIPS, GGSIPU,
        Enrollment : 50715611624,
        Email : kunalmishra9070.10c@gmail.com
        
        Pretty bad in building UIs :)`)
}

async function my_projects(){
    let projects_list = await fetch('/project/saved', {method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({created_by : user_data.username, auth : user_data.auth})});
    projects_list = await projects_list.json();

    if(projects_list == -1){
        alert("Session expired, Login again!");
        return;
    }

    home_page_out();
    let bg_blur = document.createElement("div");
    bg_blur.classList.add("bg-blur");
    let projects_list_box = document.createElement('div');
    projects_list_box.className = "projects-list-box register-box";
    document.body.append(bg_blur);
    bg_blur.append(projects_list_box);

    projects_list_box.innerHTML = `<div class="projects-list-div">
    <div class="projects-list-nav">
        <button class="projects-list-esc"><svg xmlns="http://www.w3.org/2000/svg" class="projects-list-esc-logo" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA33F7"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg></button>
        <h1 class="projects-list-title">MY PROJECTS</h1>
    </div>

    <div class="projects-list">
      
    </div>
</div>`

    function esc_project_list(){
        document.removeEventListener("keyup", keypress);
        document.removeEventListener("click", mouse_click);
        bg_blur.style.animation = "fade-blur-out 0.3s linear";
        projects_list_box.style.animation = "slide-down 0.2s linear";
        bg_blur.style.opacity = 0;
        projects_list_box.style.top = "2%";
        setTimeout(() => {
            bg_blur.remove();
        }, 300);
        home_page_in();
    }

    let projects_index = new Map();
    let projects_list_div = document.querySelector(".projects-list");

    for(let i in projects_list){
        let tile = project_tile(projects_list[i]);
        projects_list_div.append(tile);
        projects_index.set(tile.lastElementChild, i);
    }

    function keypress(e){
        if(e.key == "Escape") esc_project_list();
    }

    async function mouse_click(e){
        if(e.target.classList[0] == "project-tile-overlay"){
            let id = projects_index.get(e.target);
            esc_project_list();
            home_page_out();
            builder("existing", id);
        }

        if(e.target.classList[0] == "projects-list-esc-logo") esc_project_list();
        
    }

    document.addEventListener("keyup", keypress);
    document.addEventListener("click", mouse_click);
}

function slide_transition(bg_blur){
    setTimeout(()=>{
        bg_blur.innerHTML = `<div class="login-welcome">
                                <h1 class="welcome">
                                    HELLO ${(localStorage.getItem("username")).toUpperCase()}
                                </h1>
                            </div>`
        setTimeout(()=>{
            let login_welcome = document.querySelector(".login-welcome");
            let welcome = document.querySelector(".welcome");
            login_welcome.style.width = `40%`;
            setTimeout(()=>{
                welcome.style.animation = 'fade-blink 1s ease-in-out alternate infinite';
                setTimeout(()=>{
                    bg_blur.style.animation = "fade-blur-out 0.3s linear";
                    bg_blur.style.opacity = 0;
                    setTimeout(() => {
                        bg_blur.remove();
                    }, 300);
                    
                    nav_left.innerHTML = `<button class="account"><img src="kunal.png"></button>
                                          <div class="account-name-tab"><h1 class="account-name">${user_data.username}</h1></div>`

                    get_started.removeEventListener("click", login_page);
                    get_started.addEventListener("click", new_project);
                    about_us.removeEventListener("click", About_us);
                    about_us.addEventListener("click", my_projects);
                    nav_left.classList.add('after-login-nav-left');
                    nav_left.classList.remove('nav-left');
                    get_started.innerText = 'New Project';
                    about_us.innerText = 'My Projects';
                    setTimeout(()=>{home_page_in();}, 100);
                    
                },2000);            // 2000
            }, 2000);               //2000
        }, 100);
    }, 1000);
}

function login_page(){
    home_page_out();
    let bg_blur = document.createElement("div");
    bg_blur.classList.add("bg-blur");
    document.body.append(bg_blur);

    let login_box = document.createElement("div");
    login_box.innerHTML = `
    <h1 class="login-title login-fade">WELCOME</h1>
        <div class="id-pass login-fade">
            <input type="text" class="username" placeholder="Username">
            <div class="password-box">
                <div class="password-box-top">
                    <input type="password" class="password" placeholder="Password">
                    <button class="show"><img src="show.png"></button>
                </div>

                <div class="password-box-bottom">
                    <p style="opacity:0" class="forgot">Forgot password?</p>
                </div>
            </div>
        </div>

        <div class="gft-login login-fade" style="opacity:0">
            <button class="google"></button>
            <button class="facebook"></button>
            <button class="twitter"></button>
        </div>

        <button class="login-box-login login-fade"> <div class="login-box-login-overlay"></div> Login</button>`

    login_box.classList.add("login-box");
    bg_blur.append(login_box);
    let username = document.querySelector(".username");
    let password = document.querySelector(".password");
    let login_box_login_button = document.querySelector(".login-box-login");
    let login_box_login_overlay = document.querySelector(".login-box-login-overlay");
    if (validity === true) {
        login_box_login_overlay.classList.add("login-valid-style");
        login_box_login_button.disabled = false;
    }
    else login_box_login_button.disabled = true;


    username.focus();
    if (username_value !== undefined) username.value = username_value;
    if (password_value !== undefined) password.value = password_value;


    let show = document.querySelector(".show");             // Password Show Button Logic
    show.addEventListener("click", () => {
        let password = document.querySelector(".password");
        let visibility = show.firstElementChild.getAttribute("src");
        if (visibility == "show.png") {
            show.firstElementChild.setAttribute("src", "hide.png");
            password.type = "text";

        }
        else {
            show.firstElementChild.setAttribute("src", "show.png");
            password.type = "password";
        }
    })



    let login_box_login = async() => {             // Login Box's Login Button Functionality
        if(is_logged === true) return;
        is_logged = true;

        let user_credentials = {
            "username" : username_value,
            "password" : password_value
        }

        document.documentElement.style.setProperty('--login-fade-opacity', 0.3);
        user_data = await fetch('/login', {method : 'POST', headers : {"Content-Type" : "application/json"}, body : JSON.stringify(user_credentials)});
        user_data = await user_data.json();
        
        if(user_data == 404 || user_data == 401){
            if(user_data == 404) alert("User does not exists");
            if(user_data == 401) alert("Incorrect password");
            is_logged = false;
            document.documentElement.style.setProperty('--login-fade-opacity', 1);
            return;
        }

        delete user_credentials;
        password_value = undefined;
        create_password_value = undefined;

        browser_cache();

        document.removeEventListener("keyup", key_press);
        let after_login_fade = document.createElement("div");
        after_login_fade.classList.add('after-login-fade');
        login_box.append(after_login_fade);
        setTimeout(() => {
            after_login_fade.style.transform = 'scale(20, 20)';
            after_login_fade.style.opacity = 1;
            setTimeout(() => {
                password.remove();
                username.remove();
                login_box.innerHTML = `<div class="after-login-loading">
                                        <div class="login-loading"><video class="login-loading-icon" src="logged.mp4" autoplay muted></video></div>
                                        <h1 class="logged-in">Login Successful</h1>
                                        </div>`
                
                let after_login_loading = document.querySelector(".after-login-loading");
                let logged_in = document.querySelector(".logged-in");
                setTimeout(() => {
                    after_login_loading.style.opacity = 1;
                    setTimeout(()=> {
                        after_login_loading.style.animation = 'slide-up 0.5s linear';
                        setTimeout(()=>{
                            logged_in.style.opacity = 1;
                                setTimeout(()=>{
                                    login_box.style.animation = "slide-down 0.2s linear";
                                    login_box.style.top = "2%";
                                    login_box.style.opacity = 0;
                                    setTimeout(() => {
                                        login_box.remove();
                                        slide_transition(bg_blur);
                                    }, 300);
                                },1000);
                        },500);
                    },100);
                }, 100);
            }, 1000);


        }, 100);

    }


    let sync = (e) => {
        username_value = username.value;
        password_value = password.value;
    }

    username.addEventListener("keydown", (e) => {
        if (e.key === "Enter") password.focus();
    })

    password.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {if(validity == true) login_box_login()};
    })

    login_box_login_button.addEventListener("click", login_box_login);



    let key_press = (e) => {                          // Login Box Quiting, Memory and Login Button Style Logic
        sync();
        if (password_validity(password_value) == true && username_validity(username_value) == true) {
            if (validity === false) {
                validity = true;
                login_box_login_overlay.classList.add("login-valid-style");
                login_box_login_button.disabled = false;
            }
        }
        else {
            if (validity === true) {
                validity = false;
                login_box_login_button.disabled = true;
                login_box_login_overlay.classList.remove("login-valid-style");
            }

        }

        if (e.key === "Escape") {
            document.removeEventListener("keyup", key_press);
            bg_blur.style.animation = "fade-blur-out 0.3s linear";
            login_box.style.animation = "slide-down 0.2s linear";
            bg_blur.style.opacity = 0;
            login_box.style.top = "2%";
            setTimeout(() => {
                bg_blur.remove();
            }, 300);
            home_page_in();

        }
    }

    document.addEventListener("keyup", key_press);

}

let create_username_value = undefined;
let create_password_value = undefined;
let confirm_password_value = undefined;
let email_value = undefined;
let terms_checkbox_value = false;
let register_validity = false;
let plans_slider_style_right_value = 0;
let plan_selected = false;

let register_page = () => {
    home_page_out();
    let bg_blur = document.createElement("div");
    bg_blur.classList.add("bg-blur");   
    document.body.append(bg_blur);
    bg_blur.innerHTML = `<div class="register-box">
    <div class="register-box-left login-fade">
        <h1 class="register-title">REGISTER</h1>

        <div class="creation-box">
            <div class="create-username-box"> <input type="text" class="create-username" placeholder="Create your username"> </div>

            <div class="email-box">
                <input type="text" class="email" placeholder="Your email address">
                <button class="show"></button>
            </div>

            <div class="create-password-box">
                <input type="password" class="create-password" placeholder="Create password">
                <button class="create-password-show show"> <img src="show.png"> </button>
            </div>

            <div class="confirm-password-box">
                <input type="password" class="confirm-password create-password" placeholder="Confirm password">
                <button class="confirm-password-show show"> <img src="show.png"> </button>
            </div>
        </div>


        <div class="register-box-register-box">
            <div class="terms-box"> <input type="checkbox" class="terms-checkbox"> <p class="terms-title"> &nbsp I accept all the <p class="terms-href"> &nbsp terms & conditons</p></p> </div>

            <button class="register-box-register"><div class="register-box-register-overlay"></div>Register</button>

        </div>



    
    </div>


    <div class="register-box-right login-fade">
        <h1 class="plans-title">PLANS</h1>

        <div class="plans-showcase-box">
            <button class= "showcase-left"><</button>

            <div class="plans-showcase">
              <div class="plans-slider">
                <div class="free-plan"></div>
                <div class="pro-plan"></div>
                <div class="premium-plan"></div>
              </div>
            </div>

            <button class= "showcase-right">></button>

        </div>

        <div class="r-gft-login">
            <button class="r-google"></button>
            <button class="r-facebook"></button>
            <button class="r-twitter"></button>
        </div>
    </div>
</div>`

    let plans_slider = document.querySelector(".plans-slider");
    let showcase_left = document.querySelector(".showcase-left");
    let showcase_right = document.querySelector(".showcase-right");
    let plans_slider_style_right = plans_slider_style_right_value;
    plans_slider.style.right = `${plans_slider_style_right}%`;
    let slider_length = plans_slider.childElementCount;

    let register_box = document.querySelector(".register-box");

    let create_username = document.querySelector(".create-username");
    if (create_username_value != undefined) create_username.value = create_username_value;
    create_username.focus();

    let email = document.querySelector(".email");
    if (email_value != undefined) email.value = email_value;

    let confirm_password = document.querySelector(".confirm-password");
    let confirm_password_show = document.querySelector(".confirm-password-show");
    if (confirm_password_value != undefined) confirm_password.value = confirm_password_value;

    let create_password = document.querySelector(".create-password");
    let create_password_show = document.querySelector(".create-password-show");
    if (create_password_value != undefined) create_password.value = create_password_value;

    let terms_checkbox = document.querySelector(".terms-checkbox");
    terms_checkbox.checked = terms_checkbox_value;

    let register_box_register_button = document.querySelector(".register-box-register");

    if (register_validity === true) {
        document.querySelector(".register-box-register-overlay").setAttribute("style", "opacity:1;");
        register_box_register_button.disabled = false;
    }
    else register_box_register_button.disabled = true;

    let register_box_register_overlay = document.querySelector(".register-box-register-overlay");

    let plans_showcase = document.querySelector(".plans-showcase");
    if (plan_selected === true) {
        plans_showcase.style.border = "1px solid rgba(220, 16, 169, 0.758)";
        showcase_left.style.opacity = 0.2;
        showcase_left.disabled = true;
        showcase_right.style.opacity = 0.2;
        showcase_right.disabled = true;

    }




    function showcase_range() {
        if (((slider_length - 1) * 102) == plans_slider_style_right) {
            showcase_left.style.opacity = 0.2;
            showcase_left.disabled = true;
        }
        else {
            showcase_left.style.opacity = 1;
            showcase_left.disabled = false;
        }

        if (plans_slider_style_right == 0) {
            showcase_right.style.opacity = 0.2;
            showcase_right.disabled = true;
        }
        else {
            showcase_right.style.opacity = 1;
            showcase_right.disabled = false;
        }
    }

    if (plan_selected === false) showcase_range();




    showcase_left.addEventListener("click", () => {
        plans_slider_style_right += 102;
        plans_slider.style.right = `${plans_slider_style_right}%`;
        showcase_range();
    });


    showcase_right.addEventListener("click", () => {
        plans_slider_style_right -= 102;
        plans_slider.style.right = `${plans_slider_style_right}%`;
        showcase_range();
    });

    plans_showcase.addEventListener("click", () => {
        if (plan_selected === false) {
            plans_showcase.style.border = "1px solid rgba(220, 16, 169, 0.758)";
            plan_selected = true;
            showcase_left.style.opacity = 0.2;
            showcase_left.disabled = true;
            showcase_right.style.opacity = 0.2;
            showcase_right.disabled = true;

        }
        else {
            plans_showcase.style.border = "none";
            plan_selected = false;
            showcase_range();
        }
    });


    let register_box_register = async () => {
        if(is_logged === true) return;
        is_logged = true;

        let user_obj = {
            "username" : create_username_value,
            "password" : create_password_value,
            "email" : email_value,
            "projects" : {"details" : {"count" : 0}}
         };

        document.documentElement.style.setProperty('--login-fade-opacity', 0.3);
        user_data = await fetch('/register', {method:'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(user_obj)});
        user_data = await user_data.json();

        if(user_data == 422){
            alert("Unknown error occured");
            is_logged = false;
            document.documentElement.style.setProperty('--login-fade-opacity', 1);
            return;
        }

        if("reason" in user_data){
            alert(`${user_data.reason} is already taken`);
            is_logged = false;
            document.documentElement.style.setProperty('--login-fade-opacity', 1);
            return;
        }
        
        delete user_obj;
        create_password_value = undefined;
        confirm_password_value = undefined;
        browser_cache();
        document.removeEventListener("keyup", key_press);
        document.removeEventListener("click", key_press);   
        let after_login_fade = document.createElement("div");
        after_login_fade.classList.add('after-login-fade');
        register_box.append(after_login_fade);

        setTimeout(async () => {
            after_login_fade.style.transform = 'scale(20, 20)';
            after_login_fade.style.opacity = 1;
            setTimeout(() => {
                create_password.remove();
                create_username.remove();
                confirm_password.remove();
                email.remove();
                register_box.innerHTML = `<div class="after-login-loading">
                                        <div class="login-loading"><video class="login-loading-icon" src="logged.mp4" autoplay muted></video></div>
                                        <h1 class="logged-in">Registeration Successful</h1>
                                        </div>`
                register_box.style.justifyContent = 'center';
                let after_login_loading = document.querySelector(".after-login-loading");
                let logged_in = document.querySelector(".logged-in");
                setTimeout(() => {
                    after_login_loading.style.opacity = 1;
                    setTimeout(()=> {
                        after_login_loading.style.animation = 'slide-up 0.5s linear';
                        setTimeout(()=>{
                            logged_in.style.opacity = 1;
                                setTimeout(()=>{
                                    register_box.style.animation = "slide-down 0.2s linear";
                                    register_box.style.top = "2%";
                                    register_box.style.opacity = 0;
                                    setTimeout(() => {
                                        register_box.remove();
                                        slide_transition(bg_blur);
                                    }, 300);
                                },1000);
                        },500);
                    },100);
                }, 100);
            }, 1000);


        }, 100);

    }
    



    create_username.addEventListener("keyup", (e) => { if (e.key == "Enter") email.focus(); });
    email.addEventListener("keyup", (e) => { if (e.key == "Enter") create_password.focus(); });
    create_password.addEventListener("keyup", (e) => { if (e.key == "Enter") confirm_password.focus(); });
    confirm_password.addEventListener("keyup", (e) => {
        create_password.type = "password";
        create_password_show.firstElementChild.src = "show.png";
        if (e.key == "Enter"){if(register_validity == true) register_box_register()};
    });




    create_password_show.addEventListener("click", () => {
        let visibility = create_password.type;
        if (visibility == "password") {
            create_password.type = "text";
            create_password_show.firstElementChild.src = "hide.png";
        }
        else {
            create_password.type = "password";
            create_password_show.firstElementChild.src = "show.png";
        }
    })

    confirm_password_show.addEventListener("click", () => {
        let visibility = confirm_password.type;
        if (visibility == "password") {
            confirm_password.type = "text";
            confirm_password_show.firstElementChild.src = "hide.png";
        }
        else {
            confirm_password.type = "password";
            confirm_password_show.firstElementChild.src = "show.png";
        }
    })




    let key_press = (e) => {
        create_username_value = create_username.value;                     // Syncing the Username and Password of register-box with global variables
        create_password_value = create_password.value;
        confirm_password_value = confirm_password.value;
        email_value = email.value;
        terms_checkbox_value = terms_checkbox.checked;
        plans_slider_style_right_value = plans_slider_style_right;


        if (password_validity(create_password_value) == true && username_validity(create_username_value) == true && email_validity(email_value) == true && (create_password_value == confirm_password_value) && terms_checkbox.checked == true) {
            if (register_validity == false) {
                register_validity = true;
                register_box_register_button.disabled = false;
                register_box_register_overlay.style.opacity = 1;
            }
        }
        else {
            if (register_validity == true) {
                register_validity = false;
                register_box_register_button.disabled = true;
                register_box_register_overlay.style.opacity = 0;
            }
        }


        if (e.key == "Escape") {
            bg_blur.setAttribute("style", "animation:fade-blur-out 0.3s linear; opacity:0;");
            register_box.setAttribute("style", " animation:slide-down 0.2s linear; top:2%;");
            document.removeEventListener("keyup", key_press);
            document.removeEventListener("click", key_press);
            setTimeout(() => {
                bg_blur.remove();
            }, 300);
            home_page_in();
        }
    }



    document.addEventListener("keyup", key_press);
    document.addEventListener("click", key_press);
    register_box_register_button.addEventListener("click", register_box_register);
}


login.addEventListener("click", login_page);           // Translucent Login Button
register.addEventListener("click", register_page);     // Gradiant Register Button
get_started.addEventListener("click", login_page);      // Gradiant Get Started Button 
about_us.addEventListener("click", About_us);
if(localStorage.getItem("auth") != null){
    state_persistance();
}