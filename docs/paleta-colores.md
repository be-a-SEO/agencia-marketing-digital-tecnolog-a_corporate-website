---
title: "Paleta de colores y sistema cromático"
description: "Referencia auxiliar del sistema de color, tokens CSS y criterios de accesibilidad visual de Vilanova Agency."
project: "Vilanova Agency"
type: "design-reference"
status: "reference"
version: "1.0.0"
language: "es"
tags:
  - color
  - sistema-diseno
  - accesibilidad
  - tokens-css
---

# Paleta de colores y sistema cromático

Este documento recoge la referencia auxiliar del sistema cromático de Vilanova Agency. Su objetivo es facilitar la reutilización de los colores, los roles semánticos y los criterios básicos de accesibilidad visual sin sustituir al archivo principal de estilos.

La fuente técnica de verdad es `css/style.css`. Este documento explica el criterio de uso y mantiene los valores relevantes en un formato legible y reutilizable.

## Colores base de marca

| Color | Hexadecimal | Token global |
|---|---:|---|
| Azul | `#4285F4` | `--global-brand-blue` |
| Rojo | `#EA4335` | `--global-brand-red` |
| Amarillo | `#FBBC05` | `--global-brand-yellow` |
| Verde | `#34A853` | `--global-brand-green` |

Estos cuatro colores forman la identidad cuatricromática de la marca. En la interfaz no deben usarse como sustituto directo de los roles semánticos salvo en áreas reservadas de identidad, como el logotipo o piezas gráficas de marca.

## Intención visual

- **Azul:** base tecnológica, confianza y estabilidad.
- **Rojo:** energía, dinamismo y énfasis.
- **Amarillo:** creatividad, optimismo e innovación.
- **Verde:** equilibrio, crecimiento y contraste dentro del sistema.

El sistema usa una combinación de tonos vivos y superficies neutras para evitar saturación visual. El color no se aplica de forma decorativa: cada tono debe reforzar jerarquía, legibilidad o reconocimiento de marca.

## Criterio técnico

El sitio toma inspiración de Material Design 3 y del enfoque de roles semánticos. En esta implementación, el sistema se aplica mediante variables CSS estáticas y un cambio manual de tema claro/oscuro.

No se implementa extracción dinámica de color desde el entorno del usuario. Por tanto, cualquier referencia a sistemas dinámicos debe entenderse como inspiración conceptual, no como una funcionalidad activa del proyecto.

## Niveles de tokens

El sistema se organiza en tres niveles:

| Nivel | Función | Ejemplo |
|---|---|---|
| Tokens globales | Guardan valores absolutos de color y escalas tonales. | `--global-brand-blue` |
| Tokens semánticos | Asignan roles de interfaz según el tema. | `--sys-color-primary` |
| Tokens de componente | Permiten que un componente use roles sin acoplarse a un color concreto. | `--comp-button-primary-background` |

## Tokens globales de identidad

```css
:root {
  --global-brand-blue: #4285F4;
  --global-brand-red: #EA4335;
  --global-brand-yellow: #FBBC05;
  --global-brand-green: #34A853;
}
```

## Escalas tonales

Cada color principal se descompone en una escala tonal. Los niveles bajos son más oscuros y los altos más claros.

| Rango | Uso habitual |
|---|---|
| `0`-`20` | Texto o fondos muy oscuros. |
| `30`-`50` | Tonos principales en tema claro. |
| `60`-`80` | Tonos principales en tema oscuro. |
| `90`-`100` | Contenedores claros, texto claro o superficies muy luminosas. |

Ejemplo simplificado de la escala azul:

```css
:root {
  --global-palette-blue-10: #001d36;
  --global-palette-blue-40: #1963a4;
  --global-palette-blue-80: #a8cfff;
  --global-palette-blue-90: #d5e3ff;
  --global-palette-blue-100: #ffffff;
}
```

## Roles semánticos

Los componentes deben consumir roles semánticos, no colores fijos.

| Rol | Uso |
|---|---|
| `--sys-color-primary` | Acciones principales, enlaces destacados y elementos de mayor peso. |
| `--sys-color-secondary` | Apoyos visuales y componentes secundarios. |
| `--sys-color-tertiary` | Acentos complementarios. |
| `--sys-color-error` | Errores, validaciones negativas y alertas. |
| `--sys-color-surface` | Fondo general. |
| `--sys-color-on-surface` | Texto principal sobre fondo general. |
| `--sys-color-surface-variant` | Tarjetas, contenedores y bloques secundarios. |
| `--sys-color-on-surface-variant` | Texto sobre superficies secundarias. |

## Mapeo de tema oscuro

El tema oscuro es el modo por defecto del sitio.

```css
:root,
[data-theme="dark"] {
  --sys-color-primary: var(--global-palette-blue-80);
  --sys-color-on-primary: var(--global-palette-blue-20);
  --sys-color-primary-container: var(--global-palette-blue-30);
  --sys-color-on-primary-container: var(--global-palette-blue-90);

  --sys-color-secondary: var(--global-palette-green-80);
  --sys-color-on-secondary: var(--global-palette-green-20);

  --sys-color-tertiary: var(--global-palette-yellow-80);
  --sys-color-on-tertiary: var(--global-palette-yellow-20);

  --sys-color-error: var(--global-palette-red-80);
  --sys-color-on-error: var(--global-palette-red-20);

  --sys-color-surface: #000000;
  --sys-color-on-surface: #ffffff;
  --sys-color-surface-variant: #111111;
  --sys-color-on-surface-variant: #e0e0e0;
}
```

## Mapeo de tema claro

```css
[data-theme="light"] {
  --sys-color-primary: var(--global-palette-blue-40);
  --sys-color-on-primary: var(--global-palette-blue-100);
  --sys-color-primary-container: var(--global-palette-blue-90);
  --sys-color-on-primary-container: var(--global-palette-blue-10);

  --sys-color-secondary: var(--global-palette-green-40);
  --sys-color-on-secondary: var(--global-palette-green-100);

  --sys-color-tertiary: var(--global-palette-yellow-40);
  --sys-color-on-tertiary: var(--global-palette-yellow-100);

  --sys-color-error: var(--global-palette-red-40);
  --sys-color-on-error: var(--global-palette-red-100);

  --sys-color-surface: #ffffff;
  --sys-color-on-surface: #000000;
  --sys-color-surface-variant: #f5f5f5;
  --sys-color-on-surface-variant: #333333;
}
```

## Accesibilidad visual

El sistema busca mantener contraste suficiente entre contenedor y contenido.

| Relación | Criterio |
|---|---|
| `primary` / `on-primary` | El texto debe contrastar con la acción principal. |
| `surface` / `on-surface` | El texto principal debe mantener legibilidad en ambos temas. |
| `surface-variant` / `on-surface-variant` | Las tarjetas y bloques secundarios deben conservar contraste suficiente. |
| `error` / `on-error` | Los estados de error deben ser reconocibles y legibles. |

Como regla práctica, cualquier nuevo componente debe usar parejas `color` / `on-color` ya definidas. Si se introduce un nuevo fondo, debe definirse también su color de texto correspondiente.

## Áreas reservadas de identidad

Los elementos de identidad visual no deben heredar roles semánticos si eso altera la marca.

Áreas reservadas:

- Logotipo.
- Favicon.
- Iconos oficiales de marca.
- Piezas gráficas donde los cuatro colores base deban reconocerse sin variación.

En estos casos, los colores corporativos pueden mantenerse como valores fijos dentro del recurso gráfico, especialmente en SVG.

## Uso recomendado

- Usar tokens semánticos en componentes de interfaz.
- Evitar hexadecimales directos en botones, tarjetas, enlaces o textos comunes.
- Reservar los colores puros para identidad visual.
- Verificar contraste si se crea un nuevo componente.
- Mantener `css/style.css` como fuente técnica de verdad.
