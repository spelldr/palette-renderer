# Swatch Debug Matrix

This file validates `palette-swatch` behavior for strip mode, card mode, optional fields, and parser edge cases.

## Test Checklist Meaning

- `Render check`: Does anything render as expected?
- `Mode check`: Is it strip mode vs card mode as expected?
- `Count check`: Number of chips/cards matches expectation.

## 1) Hex-Only Strip/Card Behavior

### hex-only default mode (cards)

Expected: **3 cards** (one per hex)

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
#FF4FA8
#3AA8FF
#2FAF66
```

### hex-only with strip mode enabled

Expected: **1 strip** with **3 chips**

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
swatch-only: true
#FF4FA8
#3AA8FF
#2FAF66
```

### strip mode false explicitly

Expected: **3 cards**

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
swatch-only: false
#FF4FA8
#3AA8FF
#2FAF66
```

### swatch-only value case-insensitive

Expected: **1 strip** with **3 chips**

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
swatch-only: TRUE
#FF4FA8
#3AA8FF
#2FAF66
```

## 2) Property Card Mode

### full property card

Expected: **1 card** with custom fields shown

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
hex: #FF4FA8
rgb: 255, 79, 168
ral-id: RAL Classic 4003
ral-name: Heather Violet
luminance: 0.402
contrast-on-white: 2.8
contrast-on-black: 6.9
recommended-text: black
temperature: warm
tone: vivid
```

### minimal property card (hex only)

Expected: **1 card** with only basic identity/band

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
hex: #3AA8FF
```

### property mode ignores swatch-only for card count

Expected: **1 card** (not strip), because property mode returns one swatch object

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
hex: #2FAF66
swatch-only: false
```

## 3) Computed Metrics (Hex-Only Cards)

### auto-computed values for bright color

Expected: metrics/tags auto-populated in card mode

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
#00FFAA
```

### auto-computed values for dark color

Expected: metrics/tags auto-populated; recommended text likely white

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
#1C1D1F
```

## 4) Parser Edge Cases

### missing hex in property mode

Expected: **no render**

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
rgb: 255, 79, 168
ral-id: RAL Classic 4003
```

### mixed hex line + property line (no `hex:` key)

Expected: **no render** (enters property parser; raw hex line is ignored there)

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
#FF4FA8
ral-name: Heather Violet
```

### invalid hex in hex-only block

Expected: **no render** (does not qualify as valid hex-only set; no `hex:` key)

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
#FF4FA8
#GGGGGG
```

### uppercase option key behavior

Expected: parsed as hex-only content but `swatch-only` option not applied (key is case-sensitive), so renders cards

- [x] Render check
- [x] Mode check
- [x] Count check

```palette-swatch
Swatch-Only: true
#FF4FA8
#3AA8FF
```
