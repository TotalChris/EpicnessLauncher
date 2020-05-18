function init(){
    document.getElementById('submitNewLinkButton').addEventListener('click', submitNewLink);
    document.getElementById('addNewLinkButton').addEventListener('click', showNewLinkForm);
    document.getElementById('closeFormButton').addEventListener('click', endNewLinkForm)
}

function submitNewLink(){
    if((document.querySelector('#linkInput').value == "") || (document.querySelector('#bgimgInput').value == "") || (document.querySelector('#logoInput').value == "") || (document.querySelector('#offsetInput').value == "")){
        document.querySelector('#submitNewLinkButton').innerHTML = 'Missing Values!'
        document.querySelector('#submitNewLinkButton').style.color = 'red';
        setTimeout(() => {
            document.querySelector('#submitNewLinkButton').innerHTML = 'Submit'
            document.querySelector('#submitNewLinkButton').style.color = 'black';
        }, 3000)
    }
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
    newButton.setAttribute('y-offset', offset);
    document.querySelector('#mainButtonView').append(newButton.cloneNode(true))
    endNewLinkForm();
}

function showNewLinkForm(){
    document.getElementById('addLinkActivationButton').style.display = "none";
    document.getElementById('newLinkFormBox').style.display = "flex";
}

function endNewLinkForm(){
    document.getElementById('addLinkActivationButton').style.display = "block";
    document.getElementById('newLinkFormBox').style.display = "none";
}