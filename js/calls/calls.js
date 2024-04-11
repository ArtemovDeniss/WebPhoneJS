document.addEventListener('DOMContentLoaded', function() {
    const numberList = document.querySelector('.numberList');
    const createSection = document.querySelector('.createSection');
    const recentBtn = document.querySelector('.recentBtn');
    const missedBtn = document.querySelector('.missedBtn');
    const createSectionCaling = document.querySelector('.createSectionCaling');
    
    
    
    
    
    let resultList = '';
    let missedCallsList = []; 

    async function reqestListCalls() {
        let response = await fetch('https://64cfeb54ffcda80aff524be7.mockapi.io/api/callsList');
        let listCalls = await response.json(); // читаем ответ в формате JSON
        window.listCalls = listCalls;
        
        listCalls.forEach(element => {
            resultList += templateItemList(element.id, element.firstName, element.lastName, element.phoneNumber, element.date, element.time, element.missed, element.callType)
        });
        numberList.innerHTML = resultList;

        createMissedCallsList(listCalls);
        createClickItem();
    };
    reqestListCalls();

    missedBtn.addEventListener('click', function() {
        missedBtn.classList.add('activeBtn');
        recentBtn.classList.remove('activeBtn');
        numberList.innerHTML = missedCallsList;
        createSection.innerHTML = '';
        createClickItem();
    });

    recentBtn.addEventListener('click', function() {
        recentBtn.classList.add('activeBtn');
        missedBtn.classList.remove('activeBtn');
        numberList.innerHTML = resultList;
        createSection.innerHTML = '';
        createClickItem();
    });

    function templateItemList(id, firstName, lastName, number, date, time, missed, callType) {
        let getStatus = '';
        if(localStorage.getItem('inCall')) {
            getStatus = 'callMute';
        }
        return `
            <li data-id="${id}" data-num="${number}" class="itemUser">
                <div class="left">
                    <img src="${checkCall(missed, callType)}" alt="">
                    <div class="contact">
                        <span class="number" data-num="${number}">${number}</span>
                        <span class="name" data-name="${firstName}">${firstName} ${lastName}</span>
                    </div>
                </div>
                <div class="right">
                    <span class="date">${date}, ${time}</span>
                    <button class="getCall call-btn ${getStatus}" onClick="getCalling(this)" data-num="${number}"  data-name="${firstName} ${lastName}"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_108_444)"><path d="M13.4917 0.67222L10.6479 0.0159695C10.339 -0.0551242 10.0218 0.106204 9.89599 0.396048L8.58349 3.45855C8.46865 3.72652 8.54521 4.04097 8.77216 4.22417L10.4292 5.58042C9.44482 7.67769 7.7249 9.42222 5.58388 10.4257L4.22763 8.76871C4.04169 8.54175 3.72997 8.46519 3.462 8.58003L0.399504 9.89253C0.106925 10.021 -0.0544027 10.3382 0.0166911 10.6472L0.672941 13.491C0.741301 13.7863 1.0038 13.9996 1.31278 13.9996C8.31552 13.9996 14.0003 8.32574 14.0003 1.31206C14.0003 1.00581 13.7897 0.740579 13.4917 0.67222Z" fill="#364A73"/></g><defs><clipPath id="clip0_108_444"><rect width="14" height="14" fill="white"/></clipPath></defs></svg></button>
                </div>
            </li>
        `;
    };

    function templateItemListInfo(firstName, lastName, number, date, time, waitingDuration, onCallDuration, ivrDuration, totalDuration, agent, queue, destinationNumber, sourceNumber, callCategory, callId) {
        let getStatus = '';
        if(localStorage.getItem('inCall')) {
            getStatus = 'callMute';
        }
        return`
            <div class="section">
                <div class="header-info">
                    <div class="left">
                        <div class="date-time">
                            <div class="date">${date} <br> 
                                <div class="time">${time}</div>
                            </div>
                        </div>
                        <div class="humen">
                            <div class="number">${number}</div>
                            <div class="name">${firstName} ${lastName}</div>
                        </div>
                        <div class="btns">
                            <button class="first">Inbound</button>
                            <button class="seckond">Answered</button>
                        </div>
                    </div>
                    <button class="getCall last-btn ${getStatus}" onClick="getCalling(this)" data-num="${number}"  data-name="${firstName} ${lastName}"><svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_108_444)"><path d="M13.4917 0.67222L10.6479 0.0159695C10.339 -0.0551242 10.0218 0.106204 9.89599 0.396048L8.58349 3.45855C8.46865 3.72652 8.54521 4.04097 8.77216 4.22417L10.4292 5.58042C9.44482 7.67769 7.7249 9.42222 5.58388 10.4257L4.22763 8.76871C4.04169 8.54175 3.72997 8.46519 3.462 8.58003L0.399504 9.89253C0.106925 10.021 -0.0544027 10.3382 0.0166911 10.6472L0.672941 13.491C0.741301 13.7863 1.0038 13.9996 1.31278 13.9996C8.31552 13.9996 14.0003 8.32574 14.0003 1.31206C14.0003 1.00581 13.7897 0.740579 13.4917 0.67222Z" fill="#364A73"/></g><defs><clipPath id="clip0_108_444"><rect width="14" height="14" fill="white"/></clipPath></defs></svg></button>
                </div>
                <div class="information">
                    <div class="col-left">
                        <ul class="left-list">
                            <li>
                                <div class="text">
                                    <h3>CALL ID</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${callId}</span>
                                    <button class="btn-copy">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9205 3.54549L11.7045 2.32951C11.4935 2.11853 11.2074 2 10.909 2H6.875C6.25367 2 5.75 2.50367 5.75 3.125V4.25H3.875C3.25367 4.25 2.75 4.75367 2.75 5.375V12.875C2.75 13.4963 3.25367 14 3.875 14H9.125C9.74633 14 10.25 13.4963 10.25 12.875V11.75H12.125C12.7463 11.75 13.25 11.2463 13.25 10.625V4.34098C13.25 4.04262 13.1315 3.75647 12.9205 3.54549ZM8.98438 12.875H4.01562C3.97833 12.875 3.94256 12.8602 3.91619 12.8338C3.88982 12.8074 3.875 12.7717 3.875 12.7344V5.51562C3.875 5.47833 3.88982 5.44256 3.91619 5.41619C3.94256 5.38982 3.97833 5.375 4.01562 5.375H5.75V10.625C5.75 11.2463 6.25367 11.75 6.875 11.75H9.125V12.7344C9.125 12.7717 9.11018 12.8074 9.08381 12.8338C9.05744 12.8602 9.02167 12.875 8.98438 12.875ZM11.9844 10.625H7.01562C6.97833 10.625 6.94256 10.6102 6.91619 10.5838C6.88982 10.5574 6.875 10.5217 6.875 10.4844V3.26562C6.875 3.22833 6.88982 3.19256 6.91619 3.16619C6.94256 3.13982 6.97833 3.125 7.01562 3.125H9.5V5.1875C9.5 5.49816 9.75184 5.75 10.0625 5.75H12.125V10.4844C12.125 10.5217 12.1102 10.5574 12.0838 10.5838C12.0574 10.6102 12.0217 10.625 11.9844 10.625ZM12.125 4.625H10.625V3.125H10.8507C10.888 3.125 10.9238 3.13981 10.9502 3.16618L12.0838 4.2998C12.0969 4.31286 12.1072 4.32837 12.1143 4.34543C12.1214 4.36249 12.125 4.38078 12.125 4.39925V4.625Z" fill="#A6B4D0"/></svg>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>CALL CATEGORY</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${callCategory}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>SOURCE NUMBER</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${sourceNumber}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>DESTINATION NUMBER</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${destinationNumber}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>QUEUE</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${queue}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>AGENT</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${agent}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>TOTAL DURATION</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${totalDuration}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>IVR DURATION</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${ivrDuration}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>WAITING DURATION</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${waitingDuration}</span>
                                    
                                </div>
                            </li>
                            <li>
                                <div class="text">
                                    <h3>ON CALL DURATION</h3>
                                </div>
                                <div class="item-botton">
                                    <span>${onCallDuration}</span>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-right">
                        <div class="list result">
                            <span>RESULT</span>
                            <select class="select" id="">
                                <option value="">Select option</option>
                            </select>
                        </div>
                        <div class="list tag">
                            <span>TAGS</span>
                            <div class="tags-text">
                                <div class="tags">
                                    <div class="active-tag">
                                        <span>Demo</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.19355 8.43548C5.03387 8.43548 4.90323 8.30484 4.90323 8.14516V7.85484C4.90323 7.69516 5.03387 7.56452 5.19355 7.56452H10.8065C10.9661 7.56452 11.0968 7.69516 11.0968 7.85484V8.14516C11.0968 8.30484 10.9661 8.43548 10.8065 8.43548H5.19355ZM14 8C14 11.3145 11.3145 14 8 14C4.68548 14 2 11.3145 2 8C2 4.68548 4.68548 2 8 2C11.3145 2 14 4.68548 14 8ZM13.2258 8C13.2258 5.09919 10.8718 2.77419 8 2.77419C5.09919 2.77419 2.77419 5.12823 2.77419 8C2.77419 10.9008 5.12823 13.2258 8 13.2258C10.9008 13.2258 13.2258 10.8718 13.2258 8Z" fill="#FF622A"/></svg>
                                    </div>
                                    <div class="active-tag">
                                        <span>Upsell call</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.19355 8.43548C5.03387 8.43548 4.90323 8.30484 4.90323 8.14516V7.85484C4.90323 7.69516 5.03387 7.56452 5.19355 7.56452H10.8065C10.9661 7.56452 11.0968 7.69516 11.0968 7.85484V8.14516C11.0968 8.30484 10.9661 8.43548 10.8065 8.43548H5.19355ZM14 8C14 11.3145 11.3145 14 8 14C4.68548 14 2 11.3145 2 8C2 4.68548 4.68548 2 8 2C11.3145 2 14 4.68548 14 8ZM13.2258 8C13.2258 5.09919 10.8718 2.77419 8 2.77419C5.09919 2.77419 2.77419 5.12823 2.77419 8C2.77419 10.9008 5.12823 13.2258 8 13.2258C10.9008 13.2258 13.2258 10.8718 13.2258 8Z" fill="#FF622A"/></svg>
                                    </div>
                                    <div class="active-tag">
                                        <span>New Sale</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.19355 8.43548C5.03387 8.43548 4.90323 8.30484 4.90323 8.14516V7.85484C4.90323 7.69516 5.03387 7.56452 5.19355 7.56452H10.8065C10.9661 7.56452 11.0968 7.69516 11.0968 7.85484V8.14516C11.0968 8.30484 10.9661 8.43548 10.8065 8.43548H5.19355ZM14 8C14 11.3145 11.3145 14 8 14C4.68548 14 2 11.3145 2 8C2 4.68548 4.68548 2 8 2C11.3145 2 14 4.68548 14 8ZM13.2258 8C13.2258 5.09919 10.8718 2.77419 8 2.77419C5.09919 2.77419 2.77419 5.12823 2.77419 8C2.77419 10.9008 5.12823 13.2258 8 13.2258C10.9008 13.2258 13.2258 10.8718 13.2258 8Z" fill="#FF622A"/></svg>
                                    </div>
                                    <div class="active-tag">
                                        <span>Cancelation</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.19355 8.43548C5.03387 8.43548 4.90323 8.30484 4.90323 8.14516V7.85484C4.90323 7.69516 5.03387 7.56452 5.19355 7.56452H10.8065C10.9661 7.56452 11.0968 7.69516 11.0968 7.85484V8.14516C11.0968 8.30484 10.9661 8.43548 10.8065 8.43548H5.19355ZM14 8C14 11.3145 11.3145 14 8 14C4.68548 14 2 11.3145 2 8C2 4.68548 4.68548 2 8 2C11.3145 2 14 4.68548 14 8ZM13.2258 8C13.2258 5.09919 10.8718 2.77419 8 2.77419C5.09919 2.77419 2.77419 5.12823 2.77419 8C2.77419 10.9008 5.12823 13.2258 8 13.2258C10.9008 13.2258 13.2258 10.8718 13.2258 8Z" fill="#FF622A"/></svg>
                                    </div>
                                </div>
                                <input type="text" id="">
                            </div>
                        </div>
                        <div class="list note">
                            <span>NOTE</span>
                            <textarea class="textarea" name="" id="" cols="57" rows="5"></textarea>
                        </div>
                        <button class="btn-botton">Save</button>
                    </div>
                </div>
            </div>
        `;
    };

    function openProFile(e, item) {
        if(!e.target.classList.contains('getCall')) {
            const itemId = item.getAttribute('data-id');
            const listItems = listCalls;
            let listItem = listItems.find(element => element.id === itemId);
            const createSectionElem = templateItemListInfo(
                listItem.firstName, 
                listItem.lastName, 
                listItem.phoneNumber, 
                listItem.date, 
                listItem.time, 
                listItem.waitingDuration, 
                listItem.onCallDuration, 
                listItem.ivrDuration, 
                listItem.totalDuration, 
                listItem.agent, 
                listItem.queue, 
                listItem.destinationNumber, 
                listItem.sourceNumber, 
                listItem.callCategory, 
                listItem.callId
            );
            createSection.innerHTML = createSectionElem;
            localStorage.getItem('inCall') ? createSectionCaling.classList.add('calling-small') : false;
        };
    };

    

    function checkCall(missed, callType) {
        if(callType == 'out') {
            return './img/phone-alt-solid-top.svg'
        } else {
            if(missed) {
                return './img/phone-icon-orange.svg'
            } else {
                return './img/phone-alt-solid-down.svg'
            }
        }
    };

    window.openProFile = openProFile;
    window.checkCall = checkCall;
    

   function createMissedCallsList(elem) {
        elem.forEach(element =>{
            if(element.missed) {
                return missedCallsList += templateItemList(element.id, element.firstName, element.lastName, element.phoneNumber, element.date, element.time, element.missed, element.callType)
            };
        });
   };

   function createClickItem() {
    const listCall = document.querySelectorAll('.itemUser');
        listCall.forEach(elem => {
            elem.addEventListener('click', function(e) {
                openProFile(e, elem);
            });
        });
   }


}, false);