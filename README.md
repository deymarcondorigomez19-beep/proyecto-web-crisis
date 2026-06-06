# 🔴 SimuladorCrisis — Abastecimiento y Consumo Familiar

> Herramienta educativa interactiva que modela matemáticamente el impacto de los bloqueos, la escasez de carburantes y la inflación en Bolivia · Gestión 2026.

---

## 📌 Descripción

**SimuladorCrisis** es una aplicación web estática desarrollada como proyecto final de **Programación Web I**. Permite a cualquier persona visualizar de forma concreta y en tiempo real cómo tres problemas económicos afectan el día a día de las familias bolivianas:

- El agotamiento del combustible en estaciones de servicio.
- El impacto mensual de la subida de precios en la canasta básica.
- El déficit o superávit del presupuesto familiar al hacer la compra del mes.

Cada simulador está respaldado por un modelo matemático explícito con fórmulas, variables y ejemplos resueltos, todo documentado dentro de la propia aplicación en la sección **Matemática Aplicada**.

---

## 🚀 Demo

> Abre `index.html` directamente en tu navegador — no requiere servidor ni instalación.

---

## 🗂 Estructura del proyecto

```
simulador-crisis/
│
├── index.html              
├── css/
│   └── style.css           
│
├── js/
│   └── script.js           
│
└── img/
    ├── gas.jpg             # Imagen caso 01 — carburantes
    ├── mercado.jpg         # Imagen caso 02 — precios
    └── canasta.jpg         # Imagen caso 03 — presupuesto
```

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura de la aplicación |
| CSS3 con variables | Sistema de diseño, layout y animaciones base |
| JavaScript ES6+ | Lógica de cálculo, validación y DOM |
| [Anime.js 3.2.1](https://animejs.com/) | Animaciones de entrada y micro-interacciones |
| Google Fonts | Tipografías: Syne · Fraunces · JetBrains Mono |

No usa frameworks, no requiere npm, no requiere build.

---

## 🧮 Simuladores y modelos matemáticos

### ⛽ Simulador A — Abastecimiento de Carburantes

Calcula cuántos días durará la reserva de combustible antes de alcanzar el nivel de alerta.

**Variables:** `R₀` reserva inicial · `C` consumo diario · `A` reabastecimiento · `N` nivel crítico

```
Cₙ = C − A                          (consumo neto diario)
L  = R₀ − N                         (litros disponibles hasta nivel crítico)
D_crítico = ⌊ L / Cₙ ⌋             (días hasta nivel crítico)
D_total   = ⌊ R₀ / Cₙ ⌋            (días hasta agotamiento total)
```

**Caso de prueba:** R₀=10000 L · C=1200 L/día · A=300 L/día · N=2000 L → nivel crítico en **8 días**, agotamiento en **11 días**.

---

### 🛒 Simulador B — Incremento de Precios

Calcula el impacto económico mensual real de la variación de precios en un producto de la canasta básica.

**Variables:** `P₀` precio anterior · `P₁` precio actual · `Q` cantidad mensual consumida

```
G₀  = P₀ × Q                        (gasto mensual anterior)
G₁  = P₁ × Q                        (gasto mensual actual)
ΔG  = G₁ − G₀                       (diferencia: positivo = gasto extra, negativo = ahorro)
%Δ  = ((P₁ − P₀) / P₀) × 100       (variación porcentual del precio)
```

**Caso de prueba:** Arroz · P₀=8 Bs · P₁=11 Bs · Q=10 unidades/mes → **+30 Bs extra/mes** (+37.5%)

---

### 💰 Simulador D — Presupuesto Familiar

Verifica si el dinero disponible alcanza para la compra planificada del mes.

**Variables:** `B` presupuesto disponible · `G` gasto total estimado

```
S     = B − G                        (saldo: positivo = superávit, negativo = déficit)
%Uso  = (G / B) × 100               (porcentaje del presupuesto utilizado)
```

**Caso de prueba:** B=500 Bs · G=580 Bs → déficit de **−80 Bs** (116% del presupuesto)

---

## ✅ Validación de formularios

Todos los formularios aplican validación antes de calcular:

- Campos vacíos bloqueados con mensaje de error animado.
- Valores negativos rechazados.
- Campos con `mayorQueCero` rechazan el valor `0`.
- Validaciones cruzadas (ej: nivel crítico no puede superar la reserva inicial).
- Los errores se limpian automáticamente al empezar a escribir.
- El botón "Limpiar" resetea el formulario y todos los estados de error.

---

## 🎨 Sistema de diseño

Paleta **"crisis urbana"**: negro profundo + tierra quemada + señal de alerta naranja.

| Variable CSS | Color | Uso |
|---|---|---|
| `--negro` | `#0F0D0B` | Fondo base |
| `--naranja-vivo` | `#FF5E0E` | Acento principal, CTAs |
| `--ambar` | `#F59E0B` | Estado de alerta |
| `--verde-ok` | `#15803D` | Estado normal / positivo |
| `--rojo-alerta` | `#B91C1C` | Estado crítico / error |
| `--crema` | `#F5F0E8` | Texto principal |

Tipografías: **Syne** (títulos) · **Fraunces** (cuerpo) · **JetBrains Mono** (código y etiquetas)

---

## 📋 Secciones de la aplicación

| Sección | Descripción |
|---|---|
| `#inicio` | Hero con animación de entrada en cascada |
| `#contexto` | Contexto del problema y estadísticas |
| `#simuladores` | Los 3 formularios interactivos con resultado en tiempo real |
| `#casos` | Casos de estudio listos para probar |
| `#matematica` | Modelos matemáticos, fórmulas, ejemplos resueltos y código fuente |
| `#conclusiones` | Reflexión final sobre matemática aplicada |

---

## 🖥️ Cómo usar

1. Clona o descarga el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/simulador-crisis.git
   ```
2. Coloca las imágenes `gas.jpg`, `mercado.jpg` y `canasta.jpg` en la carpeta `img/`.
3. Abre `index.html` en cualquier navegador moderno.

No requiere instalación de dependencias. Las librerías externas se cargan vía CDN.

---

## 📄 Licencia

Proyecto académico — Desafío Final · Programación Web I · Gestión 2026.

---

*Desarrollado por: [Tu Nombre]*
