const { spawn } = require('child_process');

const template = document.createElement('template');
template.innerHTML = `
            <style>
            #buttonLasso{
                height: 300;
                width: 200;
            }
            #buttonLink{
                height: 300;
                width: 200;
            }
            #button{
                height: 300;
                width: 200;
                display: flex;
                justify-content: center;
                border-radius: 25px;
                background-position: center;
                background-size: cover;
                box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
            }
            #backgroundFilter{
                height: inherit;
                width: inherit;
                backdrop-filter: grayscale(1);
                background-color: rgba(0, 0, 0, .70);
                opacity: 0;
                border-radius: inherit;
                transition: opacity 0.3s cubic-bezier(.25,.8,.25,1);
            }
            #button:hover #backgroundFilter{
                opacity: 1;
            }
            #logoLasso{
                position: absolute;
            }
            #logo{
                max-width: 180;
                max-height: 90;
                transition: margin-top 0.3s cubic-bezier(.25,.8,.25,1);
            }
            #info{
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                margin-right: 10px;
                padding-top: 10px;
                width: 200px;
                height: 50px;
            }
            #infoHeader{
                height: 20px;
                text-align: center;
                font-family: 'ProductSans';
                font-size: 15px;
                font-weight: bold;
                color: #FFFFFF;
            }
            #infoSubHeader{
                height: 10px;
                text-align: center;
                font-family: Roboto;
                font-size: 12px;
                color: #888888;
            }
            @keyframes press{
                0%{box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);}
                100%{box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);}
            }
            @keyframes release{
                0%{box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);}
                100%{box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);}
            }
            .press{
                animation: press 0.1s ease-in-out;
                animation-iteration-count: 1;
            }
            .release{
                animation: release 0.1s ease-in-out;
                animation-iteration-count: 1;
            }
            </style>
            <div id="buttonLasso">
                <a id="buttonLink">
                    <div id="button">
                        <div id="backgroundFilter"></div>
                        <div id="logoLasso">
                            <img id="logo">
                        </div>
                    </div>
                </a>
            </div>
            <div id="info">
                <div id="infoHeader"></div>
                <div id="infoSubHeader"></div>
            </div>
`

class LaunchButton extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#button').style.backgroundImage = `url('${this.getAttribute('poster')}')`;
        this.shadowRoot.querySelector('#logo').setAttribute('src', this.getAttribute('logo'));
        this.shadowRoot.querySelector('#logo').style.marginTop = this.getAttribute('y-offset');
        this.shadowRoot.querySelector('#infoHeader').innerHTML = this.getAttribute('title');
        this.shadowRoot.querySelector('#infoSubHeader').innerHTML = this.getAttribute('developer');
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#button').addEventListener('mouseover', () => {
            if(this.getAttribute('hover-logo') != null){
                this.shadowRoot.querySelector('#logo').setAttribute('src', this.getAttribute('hover-logo'))
            }
            this.shadowRoot.querySelector('#logo').style.marginTop = (150 - ((this.shadowRoot.querySelector('#logo').height) / 2));
            
        })
        this.shadowRoot.querySelector('#button').addEventListener('mouseout', () => {
            if(this.getAttribute('hover-logo') != null){
                this.shadowRoot.querySelector('#logo').setAttribute('src', this.getAttribute('logo'))
            }
            this.shadowRoot.querySelector('#logo').style.marginTop = this.getAttribute('y-offset');
        })
        this.shadowRoot.querySelector('#button').addEventListener('click', () => {
            spawn(this.launchCommand)
        })
        this.shadowRoot.querySelector('#button').addEventListener('mousedown', () => {
            this.shadowRoot.querySelector('#button').classList.remove('release');
            this.shadowRoot.querySelector('#button').style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
            this.shadowRoot.querySelector('#button').classList.add('press');
        })
        this.shadowRoot.querySelector('#button').addEventListener('mouseup', () => {
            this.shadowRoot.querySelector('#button').classList.remove('press');
            this.shadowRoot.querySelector('#button').style.boxShadow = "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
            this.shadowRoot.querySelector('#button').classList.add('release');
        })
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#button').removeEventListener('mouseover');
        this.shadowRoot.querySelector('#button').removeEventListener('mouseout');
        this.shadowRoot.querySelector('#button').removeEventListener('click');
    }

    set launchCommand(launchString) {
        this.setAttribute('href', launchString);
    }

    get launchCommand() {
        return this.getAttribute('href')
    }
}
window.customElements.define('launch-button', LaunchButton)

// reinsert later?
/*
#button:hover{
                box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
            }
                transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);


*/