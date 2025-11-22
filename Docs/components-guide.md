# 🧩 Guía de Componentes - Frontend Design

Documentación detallada de cada componente para modificaciones de diseño seguras.

## 📋 Índice de Componentes

- [Layout Principal (App.tsx)](#layout-principal)
- [Página Home](#página-home)
- [Componente Sudoku](#componente-sudoku)
- [Componentes de Layout](#componentes-de-layout)
- [Componentes de UI](#componentes-de-ui)

---

## 🏗 Layout Principal

### App.tsx - Estructura Base

**Ubicación:** `src/App.tsx`

#### Estructura Visual:

```
┌─────────────────────────────┐
│         HEADER              │
│  [Logo]    [Nav]  [Account] │
├─────────────────────────────┤
│                             │
│         CONTENT             │
│        (Outlet)             │
│                             │
├─────────────────────────────┤
│         FOOTER              │
│       © Copyright          │
└─────────────────────────────┘
```

#### Elementos Modificables:

**1. Header Navigation**

```tsx
// Ubicación: contentRight en Layout.Header
<nav style={{ display: "flex", gap: "0.5rem" }}>
  <NavLink to="/zcore">
    <Button variant="tertiary" size="md">
      Zcore
    </Button>
  </NavLink>
  // Agregar más enlaces aquí
</nav>
```

**Personalización Segura:**

- ✅ Cambiar textos de navegación
- ✅ Agregar nuevos enlaces
- ✅ Modificar estilos del nav
- ✅ Cambiar variantes de botones
- ❌ No modificar la estructura de rutas

**2. Footer**

```tsx
<Layout.Footer>
  <span>
    © {new Date().getFullYear()} Noir App. Licensed under the{" "}
    <a href="..." target="_blank" rel="noopener noreferrer">
      Apache License, Version 2.0
    </a>
  </span>
</Layout.Footer>
```

**Personalización Segura:**

- ✅ Cambiar texto del copyright
- ✅ Modificar enlaces
- ✅ Agregar información adicional
- ✅ Cambiar estilos del footer

---

## 🏠 Página Home

### Home.tsx - Página Principal

**Ubicación:** `src/pages/Home.tsx`

#### Estructura Visual:

```
┌─────────────────────────────┐
│    Sudoku Proof Generator   │ ← Título (Text h1)
│                             │
│  Solve Sudoku puzzles...    │ ← Descripción (Text p)
│                             │
├─────────────────────────────┤
│     ContractConfig          │ ← Componente
├─────────────────────────────┤
│       PrizePool             │ ← Componente
├─────────────────────────────┤
│        Sudoku               │ ← Componente principal
└─────────────────────────────┘
```

#### Elementos Modificables:

**1. Títulos y Textos**

```tsx
<Text as="h1" size="xl">
  Tu Título Personalizado
</Text>
<Text as="p" size="md">
  Tu descripción personalizada aquí
</Text>
```

**Opciones de personalización:**

- `size`: "xs", "sm", "md", "lg", "xl"
- `as`: "h1", "h2", "h3", "p", "span", etc.

**2. Layout de Componentes**

```tsx
<Box gap="md" direction="column" style={{ marginTop: "2rem" }}>
  {/* Reordena o modifica componentes aquí */}
</Box>
```

**Opciones del Box:**

- `gap`: "xs", "sm", "md", "lg", "xl"
- `direction`: "row", "column"
- `style`: CSS personalizado

---

## 🎯 Componente Sudoku

### Sudoku.tsx - Interfaz Principal del Juego

**Ubicación:** `src/components/Sudoku.tsx`

#### Estructura Visual:

```
┌─────────────────────────────┐
│    Difficulty: [Slider]     │ ← Control de dificultad
├─────────────────────────────┤
│  [New] [Clear] [Validate]   │ ← Botones de control
├─────────────────────────────┤
│ ┌─┬─┬─┐┌─┬─┬─┐┌─┬─┬─┐     │
│ ├─┼─┼─┤├─┼─┼─┤├─┼─┼─┤     │ ← Grid Sudoku 9x9
│ └─┴─┴─┘└─┴─┴─┘└─┴─┴─┘     │
│           ...               │
├─────────────────────────────┤
│  [Generate Proof] [Submit]  │ ← Botones de acción
└─────────────────────────────┘
```

#### Estilos CSS - Sudoku.module.css

**Clases Principales:**

**1. Contenedor Principal**

```css
.sudokuContainer {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
```

**2. Grid del Sudoku**

```css
.sudokuGrid {
  display: grid;
  grid-template-columns: repeat(9, 50px);
  grid-template-rows: repeat(9, 50px);
  gap: 0;
  border: 3px solid #2c3e50;
  background: #2c3e50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

**3. Celdas Individuales**

```css
.sudokuCell {
  width: 50px;
  height: 50px;
  border: 1px solid #b0b0b0;
  background: white;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  outline: none;
  transition: all 0.2s ease;
}
```

**4. Estados de Celdas**

```css
.sudokuCell.locked {
  background: #f3e5f5; /* Celdas predefinidas */
  color: #7b1fa2;
  font-weight: 700;
  cursor: not-allowed;
}

.sudokuCell.error {
  background: #ffcccc; /* Celdas con error */
  border-color: #dc3545;
  animation: shake 0.3s ease;
}

.sudokuCell.valid {
  background: #d4edda; /* Celdas válidas */
}
```

#### Personalización del Sudoku:

**1. Colores del Tema**

```css
/* Variables CSS recomendadas para fácil cambio */
:root {
  --sudoku-border: #2c3e50;
  --sudoku-background: #ffffff;
  --sudoku-text: #2c3e50;
  --sudoku-locked: #f3e5f5;
  --sudoku-error: #ffcccc;
  --sudoku-valid: #d4edda;
}
```

**2. Tamaño de Celdas**

```css
/* Para pantallas más grandes */
.sudokuGrid {
  grid-template-columns: repeat(9, 60px);
  grid-template-rows: repeat(9, 60px);
}

.sudokuCell {
  width: 60px;
  height: 60px;
  font-size: 24px;
}
```

**3. Efectos y Animaciones**

```css
/* Hover personalizado */
.sudokuCell:hover:not(.locked) {
  background: #tu-color-hover;
  transform: scale(1.05);
}

/* Animación de error personalizada */
@keyframes pulso {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

---

## 📦 Componentes de Layout

### Box.tsx - Contenedor Flexible

**Ubicación:** `src/components/layout/Box.tsx`

**Uso:**

```tsx
<Box
  gap="md" // Espaciado entre elementos
  direction="column" // Dirección del layout
  style={{
    // Estilos personalizados
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    borderRadius: "8px",
  }}
>
  {children}
</Box>
```

**Props disponibles:**

- `gap`: "xs" | "sm" | "md" | "lg" | "xl"
- `direction`: "row" | "column"
- `style`: CSSProperties
- `children`: ReactNode

---

## 🎨 Componentes de UI

### Componentes del Stellar Design System

**1. Buttons**

```tsx
<Button
  variant="primary" // primary, secondary, tertiary
  size="md" // sm, md, lg
  disabled={false}
  onClick={handler}
>
  Texto del botón
</Button>
```

**2. Text**

```tsx
<Text
  as="h1" // h1-h6, p, span, div
  size="xl" // xs, sm, md, lg, xl
  color="primary" // primary, secondary, etc.
>
  Contenido de texto
</Text>
```

**3. Icons**

```tsx
<Icon.Code02 size="md" /> // Iconos disponibles del sistema
```

---

## 🎯 Guía de Modificación Rápida

### Cambios Comunes de Diseño:

**1. Cambiar Paleta de Colores**

- Modifica variables CSS en Sudoku.module.css
- Actualiza colores en componentes específicos

**2. Modificar Espaciado**

- Usa diferentes valores de `gap` en Box components
- Ajusta márgenes y padding en CSS

**3. Cambiar Tipografía**

- Modifica imports en index.css
- Actualiza font-family en clases CSS

**4. Reorganizar Layout**

- Reordena componentes en pages
- Cambia direction de "column" a "row" en Box

**5. Agregar Nuevos Elementos**

- Usa componentes del Stellar Design System
- Mantén la estructura de Box para consistencia

---

## ⚠️ Puntos de Atención

### NO Modifiques:

- Lógica de validación del Sudoku
- Estructuras nth-child para bordes del grid
- Hooks y estados de React
- Props requeridas por componentes

### SÍ Modifica:

- Colores y temas
- Espaciados y tamaños
- Textos e imágenes
- Animaciones CSS
- Layout y posicionamiento

---

_Esta guía te permite modificar el diseño manteniendo toda la funcionalidad intacta._
