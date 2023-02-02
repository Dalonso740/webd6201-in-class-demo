(function (){

    function DisplayButton(){
        let randomButton = document.getElementById("RandomButton")
        randomButton.addEventListener("click", function(){
            location.href = './projects.html'
        })

        let mainContent = document.getElementsByTagName("main")[0]
        mainContent.setAttribute("class", "container")

        // another way to access body
        documentBody = document.body 

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3 container")

        let firstString = "this is a "
        let secondString = `${firstString} main paragraph that we added through javascript`
        mainParagraph.textContent = secondString

        // add apend()
        mainContent.appendChild(mainParagraph)
        
        // add .before()
        //mainContent.before(mainParagraph)

        //document.getElementById("RandomButton").remove()

        // documentBody.innerHTML = `
        //     <div class="container">
        //         <h1 class = "display-1">Hello</h1>
        //         <p class="mt-5 lead"> and... what do you think about this method?</p>
        //     </div>
        // `
        let Diego = new Contact("Diego Diaz", "123456789", "diego.d@dcmail.ca")
        console.log(Diego.toString())
    }

    function Start() {
        console.log("App Started!")

        switch(document.title) {
            case "Home - WEBD6201 Demo":
                DisplayButton()
                break
            case "Projects - WEBD6201 Demo":
                DisplayButton()
                break
            
        }
    }

    window.addEventListener("load", Start)
})()