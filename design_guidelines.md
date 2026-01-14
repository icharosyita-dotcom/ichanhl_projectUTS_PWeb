# Hijabrn Skin Analyst - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from beauty tech leaders like Sephora, Glossier, and Fenty Beauty - applications that combine sophisticated aesthetics with technical functionality. The design should balance elegant femininity with modern credibility, making camera-based skin analysis feel both trustworthy and delightful.

## Core Design Principles

1. **Elegant Credibility**: Beauty technology requires both visual appeal and professional trust
2. **Cultural Sensitivity**: Respectful, inclusive design for hijab-wearing community
3. **Progressive Disclosure**: Guide users smoothly from welcome → analysis → recommendations → purchase
4. **Photographic Quality**: Since camera is central, treat all imagery with high visual standards

---

## Typography System

**Primary Font**: Poppins (body, UI elements, descriptions)
- Headings: 600 weight
- Body: 400 weight  
- Small text/labels: 300 weight

**Display Font**: Playfair Display (hero headlines, section titles)
- Hero: 700 weight, italic for emphasis
- Section headers: 700 weight, regular

**Hierarchy**:
- Hero headline: text-6xl md:text-8xl
- Section titles: text-3xl md:text-4xl
- Subsections: text-2xl md:text-3xl
- Body: text-base md:text-lg
- Captions: text-sm

---

## Layout System

**Spacing Primitives**: Use Tailwind units 2, 4, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24
- Component spacing: space-y-8 or space-y-12
- Card padding: p-6 or p-8
- Button padding: px-8 py-3

**Container Widths**:
- Full sections: max-w-7xl mx-auto
- Content areas: max-w-4xl mx-auto
- Video/camera: max-w-md mx-auto
- Recommendation grid: max-w-6xl mx-auto

---

## Component Library

### Welcome/Hero Section
- Full viewport height (min-h-screen) with centered content
- Gradient background: soft pink-to-white gradient (bg-gradient-to-br from-pink-50 to-white)
- Hero headline with typing animation effect
- Subheadline explaining the service value
- Large, prominent CTA button
- Subtle decorative elements (abstract shapes or beauty-related iconography)

### Camera Analysis Section
- Centered layout with clear instruction hierarchy
- Video feed: Rounded corners (rounded-2xl), subtle shadow (shadow-xl)
- Camera frame: Add decorative border or face guide overlay
- Capture button: Large, prominent, pink with white text
- Loading state: Elegant animation during analysis
- Privacy reassurance text below camera

### Results Display
- Celebratory micro-moment (subtle animation on reveal)
- Undertone badge: Large, clear typography with subtle background
- Explanation card: Soft background (bg-pink-50), rounded (rounded-xl), padding (p-8)
- Scientific credibility: Brief explanation of undertone classification

### Hijab Recommendations Grid
- 3-column grid on desktop (grid-cols-1 md:grid-cols-3)
- Cards with:
  - High-quality hijab product images (rounded-xl)
  - Color name as headline (text-xl font-semibold)
  - Color category label (badge style: text-sm, rounded-full, px-3 py-1)
  - "Add to Cart" button per card
  - Hover state: Gentle lift (transform hover:scale-105)
  - Card background: white with shadow (shadow-md hover:shadow-xl)

### Shopping Cart
- Sticky cart indicator (fixed bottom-right on desktop)
- Cart drawer/modal with:
  - Item list with thumbnails
  - Remove functionality
  - Shopee checkout CTA (prominent, branded)
  - Empty state illustration

### Navigation (if added)
- Minimal top bar with logo left, minimal links right
- Transparent on hero, solid white with shadow on scroll

### Buttons
- Primary: bg-pink-500 with hover:bg-pink-600, rounded-full
- Secondary: border-2 border-pink-500 text-pink-500, rounded-full
- On images/hero: bg-white/80 backdrop-blur-sm text-pink-600

### Cards
- Standard: bg-white rounded-xl shadow-md p-6
- Featured: bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-lg p-8
- Interactive: Add hover:shadow-xl transition-shadow

---

## Images

### Hero Section
**Large decorative background image**: Consider abstract beauty imagery - close-up of fabric textures, elegant hijab draping, or abstract pink/cream gradients. Image should be subtle and not compete with text.
- Position: Absolute background, low opacity (opacity-20 to opacity-40)
- Alternative: Use gradient instead of image for cleaner aesthetic

### Product Recommendations
**Hijab product images**: Each recommendation needs high-quality product photography
- Style: Clean, well-lit product shots on white/neutral backgrounds
- Aspect ratio: Square (1:1) for grid consistency
- All images should show hijab fabric texture and color clearly

### Trust Indicators
**Optional comfort imagery**: Smiling women wearing hijabs in results section to add warmth and relatability
- Position: Circular avatars (rounded-full) in testimonial-style layout
- Size: Small (w-12 h-12 or w-16 h-16)

---

## Visual Enhancements

**Subtle Animations** (use sparingly):
- Hero typing animation (as provided)
- Fade-in on results reveal (fade-up animation)
- Card hover states (subtle scale)
- Avoid: Excessive scroll animations, distracting movements

**Shadows & Depth**:
- Cards: shadow-md default, shadow-xl on hover
- Video frame: shadow-2xl for prominence
- Floating elements: shadow-lg

**Borders & Dividers**:
- Soft dividers: border-pink-100
- Input fields: border-2 border-pink-200 focus:border-pink-500
- Section separators: Use spacing instead of lines

**Icons** (use Heroicons):
- Camera icon next to analysis button
- Shopping cart icon for cart button
- Checkmark for completed steps
- Color swatch icons in recommendations

---

## Interaction Patterns

**Camera Permission Flow**:
1. Clear explanation before requesting permission
2. Fallback UI if camera denied
3. Loading state during capture/analysis

**Analysis Journey**:
1. Welcome screen (static, inviting)
2. Camera activation (clear instructions)
3. Capture moment (visual feedback)
4. Analysis loading (elegant spinner, ~2-3s for credibility)
5. Results reveal (celebratory transition)

**Recommendation Interaction**:
- Hover on cards shows color details
- Click to add to cart (immediate visual feedback)
- Cart icon updates with count badge

---

## Responsive Behavior

**Mobile (base)**:
- Single column layouts
- Full-width camera video
- Stack recommendation cards
- Fixed bottom cart button

**Tablet (md:)**:
- 2-column recommendation grid
- Larger camera preview
- Side-by-side layouts where appropriate

**Desktop (lg:)**:
- 3-column recommendation grid
- Spacious layouts with ample whitespace
- Sticky navigation if implemented

---

## Accessibility

- Maintain WCAG AA contrast (pink-500 on white passes)
- Camera permission clearly explained
- Loading states announced
- Keyboard navigation for all interactions
- Alt text for all hijab product images
- Focus indicators: focus:ring-2 focus:ring-pink-500 focus:ring-offset-2