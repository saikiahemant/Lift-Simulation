{
    'use strict';
    class Speech {
        constructor(id, date, author, keywords, speech) {
            this.id = id;
            this.date = date;
            this.author = author;
            this.keywords = keywords;
            this.speech = speech; 
        }
    }
    const Data = {
        allSpeeches: [],
        filteredSpeeches: [],
        tabSelected: 'add-new-tab',
        id: 0
    }
    const DOMStrings = {
        addNewBtn: document.querySelector('#add-btn'),
        viewAllBtn: document.querySelector('#view-all-btn'),
        addNewTab: document.querySelector('#add-new-tab'),
        viewAllTab: document.querySelector('#view-all-tab'),
        allSpeechDisplay: document.querySelector('#all-speech-display'),
        addSpeechForm: document.querySelector('#add-speech-form'),
        speechDate: document.querySelector('#speech-date'),
        speechAuthor: document.querySelector('#speech-author'),
        speechKeywords: document.querySelector('#speech-keywords'),
        speechText: document.querySelector('#speech-text'),
        addSpeechBtn: document.querySelector('#add-speech-btn'),
        searchSpeech: document.querySelector('#search-speech')
    };
    const ControlMethods = {
        selectTab: (e) => Data.tabSelected = (e.target.id === 'add-btn') ? 'add-new-tab' : 'view-all-tab',
        showTab: () => {
            if (Data.tabSelected === 'add-new-tab') {
                DOMStrings.addNewTab.style.display = 'block';
                DOMStrings.viewAllTab.style.display = 'none';
            } else {
                DOMStrings.viewAllTab.style.display = 'block';
                DOMStrings.addNewTab.style.display = 'none';
            }
        },
        addSpeech: (e) => {
            e.preventDefault();
            let date = DOMStrings.speechDate.value,
                author = DOMStrings.speechAuthor.value,
                keywords = DOMStrings.speechKeywords.value,
                speech = DOMStrings.speechText.value;

            if (date.trim() !== '' && author.trim() !== '' && keywords.trim() !== '' && speech.trim() !== '') {
                Data.allSpeeches.push(new Speech(Data.id, date, author, keywords, speech));
                DOMStrings.addSpeechForm.reset();
                ++Data.id;
                window.alert(`Speech added! Total Speeches: ${Data.id}`)
            } else {
                window.alert(`Enter some data!`);
            }
        },
        speechSnippetBuilder: (speech) => {
            return `
            <div class='speech'>
                <div class='author'>${speech.author}</div>
                <div class='date'>${speech.date}</div>
                <div class='keyword'>${speech.keywords}</div>
            </div>
            `;
        },
        showAllSpeeches: (speeches) => {
            DOMStrings.allSpeechDisplay.innerHTML = '';
            (speeches.length > 0) ? speeches.forEach(speech => {
                DOMStrings.allSpeechDisplay.innerHTML += ControlMethods.speechSnippetBuilder(speech);
            }) :
                DOMStrings.allSpeechDisplay.innerHTML = `It's all blank here`;
        }
    };

    DOMStrings.addNewBtn.addEventListener('click', (e) => { ControlMethods.selectTab(e); ControlMethods.showTab() });
    DOMStrings.viewAllBtn.addEventListener('click', (e) => {
        ControlMethods.selectTab(e);
        ControlMethods.showTab();
        ControlMethods.showAllSpeeches(Data.allSpeeches);
    });
    DOMStrings.addSpeechBtn.addEventListener('click', ControlMethods.addSpeech);
    DOMStrings.searchSpeech.addEventListener('keyup', (e) => {
        Data.filteredSpeeches = Data.allSpeeches.filter(speech => speech.author.includes(e.target.value));
        ControlMethods.showAllSpeeches(Data.filteredSpeeches);
    });

    ControlMethods.showTab();
}