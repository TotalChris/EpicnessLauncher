const template = document.createElement('template');
template.innerHTML = `
            <style>
            #buttonLasso{
                height: 300;
                width: 200;
                margin-left: 10px;
                margin-right: 10px;
                margin-top: 10px;
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
                transition: padding-top 0.3s cubic-bezier(.25,.8,.25,1);
            }
            #backgroundFilter{
                height: inherit;
                width: inherit;
                background-color: rgba(0, 0, 0, .70);
                opacity: 0;
                border-radius: inherit;
                transition: opacity 0.3s cubic-bezier(.25,.8,.25,1);
            }
            #button:hover #backgroundFilter{
                opacity: 1;
                backdrop-filter: grayscale(1);
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
                margin: 10px;
                width: 200px;
                height: 40px;
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
        let R = this.shadowRoot;
        this.button = $('#button', R)[0];
        this.logo = $('#logo', R)[0];
        this.info = $('#infoHeader', R)[0];
        this.subinfo = $('#infoSubHeader', R)[0];

        this.button.style.backgroundImage = `url('${this.getAttribute('poster')}')`;
        this.logo.setAttribute('src', this.getAttribute('logo'));
        this.logo.style.marginTop = this.getAttribute('y-offset');
        this.info.innerHTML = this.getAttribute('title');
        this.subinfo.innerHTML = this.getAttribute('developer');
    }

    connectedCallback(){
        this.button.addEventListener('mouseover', () => {
            if(this.getAttribute('hover-logo') != null){
                this.logo.setAttribute('src', this.getAttribute('hover-logo'))
            }
            this.logo.style.marginTop = (150 - ((this.logo.height) / 2));
            
        })
        this.button.addEventListener('mouseout', () => {
            if(this.getAttribute('hover-logo') != null){
                this.logo.setAttribute('src', this.getAttribute('logo'))
            }
            this.logo.style.marginTop = this.getAttribute('y-offset');
        })
        this.button.addEventListener('click', () => {

        })
        this.button.addEventListener('mousedown', () => {
            this.button.classList.remove('release');
            this.button.style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
            this.logo.style.marginTop = (150 - ((this.logo.height) / 2)) + 5;
            this.button.classList.add('press');
        })
        this.button.addEventListener('mouseup', () => {
            this.button.classList.remove('press');
            this.logo.style.marginTop = (150 - ((this.logo.height) / 2));
            this.button.style.boxShadow = "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
            this.button.classList.add('release');
        })
    }

    disconnectedCallback(){
        this.button.removeEventListener('mouseover');
        this.button.removeEventListener('mouseout');
        this.button.removeEventListener('click');
    }

    set launchCommand(launchString) {
        this.setAttribute('href', launchString);
    }

    get launchCommand() {
        return this.getAttribute('href')
    }
}
window.customElements.define('launch-button', LaunchButton)
