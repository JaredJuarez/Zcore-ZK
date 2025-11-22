# 🚀 Guía de Personalización Rápida - Adaptación a Mockups

Guía práctica para adaptar el frontend de Zcore-ZK a nuevos diseños y mockups de manera eficiente y segura.

## 📋 Índice

- [Flujo de Trabajo Recomendado](#flujo-de-trabajo-recomendado)
- [Cambios Comunes](#cambios-comunes)
- [Ejemplos Prácticos](#ejemplos-prácticos)
- [Adaptación a Mockups](#adaptación-a-mockups)
- [Checklist de Verificación](#checklist-de-verificación)

---

## 🔄 Flujo de Trabajo Recomendado

### Preparación del Entorno

1. **Crea una rama de desarrollo**

   ```bash
   git checkout -b feature/new-design
   ```

2. **Instala dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

### Proceso de Personalización

1. **Análisis del Mockup** 📋
   - Identifica colores principales
   - Nota espaciados y tipografías
   - Marca componentes que cambiarán

2. **Configuración Base** ⚙️
   - Define variables CSS globales
   - Actualiza fuentes si es necesario

3. **Modificación por Componentes** 🧩
   - Comienza con el layout principal
   - Continúa con componentes individuales
   - Termina con detalles y animaciones

4. **Testing Visual** 🧪
   - Prueba en diferentes dispositivos
   - Verifica funcionalidad completa
   - Ajusta responsive design

---

## 🎨 Cambios Comunes

### 1. Cambio de Paleta de Colores

**Paso 1: Define las nuevas variables**

```css
/* En src/index.css */
:root {
  /* Nueva paleta */
  --brand-primary: #3b82f6; /* Azul */
  --brand-secondary: #10b981; /* Verde */
  --brand-accent: #f59e0b; /* Amarillo */
  --brand-dark: #1f2937; /* Gris oscuro */
  --brand-light: #f9fafb; /* Gris claro */

  /* Aplicar al Sudoku */
  --sudoku-border: var(--brand-primary);
  --sudoku-locked: #dbeafe; /* Azul claro */
  --sudoku-locked-text: var(--brand-primary);
  --sudoku-error: #fecaca; /* Rojo claro */
  --sudoku-valid: #bbf7d0; /* Verde claro */
}
```

**Paso 2: Aplica en Sudoku.module.css**

```css
.sudokuGrid {
  border: 3px solid var(--sudoku-border);
  background: var(--sudoku-border);
}

.sudokuCell.locked {
  background: var(--sudoku-locked);
  color: var(--sudoku-locked-text);
}
```

### 2. Cambio de Tipografía

**Paso 1: Importa nueva fuente**

```css
/* En src/index.css */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
```

**Paso 2: Aplica globalmente**

```css
:root {
  --font-primary: "Poppins", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

body {
  font-family: var(--font-primary);
}
```

**Paso 3: Aplica en componentes**

```css
.sudokuCell {
  font-family: var(--font-primary);
  font-weight: 500;
}
```

### 3. Modificación del Layout

**Layout en 2 Columnas:**

```tsx
// En src/pages/Home.tsx
<Layout.Content>
  <Layout.Inset>
    <Box direction="row" gap="lg" style={{ alignItems: "flex-start" }}>
      {/* Columna izquierda */}
      <Box direction="column" gap="md" style={{ flex: 1 }}>
        <Text as="h1" size="xl">
          Sudoku Proof Generator
        </Text>
        <Text as="p" size="md">
          Descripción...
        </Text>
        <ContractConfig />
        <PrizePool />
      </Box>

      {/* Columna derecha */}
      <Box direction="column" gap="md" style={{ flex: 2 }}>
        <Sudoku />
      </Box>
    </Box>
  </Layout.Inset>
</Layout.Content>
```

### 4. Personalización del Header

```tsx
// En src/App.tsx
<Layout.Header
  contentLeft={
    <Box direction="row" gap="sm" style={{ alignItems: "center" }}>
      <img src="/logo.png" alt="Logo" style={{ height: "32px" }} />
      <Text as="h2" size="lg">
        Zcore ZK
      </Text>
    </Box>
  }
  contentCenter={
    <nav style={{ display: "flex", gap: "1rem" }}>
      <NavLink to="/zcore">
        <Button variant="tertiary" size="md">
          Jugar
        </Button>
      </NavLink>
      <NavLink to="/leaderboard">
        <Button variant="tertiary" size="md">
          Rankings
        </Button>
      </NavLink>
      <NavLink to="/about">
        <Button variant="tertiary" size="md">
          Acerca de
        </Button>
      </NavLink>
    </nav>
  }
  contentRight={<ConnectAccount />}
/>
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Tema Gaming

**Colores:**

```css
:root {
  --gaming-primary: #ff0080; /* Rosa neón */
  --gaming-secondary: #00ff80; /* Verde neón */
  --gaming-dark: #0a0a0a; /* Negro profundo */
  --gaming-glow: #ff008080; /* Rosa con transparencia */
}
```

**Efectos:**

```css
.sudokuGrid {
  border: 3px solid var(--gaming-primary);
  box-shadow:
    0 0 20px var(--gaming-glow),
    inset 0 0 20px rgba(255, 0, 128, 0.1);
  border-radius: 12px;
}

.sudokuCell:focus {
  box-shadow:
    inset 0 0 0 2px var(--gaming-primary),
    0 0 15px var(--gaming-glow);
}
```

### Ejemplo 2: Tema Minimalista

**Configuración:**

```css
:root {
  --minimal-gray: #f7f8fc;
  --minimal-text: #2d3748;
  --minimal-border: #e2e8f0;
  --minimal-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sudokuGrid {
  border: 1px solid var(--minimal-border);
  background: transparent;
  box-shadow: var(--minimal-shadow);
  border-radius: 8px;
}

.sudokuCell {
  border: 1px solid var(--minimal-border);
  background: white;
  transition: all 0.2s ease;
}

.sudokuCell:hover:not(.locked) {
  background: var(--minimal-gray);
}
```

### Ejemplo 3: Tema Corporativo

**Layout Empresarial:**

```tsx
// Header empresarial
<Layout.Header
  contentLeft={<CompanyLogo />}
  contentCenter={<MainNavigation />}
  contentRight={
    <Box direction="row" gap="sm">
      <UserProfile />
      <NotificationCenter />
      <ConnectAccount />
    </Box>
  }
/>

// Contenido con sidebar
<Layout.Content>
  <Box direction="row" gap="none">
    <Sidebar />
    <MainContent />
  </Box>
</Layout.Content>
```

---

## 🎯 Adaptación a Mockups

### Proceso Paso a Paso

**1. Análisis del Mockup**

Crea una tabla de análisis:

```
| Elemento          | Mockup                | Actual               | Acción Requerida     |
|-------------------|----------------------|----------------------|----------------------|
| Color Principal   | #3b82f6 (Azul)      | #7b1fa2 (Morado)    | Cambiar variables    |
| Tipografía        | Poppins              | Inter                | Actualizar fuentes   |
| Layout            | 2 Columnas          | 1 Columna            | Modificar estructura |
| Botones           | Redondeados (12px)  | Redondeados (4px)    | Actualizar CSS       |
| Espaciado         | 24px                | 16px                 | Aumentar gaps        |
```

**2. Implementación Ordenada**

```css
/* 1. Variables base del mockup */
:root {
  /* Colores del mockup */
  --mockup-primary: #3b82f6;
  --mockup-secondary: #f1f5f9;
  --mockup-text: #0f172a;
  --mockup-border: #cbd5e1;

  /* Espaciado del mockup */
  --mockup-spacing-sm: 12px;
  --mockup-spacing-md: 24px;
  --mockup-spacing-lg: 48px;

  /* Bordes del mockup */
  --mockup-radius: 12px;
  --mockup-radius-lg: 16px;
}

/* 2. Aplicar al grid principal */
.sudokuGrid {
  border: 2px solid var(--mockup-primary);
  border-radius: var(--mockup-radius);
  gap: 2px;
}

/* 3. Actualizar celdas */
.sudokuCell {
  border-radius: 4px;
  font-weight: 500;
}

/* 4. Controles según mockup */
.sudokuControls button {
  border-radius: var(--mockup-radius);
  padding: var(--mockup-spacing-sm) var(--mockup-spacing-md);
}
```

**3. Verificación de Responsive**

```css
/* Asegurar que el mockup funcione en móvil */
@media (max-width: 768px) {
  .mockupLayout {
    --mockup-spacing-md: 16px;
    --mockup-spacing-lg: 32px;
  }

  .sudokuGrid {
    border-radius: 8px;
  }
}
```

---

## ✅ Checklist de Verificación

### Antes de Finalizar

**📱 Responsive Design**

- [ ] Desktop (1920px+)
- [ ] Laptop (1024px-1919px)
- [ ] Tablet (768px-1023px)
- [ ] Móvil (320px-767px)

**🎨 Estados Visuales**

- [ ] Estados normales
- [ ] Estados hover
- [ ] Estados focus
- [ ] Estados error
- [ ] Estados válidos
- [ ] Estados de carga

**🧩 Componentes**

- [ ] Header navigation funciona
- [ ] Footer se ve correctamente
- [ ] Sudoku grid mantiene estructura 9x9
- [ ] Botones responden correctamente
- [ ] Formularios funcionan

**⚡ Funcionalidad**

- [ ] Navegación entre páginas
- [ ] Generación de Sudoku
- [ ] Validación de celdas
- [ ] Bordes de cajas 3x3
- [ ] Responsive del grid

**🎯 Accesibilidad**

- [ ] Contraste de colores adecuado
- [ ] Focus visible en elementos interactivos
- [ ] Texto legible en todos los tamaños
- [ ] Botones tienen área de click suficiente

### Comandos de Testing

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de build
npm run preview

# Linting
npm run lint

# Formateo
npm run format
```

---

## 🚨 Problemas Comunes y Soluciones

### Problema: Grid del Sudoku se ve mal

**Solución:** Verifica que no hayas modificado los selectores nth-child

### Problema: Botones no responden

**Solución:** Revisa que no hayas sobreescrito event handlers

### Problema: Responsive no funciona

**Solución:** Asegúrate de usar unidades relativas (rem, %, vw)

### Problema: Fuentes no cargan

**Solución:** Verifica la importación en index.css y conexión a internet

### Problema: Colores no cambian

**Solución:** Verifica que las variables CSS estén bien definidas y aplicadas

---

## 🎉 Ejemplo Completo: Adaptación a Mockup Moderno

### Mockup: Diseño Card-Based

```css
/* Variables del nuevo diseño */
:root {
  --modern-primary: #6366f1;
  --modern-surface: #ffffff;
  --modern-background: #f8fafc;
  --modern-border: #e2e8f0;
  --modern-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --modern-radius: 16px;
  --modern-spacing: 24px;
}

/* Layout principal como cards */
.modernLayout {
  background: var(--modern-background);
  padding: var(--modern-spacing);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--modern-spacing);
}

.modernCard {
  background: var(--modern-surface);
  border-radius: var(--modern-radius);
  box-shadow: var(--modern-shadow);
  padding: var(--modern-spacing);
}

/* Sudoku como card principal */
.sudokuContainer {
  background: var(--modern-surface);
  border-radius: var(--modern-radius);
  box-shadow: var(--modern-shadow);
  padding: var(--modern-spacing);
  margin: 0;
}

.sudokuGrid {
  border: none;
  background: transparent;
  gap: 4px;
  border-radius: var(--modern-radius);
  overflow: hidden;
}

.sudokuCell {
  border-radius: 8px;
  border: 2px solid var(--modern-border);
  transition: all 0.3s ease;
}

.sudokuCell:hover:not(.locked) {
  border-color: var(--modern-primary);
  transform: scale(1.02);
}
```

```tsx
// Estructura del componente
<Layout.Content>
  <div className="modernLayout">
    <div className="modernCard">
      <Text as="h2" size="lg">
        Configuración
      </Text>
      <ContractConfig />
      <PrizePool />
    </div>

    <div className="modernCard">
      <Text as="h2" size="lg">
        Sudoku ZK
      </Text>
      <Sudoku />
    </div>
  </div>
</Layout.Content>
```

---

_Con esta guía tienes todo lo necesario para adaptar el frontend a cualquier mockup manteniendo la funcionalidad intacta._
