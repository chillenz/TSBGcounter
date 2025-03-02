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
    strongestHeroCount: Number(localStorage.getItem('strongestHeroCount')) || 0,
    heroHunterCount: Number(localStorage.getItem('heroHunterCount')) || 0,
    destructiveCyborgCount: Number(localStorage.getItem('destructiveCyborgCount')) || 0,
    deadlyNinjaCount: Number(localStorage.getItem('deadlyNinjaCount')) || 0,
    brutalDemonCount: Number(localStorage.getItem('brutalDemonCount')) || 0,
    bladeMasterCount: Number(localStorage.getItem('bladeMasterCount')) || 0,
    wildPsychicCount: Number(localStorage.getItem('wildPsychicCount')) ||  0,
    martialArtistCount: Number(localStorage.getItem('martialArtistCount')) || 0,
    techProdigyCount: Number(localStorage.getItem('techProdigyCount')) || 0
}

let characterLost = {
    strongestHeroLost: Number(localStorage.getItem('strongestHeroLost')) || 0,
    heroHunterLost: Number(localStorage.getItem('heroHunterLost')) || 0,
    destructiveCyborgLost: Number(localStorage.getItem('destructiveCyborgLost')) || 0,
    deadlyNinjaLost: Number(localStorage.getItem('deadlyNinjaLost')) || 0,
    brutalDemonLost: Number(localStorage.getItem('brutalDemonLost')) || 0,
    bladeMasterLost: Number(localStorage.getItem('bladeMasterLost')) || 0,
    wildPsychicLost: Number(localStorage.getItem('wildPsychicLost')) ||  0,
    martialArtistLost: Number(localStorage.getItem('martialArtistLost')) || 0,
    techProdigyLost: Number(localStorage.getItem('techProdigyLost')) || 0
}
let characterWon = {
    strongestHeroWon: Number(localStorage.getItem('strongestHeroWon')) || 0,
    heroHunterWon: Number(localStorage.getItem('heroHunterWon')) || 0,
    destructiveCyborgWon: Number(localStorage.getItem('destructiveCyborgWon')) || 0,
    deadlyNinjaWon: Number(localStorage.getItem('deadlyNinjaWon')) || 0,
    brutalDemonWon: Number(localStorage.getItem('brutalDemonWon')) || 0,
    bladeMasterWon: Number(localStorage.getItem('bladeMasterWon')) || 0,
    wildPsychicWon: Number(localStorage.getItem('wildPsychicWon')) ||  0,
    martialArtistWon: Number(localStorage.getItem('martialArtistWon')) || 0,
    techProdigyWon: Number(localStorage.getItem('techProdigyWon')) || 0
}
let winLossDiplsay = {
    strongestHeroWinLoss: document.getElementById('strongestherowinloss'),
    heroHunterWinLoss: document.getElementById('herohunterwinloss'),
    destructiveCyborgWinLoss: document.getElementById('destructivecyborgwinloss'),
    deadlyNinjaWinLoss: document.getElementById('deadlyninjawinloss'),
    brutalDemonWinLoss: document.getElementById('brutaldemonwinloss'),
    bladeMasterWinLoss: document.getElementById('blademasterwinloss'),
    wildPsychicWinLoss: document.getElementById('wildpsychicwinloss'),
    martialArtistWinLoss: document.getElementById('martialartistwinloss'),
    techProdigyWinLoss: document.getElementById('techprodigywinloss')
}
let characterSelect = document.getElementById('characterselect');
let lostbtn = document.getElementById('lost');
let wonbtn = document.getElementById('won');
let confirmbtn = document.getElementById('confirm');
let currentResult = 'none';
let addpage = document.getElementById('addpage');
let black = document.getElementById('black');
let addbtn = document.getElementById('add')
let totalMatch = document.getElementById('totalmatch');
let totalLost = document.getElementById('totallost');
let totalWon = document.getElementById('totalwin');
let lostCount = Number(localStorage.getItem('lostCount')) || 0;
let wonCount = Number(localStorage.getItem('wonCount')) || 0;
let matchCount = Number(localStorage.getItem('matchCount')) || 0;
let winLossRatio = document.getElementById('winlossratio');
let currentWinStreak = document.getElementById('currentwinstreak')
let longestWinStreak = document.getElementById('longestwinstreak')
let winStreak = Number(localStorage.getItem('winStreak')) || 0;
let longestStreak = Number(localStorage.getItem('longestStreak')) || 0;
let pie = document.getElementById('pie');
let percentage = Number(localStorage.getItem('percentage')) || 0;
let innerPie = document.getElementById('innerpie');
let settingButton = document.getElementById('settingbutton');
let settingPage = document.getElementById('settingpage')
let inSetting = false;
let settingClose = document.getElementById('settingclose');


function initializeUI() {
    // Update bars width
    Object.entries(characterBar).forEach(([key, el]) => {
        const countKey = key.replace('Bar', '') + 'Count';
        const width = Number(localStorage.getItem(countKey)) + 1 || 1;
        el.style.width = `${width}%`;
    });

    // Update win/loss displays
    Object.entries(winLossDiplsay).forEach(([key, el]) => {
        const baseKey = key.replace('WinLoss', '');
        const wonKey = baseKey + 'Won';
        const lostKey = baseKey + 'Lost';
        const wonValue = characterWon[wonKey] || 0;
        const lostValue = characterLost[lostKey] || 0;
        el.innerHTML = `<span class="green">(${wonValue}</span> / <span class="red">${lostValue})</span>`;
    });

    // Update statistics displays
    totalMatch.innerText = `Total Match Played: ${matchCount}`;
    totalLost.innerText = `Total Match Lost: ${lostCount}`;
    totalWon.innerText = `Total Match Won: ${wonCount}`;
    
    // Check for division by zero
    if (lostCount > 0) {
        winLossRatio.innerText = `Win/Loss Ratio: ${(wonCount/lostCount).toFixed(2)}`;
    } else {
        winLossRatio.innerText = `Win/Loss Ratio: ${wonCount > 0 ? '∞' : '0.00'}`;
    }

    currentWinStreak.innerText = `Current Win Streak: ${winStreak}`;
    longestWinStreak.innerText = `Longest Win Streak: ${longestStreak}`;

    // Update pie chart
    updatePieChart();

    // Restore button state if result was selected
    if (currentResult === 'Won') {
        wonbtn.style.filter = 'brightness(0.7)';
        lostbtn.style.filter = 'brightness(1)';
    } else if (currentResult === 'Lost') {
        lostbtn.style.filter = 'brightness(0.7)';
        wonbtn.style.filter = 'brightness(1)';
    }
}

function updatePieChart() {
    if (matchCount > 0) {
        percentage = wonCount / matchCount;
        pie.style.backgroundImage = `conic-gradient(
            rgb(31, 192, 31) ${Math.round(percentage * 100)}%, 
            rgb(209, 35, 35) ${Math.round(percentage * 100)}%
        )`;
        innerPie.innerText = `${Math.round(percentage*100)}%`;
    } else {
        pie.style.backgroundImage = 'conic-gradient(rgb(209, 35, 35) 100%)';
        innerPie.innerText = '0%';
    }
}

// Initialize when page loads
window.onload = initializeUI;
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

function saveAllData() {
    // Save all character counts
    Object.entries(characterCount).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });

    // Save all won counts
    Object.entries(characterWon).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });

    // Save all lost counts
    Object.entries(characterLost).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });

    // Save general stats
    localStorage.setItem('matchCount', matchCount);
    localStorage.setItem('wonCount', wonCount);
    localStorage.setItem('lostCount', lostCount);
    localStorage.setItem('winStreak', winStreak);
    localStorage.setItem('longestStreak', longestStreak);
    localStorage.setItem('percentage', percentage);
}


function addchar(){
    if (currentResult != 'none'){
        matchCount += 1;
        localStorage.setItem('matchCount', matchCount)

        black.style.display = 'none';
        addpage.style.display = 'none';
    
        characterCount[`${characterSelect.value}Count`] += 1;
        localStorage.setItem(`${characterSelect.value}Count`, characterCount[`${characterSelect.value}Count`])
        characterBar[`${characterSelect.value}Bar`].style.width = `${Number(characterCount[`${characterSelect.value}Count`]) + 1}%`;
    
        if (currentResult === 'Lost'){
            characterLost[`${characterSelect.value}Lost`] += 1;
            localStorage.setItem(`${characterSelect.value}Lost`, characterLost[`${characterSelect.value}Lost`])
            lostCount+=1;
            localStorage.setItem('lostCount', lostCount)
            winStreak=0;
            localStorage.setItem('winStreak', 0);
            currentWinStreak.innerText = `Current Win Streak: ${winStreak}`;
        } else if (currentResult === 'Won'){
            characterWon[`${characterSelect.value}Won`] += 1;
            localStorage.setItem(`${characterSelect.value}Won`, characterWon[`${characterSelect.value}Won`])
            wonCount+=1;
            localStorage.setItem('wonCount', wonCount)
            winStreak+=1;
            localStorage.setItem('winStreak', winStreak)
            if (winStreak>longestStreak){
                longestStreak+=1
                localStorage.setItem('longestStreak', longestStreak);
                longestWinStreak.innerText = `Longest Win Streak: ${longestStreak}`;
            }
            currentWinStreak.innerText = `Current Win Streak: ${winStreak}`;
        }

        totalLost.innerText = `Total Match Lost: ${lostCount}`;
        totalWon.innerText = `Total Match Won: ${wonCount}`;
        totalMatch.innerText = `Total Match Played: ${matchCount}`;

        winLossDiplsay[`${characterSelect.value}WinLoss`].innerHTML = `<span class="green">(${characterWon[`${characterSelect.value}Won`]}</span> / <span class="red">${characterLost[`${characterSelect.value}Lost`]})</span`;
        winLossRatio.innerText = `Win/Loss Ratio: ${(wonCount/lostCount).toFixed(2)}`

        percentage = wonCount/matchCount;
        localStorage.setItem('percentage', percentage)
        pie.style.backgroundImage = `conic-gradient(
            rgb(31, 192, 31) ${Math.round(percentage * 100)}%, 
            rgb(209, 35, 35) ${Math.round(percentage * 100)}%
        )`;
        innerPie.innerText = `${Math.round(percentage*100)}%`
    }
}

confirmbtn.addEventListener('click', addchar)

function resetAllData() {
    if (confirm('Reset All Progress?') === true){
        localStorage.clear();
        
        Object.keys(characterCount).forEach(key => { 
            characterCount[key] = 0; 
            localStorage.setItem(key, 0);
        });
        
        Object.keys(characterWon).forEach(key => { 
            characterWon[key] = 0; 
            localStorage.setItem(key, 0);
        });
        
        Object.keys(characterLost).forEach(key => { 
            characterLost[key] = 0; 
            localStorage.setItem(key, 0);
        });
        
        matchCount = 0;
        wonCount = 0;
        lostCount = 0;
        winStreak = 0;
        longestStreak = 0;
        percentage = 0;
        currentResult = 'none';
        
        Object.values(characterBar).forEach(el => {
            el.style.width = '1%';
        });
        
        Object.values(winLossDiplsay).forEach(el => {
            el.innerHTML = '<span class="green">(0</span> / <span class="red">0)</span>';
        });
        
        totalMatch.innerText = 'Total Match Played: 0';
        totalLost.innerText = 'Total Match Lost: 0';
        totalWon.innerText = 'Total Match Won: 0';
        winLossRatio.innerText = 'Win/Loss Ratio: 0.00';
        currentWinStreak.innerText = 'Current Win Streak: 0';
        longestWinStreak.innerText = 'Longest Win Streak: 0';
        
        pie.style.backgroundImage = 'none';
        innerPie.innerText = '0%';
        
        wonbtn.style.filter = 'brightness(1)';
        lostbtn.style.filter = 'brightness(1)';
        
        saveAllData();
        
    }
}


let resetBtn = document.getElementById('reset');
if (resetBtn) {
     resetBtn.addEventListener('click', resetAllData);
}

function openSetting(){
    if (inSetting===true){
        settingPage.style.display = 'none';
        black.style.display = 'none';
        inSetting = false;
    } else{
        settingPage.style.display = 'block';
        black.style.display = 'block';
        inSetting = true;
    }
}


settingButton.addEventListener('click', openSetting)
settingClose.addEventListener('click', openSetting)
