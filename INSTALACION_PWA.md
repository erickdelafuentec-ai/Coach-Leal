# Coach Leal Pro — Instalación como App (PWA)

## Archivos que necesitás subir

1. `index.html` (renombrar `coach_leal_v44.html` → `index.html`)
2. `manifest.json`
3. `sw.js`
4. `icon-192.png` (192×192px, derivado de tu logo)
5. `icon-512.png` (512×512px, derivado de tu logo)
6. `icon-maskable-512.png` (512×512px con padding extra para Android)

> Cuando me pases el logo te genero los 3 íconos automáticamente.

## Pasos para GitHub Pages

### 1. Crear el repositorio
1. Entrá a https://github.com → botón **New** (verde, arriba a la derecha)
2. Nombre del repo: `coach-leal` (o el que quieras)
3. Marcalo como **Public** (necesario para Pages gratis)
4. Marcá **Add a README file**
5. Click **Create repository**

### 2. Subir los archivos
1. Dentro del repo, click **Add file** → **Upload files**
2. Arrastrá los 6 archivos (`index.html`, `manifest.json`, `sw.js` y los 3 íconos)
3. Abajo, click **Commit changes**

### 3. Activar GitHub Pages
1. En el repo, andá a **Settings** (engranaje arriba)
2. Menú lateral izquierdo → **Pages**
3. En "Source" elegí: **Deploy from a branch**
4. Branch: `main` / Folder: `/ (root)` → **Save**
5. Esperá ~1 minuto. Arriba aparecerá:
   > Your site is live at https://TUUSUARIO.github.io/coach-leal/

### 4. Instalar en la tablet Android
1. Abrí Chrome en la tablet
2. Andá a la URL `https://TUUSUARIO.github.io/coach-leal/`
3. Esperá que cargue completamente (la primera vez tarda más, está cacheando todo)
4. Tocá el menú **⋮** (arriba a la derecha) → **Instalar app** o **Añadir a pantalla principal**
5. Confirmá. Aparece el ícono en la pantalla principal de Android.
6. Al abrir desde el ícono, va a abrir como app a pantalla completa, sin barra de direcciones.

### Beneficios después de instalar
- ✅ Funciona offline (una vez cargada la primera vez)
- ✅ No aparece la barra de Chrome — pantalla completa real
- ✅ Conserva todos los datos en localStorage (equipos, jugadores, etc.)
- ✅ Tarda menos en abrir
- ✅ Ícono propio en pantalla principal

## Para actualizar la app (cuando hagas cambios)
1. Subí el nuevo `index.html` a GitHub (Add file → Upload → reemplazar)
2. Editá `sw.js` y cambiá `coach-leal-v1` → `coach-leal-v2` (esto fuerza la actualización en las tablets)
3. Commit changes
4. En la tablet, abrí la app y cerrala. La próxima vez que la abras tendrá los cambios nuevos.

## Notas
- Los datos de `localStorage` no se pierden con las actualizaciones.
- El service worker solo cachea recursos GET; la API de Anthropic siempre va a la red.
- Si querés una URL más bonita podés conectar un dominio propio en Settings → Pages → Custom domain.
