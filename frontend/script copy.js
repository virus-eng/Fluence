let nav_left = document.querySelector(".nav-left");

let home_page_in = () => {
    document.querySelector(".logo").style.left = 0;
    nav_left.style.right = 0;
    document.querySelector(".main-tab1").style.opacity = 1;
    document.querySelector(".lower-tab1").style.bottom = 0;
}

home_page_in();

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



let slide1 = document.querySelector(".slide1");
let text = ["<\Deploy and monetize>", "<\Fluent and smooth animations>", "<\Variety of templates>", "<\No coding required>"];
let display_text = document.querySelector(".display-text");
let main_tab1_top = document.querySelector(".main-tab1-top");
let main_tab1_bottom_tab = document.querySelector(".main-tab1-bottom-tab");
let main_tab1 = document.querySelector(".main-tab1");
let idx = -1;


function password_validity(password_value) {                     // Needs Optimization
    let p = password_value;
    let U_count = 0;
    let L_count = 0;
    let S_count = 0;
    let N_count = 0;

    for (let i = 0; i < p.length; i++) {
        if (p[i] >= 'A' && p[i] <= 'Z') U_count++;
        if (p[i] >= 'a' && p[i] <= 'z') L_count++;
        if ((p[i] >= '!' && p[i] <= '/') || (p[i] >= ':' && p[i] <= '@') || (p[i] >= '[' && p[i] <= '`') || (p[i] >= '{' && p[i] <= '~')) S_count++;
        if (p[i] >= '0' && p[i] <= '9') N_count++;
    }


    if (p.length >= 8 && U_count >= 1 && L_count >= 1 && S_count >= 1 && N_count >= 1) return true;
    else return false;

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



let builder = () => {
    if(get_started.value.length === 0){
        alert("Name field cannot be empty");
        return;
    }



    home_page_out();

    setTimeout(()=>{
        slide1.classList.add('slide2');
        slide1.classList.remove('slide1');

        slide1.innerHTML = `
            <h1> HELLO I AM BUILDER </h1>
            `;

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


        document.addEventListener("keyup", keypress);
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
                about_us.addEventListener("click", my_projects);
                document.removeEventListener("keyup", keypress);
            },500);
        }
    }

    document.addEventListener("keyup", keypress);

    get_started.addEventListener("keyup", (e) => {
        if(e.key === "Enter") builder();
    });

    about_us.addEventListener("click", builder);

    
}

let About_us = () => {

}

let my_projects = () => {
   
}

let login_page = () => {
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
                    <p class="forgot">Forgot password?</p>
                </div>
            </div>
        </div>

        <div class="gft-login login-fade">
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
    else login_box_login_button.disabled = false;


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


    let login_box_login = () => {             // Login Box's Login Button Functionality
        if(is_logged === true) return;
        is_logged = true;
        document.removeEventListener("keyup", key_press);
        let after_login_fade = document.createElement("div");
        after_login_fade.classList.add('after-login-fade');
        login_box.append(after_login_fade);
        setTimeout(() => {
            document.documentElement.style.setProperty('--login-fade-opacity', 0.3);
            after_login_fade.style.transform = 'scale(20, 20)';
            after_login_fade.style.opacity = 1;
            setTimeout(() => {
                create_password.remove();
                create_username.remove();
                confirm_password.remove();
                email.remove();
                register_box.innerHTML = `<div class="after-login-loading">
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
                                    register_box.style.animation = "slide-down 0.2s linear";
                                    register_box.style.top = "2%";
                                    register_box.style.opacity = 0;
                                    setTimeout(() => {
                                        register_box.remove();
                                        setTimeout(()=>{
                                            bg_blur.innerHTML = `<div class="login-welcome">
                                                                    <h1 class="welcome">
                                                                        WELCOME
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
                                                                              <div class="account-name-tab"><h1 class="account-name">Kunal Mishra</h1></div>`

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
        if (e.key === "Enter") login_box_login();
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
    <div class="register-box-left">
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


    <div class="register-box-right">
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
    else register_box_register_button.disabled = false;

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





    let register_box_register = () => {
        
    }



    create_username.addEventListener("keyup", (e) => { if (e.key == "Enter") email.focus(); });
    email.addEventListener("keyup", (e) => { if (e.key == "Enter") create_password.focus(); });
    create_password.addEventListener("keyup", (e) => { if (e.key == "Enter") confirm_password.focus(); });
    confirm_password.addEventListener("keyup", (e) => {
        create_password.type = "password";
        create_password_show.firstElementChild.src = "show.png";
        if (e.key == "Enter") register_box_register()
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


        if (password_validity(create_password_value) == true && username_validity(create_username_value) == true && email_validity(email_value) == true && (create_password_value == confirm_password_value) && terms_checkbox.checked == true && plan_selected == true) {
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






