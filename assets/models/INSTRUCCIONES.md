# 📦 Cómo añadir modelos 3D a Clinidental

## Paso 1 — Exporta tu modelo desde Chitubox

En Chitubox, ve a **File → Export → STL** y guarda el archivo.

---

## Paso 2 — Convierte .stl a .glb (gratis, 30 segundos)

Ve a este link: https://products.aspose.app/3d/conversion/stl-to-glb

1. Sube tu archivo `.stl`
2. Haz clic en **Convert**
3. Descarga el `.glb` resultante

También puedes usar: https://www.convertimageonline.com/stl-to-glb.html

---

## Paso 3 — Sube el .glb a esta carpeta

Coloca el archivo `.glb` aquí:
```
assets/models/tu-modelo.glb
```

Ejemplo: `assets/models/modelo-implante.glb`

---

## Paso 4 — Activa el visor en index.html

Abre `index.html`, busca la sección de "Tecnología 3D" y:

**A) Elimina** el bloque que empieza con `<!-- PLACEHOLDER -->` hasta `<!-- /PLACEHOLDER -->`

**B) Descomenta** el bloque `<model-viewer>` quitando los `<!--` y `-->` de alrededor

**C) Cambia** la ruta en `src=` por el nombre de tu archivo:
```html
src="assets/models/tu-modelo.glb"
```

---

## Resultado

El modelo aparecerá con:
- ✅ Rotación automática suave
- ✅ Zoom y giro con mouse / dedo
- ✅ Botón de Realidad Aumentada en Android
- ✅ Sin ningún backend ni servidor especial

---

## ¿Qué tipos de modelos funcionan bien?

- Modelos de maxilares o arcadas dentales
- Guías quirúrgicas para implantes
- Prótesis y coronas
- Modelos de estudio de ortodoncia
- Cualquier pieza impresa en la Elegoo Mars Ultra 5

## Tamaño recomendado

- Menos de **10 MB** por modelo para carga rápida
- Si el .glb pesa mucho, puedes comprimirlo en: https://gltf.report/
