# 🔧 Casos de Uso Prácticos - Modificaciones Comunes

Ejemplos reales y plantillas para las modificaciones más frecuentes del frontend.

## 📋 Índice

- [Cambios de Branding](#cambios-de-branding)
- [Modificaciones de Layout](#modificaciones-de-layout)
- [Personalización de Temas](#personalización-de-temas)
- [Adaptaciones Responsive](#adaptaciones-responsive)
- [Plantillas Listas para Usar](#plantillas-listas-para-usar)

---

## 🎨 Cambios de Branding

### Caso 1: Cambio de Logo y Colores Corporativos

**Situación:** Necesitas adaptar la app a los colores de tu empresa

**Archivos a modificar:**

- `src/index.css` (variables globales)
- `src/components/Sudoku.module.css` (colores del Sudoku)
- `src/App.tsx` (logo en header)

**Implementación:**

```css
/* src/index.css - Variables corporativas */
:root {
  /* Colores de la empresa */
  --corp-primary: #2563eb; /* Azul corporativo */
  --corp-secondary: #f59e0b; /* Dorado */
  --corp-accent: #10b981; /* Verde */
  --corp-neutral: #6b7280; /* Gris */
  --corp-dark: #1f2937; /* Texto principal */
  --corp-light: #f9fafb; /* Fondo claro */

  /* Aplicar al Sudoku */
  --sudoku-border: var(--corp-primary);
  --sudoku-locked: #dbeafe; /* Azul claro */
  --sudoku-locked-text: var(--corp-primary);
  --sudoku-error: #fee2e2; /* Rojo claro */
  --sudoku-valid: #dcfce7; /* Verde claro */
  --sudoku-hover: #eff6ff; /* Azul muy claro */
}
```

```tsx
// src/App.tsx - Header con logo corporativo
<Layout.Header
  contentLeft={
    <Box direction="row" gap="sm" style={{ alignItems: "center" }}>
      <img
        src="/assets/logo-corporativo.svg"
        alt="Logo Empresa"
        style={{ height: "32px" }}
      />
      <Text as="h2" size="lg" style={{ color: "var(--corp-primary)" }}>
        Sudoku Enterprise
      </Text>
    </Box>
  }
  contentRight={<ConnectAccount />}
/>
```

```css
/* src/components/Sudoku.module.css - Aplicar colores corporativos */
.sudokuGrid {
  border: 3px solid var(--corp-primary);
  background: var(--corp-primary);
}

.sudokuCell.locked {
  background: var(--sudoku-locked);
  color: var(--corp-primary);
}

.sudokuControls .validateGrid {
  background: var(--corp-accent);
}
```

### Caso 2: Cambio de Tipografía Corporativa

```css
/* src/index.css - Nueva tipografía */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

:root {
  --font-corporate: "Roboto", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

body,
* {
  font-family: var(--font-corporate);
}

.sudokuCell {
  font-family: var(--font-corporate);
  font-weight: 500;
}
```

---

## 📐 Modificaciones de Layout

### Caso 3: Layout de Dashboard (2 Columnas)

**Situación:** Quieres un layout más profesional estilo dashboard

```tsx
// src/pages/Home.tsx - Layout dashboard
import { Layout, Text } from "@stellar/design-system";
import { Sudoku } from "../components/Sudoku";
import { ContractConfig } from "../components/ContractConfig";
import { PrizePool } from "../components/PrizePool";
import { Box } from "../components/layout/Box";

const Home: React.FC = () => {
  return (
    <Layout.Content>
      <Layout.Inset>
        {/* Header del dashboard */}
        <Box direction="column" gap="md" style={{ marginBottom: "2rem" }}>
          <Text as="h1" size="xl">
            Panel de Control Sudoku
          </Text>
          <Text as="p" size="md" style={{ color: "var(--corp-neutral)" }}>
            Gestiona tus puzzles y genera pruebas zero-knowledge
          </Text>
        </Box>

        {/* Layout de 2 columnas */}
        <Box direction="row" gap="lg" style={{ alignItems: "flex-start" }}>
          {/* Sidebar izquierdo */}
          <Box
            direction="column"
            gap="md"
            style={{
              flex: "0 0 300px",
              background: "var(--corp-light)",
              padding: "1.5rem",
              borderRadius: "12px",
            }}
          >
            <Text as="h3" size="lg">
              Configuración
            </Text>
            <ContractConfig />
            <PrizePool />
          </Box>

          {/* Área principal */}
          <Box
            direction="column"
            gap="md"
            style={{
              flex: 1,
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Text as="h3" size="lg">
              Sudoku Puzzle
            </Text>
            <Sudoku />
          </Box>
        </Box>
      </Layout.Inset>
    </Layout.Content>
  );
};
```

### Caso 4: Layout Centrado con Cards

```tsx
// src/pages/Home.tsx - Layout con cards
const Home: React.FC = () => {
  return (
    <Layout.Content style={{ background: "#f8fafc" }}>
      <Layout.Inset>
        <Box
          direction="column"
          gap="xl"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem 0",
          }}
        >
          {/* Hero Section */}
          <Box direction="column" gap="md" style={{ textAlign: "center" }}>
            <Text as="h1" size="xl">
              🧩 Sudoku Zero-Knowledge
            </Text>
            <Text
              as="p"
              size="lg"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              Resuelve puzzles Sudoku y genera pruebas criptográficas
              verificables en blockchain
            </Text>
          </Box>

          {/* Cards Grid */}
          <Box direction="row" gap="lg" style={{ flexWrap: "wrap" }}>
            {/* Card Configuración */}
            <div className="gameCard">
              <Text as="h3" size="lg">
                ⚙️ Configuración
              </Text>
              <ContractConfig />
              <PrizePool />
            </div>

            {/* Card Principal */}
            <div className="gameCard mainCard">
              <Text as="h3" size="lg">
                🎮 Puzzle Sudoku
              </Text>
              <Sudoku />
            </div>
          </Box>
        </Box>
      </Layout.Inset>
    </Layout.Content>
  );
};
```

```css
/* CSS para las cards */
.gameCard {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  flex: 1;
  min-width: 300px;
}

.mainCard {
  flex: 2;
  min-width: 500px;
}

@media (max-width: 768px) {
  .gameCard,
  .mainCard {
    flex: 1;
    min-width: 280px;
  }
}
```

---

## 🌈 Personalización de Temas

### Caso 5: Tema Gaming/Neón

```css
/* src/index.css - Tema gaming */
:root {
  --gaming-bg: #0f0f23;
  --gaming-primary: #ff0080; /* Rosa neón */
  --gaming-secondary: #00ff41; /* Verde neón */
  --gaming-accent: #0080ff; /* Azul neón */
  --gaming-glow: #ff008080; /* Rosa transparente */
  --gaming-text: #ffffff;
  --gaming-surface: #1a1a2e;
}

body {
  background: var(--gaming-bg);
  color: var(--gaming-text);
}

/* Aplicar al Sudoku */
.sudokuGrid {
  border: 3px solid var(--gaming-primary);
  background: var(--gaming-surface);
  box-shadow:
    0 0 20px var(--gaming-glow),
    inset 0 0 20px rgba(255, 0, 128, 0.1);
  border-radius: 12px;
}

.sudokuCell {
  background: var(--gaming-surface);
  color: var(--gaming-text);
  border: 1px solid #333366;
}

.sudokuCell:focus {
  border-color: var(--gaming-primary);
  box-shadow:
    inset 0 0 0 2px var(--gaming-primary),
    0 0 15px var(--gaming-glow);
}

.sudokuCell.locked {
  background: #2a1b3d;
  color: var(--gaming-secondary);
  text-shadow: 0 0 5px var(--gaming-secondary);
}
```

### Caso 6: Tema Minimalista/Clean

```css
/* src/index.css - Tema minimalista */
:root {
  --clean-white: #ffffff;
  --clean-gray-50: #f9fafb;
  --clean-gray-100: #f3f4f6;
  --clean-gray-200: #e5e7eb;
  --clean-gray-600: #4b5563;
  --clean-gray-900: #111827;
  --clean-blue: #3b82f6;
  --clean-radius: 8px;
  --clean-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sudokuContainer {
  background: var(--clean-white);
  border-radius: var(--clean-radius);
  box-shadow: var(--clean-shadow);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
}

.sudokuGrid {
  border: 1px solid var(--clean-gray-200);
  background: transparent;
  border-radius: var(--clean-radius);
}

.sudokuCell {
  background: var(--clean-white);
  border: 1px solid var(--clean-gray-200);
  color: var(--clean-gray-900);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.sudokuCell:hover:not(.locked) {
  background: var(--clean-gray-50);
  border-color: var(--clean-blue);
}

.sudokuCell.locked {
  background: var(--clean-gray-100);
  color: var(--clean-gray-600);
}
```

---

## 📱 Adaptaciones Responsive

### Caso 7: Mobile-First Design

```css
/* src/components/Sudoku.module.css - Mobile first */
.sudokuContainer {
  padding: 1rem;
  margin: 1rem 0;
}

.sudokuGrid {
  grid-template-columns: repeat(9, 35px);
  grid-template-rows: repeat(9, 35px);
  max-width: 100%;
  margin: 0 auto;
}

.sudokuCell {
  width: 35px;
  height: 35px;
  font-size: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .sudokuContainer {
    padding: 2rem;
    margin: 2rem 0;
  }

  .sudokuGrid {
    grid-template-columns: repeat(9, 45px);
    grid-template-rows: repeat(9, 45px);
  }

  .sudokuCell {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .sudokuGrid {
    grid-template-columns: repeat(9, 55px);
    grid-template-rows: repeat(9, 55px);
  }

  .sudokuCell {
    width: 55px;
    height: 55px;
    font-size: 22px;
  }
}
```

### Caso 8: Layout Adaptativo

```tsx
// Hook para detectar tamaño de pantalla
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

// Componente adaptativo
const AdaptiveHome: React.FC = () => {
  const screenSize = useScreenSize();

  const layoutDirection = screenSize === "mobile" ? "column" : "row";
  const sidebarWidth = screenSize === "desktop" ? "300px" : "100%";

  return (
    <Layout.Content>
      <Layout.Inset>
        <Box direction={layoutDirection} gap="lg">
          <Box style={{ width: sidebarWidth }}>
            <ContractConfig />
            <PrizePool />
          </Box>
          <Box style={{ flex: 1 }}>
            <Sudoku />
          </Box>
        </Box>
      </Layout.Inset>
    </Layout.Content>
  );
};
```

---

## 🎯 Plantillas Listas para Usar

### Plantilla 1: Tema Corporativo Azul

```css
:root {
  --corp-primary: #1e40af;
  --corp-secondary: #3b82f6;
  --corp-accent: #60a5fa;
  --corp-surface: #f8fafc;
  --corp-text: #1e293b;
  --corp-border: #cbd5e1;
}
```

### Plantilla 2: Tema Gaming Púrpura

```css
:root {
  --gaming-bg: #0f0617;
  --gaming-primary: #8b5cf6;
  --gaming-secondary: #a78bfa;
  --gaming-accent: #c4b5fd;
  --gaming-surface: #1e1b31;
  --gaming-glow: #8b5cf680;
}
```

### Plantilla 3: Tema Eco Verde

```css
:root {
  --eco-primary: #059669;
  --eco-secondary: #10b981;
  --eco-accent: #34d399;
  --eco-surface: #f0fdf4;
  --eco-text: #064e3b;
  --eco-border: #bbf7d0;
}
```

### Plantilla 4: Tema Sunset Naranja

```css
:root {
  --sunset-primary: #ea580c;
  --sunset-secondary: #fb923c;
  --sunset-accent: #fdba74;
  --sunset-surface: #fff7ed;
  --sunset-text: #9a3412;
  --sunset-border: #fed7aa;
}
```

---

## 🚀 Comandos de Desarrollo

```bash
# Iniciar desarrollo
npm run dev

# Aplicar linting
npm run lint

# Formatear código
npm run format

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

---

## 📝 Notas Finales

- **Siempre prueba en diferentes dispositivos** después de hacer cambios
- **Mantén backup** de los archivos originales antes de modificar
- **Usa variables CSS** para cambios de colores globales
- **Respeta la funcionalidad** del Sudoku (no modifiques nth-child)
- **Documenta tus cambios** para futuros desarrolladores

---

_Estas plantillas y casos de uso cubren el 90% de las modificaciones comunes. Combínalas según tus necesidades._
