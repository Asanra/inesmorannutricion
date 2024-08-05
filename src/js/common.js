// Comportamiento Burguer Menu
let burger = '';
function toggleMenu(obj) {
    burger = obj;
    document.querySelector("body").classList.toggle("open"); // Evitar scroll en burger menu open
}
var anclas = document.querySelectorAll('[data-ref]');
for (i = 0; i < anclas.length; i++) {
    anclas[i].addEventListener("click", function() {
        burger.click();
        let ref = this.dataset.ref;
        if (ref.substr(0,1) == '#') {
            window.location.href=ref;
        } else {
            eval(ref);
        }
    });
}

// Comportamiento cambio idioma
function openTab(tab) {
    localStorage.setItem('lan', tab); // Recordar el idioma seleccionado para prox. visitas
    let tabcontent = document.querySelector(".main-section");
    let lanContent = tabcontent.getAttribute('data-lan');
    if (lanContent != tab) {
        // Si no coincide el idioma seleccionado con la pagina => redirige
        window.location.href = 'en/index.html';
    }
}

// Comportamiento btn 'Conóceme más'
function displayMore(lan) {
    let txtMore = '';
    let txtLess = '';
    if (lan == 'ES') {
        txtMore = 'Conóceme más';
        txtLess = 'Menos';
    } else {
        txtMore = 'More';
        txtLess = 'Less';
    }
    let btns = document.querySelectorAll('[data-btn]');
    let moreText = document.getElementsByClassName('long');
    for (i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute('data-btn') == 'more' && btns[i].getAttribute('data-lan') == lan) {
            moreText[i].style.display = 'block';
            btns[i].innerHTML = txtLess;
            btns[i].setAttribute('data-btn', 'less');
        } else if (btns[i].getAttribute('data-btn') == 'less' && btns[i].getAttribute('data-lan') == lan) {
            moreText[i].style.display = 'none';
            btns[i].innerHTML = txtMore;
            btns[i].setAttribute('data-btn', 'more');
            window.scrollTo(0,0);
        }
    }
}

// Cargar idioma del navegador
let lanDefault = 'es';
let lanStorage = (localStorage.lan) ? localStorage.lan : '';
let lan = '';
if (lanStorage == '') {
    // Si no tiene idioma en localStorage detecta el del navegador
    let lanNavigator = navigator.language;
    lanNavigator = lanNavigator.substring(0,2);
    lan = (lanNavigator == 'en') ? lanNavigator : lanDefault; // Si idioma navegador no es English siempre se carga en Español
    lan = lan.toUpperCase();
} else {
    // Si tiene idioma almacenado en localStorage lo carga
    lan = lanStorage;
}
openTab(lan);

// Actualizar year copyright
let year = new Date();
document.getElementById('year').innerHTML = year.getFullYear();