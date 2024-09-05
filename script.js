
var couterCART = 0;

document.addEventListener('DOMContentLoaded', function() {

    var produkts = document.querySelectorAll(".produkt");

    
    var currentOPEN = document.querySelectorAll(".produkt-selected");



    let ID = 0;
    produkts.forEach(function(produkt) {
        produkt.id = ID;
        ID++;
        produkt.addEventListener('click', function(event) {
            let produktID = produkt.id;
            // Sprawdzamy, czy kliknięty element nie ma klasy "produkt-addcart"
        if (event.target.classList.contains('produkt-addcart') || event.target.classList.contains('addcart-text') || event.target.classList.contains('fa-cart-plus') || event.target.classList.contains('close-button')) {
            couterCART++;
            let displeyCOUTER = document.getElementById("cart-counter");
            let displayLIST = document.getElementById("cart-list");
            if (couterCART > 0) {
                displeyCOUTER.innerHTML = couterCART;
                displeyCOUTER.classList.add("counter");
                var dontEXISTinCART = true
                displayLIST.querySelectorAll(".cart-produkt-title").forEach((cartTITLE)=>{
                    if (cartTITLE.innerHTML == produkt.querySelector( ".produkt-title" ).innerHTML){
                        // alert("To ten sam produkt już jest w koszyku!");
                        dontEXISTinCART = false 
                        let itemCARTcouter = cartTITLE.parentElement.querySelector(".cart-item-counter").innerHTML;
                        itemCARTcouter++
                        cartTITLE.parentElement.querySelector(".cart-item-counter").innerHTML = itemCARTcouter;
                        let closeBTN = cartTITLE.parentElement.querySelector(".fa-xmark")
                        closeBTN.classList.remove("fa-xmark");
                        closeBTN.classList.add("fa-minus");

                    }
                })

                if (dontEXISTinCART) {
                    let container = document.createElement('div');
                    container.classList.add("cart-item");
                    container.innerHTML = produkt.innerHTML;
                    let titleprodukt = container.querySelectorAll(".produkt-title")
                    titleprodukt[0].classList.remove("produkt-title");
                    titleprodukt[0].classList.add("cart-produkt-title");

                    container.innerHTML += "<div class=\"cart-remove\"> <div class=\"cart-item-counter\">1</div> <i class=\"fa-solid fa-xmark\"></i> </div>";
                    displayLIST.appendChild(container);
                } else {
                    
                }
            } else {
                displeyCOUTER.classList.remove("counter");
            }

            var removeBTNS = document.querySelectorAll(".fa-xmark");

            removeBTNS.forEach(removeBTN => {
                removeBTN.addEventListener('click', function() {
                    let parent = removeBTN.parentElement.parentElement;
                    
                    let itemCARTcouter = parent.querySelector(".cart-item-counter").innerHTML;
                    itemCARTcouter--
                    parent.querySelector(".cart-item-counter").innerHTML = itemCARTcouter;
                    if (itemCARTcouter < 1) {
                        displayLIST.removeChild(parent);
                    }
                    // displayLIST.removeChild(parent);
                    couterCART--;
                    if (couterCART < 1) {
                        displeyCOUTER.classList.remove("counter");
                        displeyCOUTER.innerHTML = '';

                    }else{
                        displeyCOUTER.innerHTML = couterCART;
                    }
            });
            });

        }else{
        // produkt.addEventListener("click", function() {
            if (document.querySelectorAll(".produkt-selected").length != 0) {
                currentOPEN[0].classList.remove("produkt-selected");
                currentOPEN[0].classList.add("produkt");
            }
            let getPRODUKT = document.getElementById(produktID);
            getPRODUKT.classList.remove("produkt");
            getPRODUKT.classList.add("produkt-selected");
            currentOPEN = document.querySelectorAll(".produkt-selected");
        }
        });
    });
    
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            currentOPEN[0].classList.remove("produkt-selected");
            currentOPEN[0].classList.add("produkt");
        }
    });

    var btnsCLOSE = document.querySelectorAll(".close-button");

    btnsCLOSE.forEach(function(btnCLOSE) {
        btnCLOSE.addEventListener('click', function() {
            currentOPEN = document.querySelectorAll(".produkt-selected");
            currentOPEN[0].classList.remove("produkt-selected");
            currentOPEN[0].classList.add("produkt");
        })

    })

    const search = document.getElementById("search");

    search.addEventListener("input", function () {
        let titles = document.querySelectorAll(".produkt-title");
        let produkts = document.querySelectorAll(".produkt");
        let strSEARCH = search.value.toLowerCase();
        let produktCOUNTER = produkts.length;

        for (let index = 0; index < produkts.length; index++) {
            let produkt = produkts[index];
            let title = titles[index];
            
            if (!title.innerHTML.toLocaleLowerCase().includes(strSEARCH)) {
                produkt.style.display = "none";
                produktCOUNTER--;
            } else{
                produkt.style.display = "";
                produktCOUNTER++;
            }
            let brak = document.getElementById("empty");
            if (produktCOUNTER > 0) {
                brak.classList.remove("show-brak");
                brak.classList.add("hidden-brak");
            } else {
                brak.classList.add("show-brak");
                brak.classList.remove("hidden-brak");
            }
        }



    });
    var cart = document.getElementById("cart-holder");
    cart.addEventListener('click', function(){
        let cartLIST = document.getElementById("cart-list");
        if (cartLIST.classList.contains("list-show")) {
            // cartLIST.classList.remove("list-show");
        } else {
            cartLIST.classList.add("list-show");
        }
    });

    window.addEventListener("click", function(e) {
        var element = e.target;
        var clicked = false
        for (let index = 0; index < 7; index++) {
            if(element){
            if (element.id == "cart-holder") {
                clicked = true
                break
            }
            element = element.parentElement;
            console.log(element);
            
            if (element != null) {
                if (element.tagName.toLowerCase() == "body") {
                    let cartLIST = document.getElementById("cart-list");
                    cartLIST.classList.remove("list-show");
                    break
                }
            }

            }
        }
        
      });

    let clearCARTbtn = document.getElementById("clear-cart");
    
    clearCARTbtn.addEventListener("click", function () {
        console.log('xdd');
        let cartLIST = document.getElementById("cart-list");
        cartLIST.innerHTML = "<div id=\"clear-cart\">Wyczyść koszyk</div>";
        let displeyCOUTER = document.getElementById("cart-counter");
        displeyCOUTER.classList.remove("counter");
        displeyCOUTER.innerHTML = '';
        couterCART = 0;
        niewiem();
    });

});

function niewiem() {
    let clearCARTbtn = document.getElementById("clear-cart");
    
    clearCARTbtn.addEventListener("click", function () {
        console.log('xdd');
        let cartLIST = document.getElementById("cart-list");
        cartLIST.innerHTML = "<div id=\"clear-cart\">Wyczyść koszyk</div>";
        let displeyCOUTER = document.getElementById("cart-counter");
        displeyCOUTER.classList.remove("counter");
        displeyCOUTER.innerHTML = '';
        couterCART = 0;
        niewiem();
    });
}