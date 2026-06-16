const fs = require('fs');
let indexHTML = fs.readFileSync('index.html', 'utf8');
let divHTML = fs.readFileSync('divisions.html', 'utf8');

let getNav = (html) => {
    let start = html.indexOf('<header class="nav"');
    let end = html.indexOf('</header>');
    if (start === -1 || end === -1) return '';
    return html.substring(start, end + '</header>'.length);
};

let indexNav = getNav(indexHTML);
let divNav = getNav(divHTML);

if (indexNav && divNav) {
    let newDivHTML = divHTML.replace(divNav, indexNav);
    fs.writeFileSync('divisions.html', newDivHTML);
    console.log("Navbar replaced successfully.");
} else {
    console.log("Could not find nav in one of the files.");
}
