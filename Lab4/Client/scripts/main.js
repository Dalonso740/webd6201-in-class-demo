"use strict";
(function () {
    function AuthGuard() {
        let protectedRoutes = [
            '/contact-list',
            '/edit'
        ];
        if (protectedRoutes.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = '/login';
            }
        }
    }
    function DisplayHome() {
        $("#RandomButton").on("click", function () {
            location.href = '/about';
        });
        let firstString = "This is a ";
        let secondString = `${firstString} main paragraph that we added through javascript and this is also on GitHub Pages`;
        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${secondString}</p>`);
        return new Function();
    }
    function DisplayProjects() {
        console.log("Projects Page");
        return new Function();
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.Name.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateInput(inputFieldID, regularExpression, exception) {
        let messageArea = $('#messageArea').hide();
        $('#' + inputFieldID).on("blur", function () {
            let inputText = $(this).val();
            if (!regularExpression.test(inputText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(exception).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidate() {
        let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][\D]{2,10}$/g;
        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|-|,)*([A-Z][a-z]{1,25})*$/g;
        ValidateInput("fullName", fullNamePattern, "Please enter a valid Full name which means a capitalized first name and capitalized last name");
        ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid Email Address");
    }
    function DisplayContacts() {
        console.log("Contact Us Page");
        $('a[href="/contact-list"]').off('click');
        $('a[href="/contact-list"]').on('click', function () {
            location.href = '/contact-list';
        });
        ContactFormValidate();
        let submitButton = document.getElementById("submitButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        submitButton.addEventListener("click", function (e) {
            e.preventDefault();
            location.href = "/home";
        });
        return new Function();
    }
    function DisplayContactList() {
        fetch("/users/reading", {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
            .then((e) => {
            e.json()
                .then((x) => {
                {
                    let contactList = document.getElementById("contactList");
                    let data = "";
                    let index = 1;
                    for (const key in x) {
                        let user = x[key];
                        let contact = new core.Contact("", "", "");
                        data += `<tr>
                            <th scope="row" class="text-center">${index}</th>
                            <td class="text-center">${user.firstname}</td>
                            <td class="text-center">${user.lastname}</td>
                            <td class="text-center">${user.username}</td>
                            <td class="text-center">${user.email}</td>
                            <td class="text-center"><button value="${user.username}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                            <td class="text-center"><button value="${user.username}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                        </tr>
                        `;
                        index++;
                    }
                    contactList.innerHTML = data;
                    $("button.delete").on("click", function () {
                        if (confirm("Are you sure you want to delete this?")) {
                            let username = $(this).val();
                            fetch("/users/delete", {
                                method: "post",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ username: username })
                            });
                        }
                        location.href = '/contact-list';
                    });
                    $("button.edit").on("click", function () {
                        location.href = '/edit#' + $(this).val();
                    });
                }
            });
        });
        $("#addButton").on("click", () => {
            location.href = '/edit#Add';
        });
        return new Function();
    }
    function DisplayEditPage() {
        ContactFormValidate();
        let page = location.hash.substring(1);
        console.log(page);
        switch (page) {
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact");
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        let fullName = document.forms[0].fullName.value;
                        let contactNumber = document.forms[0].contactNumber.value;
                        let emailAddress = document.forms[0].emailAddress.value;
                        AddContact(fullName, contactNumber, emailAddress);
                        location.href = '/contact-list';
                    });
                }
                break;
            default:
                {
                    let password = "";
                    let username = "";
                    fetch("/users/edit", {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: page })
                    })
                        .then((e) => {
                        e.json()
                            .then((x) => {
                            $("#firstName").val(x._doc.firstname);
                            $("#lastName").val(x._doc.lastname);
                            $("#emailAddress").val(x._doc.email);
                            password = x._doc.password;
                            username = x._doc.username;
                        });
                    });
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        let fname = $("#firstName").val();
                        let lname = $("#lastName").val();
                        let email = $("#emailAddress").val();
                        fetch("/users/update", {
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ firstname: fname, lastname: lname, email: email, password: password, username: username })
                        });
                        location.href = "/contact-list";
                    });
                    $("#resetButton").on("click", () => {
                        location.href = '/contact-list';
                    });
                }
                break;
        }
        return new Function();
    }
    function DisplayReferences() {
        console.log("References Page");
        return new Function();
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        let messageArea = $('#messageArea');
        messageArea.hide();
        $('#loginButton').on('click', function (e) {
            e.preventDefault();
            let uname = $("#userName").val();
            let password = $("#password").val();
            fetch("/users/login", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: uname, password: password })
            })
                .then((e) => {
                e.json()
                    .then((a) => {
                    sessionStorage.setItem('user', JSON.stringify(a));
                    CheckLogin();
                    location.href = "/contact-list";
                });
            });
        });
        $('#cancelButton').on('click', function () {
            document.forms[0].reset();
            location.href = '/home';
        });
        return new Function();
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $('#login').html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $('#logout').on('click', function () {
                sessionStorage.clear();
                $('#login').html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
                location.href = '/login';
            });
        }
    }
    function DisplayRegisterPage() {
        console.log("Registration Page");
        $("#submitButton").on("click", function (e) {
            e.preventDefault();
            let fname = $("#FirstName").val();
            let lname = $("#lastName").val();
            let uname = $("#userName").val();
            let email = $("#emailAddress").val();
            let password = $("#password").val();
            fetch("/users", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname: fname, lastname: lname, email: email, username: uname, password: password })
            });
        });
        return new Function();
    }
    function Display404Page() {
        console.log("404 Page");
        return new Function();
    }
    function Start() {
        console.log("App Started Successfully!");
        let pageId = $('body')[0].getAttribute('id');
        CheckLogin();
        switch (pageId) {
            case "home":
                DisplayHome();
            case "projects":
                DisplayProjects();
            case "contact":
                DisplayContacts();
            case "contact-list":
                AuthGuard();
                DisplayContactList();
            case "references":
                DisplayReferences();
            case "edit":
                AuthGuard();
                DisplayEditPage();
            case "login":
                DisplayLoginPage();
            case "register":
                DisplayRegisterPage();
            case "404":
                Display404Page();
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=main.js.map