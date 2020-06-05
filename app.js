function init(){
    panel = document.getElementById('testpanel');
    document.getElementById('submitNewLinkButton').addEventListener('click', submitNewLink);
    document.getElementById('addNewLinkButton').addEventListener('click', () => {DialogPanel.show(panel)});
    document.getElementById('closeFormButton').addEventListener('click', () => {DialogPanel.hide(panel)});
}

function submitNewLink(){
    panel = document.getElementById('testpanel');
    if((document.querySelector('#linkInput').value == "") || (document.querySelector('#bgimgInput').value == "") || (document.querySelector('#logoInput').value == "") || (document.querySelector('#offsetInput').value == "")){
        document.querySelector('#submitNewLinkButton').innerHTML = 'Missing Values!'
        document.querySelector('#submitNewLinkButton').style.color = 'red';
        setTimeout(() => {
            document.querySelector('#submitNewLinkButton').innerHTML = 'Submit'
            document.querySelector('#submitNewLinkButton').style.color = 'black';
        }, 3000)
    }
    title = document.querySelector('#titleInput').value;
    developer = document.querySelector('#devInput').value;
    link = document.querySelector('#linkInput').value;
    backgroundImage = document.querySelector('#bgimgInput').files[0];
    idleLogoImage = document.querySelector('#logoInput').files[0];
    altLogoImage = null;
    if(document.querySelector('#logoaltInput').value != null){
        altLogoImage = document.querySelector('#logoaltInput').files[0];
    }
    offset = document.querySelector('#offsetInput').value;

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



