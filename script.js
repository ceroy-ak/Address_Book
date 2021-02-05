//Contact class for each instance of the data
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


//Dummy data shown at the start of the page in the contacts array used throughout the page
var contacts = new Array(
    new Contact('Chandermani Arora', 'chandermani@technovert.com', '+91 7845120215', '01234058490', 'https://www.technovert.com', "Madhuri Hills"),
    new Contact('Sashi Pagadala', 'vijay@technovert.com', '+91 9875841236', '01234058490', 'https://www.technovert.com', "Madhuri Hills"),
    new Contact('Praveen Battula', 'vijay@technovert.com', '+91 5268497502', '01234058490', 'https://www.technovert.com', "Madhuri Hills"),
    new Contact('Vijay Yalamanchali', 'vijay@technovert.com', '+91 9292929292', '01234058490', 'https://www.technovert.com', "Madhuri Hills")
);

//Adds the data to the contacts array and calls the displayContactList() function
function addContact(contact) {
    contacts.push(contact);
    alert('Contact Saved :)')
    displayContactList(contact);
}


//Edits the data, takes in Contact class and oldId as parameter. Changes the data by iterating the contacts array and changing the data in the DOM
function editContact(newContact, oldId) {

    //Updates the contact in contacts array
    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == oldId) {
            contacts[i].name = newContact.name;
            contacts[i].email = newContact.email;
            contacts[i].mobile = newContact.mobile;
            contacts[i].landline = newContact.landline;
            contacts[i].website = newContact.website;
            contacts[i].address = newContact.address;
            break;
        }
    }

    //Updates the values in the Contact List

    const div = document.getElementById(oldId);
    const name = div.children[0];
    const email = div.children[1];
    const mobile = div.children[2];

    name.innerText = newContact.name;
    email.innerText = newContact.email;
    mobile.innerText = newContact.mobile;

    Contact.id--;

    selectedContact(NaN);
    alert('Contact Updated :)');
}

//Deletes the data by filtering the contacts array and removing the element from the DOM
function deleteContact(id) {
    contacts = contacts.filter((contact) => {
        return contact.id != id;
    });

    let contact = document.getElementById(id);
    let parent = contact.parentNode;
    parent.removeChild(contact);
    alert('Contact Deleted :| ');

}


//Displays the left side contact list. If param is empty means new contact to be inserted, else iterates over the contacts array and creates the elements in the DOM
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

//Toggles the background of contact selected in the left side contacts list by taking id as parameter, if parameter NaN means no contact has background color else the 
//specific id contact gets the background color by adding the 'selected' css class
function selectedContact(id) {

    //Getting the reference of the left side list
    const contactList = document.getElementsByClassName('contacts-list')[0];

    //Spread to convert childrence of contactlist into array
    const contactListChild = [...contactList.children];
    contactListChild.forEach((contact) => {

        //if match found, the selected class is added else removed
        if (contact.id == id) {
            contact.classList.add('selected');
        }
        else {
            contact.classList.remove('selected');
        }

    });

}


//Displays the selected contact in the center main elements by changing the visibility and changing the values in the DOM. Takes the Contact class object
//as parameter, sent each time 'click' event listener is triggered in the contact in the contact lists directly
function displaySelectedContact(contact) {

    //Getting the reference from the DOM
    const name = document.getElementById('selected-name');
    const email = document.getElementById('selected-email').lastChild;
    const mobile = document.getElementById('selected-mobile').lastChild;
    const landline = document.getElementById('selected-landline').lastChild;
    const website = document.getElementById('selected-website').lastChild;
    const address = document.getElementById('selected-address').lastChild;
    const id = document.getElementById('selected-id');

    //Removing the visibility of the form
    document.getElementById('form').style.display = "none";

    //Getting the reference and displaying the contact in the center page by changing the values in the DOM
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

//The form to gather or update the details. If 'id' is missing means empty form is called to add new contact data else update operation is called
//and the form fields are populated based on the contact with the same id.
function contactDetailsForm(id) {

    //Reference to all the input fields
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formMobile = document.getElementById('form-mobile');
    const formLandline = document.getElementById('form-landline');
    const formWebsite = document.getElementById('form-website');
    const formAddress = document.getElementById('form-address');
    const formId = document.getElementById('form-id');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    //To prevent submit event because of enter key
    formName.onkeypress = (e) => e.key != "Enter";
    formEmail.onkeypress = (e) => e.key != "Enter";
    formMobile.onkeypress = (e) => e.key != "Enter";
    formLandline.onkeypress = (e) => e.key != "Enter";
    formWebsite.onkeypress = (e) => e.key != "Enter";
    formAddress.onkeypress = (e) => e.key != "Enter";




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
    let subButtonVal = 'Add';

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
                subButtonVal = 'Update';
                break;
            }
        }
    }

    //Substituting the values
    formName.value = nameVal;
    formEmail.value = emailVal;
    formMobile.value = mobileVal;
    formLandline.value = landlineVal;
    formWebsite.value = websiteVal;
    formAddress.value = addressVal;
    formId.value = idVal;
    formSubmitBtn.value = subButtonVal;

}


/* All Event Listeners Globals*/

//As soon as page loads and the DOM is loaded the function is called so as to iterate over the 
document.addEventListener('DOMContentLoaded', displayContactList());

//Home button in the navigation when clicked
var homeBtn = document.getElementById('home').addEventListener('click', (e) => {

    //Remove the background color from all the contact lists
    selectedContact(NaN);

    //Makes the form and the selected contact invisible
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "none";
});


//When delete button is selected from the contacts display
var selectedDeleteBtn = document.getElementById('selected-delete').addEventListener('click', (e) => {
    let id = document.getElementById('selected-id').value;
    deleteContact(id);
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "none";
});

//When add button is clicked from the navigation bar
var addBtn = document.getElementById('add').addEventListener('click', (e) => {
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "block";
    contactDetailsForm();
});

//When edit button is selected from the contacts display
var selectedEditBtn = document.getElementById('selected-edit').addEventListener('click', (e) => {
    let id = document.getElementById('selected-id').value;
    contactDetailsForm(id);
    document.getElementById('contact-selected').style.display = "none";
    document.getElementById('form').style.display = "block";
});

//When cancel button is clicked within the form
var cancelButtonForm = document.getElementById('form-cancel-btn').addEventListener('click', (e) => {
    document.getElementById('home').click();
});



/*Form Validation for Name */

//Reference of the input field
var inputName = document.getElementById('form-name');

//Reference of the element that displays error
var inputNameErrorMessage = document.getElementById('form-name-error');

//Eventlistener Keyup to validate input on each key up
inputName.addEventListener('keyup', (e) => {

    //Regular Expression
    let regex = /^[a-zA-Z\s]+$/g;
    if (!regex.test(e.target.value)) {
        inputName.classList.add('form-error');
        inputNameErrorMessage.style.display = "inline-block";
    }
    else {
        inputName.classList.remove('form-error');
        inputNameErrorMessage.style.display = "none";
    }
});

/*Form Validation for Emails */

//Refernce to the input field
var inputEmail = document.getElementById('form-email');

//Reference to the element that shows the error
var inputEmailErrorMessage = document.getElementById('form-email-error');

//Eventlistener Keyup to validate input on each key up
inputEmail.addEventListener('keyup', (e) => {

    //Regular Expression
    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}/g;
    if (!regex.test(e.target.value)) {
        inputEmail.classList.add('form-error');
        inputEmailErrorMessage.style.display = "inline-block";
    }
    else {
        inputEmail.classList.remove('form-error');
        inputEmailErrorMessage.style.display = "none";
    }
});

/*Form Validation for Mobile number */

//Refernce to the input field
var inputMobile = document.getElementById('form-mobile');

//Reference to the element that shows the error
var inputMobileErrorMessage = document.getElementById('form-mobile-error');

//Eventlistener Keyup to validate input on each key up
inputMobile.addEventListener('keyup', (e) => {

    //Regular Expression
    let regex = /^\+91[ -]?[\d]{10}$/g;
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

//Refernce to the input field
var inputWebsite = document.getElementById('form-website');

//Reference to the element that shows the error
var inputWebsiteErrorMessage = document.getElementById('form-website-error');

//Eventlistener Keyup to validate input on each key up
inputWebsite.addEventListener('keyup', (e) => {

    //Regular Expression
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

/* Form Submit Event Listener */
var form = document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    //Checks if any of the errors are visible by checking the input fields if they have any form-error class
    let formValidation = true;

    if (inputName.classList.contains('form-error')
        || inputMobile.classList.contains('form-error')
        || inputEmail.classList.contains('form-error')
        || inputWebsite.classList.contains('form-error')
    ) {
        formValidation = false;
    }


    if (formValidation) {

        //If form validation is all good then getting all values from the form
        let nameVal = e.target[0].value;
        let emailVal = e.target[1].value;
        let mobileVal = e.target[2].value;
        let landlineVal = e.target[3].value;
        let websiteVal = e.target[4].value;
        let addressVal = e.target[5].value;
        let idVal = e.target[6].value;

        let newContact = new Contact(nameVal, emailVal, mobileVal, landlineVal, websiteVal, addressVal);

        //Boolean Variable to check if new contact is being added
        //Input type hidden contains the id. When id is none means new contact is added else existing contact is updated
        let addContactBool = (idVal == '');


        //If new contact then addContact is called else editContact is called
        if (addContactBool) {
            if (confirm("Do you want to add this contact?")) {
                addContact(newContact);
                e.target.style.display = "none";
            }
        }
        else {
            if (confirm('Do you want to update this contact?')) {
                editContact(newContact, idVal);
                e.target.style.display = "none";
            }
        }
    }
    else {
        alert('Some of your fields doesnt have valid inputs :( ')
    }
});


