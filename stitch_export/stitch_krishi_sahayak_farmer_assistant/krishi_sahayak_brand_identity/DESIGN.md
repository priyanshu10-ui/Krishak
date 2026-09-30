---
name: Krishi Sahayak Brand Identity
colors:
  surface: '#f8faf9'
  surface-dim: '#d9dad9'
  surface-bright: '#f8faf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f3'
  surface-container: '#edeeed'
  surface-container-high: '#e7e8e7'
  surface-container-highest: '#e1e3e2'
  on-surface: '#191c1c'
  on-surface-variant: '#42493e'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#f0f1f0'
  outline: '#72796e'
  outline-variant: '#c2c9bb'
  surface-tint: '#3b6934'
  primary: '#154212'
  on-primary: '#ffffff'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#a1d494'
  secondary: '#895100'
  on-secondary: '#ffffff'
  secondary-container: '#ffa536'
  on-secondary-container: '#6c3f00'
  tertiary: '#253f23'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b5739'
  on-tertiary-container: '#accba5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#ffdcbc'
  secondary-fixed-dim: '#ffb86c'
  on-secondary-fixed: '#2c1700'
  on-secondary-fixed-variant: '#683c00'
  tertiary-fixed: '#cbebc3'
  tertiary-fixed-dim: '#afcfa9'
  on-tertiary-fixed: '#062108'
  on-tertiary-fixed-variant: '#324d30'
  background: '#f8faf9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e2'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  unit-1: 0.25rem
  unit-2: 0.5rem
  unit-4: 1rem
  unit-6: 1.5rem
  unit-8: 2rem
  container-margin: 1.25rem
  gutter: 1rem
---

## Brand & Style

The brand personality of this design system is built on the pillars of **reliability, growth, and accessibility**. It is designed to serve as a digital companion to the farmer, bridging the gap between traditional agricultural wisdom and modern data-driven insights. The UI must feel like a tool—sturdy, dependable, and precise—while remaining warm and inviting to encourage daily engagement.

The aesthetic direction follows a **Modern / Tactile** hybrid style. It utilizes the clean layouts of modern minimalism but introduces subtle organic depth through soft shadows and tonal layering to mimic the grounded nature of the physical world. The goal is to evoke a sense of calm confidence, ensuring that critical information (like weather alerts or soil health) is processed without cognitive strain.

## Colors

The palette is rooted in the natural lifecycle of a crop. **Primary Green** represents deep-rooted trust and the vitality of healthy vegetation. **Harvest Amber** is used sparingly for secondary actions and high-priority highlights, symbolizing the warmth of the sun and the reward of the harvest. 

Clean whites and soft stone-grays provide a high-contrast canvas, ensuring legibility under direct sunlight—a critical requirement for field work. Success and error states are handled with semantic colors that are slightly desaturated to maintain the "grounded" professional aesthetic.

## Typography

This design system prioritizes absolute clarity. **Lexend** is utilized for headlines; its unique geometric structure was specifically designed to improve reading proficiency, making it ideal for an accessible assistant tool. 

**Public Sans** is used for all body copy and data labels. As a typeface designed for government and institutional use, it brings a sense of official authority and remains exceptionally legible even at smaller scales or on lower-resolution screens. Line heights are intentionally generous to accommodate translated text, which often varies in length.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model designed for mobile-first utility. A standard 4-column grid is used for mobile devices, expanding to 8 or 12 for tablet views. 

The rhythm is governed by an 8px baseline grid to ensure vertical harmony. To account for use in outdoor environments where dexterity might be limited, the "safe area" for touch targets is strictly maintained at a minimum of 48px. Margins are set to 20px (1.25rem) to provide a comfortable frame that prevents accidental edge-taps.

## Elevation & Depth

Hierarchy in this design system is established through **Tonal Layers** rather than dramatic shadows. Surfaces are stacked using subtle shifts in background color (e.g., a white card on a soft stone background).

Where depth is required to indicate interactivity, use **Ambient Shadows**. These shadows should be diffused and low-opacity, with a slight tint of the primary green (#2D5A27) in the shadow color to prevent a "dirty" gray appearance. This creates a soft, organic lift that feels integrated with the environment. Interactive elements like floating action buttons (FABs) use a medium elevation to stay prominent over map or data views.

## Shapes

The shape language is **Rounded (Level 2)**. A base radius of 8px (0.5rem) is applied to standard components like input fields and cards. This curvature strikes a balance between the precision of a professional tool and the approachability of a helpful assistant. 

Larger containers and bottom sheets utilize a 24px (1.5rem) radius on top corners to create a "nested" feel. Buttons use a semi-pill shape (1rem radius) to clearly distinguish them from informational cards, signaling their role as touch-ready action elements.

## Components

### Buttons & Inputs
Primary buttons utilize the Primary Green with white text for maximum contrast. Secondary actions use an outlined style with a 1.5px stroke. Input fields must feature persistent labels to ensure the user never loses context, especially when entering complex data like soil pH or crop acreage.

### Cards
Cards are the primary vehicle for information. They should use a white background with a very subtle 1px border in a light stone tint. Weather cards should incorporate iconography that is thick-stroked and highly legible.

### Progress & Status
Since farming is a process, use "Growth Bars"—custom progress indicators that use the secondary amber color to show completion of tasks or crop cycles.

### Chips & Tags
Chips are used for filtering crop types or status (e.g., "Ready for Harvest"). They use a soft tertiary green background with dark text to remain secondary in the visual hierarchy compared to primary action buttons.

### Navigation
A persistent bottom navigation bar provides quick access to the "Dashboard," "Crop Calendar," "Marketplace," and "Profile." Icons should be solid-style for better recognition in high-glare environments.