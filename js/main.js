const selectorUno = document.getElementById("selector_uno");
const cantidadUno = document.getElementById("cantidad_uno");
const selectorDos = document.getElementById("selector_dos");
const cantidadDos = document.getElementById("cantidad_dos");
const elementoRate = document.getElementById("rate");
const botonInvertir = document.getElementById("botoninvertir");

function calcular() {
  //Los valores en los selectores son las cantidades
  const cantidad_uno = selectorUno.value;
  const cantidad_dos = selectorDos.value;
  //Uso "fetch" para capturar los valores de las monedas en la API
  fetch(`https://api.exchangerate-api.com/v4/latest/${cantidad_uno}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[cantidad_dos];
      // Una vez capturado en "rate" el valor de la moneda del segundo selector
      // hago el calculo para poner el visor la cantidad correspondiente
      // a 1 unidad de moneda y lo imprimo usando innerText en el div de
      // clase "rate" del HTML.
      elementoRate.innerText = `1 ${cantidad_uno} = ${rate} ${cantidad_dos}`;
      //La cantidad del segundo selector es la del primero multiplicado
      //por el valor de la moneda y con 3 decimales.
      cantidadDos.value = (cantidadUno.value * rate).toFixed(3);
    });
}

// Event listeners
// Capturo los cambios en los selectores de moneda y los
// cambios en los inputs para poder ir mostrando
// el cálculo sobre la marcha

selectorUno.addEventListener("change", calcular);
cantidadUno.addEventListener("input", calcular);
selectorDos.addEventListener("change", calcular);
cantidadDos.addEventListener("input", calcular);

// Acción del botón de invertir valores que al hacer "click"
// intercambia los valores de los selectores y nos remite de
// nuevo a la función del cálculo.
botonInvertir.addEventListener("click", () => {
  const temp = selectorUno.value;
  selectorUno.value = selectorDos.value;
  selectorDos.value = temp;
  calcular();
});
// Llamada a la función de calcular.
calcular();
