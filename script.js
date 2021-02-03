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


function addContact(name, email, mobile, landline, website, address) {
    let contact = new Contact(name, email, mobile, landline, website, address);
    contacts.push(contact);
    displayContactList(contact);
}

function editContact(id, name, email, mobile, landline, website, address) {
    contacts.forEach((contact) => {
        if (contact.id === id) {
            contact.name = name;
            contact.email = email;
            contact.mobile = mobile;
            contact.landline = landline;
            contact.website = website;
            contact.address = address;
        }
    });
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
            displaySelectedContact(contact);
            
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

function displaySelectedContact(contact){
    const name = document.getElementById('selected-name');
    const email = document.getElementById('selected-email').lastChild;
    const mobile = document.getElementById('selected-mobile').lastChild;
    const landline = document.getElementById('selected-landline').lastChild;
    const website = document.getElementById('selected-website').lastChild;
    const address = document.getElementById('selected-address').lastChild;
    const id = document.getElementById('selected-id');
    document.getElementById('form').style.visibility = "hidden";

    const div = document.getElementById('contact-selected');

    div.style.visibility = "visible";
    name.innerText = contact.name;
    email.innerText = contact.email;
    mobile.innerText = contact.mobile;
    landline.innerText = contact.landline;
    website.innerText = contact.website;
    address.innerText = contact.address;
    id.value = contact.id;
}

function contactForm(id) {

}

/* All Event Listeners Globals*/
document.addEventListener('DOMContentLoaded', displayContactList());
var homeBtn = document.getElementById('home').addEventListener('click',(e)=>{
    selectedContact(NaN);
    document.getElementById('contact-selected').style.visibility = "hidden";
    document.getElementById('form').style.visibility = "hidden";
});

var selectedDeleteBtn = document.getElementById('selected-delete').addEventListener('click',(e)=>{
    let id = document.getElementById('selected-id').value;
    deleteContact(id);
    document.getElementById('contact-selected').style.visibility = "hidden";
    document.getElementById('form').style.visibility = "hidden";
}); 