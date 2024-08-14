const identificarFormatos = (cadena) => {
  cadena = cadena.trim().toUpperCase();
  const esPar = cadena.length % 2 === 0;

  const formatos = [];
  if (/^[01]+$/.test(cadena)) formatos.push("bin");
  if (/^[0-9A-F]+$/.test(cadena) && esPar) formatos.push("hex");
  if (/^[0-9]+$/.test(cadena)) formatos.push("dec");

  return formatos;
};

const convertir = (cadena, formato) => {
  let decimal;

  if (formato === "hex") {
    cadena = cadena.padStart(8, "0");
    decimal = parseInt(cadena, 16);
  } else if (formato === "bin") {
    cadena = cadena.padStart(32, "0");
    decimal = parseInt(cadena, 2);
  } else if (formato === "dec") {
    decimal = parseInt(cadena, 10);
  } else {
    return null;
  }

  return {
    decimal,
    hexadecimal: `${decimal.toString(16).padStart(8, "0")}`,
    binario: `${decimal.toString(2).padStart(32, "0")}`,
  };
};

const main = () => {
  const cadena = prompt("Introduce una cadena valida");
  const formatos = identificarFormatos(cadena);

  if (formatos.length > 0) {
    formatos.forEach((formato) => {
      const conversiones = convertir(cadena, formato);
      if (conversiones) {
        console.log(`\nFormato -> ${formato}`);
        console.log(`Decimal: ${conversiones.decimal}`);
        console.log(`Hexadecimal: ${conversiones.hexadecimal}`);
        console.log(`Binario: ${conversiones.binario}`);
      }
    });
  } else {
    console.log("Cadena no valida");
  }
};

main();
