const template = document.createElement('template');
template.innerHTML = `
            <style>
            #buttonLasso{
                height: 300;
                width: 200;
                margin: 10px;
                transition: margin 0.3s cubic-bezier(.25,.8,.25,1), height 0.3s cubic-bezier(.25,.8,.25,1), width 0.3s cubic-bezier(.25,.8,.25,1);
            }
            #buttonLasso:hover{
                margin: 5px;
                height: 310;
                width: 210;
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
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1), height 0.3s cubic-bezier(.25,.8,.25,1), width 0.3s cubic-bezier(.25,.8,.25,1);
            }
            #button:hover{
                box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
                height: 310;
                width: 210;
            }
            #backgroundFilter{
                height: inherit;
                width: inherit;
                backdrop-filter: grayscale(1) brightness(75%);
                opacity: 0;
                border-radius: 25px;
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
                transition: filter 0.3s cubic-bezier(.25,.8,.25,1), margin-top 0.3s cubic-bezier(.25,.8,.25,1);
            }
            #button:hover #logo{
                filter: none;
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
        this.shadowRoot.querySelector('#buttonLink').setAttribute('href', this.getAttribute('href'));
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
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#button').removeEventListener('mouseover');
        this.shadowRoot.querySelector('#button').removeEventListener('mouseout');

    };



}
window.customElements.define('launch-button', LaunchButton)