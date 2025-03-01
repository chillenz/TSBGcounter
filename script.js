let characterBar = {
    strongestHeroBar: document.getElementById('strongestherobar'),
    heroHunterBar: document.getElementById('herohunterbar'),
    destructiveCyborgBar: document.getElementById('destructivecyborgbar'),
    deadlyNinjaBar: document.getElementById('deadlyninjabar'),
    brutalDemonBar: document.getElementById('brutaldemonbar'),
    bladeMasterBar: document.getElementById('blademasterbar'),
    wildPsychicBar: document.getElementById('wildpsychicbar'),
    martialArtistBar: document.getElementById('martialartistbar'),
    techProdigyBar: document.getElementById('techprodigybar')
}
let characterCount = {
    strongestHeroCount: 0,
    heroHunterCount: 0,
    destructiveCyborgCount: 0,
    deadlyNinjaCount: 0,
    brutalDemonCount: 0,
    bladeMasterCount: 0,
    wildPsychicCount: 0,
    martialArtistCount: 0,
    techProdigyCount: 0
}

let characterLost = {
    strongestHeroLost: 0,
    heroHunterLost: 0,
    destructiveCyborgLost: 0,
    deadlyNinjaLost: 0,
    brutalDemonLost: 0,
    bladeMasterLost: 0,
    wildPsychicLost: 0,
    martialArtistLost: 0,
    techProdigyLost: 0
}
let characterWon = {
    strongestHeroWon: 0,
    heroHunterWon: 0,
    destructiveCyborgWon: 0,
    deadlyNinjaWon: 0,
    brutalDemonWon: 0,
    bladeMasterWon: 0,
    wildPsychicWon: 0,
    martialArtistWon: 0,
    techProdigyWon: 0
}
let characterSelect = document.getElementById('characterselect');
let lostbtn = document.getElementById('lost');
let wonbtn = document.getElementById('won');
let confirmbtn = document.getElementById('confirm');
let currentResult = 'none';
let totalLost = 0;
let totalWon = 0;
let addpage = document.getElementById('addpage');
let black = document.getElementById('black');
let addbtn = document.getElementById('add')

function lostorwon(result){
    if (result==='won'){
        wonbtn.style.filter = 'brightness(0.7)';
        lostbtn.style.filter = 'brightness(1)';
        currentResult = 'Won';
    } else{
        lostbtn.style.filter = 'brightness(0.7)';
        wonbtn.style.filter = 'brightness(1)';
        currentResult = 'Lost';
    }
}

lostbtn.addEventListener('click', () => lostorwon('lost'))
wonbtn.addEventListener('click', () => lostorwon('won'))

function openaddpage(){
    black.style.display = 'block';
    addpage.style.display = 'block';
}

addbtn.addEventListener('click', openaddpage)

function addchar(){
    if (currentResult != 'none'){
        black.style.display = 'none';
        addpage.style.display = 'none';
    
        characterCount[`${characterSelect.value}Count`] += 1;
        characterBar[`${characterSelect.value}Bar`].style.width = `${characterCount[`${characterSelect.value}Count`] + 1}%`;
    
        if (currentResult === 'Lost'){
            characterLost[`${characterSelect.value}Lost`] += 1;
        } else if (currentResult === 'Won'){
            characterWon[`${characterSelect.value}Won`] += 1;
        }
    }
}

confirmbtn.addEventListener('click', addchar)