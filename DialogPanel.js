const paneltemplate = document.createElement('template');
paneltemplate.innerHTML = `
        <style>
        #overlay{
            position: absolute;
            top: 0;
            left: 0;
            backdrop-filter: brightness(65%);
            height: 100%;
            width:100%;
            z-index: 1;
            display: none;
        }
        #overlayContent{
            position: inherit;
            top: 100px;
            left: 100px;
            height: calc(100% - 240px);
            width: calc(100% - 240px);
            padding: 20px;
            background-color: #232323;
            box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
            backdrop-filter: brightness(65%);
            border-radius: 30px;
            z-index: 2;
        }
        @keyframes fadein {
            0% {opacity: 0; display: block;}
            to {opacity: 1; display: block;}
        }
        
        @keyframes fadeout {
            0% {opacity: 1; display: block;}
            100% {opacity: 0; display: none;}
        }
        
        .fadein {
            animation: fadein 0.25s ease-in-out;
            animation-iteration-count: 1;
        }
        
        .fadeout {
            animation: fadeout 0.25s ease-in-out;
            animation-iteration-count: 1;
        }
        </style>
        <div id="overlay">
            <div id="overlayContent">
                <slot></slot>
            </div>
        </div>
`


class DialogPanel extends HTMLElement{
    
    constructor(){
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(paneltemplate.content.cloneNode(true));
    }

    connectedCallback(){
        this.shadowRoot.querySelector('#overlay').addEventListener('click', this.endNewLinkForm);
    }

    disconnectedCallback(){

    }

    static show(element){
        element.shadowRoot.getElementById('overlay').style.display = "block";
        element.shadowRoot.getElementById('overlay').className = "fadein";
    }
    static hide(element){
        element.shadowRoot.getElementById('overlay').className = "fadeout";
        element.shadowRoot.getElementById('overlay').addEventListener('animationend', () => {
            element.shadowRoot.getElementById('overlay').style.display = "none";
        }, {once : true});
    }
}

window.customElements.define('dialog-panel', DialogPanel);