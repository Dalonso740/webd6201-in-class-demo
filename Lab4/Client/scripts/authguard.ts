/*  Names: Diego Cruz and Neema Mwansembo 
    Date: 17th April 2023 */
(function() {
    let protectedRoutes: string[] = [
        'contact-list'
    ]

    if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
        // check if user is logged in
        if (!sessionStorage.getItem("user")) {
            // redirect the user to login.html
            location.href = '/login'
        }
    }
    
})()