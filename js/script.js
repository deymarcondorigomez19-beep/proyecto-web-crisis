// ============================================
// ANIMACIONES DE ENTRADA (Anime.js)
// ============================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. Hero: elementos aparecen en cascada
    anime({
        targets: '.hero-content .hero-etiqueta',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 900,
        easing: 'easeOutExpo',
        delay: 100
    });

    anime({
        targets: '.hero-content h1',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 300
    });

    anime({
        targets: '.hero-content p',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 900,
        easing: 'easeOutExpo',
        delay: 500
    });

    anime({
        targets: '.hero-content a',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 700
    });

    // 2. Tarjetas: aparecen al hacer scroll con IntersectionObserver
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                anime({
                    targets: entrada.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.animar-tarjeta').forEach((el, i) => {
        setTimeout(() => observador.observe(el), i * 60);
    });
});


// ============================================
// UTILIDADES GENERALES
// ============================================

/**
 * Oculta el placeholder y muestra la caja de resultado animada.
 */
function mostrarResultado(idResultado, htmlContenido, claseEstado, esCritico = false) {
    const idBase = idResultado.replace('resultado-', '');
    const placeholder = document.getElementById(`resultado-${idBase}-placeholder`);
    const caja = document.getElementById(idResultado);

    if (placeholder) placeholder.style.display = 'none';

    caja.innerHTML = htmlContenido;
    caja.className = `caja-resultado ${claseEstado}`;
    caja.classList.remove('oculto');

    anime({
        targets: `#${idResultado}`,
        scale: [0.92, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutBack'
    });

    if (esCritico) {
        anime({
            targets: `#${idResultado}`,
            translateX: [
                { value: -8, duration: 80 },
                { value: 8, duration: 80 },
                { value: -6, duration: 70 },
                { value: 6, duration: 70 },
                { value: 0, duration: 70 }
            ],
            easing: 'easeInOutSine',
            delay: 250
        });
    }
}

/**
 * Limpia un formulario y devuelve el área de resultado a su estado inicial.
 * También limpia todos los errores de validación del formulario.
 */
function limpiarFormulario(idForm, idResultado) {
    const form = document.getElementById(idForm);
    form.reset();

    // Limpiar todos los errores de validación
    form.querySelectorAll('.campo-error').forEach(el => el.classList.remove('campo-error'));
    form.querySelectorAll('.mensaje-error').forEach(el => el.remove());

    const idBase = idResultado.replace('resultado-', '');
    const placeholder = document.getElementById(`resultado-${idBase}-placeholder`);
    const caja = document.getElementById(idResultado);

    caja.classList.add('oculto');
    caja.className = 'caja-resultado oculto';
    caja.innerHTML = '';

    if (placeholder) placeholder.style.display = 'flex';
}

/**
 * Formatea un número con dos decimales si tiene parte decimal, o entero si no.
 */
function formatearNum(n) {
    return n % 1 === 0 ? n.toString() : n.toFixed(2);
}


// ============================================
// SISTEMA DE VALIDACIÓN
// ============================================

/**
 * Muestra un mensaje de error debajo de un campo.
 * @param {HTMLElement} input - El input con error.
 * @param {string} mensaje - Texto del error a mostrar.
 */
function mostrarError(input, mensaje) {
    // Evitar duplicar mensajes
    limpiarError(input);

    input.classList.add('campo-error');

    const contenedor = input.closest('.grupo-input');
    const span = document.createElement('span');
    span.className = 'mensaje-error';
    span.textContent = mensaje;
    contenedor.appendChild(span);

    // Animación de sacudida sobre el input
    anime({
        targets: input,
        translateX: [
            { value: -6, duration: 60 },
            { value: 6, duration: 60 },
            { value: -4, duration: 55 },
            { value: 4, duration: 55 },
            { value: 0, duration: 55 }
        ],
        easing: 'easeInOutSine'
    });
}

/**
 * Limpia el error de un campo individual.
 * @param {HTMLElement} input
 */
function limpiarError(input) {
    input.classList.remove('campo-error');
    const contenedor = input.closest('.grupo-input');
    const errorPrevio = contenedor.querySelector('.mensaje-error');
    if (errorPrevio) errorPrevio.remove();
}

/**
 * Valida que un campo numérico tenga valor, sea un número válido
 * y cumpla con las restricciones opcionales de mínimo/máximo.
 *
 * @param {string} idCampo     - ID del input a validar.
 * @param {string} etiqueta    - Nombre amigable del campo para el mensaje.
 * @param {object} opciones    - { min, max, mayorQueCero }
 * @returns {number|null}      - El valor numérico si es válido, null si no.
 */
function validarCampoNumerico(idCampo, etiqueta, opciones = {}) {
    const input = document.getElementById(idCampo);
    const valor = input.value.trim();

    // Vacío
    if (valor === '') {
        mostrarError(input, `⚠ El campo "${etiqueta}" es obligatorio.`);
        return null;
    }

    const num = parseFloat(valor);

    // No es un número
    if (isNaN(num)) {
        mostrarError(input, `⚠ "${etiqueta}" debe ser un número válido.`);
        return null;
    }

    // Negativo
    if (num < 0) {
        mostrarError(input, `⚠ "${etiqueta}" no puede ser negativo.`);
        return null;
    }

    // Debe ser mayor a cero
    if (opciones.mayorQueCero && num === 0) {
        mostrarError(input, `⚠ "${etiqueta}" debe ser mayor a cero.`);
        return null;
    }

    // Mínimo personalizado
    if (opciones.min !== undefined && num < opciones.min) {
        mostrarError(input, `⚠ "${etiqueta}" debe ser al menos ${opciones.min}.`);
        return null;
    }

    // Máximo personalizado
    if (opciones.max !== undefined && num > opciones.max) {
        mostrarError(input, `⚠ "${etiqueta}" no puede superar ${opciones.max}.`);
        return null;
    }

    // Todo OK: limpiar error si existía
    limpiarError(input);
    return num;
}

/**
 * Valida un campo de texto.
 * @returns {string|null}
 */
function validarCampoTexto(idCampo, etiqueta) {
    const input = document.getElementById(idCampo);
    const valor = input.value.trim();

    if (valor === '') {
        mostrarError(input, `⚠ El campo "${etiqueta}" es obligatorio.`);
        return null;
    }

    if (valor.length < 2) {
        mostrarError(input, `⚠ "${etiqueta}" debe tener al menos 2 caracteres.`);
        return null;
    }

    limpiarError(input);
    return valor;
}

// Limpiar error individual al empezar a escribir
document.addEventListener('input', (e) => {
    if (e.target.matches('input') && e.target.closest('form')) {
        limpiarError(e.target);
    }
});


// ============================================
// SIMULADOR A — CARBURANTES
// ============================================
document.getElementById('form-carburante').addEventListener('submit', function (e) {
    e.preventDefault();

    // --- Validación completa antes de calcular ---
    const reserva          = validarCampoNumerico('reserva-inicial',  'Reserva inicial',           { mayorQueCero: true });
    const consumo          = validarCampoNumerico('consumo-diario',   'Consumo diario',             { mayorQueCero: true });
    const reabastecimiento = validarCampoNumerico('reabastecimiento', 'Reabastecimiento diario',    {});
    const nivelCritico     = validarCampoNumerico('nivel-critico',    'Nivel crítico de alerta',    {});

    // Si algún campo falló, detener
    if (reserva === null || consumo === null || reabastecimiento === null || nivelCritico === null) return;

    // Validación cruzada: nivel crítico no puede superar la reserva inicial
    if (nivelCritico >= reserva) {
        mostrarError(
            document.getElementById('nivel-critico'),
            `⚠ El nivel crítico (${nivelCritico} L) debe ser menor a la reserva inicial (${reserva} L).`
        );
        return;
    }

    // --- Cálculo ---
    const consumoNeto = consumo - reabastecimiento;

    if (consumoNeto <= 0) {
        mostrarResultado(
            'resultado-carburante',
            `<div class="resultado-icono">✅</div>
             <div class="resultado-principal">Sistema estable</div>
             <div class="resultado-detalle">El reabastecimiento iguala o supera al consumo.<br>La reserva no se agotará bajo estas condiciones.</div>`,
            'estado-normal'
        );
        return;
    }

    const litrosHastaCritico = reserva - nivelCritico;
    const diasCritico = Math.floor(litrosHastaCritico / consumoNeto);
    const diasTotal   = Math.floor(reserva / consumoNeto);

    if (diasCritico <= 0) {
        mostrarResultado(
            'resultado-carburante',
            `<div class="resultado-icono">🚨</div>
             <div class="resultado-principal">¡Nivel crítico alcanzado!</div>
             <div class="resultado-numero">${diasTotal}d</div>
             <div class="resultado-detalle">La reserva actual ya está por debajo del nivel crítico.<br>Se agotará totalmente en <strong>${diasTotal} días</strong>.</div>`,
            'estado-critico',
            true
        );
        return;
    }

    const claseEstado = diasCritico <= 3 ? 'estado-critico' : 'estado-alerta';
    mostrarResultado(
        'resultado-carburante',
        `<div class="resultado-icono">⚠️</div>
         <div class="resultado-principal">Nivel crítico en:</div>
         <div class="resultado-numero">${diasCritico}d</div>
         <div class="resultado-detalle">
             Días hasta nivel crítico: <strong>${diasCritico}</strong><br>
             Agotamiento total: <strong>${diasTotal} días</strong><br>
             Consumo neto: ${formatearNum(consumoNeto)} L/día
         </div>`,
        claseEstado,
        diasCritico <= 3
    );
});


// ============================================
// SIMULADOR B — PRECIOS DE ALIMENTOS
// ============================================
document.getElementById('form-precios').addEventListener('submit', function (e) {
    e.preventDefault();

    // --- Validación ---
    const producto    = validarCampoTexto('producto-nombre', 'Nombre del producto');
    const precioAntes = validarCampoNumerico('precio-anterior', 'Precio anterior', { mayorQueCero: true });
    const precioAhora = validarCampoNumerico('precio-actual',   'Precio actual',   { mayorQueCero: true });
    const cantidad    = validarCampoNumerico('cantidad-mes',    'Cantidad mensual', { mayorQueCero: true, min: 1 });

    if (producto === null || precioAntes === null || precioAhora === null || cantidad === null) return;

    // Validación cruzada: aviso si el precio actual es idéntico al anterior
    // (no bloquea, solo informa — se maneja en la lógica de resultado)

    // --- Cálculo ---
    const gastoAntes  = precioAntes * cantidad;
    const gastoAhora  = precioAhora * cantidad;
    const diferencia  = gastoAhora - gastoAntes;
    const porcentaje  = (((precioAhora - precioAntes) / precioAntes) * 100).toFixed(1);

    if (diferencia > 0) {
        mostrarResultado(
            'resultado-precios',
            `<div class="resultado-icono">📈</div>
             <div class="resultado-principal">"${producto}" subió un ${porcentaje}%</div>
             <div class="resultado-numero">+${formatearNum(diferencia)} Bs</div>
             <div class="resultado-detalle">
                 Gasto anterior: ${formatearNum(gastoAntes)} Bs/mes<br>
                 Gasto actual: ${formatearNum(gastoAhora)} Bs/mes<br>
                 Gasto adicional mensual: <strong>${formatearNum(diferencia)} Bs</strong>
             </div>`,
            'estado-critico'
        );
    } else if (diferencia < 0) {
        mostrarResultado(
            'resultado-precios',
            `<div class="resultado-icono">📉</div>
             <div class="resultado-principal">"${producto}" bajó de precio</div>
             <div class="resultado-numero">${formatearNum(Math.abs(diferencia))} Bs</div>
             <div class="resultado-detalle">
                 Ahorro mensual: <strong>${formatearNum(Math.abs(diferencia))} Bs</strong><br>
                 Gasto anterior: ${formatearNum(gastoAntes)} Bs | Actual: ${formatearNum(gastoAhora)} Bs
             </div>`,
            'estado-normal'
        );
    } else {
        mostrarResultado(
            'resultado-precios',
            `<div class="resultado-icono">➡️</div>
             <div class="resultado-principal">El precio se mantiene igual</div>
             <div class="resultado-detalle">Gasto mensual sin cambios: <strong>${formatearNum(gastoAhora)} Bs</strong></div>`,
            'estado-normal'
        );
    }
});


// ============================================
// SIMULADOR D — PRESUPUESTO FAMILIAR
// ============================================
document.getElementById('form-presupuesto').addEventListener('submit', function (e) {
    e.preventDefault();

    // --- Validación ---
    const presupuesto = validarCampoNumerico('presupuesto-total', 'Presupuesto disponible', { mayorQueCero: true });
    const costoCompra = validarCampoNumerico('costo-compra',      'Costo total de la compra', { mayorQueCero: true });

    if (presupuesto === null || costoCompra === null) return;

    // --- Cálculo ---
    const saldo         = presupuesto - costoCompra;
    const porcentajeUso = ((costoCompra / presupuesto) * 100).toFixed(1);

    if (saldo >= 0) {
        mostrarResultado(
            'resultado-presupuesto',
            `<div class="resultado-icono">✅</div>
             <div class="resultado-principal">¡El presupuesto alcanza!</div>
             <div class="resultado-numero">${formatearNum(saldo)} Bs</div>
             <div class="resultado-detalle">
                 Presupuesto: ${formatearNum(presupuesto)} Bs<br>
                 Gasto total: ${formatearNum(costoCompra)} Bs (${porcentajeUso}%)<br>
                 Te sobran: <strong>${formatearNum(saldo)} Bs</strong>
             </div>`,
            'estado-normal'
        );
    } else {
        mostrarResultado(
            'resultado-presupuesto',
            `<div class="resultado-icono">❌</div>
             <div class="resultado-principal">¡El presupuesto NO alcanza!</div>
             <div class="resultado-numero">−${formatearNum(Math.abs(saldo))} Bs</div>
             <div class="resultado-detalle">
                 Presupuesto: ${formatearNum(presupuesto)} Bs<br>
                 Gasto estimado: ${formatearNum(costoCompra)} Bs<br>
                 Te faltan: <strong>${formatearNum(Math.abs(saldo))} Bs</strong> para cubrir la compra
             </div>`,
            'estado-critico',
            true
        );
    }
});