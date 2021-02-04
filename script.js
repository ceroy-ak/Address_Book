class Contact {
    //Private Static id for Unique Identifier
    static id = 0;
    constructor(name, email, mobile, landline, website, address) {
        this.id = Contact.id++;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.landline = landline;
        this.website = website;
        this.address = address;
    }
}

var contacts = new Array(
    new Contact('Chandermani Arora', 'chandermani@technovert.com', '+91 7845120215', '01234058490', 'https://www.technovert.com', "Madhuri Hills"),
    new Contact('Sashi Pagadala', 'vijay@technovert.com', '+91 9875841236', '01234058490', 'https://www.technovert.com', "Madhuri Hills"),
    new Contact('Praveen Battula', 'vijay@technovert.com', '+91 5268497502', '01234058490', 'https://www.technovert.com', "Madhuri Hills"),
    new Contact('Vijay Yalamanchali', 'vijay@technovert.com', '+91 9292929292', '01234058490', 'https://www.technovert.com', "Madhuri Hills")
);


function addContact(contact) {
    contacts.push(contact);
    displayContactList(contact);
}

function editContact(newContact, oldId) {
    deleteContact(oldId);
    newContact.id = oldId;
    Contact.id--;
    addContact(newContact);
}

function deleteContact(id) {
    contacts = contacts.filter((contact) => {
        return contact.id != id;
    });

    let contact = document.getElementById(id);
    let parent = contact.parentNode;
    parent.removeChild(contact);

}


function displayContactList(param) {
    const contactList = document.getElementsByClassName('contacts-list')[0];
    if (param == undefined) {
        contacts.forEach((contact) => {

            //Contacts Div
            const div = document.createElement('div');
            div.className = "contact";
            div.id = contact.id;

            //Contacts Div->h1 [name]
            const name = document.createElement('h1');
            name.className = "name";
            name.appendChild(document.createTextNode(contact.name));
            div.appendChild(name);

            //Contacts Div->p [email]
            const email = document.createElement('p');
            email.className = "email";
            email.appendChild(document.createTextNode(contact.email));
            div.appendChild(email);

            //Contact Div->p [mobile]
            const mobile = document.createElement('p');
            mobile.className = "mobile";
            mobile.appendChild(document.createTextNode(contact.mobile));
            div.appendChild(mobile);

            div.addEventListener('click', () => {
                selectedContact(div.id);
                displaySelectedContact(contact);
            });

            contactList.appendChild(div);

        });
    }
    else {
        const div = document.createElement('div');
        div.className = "contact";
        div.id = param.id;

        //Contacts Div->h1 [name]
        const name = document.createElement('h1');
        name.className = "name";
        name.appendChild(document.createTextNode(param.name));
        div.appendChild(name);

        //Contacts Div->p [email]
        const email = document.createElement('p');
        email.className = "email";
        email.appendChild(document.createTextNode(param.email));
        div.appendChild(email);

        //Contact Div->p [mobile]
        const mobile = document.createElement('p');
        mobile.className = "mobile";
        mobile.appendChild(document.createTextNode(param.mobile));
        div.appendChild(mobile);

        div.addEventListener('click', () => {
            selectedContact(div.id);
            displaySelectedContact(param);

        });

        contactList.appendChild(div);
    }
}

function selectedContact(id) {
    const contactList = document.getElementsByClassName('contacts-list')[0];
    const contactListChild = [...contactList.children];
    contactListChild.forEach((contact) => {
        if (contact.id == id) {
            contact.classList.add('selected');
        }
        else {
            contact.classList.remove('selected');
        }

    });

}

function displaySelectedContact(contact) {
    const name = document.getElementById('selected-name');
    const email = document.getElementById('selected-email').lastChild;
    const mobile = document.getElementById('selected-mobile').lastChild;
    const landline = document.getElementById('selected-landline').lastChild;
    const website = document.getElementById('selected-website').lastChild;
    const address = document.getElementById('selected-address').lastChild;
    const id = document.getElementById('selected-id');
    document.getElementById('form').style.display = "none";

    const div = document.getElementById('contact-selected');

    div.style.display = "block";
    name.innerText = contact.name;
    email.innerText = contact.email;
    mobile.innerText = contact.mobile;
    landline.innerText = contact.landline;
    website.innerText = contact.website;
    address.innerText = contact.address;
    id.value = contact.id;
}

function contactDetailsForm(id) {

    //Reference to all the input fields
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formMobile = document.getElementById('form-mobile');
    const formLandline = document.getElementById('form-landline');
    const formWebsite = document.getElementById('form-website');
    const formAddress = document.getElementById('form-address');
    const formId = document.getElementById('form-id');

    // Remove display for all errors in form if any
    document.getElementById('form-name-error').style.display = "none";
    document.getElementById('form-email-error').style.display = "none";
    document.getElementById('form-mobile-error').style.display = "none";
    document.getElementById('form-website-error').style.display = "none";


    //Initial Values for Add
    let nameVal = '';
    let emailVal = '';
    let websiteVal = '';
    let mobileVal = '';
    let landlineVal = '';
    let addressVal = '';
    let idVal = '';

    //Populate Values for edit
    if (id != undefined) {
        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].id == id) {
                nameVal = contacts[i].name;
                emailVal = contacts[i].email;
                websiteVal = contacts[i].website;
                mobileVal = contacts[i].mobile;
                landlineVal = contacts[i].landline;
                addressVal = contacts[i].address;
                idVal = contacts[i].id;
                break;
            }
        }
    }

    formName.value = nameVal;
    formEmail.value = emailVal;
    formMobile.value = mobileVal;
    formLandline.value = landlineVal;
    formWebsite.value = websiteVal;
    formAddress.value = addressVal;
    formId.value = idVal;

}


/* All Event Listeners Globals*/
document.addEventListener('DOMContentLoaded', displayContactList());
var homeBtn = document.getElementById('home').addEventListener('click', (e) => {
    selectedContact(NaN);
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "none";
});

var selectedDeleteBtn = document.getElementById('selected-delete').addEventListener('click', (e) => {
    let id = document.getElementById('selected-id').value;
    deleteContact(id);
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "none";
});

var addBtn = document.getElementById('add').addEventListener('click', (e) => {
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "block";
    contactDetailsForm();
});

var selectedEditBtn = document.getElementById('selected-edit').addEventListener('click', (e) => {
    let id = document.getElementById('selected-id').value;
    contactDetailsForm(id);
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "block";
});

/* Form Submit Event Listener */
var form = document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let nameVal = e.target[0].value;
    let emailVal = e.target[1].value;
    let mobileVal = e.target[2].value;
    let landlineVal = e.target[3].value;
    let websiteVal = e.target[4].value;
    let addressVal = e.target[5].value;
    let idVal = e.target[6].value;

    let newContact = new Contact(nameVal, emailVal, mobileVal, landlineVal, websiteVal, addressVal);
    if (idVal == '') {
        addContact(newContact);
    }
    else {
        editContact(newContact, idVal);
    }

    e.target.style.display = "none";
});


/*Form Validation for Name */
var inputName = document.getElementById('form-name');
var inputNameErrorMessage = document.getElementById('form-name-error');
inputName.addEventListener('keyup', (e) => {
    let regex = /^[a-zA-Z\s]+$/g;
    if (!regex.test(e.target.value)) {
        inputName.classList.add('form-error');
        inputNameErrorMessage.style.display = "block";
    }
    else {
        inputName.classList.remove('form-error');
        inputNameErrorMessage.style.display = "none";
    }
});

/*Form Validation for Emails */
var inputEmail = document.getElementById('form-email');
var inputEmailErrorMessage = document.getElementById('form-email-error');
inputEmail.addEventListener('keyup', (e) => {
    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}/g;
    if (!regex.test(e.target.value)) {
        inputEmail.classList.add('form-error');
        inputEmailErrorMessage.style.display = "block";
    }
    else {
        inputEmail.classList.remove('form-error');
        inputEmailErrorMessage.style.display = "none";
    }
});

/*Form Validation for Mobile number */
var inputMobile = document.getElementById('form-mobile');
var inputMobileErrorMessage = document.getElementById('form-mobile-error');
inputMobile.addEventListener('keyup', (e) => {
    let regex = /^\+91[ -]?[\d]{10}/g;
    if (!regex.test(e.target.value)) {
        inputMobile.classList.add('form-error');
        inputMobileErrorMessage.style.display = "block";
    }
    else {
        inputMobile.classList.remove('form-error');
        inputMobileErrorMessage.style.display = "none";
    }
});


/*Form validation for Website*/
var inputWebsite = document.getElementById('form-website');
var inputWebsiteErrorMessage = document.getElementById('form-website-error');
inputWebsite.addEventListener('keyup', (e) => {
    let regex = /^(https|http):\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z]+$/g;
    if (!regex.test(e.target.value)) {
        inputWebsite.classList.add('form-error');
        inputWebsiteErrorMessage.style.display = "block";
    }
    else {
        inputWebsite.classList.remove('form-error');
        inputWebsiteErrorMessage.style.display = "none";
    }
});