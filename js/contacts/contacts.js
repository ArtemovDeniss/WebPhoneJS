document.addEventListener('DOMContentLoaded', function() {
    const alphabetList = document.querySelector('.alphabetList');
    const createSectionContacts = document.querySelector('.createSectionContacts');
    const numberList = document.querySelector('.numberList');

    let resultListFavorite = '';
    let resultNotFavorite = [];

    async function reqestListContacts() {
        let response = await fetch('https://64cfeb54ffcda80aff524be7.mockapi.io/api/contactsList');
        let listContacts = await response.json(); // читаем ответ в формате JSON
        window.listContacts = listContacts;
        
        listContacts.forEach(element => {
            if(element.status === true) {
                resultListFavorite += templateFavoriteList(element.id, element.firstName, element.lastName, element.phoneNumber)
            } else {
                resultNotFavorite.push(element);
            };
        });
        numberList.innerHTML = resultListFavorite;

        sortAlphabetList(resultNotFavorite);

        addLeterList(resultNotFavorite);
    };
    reqestListContacts();

        
    function templateItemList(id, firstName, lastName, number) {
        return `
            <li data-id="${id}" onClick="openProFile(this)">
                <div class="contact">
                    <div class="number">${number}</div>
                    <div class="name">${firstName} ${lastName}</div>
                </div>
            </li>
        `;
    };
    
    function templateInfoList(firstName, lastName, number, seckondNumber, queue, jobTitle, email, departament, company, status) {
        return `
            <div class="section">
                <div class="header-info">
                    <div class="col-left">
                        <div class="contact">
                            <div class="name">${firstName} ${lastName}</div>
                            <div class="number">${number}</div>
                        </div>
                        <div class="favoriteStatus status">
                            ${activeStatus(status)}
                        </div>
                    </div>
                    <button class="getCall call-btn" onClick="getCalling()"><svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_108_444)"><path d="M13.4917 0.67222L10.6479 0.0159695C10.339 -0.0551242 10.0218 0.106204 9.89599 0.396048L8.58349 3.45855C8.46865 3.72652 8.54521 4.04097 8.77216 4.22417L10.4292 5.58042C9.44482 7.67769 7.7249 9.42222 5.58388 10.4257L4.22763 8.76871C4.04169 8.54175 3.72997 8.46519 3.462 8.58003L0.399504 9.89253C0.106925 10.021 -0.0544027 10.3382 0.0166911 10.6472L0.672941 13.491C0.741301 13.7863 1.0038 13.9996 1.31278 13.9996C8.31552 13.9996 14.0003 8.32574 14.0003 1.31206C14.0003 1.00581 13.7897 0.740579 13.4917 0.67222Z" fill="#364A73"/></g><defs><clipPath id="clip0_108_444"><rect width="14" height="14" fill="white"/></clipPath></defs></svg></button>
                </div>
                <div class="information">
                    <ul class="info-list">
                        <li class="text">
                            <div class="top">
                                <h3>PHONE</h3>
                                <div class="status">
                                    <span>Primary</span>
                                </div>
                            </div>
                            <span class="botton">${number}</span>
                        </li>
                        <li class="text">
                            <div class="top">
                                <h3>PHONE 2</h3>
                            </div>
                            <span class="botton">${seckondNumber}</span>
                        </li>
                        <li class="text">
                            <div class="top">
                                <h3>QUEUE</h3>
                            </div>
                            <span class="botton">${queue}</span>
                        </li>
                        <li class="text">
                            <div class="top">
                                <h3>EMAIL</h3>
                            </div>
                            <span class="botton">${email}</span>
                        </li>
                        <li class="text">
                            <div class="top">
                                <h3>JOB TITLE</h3>
                            </div>
                            <span class="botton">${jobTitle}</span>
                        </li>
                        <li class="text">
                            <div class="top">
                                <h3>DEPARTMENT</h3>
                            </div>
                            <span class="botton">${departament}</span>
                        </li>
                        <li class="text">
                            <div class="top">
                                <h3>COMPANY</h3>
                            </div>
                            <span class="botton">${company}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `
    };
    
    function openProFile(item) {
        const itemId = item.getAttribute('data-id');
        const listItems = listContacts;
        let listItem = listItems.find(element => element.id === itemId);
        const createSectionElem = templateInfoList(
            listItem.firstName,
            listItem.lastName,
            listItem.phoneNumber,
            listItem.phoneNumberSeckond,
            listItem.queue,
            listItem.jobTitle,
            listItem.email,
            listItem.departament,
            listItem.company,
            listItem.status
        );
        createSectionContacts.innerHTML = createSectionElem;
    };

    function templateFavoriteList(id, firstName, lastName, number) {
        return `
            <li data-id="${id}" onClick="openProFile(this)">
                <div class="contact-list">
                    <div class="number">${number}</div>
                    <div class="name">${firstName} ${lastName}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.33911 1.28355L4.74294 4.51989L1.17172 5.04055C0.531297 5.13343 0.274639 5.92296 0.739068 6.37517L3.32277 8.89287L2.71167 12.4494C2.60168 13.0923 3.27877 13.5738 3.84586 13.2732L7.04065 11.5939L10.2354 13.2732C10.8025 13.5714 11.4796 13.0923 11.3696 12.4494L10.7585 8.89287L13.3422 6.37517C13.8067 5.92296 13.55 5.13343 12.9096 5.04055L9.33836 4.51989L7.74218 1.28355C7.45619 0.706681 6.62755 0.699348 6.33911 1.28355Z" fill="#FFC754"/></svg>                            
            </li>
        `
    };

    function activeStatus(status) {
        return status ?  '<img src="./img/star-icon.svg" alt="">' : '';
    };

    function sortAlphabetList(arr) {
        let sortList = arr.sort(function(a, b) {
            if(a.firstName > b.firstName) {
                return 1;
            }
            if(a.firstName < b.firstName) {
                return -1;
            }
            return 0;
        });
        return sortList
    };

    function addLeterList(arr) {
        let leter = '';
        let resultList = '';
        arr.forEach(element => {
            if(element.firstName[0] == leter) {
                resultList +=templateItemList(element.id, element.firstName, element.lastName, element.phoneNumber);
            } else {
                leter = element.firstName[0];
                resultList += `<li class='later'><span>${leter}</span></li>`;
                resultList +=templateItemList(element.id, element.firstName, element.lastName, element.phoneNumber);
            }
        });
        alphabetList.innerHTML = resultList;
    };

    window.openProFile = openProFile;
    window.activeStatus = activeStatus;

}, false);