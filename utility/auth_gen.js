function random_alpha(){
    if(Math.random() <= 0.5) return String.fromCharCode(random_num(65, 91));
    else return String.fromCharCode(random_num(97, 123));
}

function random_symbol(){
    let random = random_num(1, 5);
    if(random == 1) return String.fromCharCode(random_num(33, 48));
    else if(random == 2) return String.fromCharCode(random_num(58, 65));
    else if(random == 3) return String.fromCharCode(random_num(91, 97));
    else return String.fromCharCode(random_num(123, 127));

}


function random_num(start, end){
    let random = Math.random();
    let divi = 1/(end - start);
    let ans = random/divi;
    return Math.floor(ans) + start;
}

const auth_gen = () => {
    return `${random_num(0, 255) + random_alpha() + random_symbol() + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()  + random_num(0, 255) + random_alpha() + random_symbol()}`
};

export default auth_gen;

