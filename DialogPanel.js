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
            0% {opacity: 0; display: block; height: calc(100% - 300px); width: calc(100% - 300px); top: 130px; left: 130px; }
            100% {opacity: 1; display: block; height: calc(100% - 240px); width: calc(100% - 240px); top: 100px; left: 100px;}
        }
        
        @keyframes fadeout {
            0% {opacity: 1; display: block; height: calc(100% - 240px); width: calc(100% - 240px); top: 100px; left: 100px;}
            100% {opacity: 0; display: none; height: calc(100% - 300px); width: calc(100% - 300px); top: 130px; left: 130px;}
        }
        
        .fadein {
            animation: fadein 0.15s ease-in-out;
            animation-iteration-count: 1;
        }
        
        .fadeout {
            animation: fadeout 0.15s ease-in-out;
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
        this.shadowRoot.getElementById('overlay').addEventListener('click', (e) => {
            if(e.target.id == "overlay"){
                DialogPanel.hide(this);
            }
        });
    }

    disconnectedCallback(){
    }

    static show(element){
        element.shadowRoot.getElementById('overlay').style.display = "block";
        element.shadowRoot.getElementById('overlayContent').className = "fadein";
    }
    static hide(element){
        element.shadowRoot.getElementById('overlayContent').className = "fadeout";
        element.shadowRoot.getElementById('overlayContent').addEventListener('animationend', () => {
            element.shadowRoot.getElementById('overlay').style.display = "none";
        }, {once : true});
    }
}

window.customElements.define('dialog-panel', DialogPanel);