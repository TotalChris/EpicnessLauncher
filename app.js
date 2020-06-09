function init(){
    panel = $('#testpanel')[0];

    submitButton = $('#submitNewLinkButton')[0];
    addEntryButton = $('#addNewLinkButton')[0];
    cancelEntryButton = $('#closeFormButton')[0];

    titleInput = $('#titleInput')[0];
    devInput = $('#devInput')[0];
    linkInput = $('#linkInput')[0];

    bgimgInput = $('#bgimgInput')[0];
    logoInput = $('#logoInput')[0];
    logoaltInput = $('#logoaltInput')[0];
    offsetInput = $('#offsetInput')[0];


    submitButton.addEventListener('click', submitNewLink);
    addEntryButton.addEventListener('click', () => {DialogPanel.show(panel)});
    cancelEntryButton.addEventListener('click', () => {DialogPanel.hide(panel)});
}

function submitNewLink(){
    if((linkInput.value == "") || (bgimgInput.value == "") || (logoInput.value == "") || (offsetInput.value == "")){
        submitButton.innerHTML = 'Missing Values!'
        submitButton.style.color = 'red';
        setTimeout(() => {
            submitButton.innerHTML = 'Submit'
            submitButton.style.color = 'black';
        }, 3000)
    }
    title = titleInput.value;
    developer = devInput.value;
    link = linkInput.value;
    backgroundImage = bgimgInput.files[0];
    idleLogoImage = logoInput.files[0];
    altLogoImage = null;
    if(logoaltInput.value != null){
        altLogoImage = logoaltInput.files[0];
    }
    offset = offsetInput.value;

    newButton = document.createElement('launch-button');
    newButton.setAttribute('href', link);
    newButton.setAttribute('poster', URL.createObjectURL(backgroundImage));
    newButton.setAttribute('logo', URL.createObjectURL(idleLogoImage));
    if(altLogoImage != null){
        newButton.setAttribute('hover-logo', URL.createObjectURL(altLogoImage));
    }
    newButton.setAttribute('y-offset', offset);
    newButton.setAttribute('title', title);
    newButton.setAttribute('developer', developer);
    document.querySelector('#mainButtonView').append(newButton.cloneNode(true));
    DialogPanel.hide(panel);
}



