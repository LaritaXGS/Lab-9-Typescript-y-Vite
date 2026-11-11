type Estudiante = {
  codigo: number;
  nombre: string;
  calificaciones: number[];
};

//Convierte el texto JSON en un objeto
function convertirJSON(texto: string): unknown {
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}

//Comprueba si los datos corresponden a un estudiante
function esEstudiante(dato: unknown): dato is Estudiante {
  if (typeof dato !== "object" || dato === null) {
    return false;
  }

  const estudiante = dato as Record<string, unknown>;

  return (
    typeof estudiante.codigo === "number" &&
    typeof estudiante.nombre === "string" &&
    Array.isArray(estudiante.calificaciones) &&
    estudiante.calificaciones.every(
      (nota) => typeof nota === "number"
    )
  );
}

//Calcula el promedio de las calificaciones
function calcularPromedio(notas: number[]): number {
  if (notas.length === 0) {
    return 0;
  }

  let suma = 0;

  for (const nota of notas) {
    suma += nota;
  }

  return suma / notas.length;
}

//Valida los datos y los muestra en pantalla
function mostrarResultado(json: string): void {
  const zona = document.getElementById("resultado");

  if (!zona) return;

  zona.innerHTML = "";

  const datos = convertirJSON(json);

  if (esEstudiante(datos)) {
    const encabezado = document.createElement("h2");
    encabezado.textContent = datos.nombre;

    const resultado = document.createElement("p");
    const promedio = calcularPromedio(datos.calificaciones);

    resultado.textContent =
      `Promedio de calificaciones: ${promedio.toFixed(2)}`;

    zona.append(encabezado, resultado);
  } else {
    const aviso = document.createElement("p");

    aviso.className = "mensaje-error";
    aviso.textContent =
      "Los datos ingresados no corresponden a un estudiante válido.";

    zona.appendChild(aviso);
  }
}

//Prueba con información correcta
function ejecutarPruebaCorrecta(): void {
  const estudianteJSON =
    '{"codigo":10,"nombre":"Hermione","calificaciones":[95,100,98]}';

  mostrarResultado(estudianteJSON);
}

//Prueba con información incorrecta
function ejecutarPruebaIncorrecta(): void {
  const estudianteJSON =
    '{"codigo":20,"nombre":"Ron","calificaciones":"abc"}';

  mostrarResultado(estudianteJSON);
}

//Espera a que se cargue el documento HTML
document.addEventListener("DOMContentLoaded", () => {
  const botonCorrecto = document.getElementById("probar-correcto");
  const botonIncorrecto = document.getElementById("probar-incorrecto");

  botonCorrecto?.addEventListener("click", ejecutarPruebaCorrecta);
  botonIncorrecto?.addEventListener("click", ejecutarPruebaIncorrecta);
});