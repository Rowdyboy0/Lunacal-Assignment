# Design Guidelines: Interactive Portfolio Widget Interface

## Design Approach

**Selected Approach:** Custom Interactive Experience with Modern Dashboard Influences

Drawing inspiration from modern portfolio platforms like Bento.me and Read.cv, combined with experimental interactive web experiences. This project requires a unique visual identity with heavy emphasis on micro-interactions and playful animation.

**Core Principle:** Create a captivating, memorable interface through rare color choices, smooth animations, and delightful interactive feedback.

---

## Color Palette

### Primary Colors (Dark Mode)
- **Background:** 220 15% 8% (deep charcoal blue)
- **Widget Background:** 220 12% 12% (elevated surface)
- **Widget Border:** 220 10% 20% (subtle border)

### Accent Colors (Rare/Unique)
- **Primary Accent:** 280 65% 60% (vibrant purple-magenta)
- **Secondary Accent:** 170 55% 45% (teal-cyan)
- **Tertiary Accent:** 35 75% 55% (warm amber)
- **Hover State:** 280 70% 70% (lighter purple)

### Text Colors
- **Primary Text:** 220 10% 95% (near white)
- **Secondary Text:** 220 8% 65% (muted gray)
- **Tab Inactive:** 220 6% 50% (dim gray)

### Interactive Elements
- **Active Tab Underline:** Use Primary Accent
- **Button Background:** 280 65% 60% with 15% opacity
- **Button Hover:** 280 65% 60% with 25% opacity

---

## Typography

**Font Stack:**
- **Primary:** 'Inter' or 'DM Sans' (Google Fonts)
- **Accent/Headers:** 'Space Grotesk' (Google Fonts)

**Text Hierarchy:**
- Widget Title: 18px, font-weight 600, Space Grotesk
- Tab Labels: 14px, font-weight 500, Inter
- Body Text: 14px, font-weight 400, Inter, line-height 1.6
- Gallery Count: 12px, font-weight 500, Inter

---

## Layout System

**Grid Structure:**
- Container: max-w-7xl, mx-auto, px-8
- Two-column layout: 50% blank left / 50% widgets right
- Responsive breakpoint: 768px (below this, single column with widgets)

**Spacing Primitives:** Use Tailwind units of 3, 4, 6, 8
- Widget padding: p-6
- Widget gap: gap-6 (between two widgets)
- Section margins: mb-8
- Tab spacing: space-x-6
- Gallery image gap: gap-4

**Widget Alignment:**
- Right column starts at 50% viewport width
- Widgets: w-full within right column, max-w-md
- Vertical alignment: Start from top with py-12

---

## Component Specifications

### Widget Container
- Background: Widget Background color
- Border: 1px solid Widget Border
- Border radius: rounded-2xl
- Shadow: subtle glow using box-shadow with Primary Accent at 5% opacity
- Padding: p-6
- Backdrop blur: Optional subtle backdrop-filter blur for depth

### First Widget - Tabbed Content

**Tab Navigation:**
- Horizontal flex layout with space-x-6
- Tab button: Transparent background, Tab Inactive color
- Active tab: Primary Text color with 2px bottom border (Primary Accent)
- Hover effect: Smooth color transition to Secondary Text
- Transition: all 0.3s ease

**Tab Content Area:**
- Padding: pt-6
- Min-height: 200px to prevent layout shift
- Fade-in animation when switching tabs (0.2s ease)

### Second Widget - Gallery

**Header:**
- Flex justify-between items-center
- Title: Widget Title styling, left-aligned
- Add Image button: Right-aligned, Primary Accent background with 15% opacity, rounded-lg, px-4 py-2, hover increases opacity to 25%

**Image Display:**
- Grid: 3 columns (grid-cols-3), gap-4
- Image containers: aspect-square, rounded-lg, overflow-hidden
- Images: object-cover, w-full h-full
- Border: 1px solid Widget Border on hover

**Navigation Controls:**
- Left/Right arrows: Positioned top-right (next to Add Image)
- Icon buttons: 32px × 32px, rounded-full, Secondary Accent color
- Hover: Background with Secondary Accent at 10% opacity

**Scroll Bar:**
- Custom styled: 4px height, rounded-full
- Track: Widget Border color
- Thumb: Primary Accent color, rounded-full
- Width: Full widget width minus padding

---

## Interactive Animations

### Cursor Effects
- **Star Trail:** Generate small star SVG elements (8-12px) that follow cursor with 100-150ms delay
- Stars fade out over 0.8s using opacity animation
- Maximum 15 stars visible at once
- Star color: Rotate between Primary, Secondary, and Tertiary Accents
- Z-index: High value to appear above all content

### Click Sound
- Use Web Audio API
- Subtle "click" sound (synthesized or short audio file)
- Trigger on button clicks, tab switches, and image additions
- Volume: 0.3 (subtle, not overwhelming)

### Micro-interactions
- Tab switch: Smooth slide indicator animation (0.3s cubic-bezier)
- Button hover: Scale 1.02, brightness 110% (0.2s ease)
- Image hover: Scale 1.05 within container (0.3s ease-out)
- Add image: Brief scale pulse animation on gallery container

---

## Accessibility & Responsiveness

**Responsive Behavior (>768px):**
- Maintain 50/50 split
- Scale spacing proportionally (use Tailwind's responsive modifiers)
- Widgets maintain max-w-md for optimal readability

**Responsive Behavior (<768px):**
- Single column layout
- Widgets: w-full, max-w-lg centered
- Left blank space disappears
- Gallery: Consider 2-column grid for better mobile fit

**Accessibility:**
- Tab navigation: Keyboard accessible with focus states
- Focus indicator: 2px outline using Primary Accent
- ARIA labels for icon-only buttons
- Alt text for gallery images
- Reduced motion: Disable star trail for users with prefers-reduced-motion

---

## Polish Details

- All interactive elements have smooth transitions (0.2-0.3s)
- Consistent border radius (rounded-2xl for containers, rounded-lg for buttons)
- Hover states always provide visual feedback
- Loading states for image additions (subtle spinner or skeleton)
- Empty state for gallery: Placeholder text encouraging image addition
- Tab content should maintain consistent height to prevent jarring layout shifts