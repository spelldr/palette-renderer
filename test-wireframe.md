# Wireframe Debug Matrix

This file is for visual QA of `palette-wireframe` token usage and swatch coverage.
Expected swatch chip count when `include-swatch: true` is **17**.

## 1) Full Debug Theme (all tokens unique)

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #1A1AFF
surface-raised: #00D1FF
surface-sunken: #7C3AED
surface-border: #FF7A00
text-primary: #00A83A
text-secondary: #E84F3B
text-inverse: #F4F400
accent-primary: #FF00A8
accent-secondary: #00FFC8
accent-link: #FFE600
focus-ring: #00FF00
button-primary-background: #FF1493
button-primary-color: #00FFFF
button-secondary-background: #8A2BE2
button-secondary-color: #FFD700
shadow-color: rgba(255, 0, 0, 0.7)
overlay-background: rgba(0, 255, 0, 0.55)
include-swatch: true
enable-tooltip: true
```

## 2) Swatch Off Control

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #1A1AFF
surface-raised: #00D1FF
surface-sunken: #7C3AED
surface-border: #FF7A00
text-primary: #00A83A
text-secondary: #E84F3B
text-inverse: #F4F400
accent-primary: #FF00A8
accent-secondary: #00FFC8
accent-link: #FFE600
focus-ring: #00FF00
button-primary-background: #FF1493
button-primary-color: #00FFFF
button-secondary-background: #8A2BE2
button-secondary-color: #FFD700
shadow-color: rgba(255, 0, 0, 0.7)
overlay-background: rgba(0, 255, 0, 0.55)
include-swatch: false
enable-tooltip: true
```

## 3) One-Token Highlight Variations

Each block uses neutral grays for all color tokens except one hot token color.
If a token is represented in the swatch strip, you should see one very bright chip.

### surface-base highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #FF00FF
surface-raised: #B0B0B0
surface-sunken: #A0A0A0
surface-border: #909090
text-primary: #808080
text-secondary: #707070
text-inverse: #606060
accent-primary: #505050
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### surface-raised highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #FF00FF
surface-sunken: #A0A0A0
surface-border: #909090
text-primary: #808080
text-secondary: #707070
text-inverse: #606060
accent-primary: #505050
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### surface-sunken highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #FF00FF
surface-border: #909090
text-primary: #808080
text-secondary: #707070
text-inverse: #606060
accent-primary: #505050
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### surface-border highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #FF00FF
text-primary: #808080
text-secondary: #707070
text-inverse: #606060
accent-primary: #505050
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### text-primary highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #FF00FF
text-secondary: #707070
text-inverse: #606060
accent-primary: #505050
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### text-secondary highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #FF00FF
text-inverse: #606060
accent-primary: #505050
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### text-inverse highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #FF00FF
accent-primary: #505050
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### accent-primary highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #FF00FF
accent-secondary: #404040
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### accent-secondary highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #FF00FF
accent-link: #303030
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### accent-link highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #FF00FF
focus-ring: #202020
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### focus-ring highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #202020
focus-ring: #FF00FF
button-primary-background: #101010
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### button-primary-background highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #202020
focus-ring: #101010
button-primary-background: #FF00FF
button-primary-color: #C0C0C0
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### button-primary-color highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #202020
focus-ring: #101010
button-primary-background: #C0C0C0
button-primary-color: #FF00FF
button-secondary-background: #D0D0D0
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### button-secondary-background highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #202020
focus-ring: #101010
button-primary-background: #C0C0C0
button-primary-color: #D0D0D0
button-secondary-background: #FF00FF
button-secondary-color: #E0E0E0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### button-secondary-color highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #202020
focus-ring: #101010
button-primary-background: #C0C0C0
button-primary-color: #D0D0D0
button-secondary-background: #E0E0E0
button-secondary-color: #FF00FF
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### shadow-color highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #202020
focus-ring: #101010
button-primary-background: #C0C0C0
button-primary-color: #D0D0D0
button-secondary-background: #E0E0E0
button-secondary-color: #F0F0F0
shadow-color: rgba(255, 0, 255, 0.9)
overlay-background: rgba(96, 96, 96, 0.5)
include-swatch: true
enable-tooltip: true
```

### overlay-background highlighted

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #B0B0B0
surface-raised: #A0A0A0
surface-sunken: #909090
surface-border: #808080
text-primary: #707070
text-secondary: #606060
text-inverse: #505050
accent-primary: #404040
accent-secondary: #303030
accent-link: #202020
focus-ring: #101010
button-primary-background: #C0C0C0
button-primary-color: #D0D0D0
button-secondary-background: #E0E0E0
button-secondary-color: #F0F0F0
shadow-color: rgba(128, 128, 128, 0.5)
overlay-background: rgba(255, 0, 255, 0.9)
include-swatch: true
enable-tooltip: true
```

## 4) Optional/Sparse Property Coverage

These tests validate fallback behavior when only a few properties are provided.
Expected chip count should match the number of recognized color tokens explicitly provided in the block.
Non-color properties like `radius-base` and `space-unit` should affect layout but do not add swatch chips.

### no color properties (control)

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
include-swatch: true
enable-tooltip: true
```

### one property: accent-primary only

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
accent-primary: #FF00FF
include-swatch: true
enable-tooltip: true
```

### one property: surface-base only

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #00E5FF
include-swatch: true
enable-tooltip: true
```

### one property: text-primary only

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
text-primary: #FF7A00
include-swatch: true
enable-tooltip: true
```

### two properties: accent-primary + accent-secondary

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
accent-primary: #FF00FF
accent-secondary: #00FFC8
include-swatch: true
enable-tooltip: true
```

### two properties: surface-base + text-primary

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #1A1AFF
text-primary: #F4F400
include-swatch: true
enable-tooltip: true
```

### three properties: surface + text + link

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-base: #1A1AFF
text-secondary: #E84F3B
accent-link: #FFE600
include-swatch: true
enable-tooltip: true
```

### four properties: both buttons

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
button-primary-background: #FF1493
button-primary-color: #00FFFF
button-secondary-background: #8A2BE2
button-secondary-color: #FFD700
include-swatch: true
enable-tooltip: true
```

### five properties: layout + border + radius + spacing + shadow

Expected chips: **3** (`surface-sunken`, `surface-border`, `shadow-color`)

- [x] Swatch check
- [x] Wireframe check
- [x] Expected chip count matches

```palette-wireframe
surface-sunken: #7C3AED
surface-border: #FF7A00
radius-base: 14px
space-unit: 12px
shadow-color: rgba(255, 0, 0, 0.7)
include-swatch: true
enable-tooltip: true
```

## 5) Non-Color Property Coverage

These tests isolate non-color behavior (`radius-base`, `space-unit`, `border-width`, option flags).
Expected chip count should only reflect explicitly provided color tokens.

What to verify in this section:
- `radius-base` changes corner roundness on panels, pills, and overlay.
- `space-unit` changes spacing/padding and overall visual density.
- `border-width` changes border thickness on panels, overlay, accents, and both buttons.
- `include-swatch` and `enable-tooltip` only change behavior, not theme colors.

### radius-base only

Expected chips: **0**

- [ ] Swatch check
- [ ] Wireframe check
- [ ] Expected chip count matches

```palette-wireframe
radius-base: 18px
include-swatch: true
enable-tooltip: true
```

### space-unit only

Expected chips: **0**

- [ ] Swatch check
- [ ] Wireframe check
- [ ] Expected chip count matches

```palette-wireframe
space-unit: 14px
include-swatch: true
enable-tooltip: true
```

### border-width only

Expected chips: **0**

- [ ] Swatch check
- [ ] Wireframe check
- [ ] Expected chip count matches

```palette-wireframe
border-width: 4px
include-swatch: true
enable-tooltip: true
```

### border-width + surface-border

Expected chips: **1** (`surface-border`)

- [ ] Swatch check
- [ ] Wireframe check
- [ ] Expected chip count matches

```palette-wireframe
border-width: 4px
surface-border: #FF5A00
include-swatch: true
enable-tooltip: true
```

### radius + space + border-width combo

Expected chips: **1** (`surface-border`)

- [ ] Swatch check
- [ ] Wireframe check
- [ ] Expected chip count matches

```palette-wireframe
radius-base: 16px
space-unit: 14px
border-width: 3px
surface-border: #00D1FF
include-swatch: true
enable-tooltip: true
```

### tooltip off control

Expected chips: **2** (`surface-base`, `accent-link`) and no hover tooltips

- [ ] Swatch check
- [ ] Wireframe check
- [ ] Expected chip count matches

```palette-wireframe
surface-base: #1A1AFF
accent-link: #FFE600
include-swatch: true
enable-tooltip: false
```

### tooltip on control

Expected chips: **2** (`surface-base`, `accent-link`) and hover tooltips enabled

- [ ] Swatch check
- [ ] Wireframe check
- [ ] Expected chip count matches

```palette-wireframe
surface-base: #1A1AFF
accent-link: #FFE600
include-swatch: true
enable-tooltip: true
```


