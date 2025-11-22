# 🎨 Guía de Estilos CSS - Personalización de Diseño

Documentación completa de todos los estilos CSS para personalización segura del frontend.

## 📋 Índice

- [Estructura de Estilos](#estructura-de-estilos)
- [Variables CSS Recomendadas](#variables-css-recomendadas)
- [Sudoku Styles](#sudoku-styles)
- [Responsive Design](#responsive-design)
- [Animaciones](#animaciones)
- [Temas Personalizados](#temas-personalizados)

---

## 📁 Estructura de Estilos

### Archivos CSS en el Proyecto

```
src/
├── index.css                 # Estilos globales y fuentes
├── components/
│   └── Sudoku.module.css     # Estilos específicos del Sudoku
└── providers/
    └── NotificationProvider.css  # Estilos de notificaciones
```

### Jerarquía de Estilos

1. **Global (index.css)** - Fuentes y configuración base
2. **Stellar Design System** - Componentes base importados
3. **CSS Modules** - Estilos específicos de componentes
4. **Inline Styles** - Estilos dinámicos en componentes

---

## 🎯 Variables CSS Recomendadas

Para facilitar la personalización, se recomienda crear variables CSS:

### Variables Globales (agregar a index.css)

```css
:root {
  /* Colores Primarios */
  --primary-color: #7b1fa2;
  --primary-hover: #6a1b9a;
  --primary-light: #f3e5f5;

  /* Colores del Sudoku */
  --sudoku-border: #2c3e50;
  --sudoku-background: #ffffff;
  --sudoku-text: #2c3e50;
  --sudoku-locked: #f3e5f5;
  --sudoku-locked-text: #7b1fa2;
  --sudoku-error: #ffcccc;
  --sudoku-error-border: #dc3545;
  --sudoku-valid: #d4edda;
  --sudoku-hover: #f0f8ff;
  --sudoku-focus: #e6f2ff;

  /* Colores de Estado */
  --success-color: #28a745;
  --success-hover: #218838;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --info-color: #17a2b8;

  /* Grises */
  --gray-light: #f8f9fa;
  --gray-medium: #6c757d;
  --gray-dark: #343a40;
  --border-color: #b0b0b0;

  /* Espaciado */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Sombras */
  --shadow-light: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-dark: 0 8px 24px rgba(0, 0, 0, 0.2);

  /* Transiciones */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

---

## 🎯 Sudoku Styles - Análisis Detallado

### Sudoku.module.css - Componente Principal

#### 1. Contenedor Principal

```css
.sudokuContainer {
  display: flex;
  justify-content: center;
  margin: 30px 0;
  /* Personalizable: margin, padding, alignment */
}
```

**Modificaciones Seguras:**

```css
.sudokuContainer {
  margin: var(--spacing-xl) 0;
  padding: var(--spacing-md);
  background: var(--gray-light);
  border-radius: 8px;
}
```

#### 2. Grid Principal

```css
.sudokuGrid {
  display: grid;
  grid-template-columns: repeat(9, 50px);
  grid-template-rows: repeat(9, 50px);
  gap: 0;
  border: 3px solid var(--sudoku-border);
  background: var(--sudoku-border);
  box-shadow: var(--shadow-medium);
}
```

**Opciones de Personalización:**

**Tamaño de Celdas:**

```css
/* Pequeño */
grid-template-columns: repeat(9, 40px);
grid-template-rows: repeat(9, 40px);

/* Mediano (default) */
grid-template-columns: repeat(9, 50px);
grid-template-rows: repeat(9, 50px);

/* Grande */
grid-template-columns: repeat(9, 60px);
grid-template-rows: repeat(9, 60px);
```

**Bordes y Sombras:**

```css
.sudokuGrid {
  border: 4px solid var(--primary-color);
  border-radius: 8px; /* Esquinas redondeadas */
  box-shadow: var(--shadow-dark);
}
```

#### 3. Celdas Individuales

```css
.sudokuCell {
  width: 50px;
  height: 50px;
  border: 1px solid var(--border-color);
  background: var(--sudoku-background);
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: var(--sudoku-text);
  outline: none;
  transition: var(--transition-fast);
  box-sizing: border-box;
}
```

**Estados Interactivos:**

**Hover:**

```css
.sudokuCell:hover:not(.locked) {
  background: var(--sudoku-hover);
  transform: scale(1.02); /* Efecto de zoom sutil */
  box-shadow: var(--shadow-light);
}
```

**Focus:**

```css
.sudokuCell:focus {
  background: var(--sudoku-focus);
  border-color: var(--primary-color);
  box-shadow: inset 0 0 0 2px var(--primary-color);
  z-index: 10;
}
```

#### 4. Estados de Celdas

**Celdas Bloqueadas (predefinidas):**

```css
.sudokuCell.locked {
  background: var(--sudoku-locked);
  color: var(--sudoku-locked-text);
  font-weight: 700;
  cursor: not-allowed;
  opacity: 0.9; /* Opcional: reducir opacidad */
}
```

**Celdas con Error:**

```css
.sudokuCell.error {
  background: var(--sudoku-error);
  border-color: var(--sudoku-error-border);
  animation: shake 0.3s ease;
  box-shadow: 0 0 8px rgba(220, 53, 69, 0.3);
}
```

**Celdas Válidas:**

```css
.sudokuCell.valid {
  background: var(--sudoku-valid);
  border-color: var(--success-color);
  box-shadow: 0 0 4px rgba(40, 167, 69, 0.2);
}
```

#### 5. Bordes de Cajas 3x3

**⚠️ CRÍTICO: No modificar estos selectores - romperían el visual del Sudoku**

```css
/* Bordes verticales cada 3 columnas */
.sudokuCell:nth-child(3n) {
  border-right: 2px solid var(--sudoku-border);
}

/* Bordes horizontales cada 3 filas */
.sudokuCell:nth-child(n + 19):nth-child(-n + 27),
.sudokuCell:nth-child(n + 46):nth-child(-n + 54) {
  border-bottom: 2px solid var(--sudoku-border);
}

/* Primera celda de cada fila */
.sudokuCell:nth-child(9n + 1) {
  border-left: 2px solid var(--sudoku-border);
}

/* Primera fila */
.sudokuCell:nth-child(-n + 9) {
  border-top: 2px solid var(--sudoku-border);
}
```

### 6. Control de Dificultad

```css
.sudokuDifficulty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow-light);
}
```

**Personalización del Slider:**

```css
.sudokuDifficulty input[type="range"] {
  flex: 1;
  max-width: 300px;
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  outline: none;
  -webkit-appearance: none;
}

/* Thumb del slider */
.sudokuDifficulty input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  box-shadow: var(--shadow-light);
}
```

### 7. Botones de Control

```css
.sudokuControls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.sudokuControls button {
  background: var(--gray-medium);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: var(--transition-fast);
}

.sudokuControls button:hover {
  background: var(--gray-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-light);
}

/* Botón de validación especial */
.sudokuControls .validateGrid {
  background: var(--success-color);
}

.sudokuControls .validateGrid:hover {
  background: var(--success-hover);
}
```

---

## 📱 Responsive Design

### Breakpoints Existentes

```css
/* Tablets */
@media (max-width: 768px) {
  .sudokuGrid {
    grid-template-columns: repeat(9, 40px);
    grid-template-rows: repeat(9, 40px);
  }

  .sudokuCell {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

/* Móviles */
@media (max-width: 480px) {
  .sudokuGrid {
    grid-template-columns: repeat(9, 32px);
    grid-template-rows: repeat(9, 32px);
  }

  .sudokuCell {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
}
```

### Breakpoints Adicionales Sugeridos

```css
/* Desktop Grande */
@media (min-width: 1200px) {
  .sudokuGrid {
    grid-template-columns: repeat(9, 60px);
    grid-template-rows: repeat(9, 60px);
  }

  .sudokuCell {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
}

/* Tablet Horizontal */
@media (max-width: 1024px) and (orientation: landscape) {
  .sudokuContainer {
    margin: var(--spacing-md) 0;
  }

  .sudokuDifficulty {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

---

## ✨ Animaciones

### Animaciones Existentes

**Shake para Errores:**

```css
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
```

### Animaciones Adicionales Sugeridas

**Fade In para Nuevos Sudokus:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.sudokuGrid {
  animation: fadeIn 0.3s ease-out;
}
```

**Pulse para Validación:**

```css
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.sudokuCell.valid {
  animation: pulse 0.3s ease-in-out;
}
```

**Bounce para Botones:**

```css
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.sudokuControls button:hover {
  animation: bounce 0.3s ease;
}
```

---

## 🎨 Temas Personalizados

### Tema Oscuro

```css
[data-theme="dark"] {
  --sudoku-background: #2d3748;
  --sudoku-text: #ffffff;
  --sudoku-border: #4a5568;
  --sudoku-locked: #553c8b;
  --sudoku-locked-text: #e6fffa;
  --sudoku-error: #fc8181;
  --sudoku-valid: #68d391;
  --sudoku-hover: #4a5568;
  --sudoku-focus: #63b3ed;
}
```

### Tema Colorido

```css
[data-theme="colorful"] {
  --primary-color: #ff6b6b;
  --sudoku-locked: #ffe66d;
  --sudoku-locked-text: #2d3436;
  --sudoku-error: #fd79a8;
  --sudoku-valid: #00cec9;
  --sudoku-border: #6c5ce7;
}
```

### Tema Minimalista

```css
[data-theme="minimal"] {
  --sudoku-border: #e9ecef;
  --sudoku-background: #ffffff;
  --sudoku-text: #495057;
  --sudoku-locked: #f8f9fa;
  --sudoku-locked-text: #6c757d;
  --border-color: #dee2e6;
  --shadow-medium: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

---

## 🛠 Implementación de Cambios

### Flujo Recomendado:

1. **Definir Variables CSS**

   ```css
   /* En index.css */
   :root {
     --tu-nueva-variable: #valor;
   }
   ```

2. **Aplicar en Sudoku.module.css**

   ```css
   .sudokuCell {
     background: var(--tu-nueva-variable);
   }
   ```

3. **Probar en Diferentes Dispositivos**
   - Desktop
   - Tablet
   - Móvil

4. **Verificar Todos los Estados**
   - Normal
   - Hover
   - Focus
   - Error
   - Valid
   - Locked

---

## ⚠️ Importante: Qué NO Modificar

### Selectores Críticos (NO TOCAR):

- `.sudokuCell:nth-child(3n)` - Bordes verticales 3x3
- `.sudokuCell:nth-child(n + 19):nth-child(-n + 27)` - Bordes horizontales
- `.sudokuCell:nth-child(9n + 1)` - Primera celda de fila
- `.sudokuCell:nth-child(-n + 9)` - Primera fila

### Propiedades Críticas (NO MODIFICAR):

- `display: grid` en `.sudokuGrid`
- `grid-template-columns/rows` estructura 9x9
- `box-sizing: border-box` en celdas
- Nombres de clases de estado (`.locked`, `.error`, `.valid`)

---

_Con esta guía puedes personalizar completamente el aspecto visual sin romper la funcionalidad._
