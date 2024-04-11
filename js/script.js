const dialpadBtn = document.querySelector('.dialpadBtn');
const activeDialpad = document.querySelector('.activeDialpad');
const closeDialpadBtn = document.querySelector('.closeDialpadBtn');
const inputDialpad = document.querySelector('.inputDialpad');
const btnDelDialpad = document.querySelector('.btnDelDialpad');
const dataNum = document.querySelectorAll('.dataNum');
const btnCallDialpad = document.querySelector('.btnCallDialpad');
const createSectionCaling = document.querySelector('.createSectionCaling');
const createSection = document.querySelector('.createSection');
const callingWindow = document.querySelector('.callingWindow');
const btnCallEnd = document.querySelector('.btnCallEnd');

localStorage.removeItem('inCall');

inputDialpad.addEventListener('input', function() {
    this.value = this.value.replace(/[^\d*+#]/g,'');
});


activeDialpad.addEventListener('click', (e) => {
    if(e.target.classList.contains('activeDialpad')) {
        closeDialpad(activeDialpad)
    }
})
dialpadBtn.addEventListener('click', () => {
    showDialpad(activeDialpad)
});
closeDialpadBtn.addEventListener('click', () => {
    closeDialpad(activeDialpad)
});

dataNum.forEach(element => {
    element.addEventListener('click', function() {
        const num = this.getAttribute('data-num')
        inputDialpad.value += num;
    });
}); 

btnDelDialpad.addEventListener('click', function() {
    const resultDel = inputDialpad.value.slice(0, -1);
    inputDialpad.value = resultDel;
});

btnCallDialpad.addEventListener('click', function() {
    console.log('Calling to: ' + inputDialpad.value);
});

function showDialpad(element) {
    element.style.display = 'flex';
};

function closeDialpad(element) {
    element.style.display = 'none';
    inputDialpad.value = '';
};

function getCalling(item) {
    if(!localStorage.getItem('inCall')) {
        localStorage.setItem('inCall', true);
        const name = item.getAttribute('data-name');
        const num = item.getAttribute('data-num');
        const createSectionElem = templateCallingInfo(name, num);
        createSectionCaling.style.display = 'block';
        createSectionCaling.innerHTML = createSectionElem;
        const callingTimer = document.querySelector('.timer');
        timer(callingTimer);
        changeCallClass();
    };
};

createSectionCaling.addEventListener('dblclick', function() {
    this.classList.remove('calling-small');
});

function templateCallingInfo(name, number) {
    return `
        <div class="wrapper-calling">
            <div class="icon-phone">
                <svg width="38" height="38" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_104_987)"><path d="M10.7146 8.56721L8.52715 7.62971C8.4337 7.58988 8.32984 7.58149 8.23121 7.60579C8.13258 7.6301 8.04452 7.68579 7.98027 7.76447L7.01152 8.94807C5.49116 8.23123 4.26762 7.00769 3.55078 5.48732L4.73437 4.51857C4.81322 4.45445 4.86902 4.36638 4.89334 4.2677C4.91766 4.16903 4.90916 4.06512 4.86914 3.9717L3.93164 1.7842C3.88772 1.6835 3.81003 1.60128 3.71198 1.55172C3.61393 1.50216 3.50166 1.48836 3.39453 1.51271L1.36328 1.98146C1.25999 2.00531 1.16784 2.06347 1.10186 2.14644C1.03588 2.22941 0.999976 2.33229 1 2.4383C1 7.44807 5.06055 11.5008 10.0625 11.5008C10.1685 11.5009 10.2715 11.465 10.3545 11.399C10.4375 11.333 10.4957 11.2408 10.5195 11.1375L10.9883 9.10627C11.0125 8.99862 10.9984 8.8859 10.9484 8.78751C10.8985 8.68912 10.8158 8.61122 10.7146 8.56721V8.56721Z" stroke="#A6B4D0"/><path d="M11.6355 0.642822H9.93591C9.6124 0.642822 9.44897 1.03536 9.67831 1.26471L10.1638 1.75024L7.19592 4.7181C7.1248 4.78922 7.1248 4.90455 7.19592 4.9757L7.66691 5.44668C7.73805 5.51781 7.85338 5.51781 7.92451 5.44668L10.8924 2.47883L11.3779 2.96442C11.606 3.19251 11.9998 3.03234 11.9998 2.70682V1.00711C11.9998 0.805918 11.8367 0.642822 11.6355 0.642822Z" fill="#A6B4D0"/></g><defs><clipPath id="clip0_104_987"><rect width="12" height="12" fill="white" transform="translate(0 0.5)"/></svg>
            </div>             
            <div class="number">${number}</div>
            <div class="name">${name}</div>
            <div class="call-time timer">00 : 00 : 00</div>
            <div class="icon-box">
                <button class="btnMute btn-style"><svg xmlns="http://www.w3.org/2000/svg" height="1em" class="img-size" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4z"/></svg></button>
                <button class="btnPause btn-style"><svg xmlns="http://www.w3.org/2000/svg" height="1em" class="img-size" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg></button>
                <button class="btnNext btn-style btn-next"><svg "xmlns="http://www.w3.org/2000/svg" height="1em" class="img-size" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"/></svg></button>
                <button class="btnNotes btn-style btn-notes"><svg xmlns="http://www.w3.org/2000/svg" height="1em" class="img-size" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H288V352c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zM288 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V320v5.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z"/></svg></button>
                <button class="btnCallEnd btn-style" onClick="endCalling(this)"><svg width="26" height="18" class="img-size" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_160_1579)"><path d="M1.55046 10.1157L3.50431 13.2418C3.71679 13.5813 4.14419 13.7205 4.51543 13.574L8.42312 12.0109C8.76504 11.8741 8.97753 11.5249 8.93845 11.1585L8.66979 8.46709C11.4223 7.47307 14.5167 7.45109 17.3253 8.46709L17.0567 11.1585C17.0201 11.5273 17.2301 11.8741 17.572 12.0109L21.4797 13.574C21.8558 13.7205 22.2832 13.5813 22.4957 13.2418L24.4496 10.1157C24.6523 9.79082 24.6083 9.36586 24.3323 9.08988C18.0776 2.83512 7.93221 2.82536 1.66769 9.08988C1.39415 9.36342 1.34531 9.78838 1.55046 10.1157Z" fill="#FF622A"/></g><defs><clipPath id="clip0_160_1579"><rect width="25.2632" height="17.6842" fill="white" transform="translate(0.369141 0.157959)"/></clipPath></defs></svg></button>
            </div>
        </div>
    `;
};

function timer(item) {
    let sec = 0;
    let min = 0;
    let hour = 0;
    setInterval(function() {
        sec++
        item.innerHTML = `${hour.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
        if(sec == 60) {
            min++;
            sec = 0;
            item.innerHTML = `${hour.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
        };
        if(min == 60) {
            hour++;
            min = 0;
            item.innerHTML = `${hour.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
        }
    }, 1000);
};


//function calling
function endCalling() {
    if(localStorage.getItem('inCall')) {
        localStorage.removeItem('inCall');
        createSectionCaling.style.display = 'none';
        changeCallClass();
    };
    createSectionCaling.classList.remove('calling-small');
};

function changeCallClass(item) {
    item = document.querySelectorAll('.getCall');
    item.forEach(element => {
        if(!element.classList.contains('callMute')){
            element.classList.add('callMute');
        } else {
            element.classList.remove('callMute');
        }
    });
};


window.getCalling = getCalling;


