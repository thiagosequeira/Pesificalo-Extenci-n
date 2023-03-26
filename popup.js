document.addEventListener('DOMContentLoaded', () => {
    // Declarar variables
    const inputPrecio = document.getElementById('precio');
    const spanResultado = document.getElementById('resultado');
    const spanImpuestos = document.getElementById('impuestos');
    let exchangeRate;
  
    // Consulta a API
    const fetchExchangeRate = () => {
      fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
        .then(response => response.json())
        .then(data => {
          const dolarOficial = data.find(casa => casa.casa.nombre === 'Dolar Oficial'); // Toma dolar oficial
          const venta = dolarOficial.casa.venta.replace(',', '.');
          exchangeRate = parseFloat(venta);
          console.log(`Exchange rate: ${exchangeRate}`);
        })
        .catch(error => console.log('Error:', error));
    };
  
    fetchExchangeRate();
  
    // Calculos cambio
    const btnConvertir = document.getElementById('convertir');
    btnConvertir.addEventListener('click', () => {
      const dollarPrice = parseFloat(inputPrecio.value);
      const pesoPrice = (dollarPrice * exchangeRate) * 1.65; // Aplica el 65% de impuesto pais
      spanResultado.textContent = `ARS$${pesoPrice.toFixed(2)}`;
      //spanImpuestos.textContent = `ARS$${(pesoPrice * 0.65).toFixed(2)}`;
    });
  });
  