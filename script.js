class Contact{
    //Private Static id for Unique Identifier
    static id = 0;
    constructor(name,email,mobile,landline,website,address){
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
    new Contact('Chandermani Arora', 'chandermani@technovert.com','+91 9292929292','01234058490','https://www.technovert.com',"Madhuri Hills"),
    new Contact('Sashi Pagadala', 'vijay@technovert.com','+91 9292929292','01234058490','https://www.technovert.com',"Madhuri Hills"),
    new Contact('Praveen Battula', 'vijay@technovert.com','+91 9292929292','01234058490','https://www.technovert.com',"Madhuri Hills"),
    new Contact('Vijay Yalamanchali', 'vijay@technovert.com','+91 9292929292','01234058490','https://www.technovert.com',"Madhuri Hills")
);


function addContact(name,email,mobile,landline,website,address){
    contacts.push(new Contact(name,email,mobile,landline,website,address));
}

function editContact(id,name,email,mobile,landline,website,address){
    contacts.forEach((contact)=>{
        if(contact.id === id){
            contact.name = name;
            contact.email = email;
            contact.mobile = mobile;
            contact.landline = landline;
            contact.website = website;
            contact.address = address;
        }
    });
}

function deleteContact(id){
    contacts = contacts.filter((contact)=>{
        return contact.id !== id;
    });
}


// function toggleDisplay(type) {
//     const form = document.getElementById('contact-form');
//     const contactDisplay = document.getElementById('contact-display');
//     if(type=='form'){
//         form.style.display = "block";
//         contactDisplay.style.display = "none";
//     }
//     else if(type=='display'){
//         form.style.display = "none";
//         contactDisplay.style.display = "block";
//     }
//     else{
//         form.style.display = "none";
//         contactDisplay.style.display = "none";
//     }
// }


