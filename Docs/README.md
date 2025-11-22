# 📚 Documentación del Frontend - Zcore-ZK

Esta documentación está enfocada en la **personalización y modificación del diseño** de la aplicación Zcore-ZK sin afectar su funcionalidad. Perfecta para adaptar el frontend a nuevos mockups y vistas.

## 📋 Índice

- [Estructura del Frontend](#estructura-del-frontend)
- [Sistema de Diseño](#sistema-de-diseño)
- [Componentes Principales](#componentes-principales)
- [Estilos y CSS](#estilos-y-css)
- [Guías de Personalización](#guías-de-personalización)
- [Modificación Segura](#modificación-segura)

---

## 📁 Estructura del Frontend

### Arquitectura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── layout/         # Componentes de layout
│   │   └── Box.tsx     # Componente de contenedor flexible
│   ├── ConnectAccount.tsx
│   ├── ContractConfig.tsx
│   ├── PrizePool.tsx
│   ├── Sudoku.tsx
│   ├── Sudoku.module.css  # Estilos específicos del Sudoku
│   └── ZcoreForm.tsx
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página principal
│   ├── Zcore.tsx       # Página de Zcore
│   └── Debugger.tsx    # Página de debug
├── providers/          # Proveedores de contexto
├── services/           # Servicios de la aplicación
├── contexts/           # Contextos de React
├── hooks/             # Custom hooks
├── App.tsx            # Componente raíz
└── index.css          # Estilos globales
```

### Tecnologías Utilizadas

- **React 19.1.1** - Framework principal
- **React Router DOM** - Navegación
- **@stellar/design-system** - Sistema de diseño base
- **TypeScript** - Tipado estático
- **CSS Modules** - Estilos encapsulados
- **Vite** - Build tool

---

## 🎨 Sistema de Diseño

La aplicación utiliza el **Stellar Design System** como base, proporcionando:

### Componentes Base

- `Layout.Header` - Header principal
- `Layout.Content` - Contenedor de contenido
- `Layout.Footer` - Footer
- `Layout.Inset` - Espaciado interno
- `Button` - Botones con variantes
- `Text` - Componentes de texto
- `Icon` - Iconografía

### Fuentes

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Inconsolata:wght@500&display=swap");
```

**Fuentes principales:**

- **Inter** - Texto general (pesos 100-900)
- **Inconsolata** - Texto monoespaciado/código

---

## 🧩 Componentes Principales

### 1. App.tsx - Layout Principal

**Ubicación:** `src/App.tsx`
**Función:** Define el layout base y navegación

**Estructura:**

- Header con navegación
- Contenido principal (Outlet)
- Footer con copyright

**Áreas modificables:**

- Navegación en el header
- Estilos del footer
- Estructura general del layout

### 2. Home.tsx - Página Principal

**Ubicación:** `src/pages/Home.tsx`
**Función:** Página de inicio con Sudoku

**Elementos:**

- Título principal
- Descripción
- Componentes: ContractConfig, PrizePool, Sudoku

### 3. Sudoku.tsx - Componente Principal

**Ubicación:** `src/components/Sudoku.tsx`
**Función:** Interfaz del juego Sudoku

**Características:**

- Grid interactivo 9x9
- Validación visual
- Controles de dificultad
- Generación de pruebas ZK

---

## 🎯 Estilos y CSS

### CSS Global

**Archivo:** `src/index.css`

- Importa fuentes de Google
- Configuración base mínima

### CSS Modules - Sudoku

**Archivo:** `src/components/Sudoku.module.css`

#### Clases Principales:

```css
.sudokuContainer    # Contenedor principal
.sudokuGrid         # Grid 9x9 del Sudoku
.sudokuCell         # Celdas individuales
.sudokuDifficulty   # Control de dificultad
.sudokuControls     # Botones de control
```

#### Estados de Celda:

```css
.sudokuCell.locked  # Celdas predefinidas
.sudokuCell.error   # Celdas con errores
.sudokuCell.valid   # Celdas válidas
```

#### Responsividad:

- **Tablet (768px):** Grid 40x40px
- **Móvil (480px):** Grid 32x32px

---

## 🛠 Guías de Personalización

### ✅ Modificaciones Seguras

#### 1. **Cambiar Colores**

```css
/* En Sudoku.module.css */
.sudokuGrid {
  border: 3px solid #TU_COLOR; /* Color del borde */
  background: #TU_COLOR; /* Fondo del grid */
}

.sudokuCell {
  background: #TU_COLOR; /* Fondo de celdas */
  color: #TU_COLOR; /* Color del texto */
}
```

#### 2. **Modificar Tipografía**

```css
/* En index.css - cambiar fuentes */
@import url("https://fonts.googleapis.com/css2?family=TU_FUENTE");
```

#### 3. **Ajustar Espaciado**

```tsx
// En componentes - usar el sistema Box
<Box gap="lg" direction="column" style={{...}}>
  {/* Contenido */}
</Box>
```

#### 4. **Personalizar Botones**

```tsx
// Variantes disponibles: primary, secondary, tertiary
<Button
  variant="primary"
  size="lg"
  style={
    {
      /* estilos custom */
    }
  }
>
  Texto
</Button>
```

#### 5. **Cambiar Layout**

```tsx
// En App.tsx - modificar estructura
<Layout.Header
  contentLeft={<LogoComponent />}
  contentRight={<NavigationComponent />}
/>
```

### ⚠️ Modificaciones que Requieren Cuidado

#### 1. **Estados de Componentes**

- No cambiar nombres de clases de estado (`.locked`, `.error`, `.valid`)
- Mantener la lógica de validación intacta

#### 2. **Grid del Sudoku**

- Conservar la estructura 9x9
- No modificar los selectores nth-child para bordes

#### 3. **Proveedores de Contexto**

- No modificar la estructura de los providers
- Mantener las props requeridas

---

## 🔒 Modificación Segura

### ✅ QUÉ SÍ Puedes Modificar

1. **Colores y temas**
2. **Tipografías y tamaños**
3. **Espaciados y márgenes**
4. **Animaciones CSS**
5. **Layout y posicionamiento**
6. **Textos e imágenes**
7. **Iconografía decorativa**

### ❌ QUÉ NO Debes Modificar

1. **Lógica de validación del Sudoku**
2. **Conexiones con contratos inteligentes**
3. **Estados de React (useState, useEffect)**
4. **Hooks personalizados**
5. **Servicios y providers**
6. **Configuración de rutas**
7. **Tipos TypeScript de datos**

### 🔧 Flujo de Trabajo Recomendado

1. **Identifica el componente** a modificar
2. **Crea una rama** para tus cambios
3. **Modifica solo estilos** CSS primero
4. **Prueba la funcionalidad** completa
5. **Ajusta gradualmente** otros aspectos
6. **Documenta tus cambios**

### 🧪 Testing Visual

Para probar cambios sin afectar funcionalidad:

1. Ejecuta `npm run dev`
2. Navega por todas las páginas
3. Interactúa con el Sudoku
4. Verifica responsive design
5. Comprueba estados de error/éxito

---

## 📞 Recursos Adicionales

- **Stellar Design System:** [Documentación oficial](https://design.stellar.org/)
- **React Router:** [Guía de navegación](https://reactrouter.com/)
- **CSS Modules:** [Documentación](https://github.com/css-modules/css-modules)

---

_Esta documentación se centra en la personalización visual. Para modificaciones de funcionalidad, consulta la documentación técnica completa._
