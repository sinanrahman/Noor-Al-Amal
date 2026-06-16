const fs = require('fs');
const getBlock = (file, id) => {
    let content = fs.readFileSync(file, 'utf8');
    let start = content.indexOf('<div class="vt-row vt-row-rev"');
    let end = content.indexOf('</section>');
    if (start === -1 || end === -1) return '';
    let block = content.substring(start, end);
    return block.replace('class="vt-row vt-row-rev"', 'id="' + id + '" class="vt-row vt-row-rev"');
};

let sp = getBlock('spare-parts.html', 'spare-parts');
let ws = getBlock('workshop.html', 'workshop');
let tr = getBlock('trading.html', 'trading');
let lg = getBlock('logistics.html', 'logistics');

let div = fs.readFileSync('divisions.html', 'utf8');
let divStart = div.indexOf('<!-- V1: Spare Parts -->') + '<!-- V1: Spare Parts -->\n'.length;

let footerHTML = fs.readFileSync('spare-parts.html', 'utf8');
let footerStart = footerHTML.indexOf('</section>');

let newContent = div.substring(0, divStart) + '\n' + sp + '\n' + ws + '\n' + tr + '\n' + lg + '\n' + footerHTML.substring(footerStart);

fs.writeFileSync('divisions.html', newContent);
