# Encuentra tu Pack — spec para el vibe (GHL) · Quirón

**Objetivo:** página de cuestionario que recomienda uno de los 3 packs Quirón según el momento del usuario. Debe quedar **nativa en el sitio Next** (misma estética que el resto) y enlazar al catálogo/checkout.

- **Ruta sugerida:** `/encuentra-tu-pack` (alias de "Elige tu pack").
- **Enlaces de entrada:** botón en el Home ("Encuentra tu pack") y en el nav / catálogo.
- **Estética:** usar el sistema ya existente — fondo verde `--tierra #19493d`, acento lima `--aire #efff3d`, tipografías DM Sans (títulos), Spectral itálica (frases), JetBrains Mono (eyebrows en mayúsculas, letter-spacing .22em). Botón pill lima. Firma/subtítulos en itálica lavanda `--eter #b5a2e6`. (Mismo look del Home.)
- **Tono (norma Quirón):** bienestar/ritual, **sin claims médicos ni de cura**. Mantener disclaimer "Materia honesta y natural. No sustituye atención médica calificada." al pie del resultado.

---

## Flujo
1. **Intro** breve: "Responde 4 preguntas y te acompañamos hacia el proceso que tu momento necesita."
2. **4 preguntas** (una a la vez o en lista), cada opción suma a un pack (`limpieza` / `restauracion` / `equilibrio`).
3. **Resultado:** el pack con más selecciones. La **pregunta 4 (frecuencia)** define además la **modalidad**: compra única · ciclo de varios meses · suscripción mensual.
4. **Tarjeta de resultado:** nombre del pack + tag + descripción + sus kits (con lo que incluye) + nota de suscripción + CTA **"Ver en catálogo / Añadir"**. Mostrar también un enlace suave a los otros dos packs.

**Lógica de puntaje:** contar las 4 respuestas por `s` (pack). Gana el de mayor conteo. Empate → prioriza el de la **pregunta 4** (frecuencia), que es la de intención de compra.

---

## Preguntas (texto exacto)

**1. ¿Cómo llega tu cuerpo a este mes?**
- Cargado, pesado, con exceso → `limpieza`
- Cansado, vacío, sin reservas → `restauracion`
- En su punto — quiero mantenerlo → `equilibrio`

**2. ¿Qué gesto pide tu proceso ahora?**
- Depurar y hacer espacio → `limpieza`
- Reponer lo que falta → `restauracion`
- Sostener el balance → `equilibrio`

**3. ¿Dónde estás en tu camino con Quirón?**
- Apenas empiezo → `limpieza`
- Ya abrí terreno antes → `restauracion`
- Llevo tiempo en el rito → `equilibrio`

**4. ¿Cada cuándo quieres tu rito?**
- Un impulso puntual este mes · *compra única* → `limpieza`
- Un ciclo de reconstrucción · *varios meses* → `restauracion`
- Cada mes, sin falta · *suscripción* → `equilibrio`

---

## Packs (resultado · texto exacto)

### LIMPIEZA — "abrir terreno"  · acento: `--tierra-400`
Fuerzas: **Tierra · Fuego**
> El primer gesto del tránsito: se retira lo que carga y oxida, se limpia el cuerpo y el agua, se hace espacio para lo que vendrá. Mandan la tierra que filtra y el fuego que purifica.

Kits:
- **Kit Esencial** (compra única): Carbón activado · Zeolita
- **Kit Completo** (compra única): Carbón activado · Zeolita · Tierra de diatomeas · Potabilizador de agua

Suscripción: *Como suscripción, Limpieza abre terreno al inicio de cada ciclo: un mes de depuración que se repite cuando el cuerpo vuelve a cargarse.*

### RESTAURACIÓN — "reponer lo que falta"  · acento: `--eter`
Fuerzas: **Aire · Agua · Éter**
> Cuando ya hay espacio, se repone: la savia viva, el agua primordial, los metales nobles —lo reductor que nutre y engendra—. Respiran el aire, el agua y el éter.

Kits:
- **Kit Esencial** (compra única): Espirulina · Agua de mar
- **Kit Completo** (compra única): Espirulina · Agua de mar · Plata coloidal · Herbolaria en cápsula · Aceite MCT
- **Kit Vital** (premium): + Oro coloidal · Ormus

Suscripción: *Como suscripción, Restauración sostiene un ciclo de reconstrucción de varios meses: se repone lo que faltaba hasta devolver la balanza a su fiel.*

### EQUILIBRIO — "sostener el fiel"  · acento: `--aire` (lima)
Fuerzas: **las cinco fuerzas**
> Ni depurar ni reponer con urgencia: mantener el balance ya alcanzado. Un rito mensual que conserva la balanza inclinada hacia la vida —el ORP en su punto—.

Kits:
- **Kit Mantenimiento** (pensado para suscripción): Plata coloidal (éter) · Espirulina (aire) · Agua de mar (agua) · Zeolita (tierra) · Pasta dental con carbón (fuego)

Suscripción: *Nació para la suscripción: una pieza de cada fuerza que llega cada mes para que el fiel de la balanza nunca se pierda.*

---

## Conexión con la tienda (importante)
Cada **kit** debe enlazar a su producto/variante en **GHL Pagos** (igual que el catálogo). Si un kit aún no existe como producto, dejar el CTA como "Ver en catálogo" hasta que se cree. Mantener la distinción **marca propia vs reventa** si algún kit mezcla café La 60.

## Datos de referencia
El HTML autónomo `Quiron_Encuentra-tu-pack.html` reproduce exactamente este flujo, estética y lógica — úsalo como referencia visual/funcional para el build nativo.
