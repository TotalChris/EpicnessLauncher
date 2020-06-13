const objectbtntemplate = document.createElement('template');
objectbtntemplate.innerHTML =  `
    <style>
    #objectbutton{
        margin: 10px;
        padding: 10px;
        padding-right: 10px;
        background-color: #303030;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        display: flex;
        align-items: center;
        justify-content: center;

    }
    #objectbutton:hover{
        
    }
    #buttonicon{
        
    }
    #buttontext{
        font-family: Roboto;
        color: white;

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
    <div id="objectbutton">
        <div id="buttonicon">
            <img id="buttoniconimg"></img>
        </div>
        <div id="buttontext"></div>
    </div>

`

class ObjectButton extends HTMLElement {
    constructor() {
       super();
       this.attachShadow({ mode: 'open' });
       this.shadowRoot.appendChild(objectbtntemplate.content.cloneNode(true));
       let R = this.shadowRoot;
       this.button = $('#objectbutton', R)[0];
       this.text = $('#buttontext', R)[0];
       this.icon = $('#buttonicon', R)[0];
       this.iconimage = $('#buttoniconimg', R)[0];
       this.sizeAttribute = this.getAttribute('height')
       //this.button.style.backgroundImage = `url('${this.getAttribute('icon')}')`;
       this.text.style.width = "auto";
       this.button.style.height = this.sizeAttribute;
       this.button.style.width = "auto";
       this.button.style.minWidth = this.sizeAttribute;
       this.text.innerHTML = this.getAttribute('text');
       this.text.style.fontSize = (this.sizeAttribute - 10) / 2;
       this.text.style.marginLeft = this.sizeAttribute / 5
       this.text.style.marginRight = this.sizeAttribute / 5
       this.iconimage.height = this.sizeAttribute;
       this.iconimage.width = this.sizeAttribute;
       this.icon.children[0].src = this.getAttribute('icon');
       this.button.style.borderRadius = `${this.getAttribute('curve')}px`;
    }

    connectedCallback(){
        this.button.addEventListener('mousedown', () => {
            this.button.classList.remove('release');
            this.button.style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
            this.button.classList.add('press');
        })
        this.button.addEventListener('mouseup', () => {
            this.button.classList.remove('press');
            this.button.style.boxShadow = "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
            this.button.classList.add('release');
        })
    }
}

window.customElements.define('object-button', ObjectButton);