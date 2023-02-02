class Contact{
    // Constructor
    constructor(name, contactNumber, emailAddress){
        this.Name = name
        this.ContactNumber = contactNumber
        this.EmailAddress = emailAddress
    }
    // Getters and Setters
    get Name(){
        return this.m_name
    }

    set Name(name){
        this.m_name = name
    }

    get ContactNumber(){
        return this.m_contactNumber
    }

    set ContactNumber(contactNumber){
        this.m_contactNumber = contactNumber
    }

    get EmailAddress(){
        return this.m_emailAddress
    }

    set EmailAddress(emailAddress){
        this.m_emailAddress = emailAddress
    }

    // Public override method
    toString(){
        return `Full Name is ${this.Name}\nContact information is ${this.ContactNumber}\nEmail Address is ${this.EmailAddress}`
    }
}