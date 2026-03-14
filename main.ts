import { Plugin, PluginSettingTab, Setting } from "obsidian"

interface SwatchData {
  hex: string;
  rgb: string;
  ralId: string;
  ralName: string;
  luminance: string;
  contrastOnWhite: string;
  contrastOnBlack: string;
  recommendedText: string;
  temperature: string;
  tone: string;
}

export default class PaletteWireframePlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("palette-swatch", (src, el) => {
      const swatches = this.parseSwatch(src);
      const swatchOnly = this.parseSwatchOnly(src);
      if (swatchOnly) {
        el.appendChild(this.renderSwatchStrip(swatches.map(s => s.hex)));
      } else {
        const wrap = document.createElement("div");
        wrap.className = "psw-group";
        for (const s of swatches) wrap.appendChild(this.renderSwatch(s));
        el.appendChild(wrap);
      }
    });

    this.registerMarkdownCodeBlockProcessor("palette-wireframe", (src, el) => {
      const props = this.parseWireframeProperties(src);
      el.appendChild(this.renderWireframe(props));
    });

    this.addSettingTab(new PaletteSettingTab(this.app, this));
  }

  parseSwatchOnly(src: string): boolean {
    for (const line of src.split("\n")) {
      const colon = line.indexOf(":");
      if (colon === -1) continue;
      const key = line.slice(0, colon).trim();
      const value = line.slice(colon + 1).trim().toLowerCase();
      if (key === "swatch-only") return value === "true";
    }
    return false;
  }

  parseSwatch(src: string): SwatchData[] {
    const lines = src.split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return [];

    const hexOnly = lines.filter(l => /^#[0-9A-Fa-f]{6}$/i.test(l));
    if (lines.every(l => /^#[0-9A-Fa-f]{6}$/i.test(l) || /^swatch-only\s*:/i.test(l))) {
      return hexOnly.map(hex => this.computeSwatchFromHex(hex));
    }

    const props: Record<string, string> = {};
    for (const line of lines) {
      const colon = line.indexOf(":");
      if (colon === -1) continue;
      const key = line.slice(0, colon).trim();
      const value = line.slice(colon + 1).trim();
      if (key) props[key] = value;
    }

    if (!props["hex"]) return [];

    return [{
      hex: props["hex"] ?? "",
      rgb: props["rgb"] ?? "",
      ralId: props["ral-id"] ?? "",
      ralName: props["ral-name"] ?? "",
      luminance: props["luminance"] ?? "",
      contrastOnWhite: props["contrast-on-white"] ?? "",
      contrastOnBlack: props["contrast-on-black"] ?? "",
      recommendedText: props["recommended-text"] ?? "",
      temperature: props["temperature"] ?? "",
      tone: props["tone"] ?? "",
    }];
  }

  private hexToRgb(hex: string): [number, number, number] {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
  }

  private linearize(c: number): number {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }

  private relativeLuminance(r: number, g: number, b: number): number {
    return 0.2126 * this.linearize(r) + 0.7152 * this.linearize(g) + 0.0722 * this.linearize(b);
  }

  private contrastRatio(l1: number, l2: number): number {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  private rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h: number;
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
    return [h, s, l];
  }

  private getTemperature(h: number): string {
    if (h < 70 || h >= 330) return "warm";
    if (h >= 170 && h < 280) return "cool";
    return "neutral";
  }

  private getTone(s: number, l: number): string {
    if (s < 0.15) return "neutral";
    if (s >= 0.5 && l >= 0.2 && l <= 0.8) return "vivid";
    return "muted";
  }

  private computeSwatchFromHex(hex: string): SwatchData {
    const [r, g, b] = this.hexToRgb(hex);
    const lum = this.relativeLuminance(r, g, b);
    const cow = this.contrastRatio(lum, 1.0);
    const cob = this.contrastRatio(lum, 0.0);
    const [h, s, l] = this.rgbToHsl(r, g, b);
    return {
      hex,
      rgb: `${r}, ${g}, ${b}`,
      ralId: "",
      ralName: "",
      luminance: lum.toFixed(3),
      contrastOnWhite: cow.toFixed(1),
      contrastOnBlack: cob.toFixed(1),
      recommendedText: cob >= cow ? "black" : "white",
      temperature: this.getTemperature(h),
      tone: this.getTone(s, l),
    };
  }

  parseWireframeProperties(src: string): Record<string, string> {
    const lines = src.split("\n");
    const props: Record<string, string> = {};

    for (const line of lines) {
      const colon = line.indexOf(":");
      if (colon === -1) continue;
      const key = line.slice(0, colon).trim();
      const value = line.slice(colon + 1).trim();
      if (key && value) {
        props[key] = value;
      }
    }

    return props;
  }

  renderSwatchStrip(hexColors: string[]): HTMLElement {
    const strip = document.createElement("div");
    strip.className = "psw-strip";
    for (const hex of hexColors) {
      const chip = document.createElement("div");
      chip.className = "psw-strip-chip";
      chip.style.background = hex;
      strip.appendChild(chip);
    }
    return strip;
  }

  renderSwatch(s: SwatchData): HTMLElement {
    const card = document.createElement("div");
    card.className = "psw-card";

    const band = document.createElement("div");
    band.className = "psw-band";
    if (s.hex) band.style.background = s.hex;
    card.appendChild(band);

    const body = document.createElement("div");
    body.className = "psw-body";

    const identity = document.createElement("div");
    identity.className = "psw-identity";
    const hexEl = document.createElement("span");
    hexEl.className = "psw-hex";
    hexEl.textContent = s.hex;
    const rgbEl = document.createElement("span");
    rgbEl.className = "psw-rgb";
    if (s.rgb) rgbEl.textContent = `rgb(${s.rgb})`;
    identity.appendChild(hexEl);
    identity.appendChild(rgbEl);
    body.appendChild(identity);

    if (s.ralId) {
      const ral = document.createElement("div");
      ral.className = "psw-ral";
      ral.textContent = s.ralName ? `${s.ralId} · ${s.ralName}` : s.ralId;
      body.appendChild(ral);
    }

    const metrics = document.createElement("div");
    metrics.className = "psw-metrics";
    const addMetric = (label: string, value: string) => {
      const m = document.createElement("div");
      m.className = "psw-metric";
      const lEl = document.createElement("div");
      lEl.className = "psw-metric-label";
      lEl.textContent = label;
      const vEl = document.createElement("div");
      vEl.className = "psw-metric-value";
      vEl.textContent = value;
      m.appendChild(lEl);
      m.appendChild(vEl);
      metrics.appendChild(m);
    };
    if (s.luminance) addMetric("Luminance", s.luminance);
    if (s.contrastOnWhite) addMetric("On white", `${s.contrastOnWhite}:1`);
    if (s.contrastOnBlack) addMetric("On black", `${s.contrastOnBlack}:1`);
    if (s.recommendedText) addMetric("Text", s.recommendedText);
    body.appendChild(metrics);

    const tags = document.createElement("div");
    tags.className = "psw-tags";
    const addTag = (value: string, modifier: string) => {
      const t = document.createElement("span");
      t.className = `psw-tag psw-tag-${modifier}`;
      t.textContent = value;
      tags.appendChild(t);
    };
    if (s.temperature) addTag(s.temperature, s.temperature);
    if (s.tone) addTag(s.tone, s.tone);
    body.appendChild(tags);

    card.appendChild(body);
    return card;
  }

  renderWireframe(props: Record<string, string>): HTMLElement {
    const getProp = (key: string, fallback: string): string => {
      return props[key] ?? fallback;
    };

    // Set up CSS variables for design tokens
    const wrap = document.createElement("div");
    wrap.className = "pwf-layout pwf-isolated";
    wrap.style.setProperty("--surface-base", getProp("surface-base", "#F7F7F5"));
    wrap.style.setProperty("--surface-raised", getProp("surface-raised", "#FFFFFF"));
    wrap.style.setProperty("--surface-sunken", getProp("surface-sunken", "#ECEAE6"));
    wrap.style.setProperty("--surface-border", getProp("surface-border", "#D6D4D0"));
    wrap.style.setProperty("--text-primary", getProp("text-primary", "#1A1A1A"));
    wrap.style.setProperty("--text-secondary", getProp("text-secondary", "#4A4A4A"));
    wrap.style.setProperty("--accent-primary", getProp("accent-primary", "#1A73E8"));
    wrap.style.setProperty("--accent-secondary", getProp("accent-secondary", "#3BAA5C"));
    wrap.style.setProperty("--focus-ring", getProp("focus-ring", "#1A73E8"));
    wrap.style.setProperty("--text-inverse", getProp("text-inverse", "#FFFFFF"));
    wrap.style.setProperty("--accent-link", getProp("accent-link", "#0A4ECF"));
    wrap.style.setProperty("--radius-base", getProp("radius-base", "6px"));
    wrap.style.setProperty("--space-unit", getProp("space-unit", "8px"));
    wrap.style.setProperty("--border-width", getProp("border-width", "1px"));
    wrap.style.setProperty("--shadow-color", getProp("shadow-color", "rgba(0, 0, 0, 0.12)"));
    wrap.style.setProperty("--overlay-background", getProp("overlay-background", "rgba(0, 0, 0, 0.35)"));

    const header = document.createElement("div");
    header.className = "pwf-header";
    header.textContent = "Header";

    const sidebar = document.createElement("div");
    sidebar.className = "pwf-sidebar";
    sidebar.textContent = "Sidebar";

    const main = document.createElement("div");
    main.className = "pwf-main";

    const pageTitle = document.createElement("div");
    pageTitle.className = "pwf-page-title";
    pageTitle.textContent = "Page Title";

    const bodyText = document.createElement("div");
    bodyText.className = "pwf-body-text";
    bodyText.textContent = "Body Text";

    const actions = document.createElement("div");
    actions.className = "pwf-actions";

    const primary = document.createElement("button");
    primary.className = "pwf-btn pwf-btn-primary";
    primary.textContent = "Primary Action";
    primary.style.background = getProp("button-primary-background", "var(--accent-primary)");
    primary.style.color = getProp("button-primary-color", "#FFFFFF");

    const secondary = document.createElement("button");
    secondary.className = "pwf-btn pwf-btn-secondary";
    secondary.textContent = "Secondary Action";
    secondary.style.background = getProp("button-secondary-background", "var(--accent-secondary)");
    secondary.style.color = getProp("button-secondary-color", "#FFFFFF");

    actions.appendChild(primary);
    actions.appendChild(secondary);

    main.appendChild(pageTitle);
    main.appendChild(bodyText);
    main.appendChild(actions);

    const footer = document.createElement("div");
    footer.className = "pwf-footer";
    footer.textContent = "Footer";

    wrap.appendChild(header);
    wrap.appendChild(sidebar);
    wrap.appendChild(main);
    wrap.appendChild(footer);

    const includeSwatch = getProp("include-swatch", "true").toLowerCase() !== "false";
    if (includeSwatch) {
      const swatchColors = [
        getProp("surface-base", ""),
        getProp("surface-raised", ""),
        getProp("surface-sunken", ""),
        getProp("surface-border", ""),
        getProp("text-primary", ""),
        getProp("text-secondary", ""),
        getProp("accent-primary", ""),
        getProp("accent-secondary", ""),
        getProp("accent-link", ""),
      ].filter(Boolean);

      const strip = document.createElement("div");
      strip.className = "pwf-color-strip";
      for (const color of swatchColors) {
        const swatch = document.createElement("div");
        swatch.className = "pwf-color-chip";
        swatch.style.background = color;
        strip.appendChild(swatch);
      }

      const outer = document.createElement("div");
      outer.className = "pwf-with-strip";
      outer.appendChild(strip);
      outer.appendChild(wrap);
      return outer;
    }

    return wrap;
  }
}

class PaletteSettingTab extends PluginSettingTab {
  plugin: PaletteWireframePlugin;

  constructor(app: any, plugin: PaletteWireframePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Palette Renderer" });
    containerEl.createEl("p", { text: "Live preview of swatch and wireframe renderers." });

    // Swatch Demo
    containerEl.createEl("h3", { text: "Swatch Demo" });
    const swatchDemo = containerEl.createDiv();
    const swatchDemoWrap = document.createElement("div");
    swatchDemoWrap.className = "psw-group";
    for (const s of [
      {
        hex: "#FF4FA8", rgb: "255, 79, 168",
        ralId: "RAL Classic 4003", ralName: "Heather Violet",
        luminance: "0.402", contrastOnWhite: "2.8", contrastOnBlack: "6.9",
        recommendedText: "black", temperature: "warm", tone: "vivid",
      },
      {
        hex: "#3AA8FF", rgb: "58, 168, 255",
        ralId: "RAL Classic 5012", ralName: "Light Blue",
        luminance: "0.474", contrastOnWhite: "2.4", contrastOnBlack: "7.4",
        recommendedText: "black", temperature: "cool", tone: "vivid",
      },
      {
        hex: "#1C1D1F", rgb: "28, 29, 31",
        ralId: "RAL Classic 9005", ralName: "Jet Black",
        luminance: "0.008", contrastOnWhite: "18.8", contrastOnBlack: "1.1",
        recommendedText: "white", temperature: "neutral", tone: "neutral",
      },
    ] as SwatchData[]) {
      swatchDemoWrap.appendChild(this.plugin.renderSwatch(s));
    }
    swatchDemo.appendChild(swatchDemoWrap);

    containerEl.createEl("hr");

    // Wireframe Demo - Light Theme
    containerEl.createEl("h3", { text: "Wireframe Demo - Light Theme" });
    const wireframeDemo = containerEl.createDiv();
    if (wireframeDemo) {
      wireframeDemo.appendChild(
        this.plugin.renderWireframe({
          "surface-base": "#F7F7F5",
          "surface-raised": "#FFFFFF",
          "surface-sunken": "#ECEAE6",
          "surface-border": "#D6D4D0",
          "text-primary": "#1A1A1A",
          "text-secondary": "#4A4A4A",
          "text-inverse": "#FFFFFF",
          "accent-primary": "#1A73E8",
          "accent-secondary": "#3BAA5C",
          "accent-link": "#0A4ECF",
          "focus-ring": "#1A73E8",
          "button-primary-background": "#1A73E8",
          "button-primary-color": "#FFFFFF",
          "button-secondary-background": "#3BAA5C",
          "button-secondary-color": "#FFFFFF",
          "radius-base": "6px",
          "space-unit": "8px",
          "border-width": "1px",
          "shadow-color": "rgba(0, 0, 0, 0.12)",
          "overlay-background": "rgba(0, 0, 0, 0.35)",
        })
      );
    }

    containerEl.createEl("hr");

    // Wireframe Demo - Dark Theme
    containerEl.createEl("h3", { text: "Wireframe Demo - Dark Theme" });
    const wireframeDarkDemo = containerEl.createDiv();
    if (wireframeDarkDemo) {
      wireframeDarkDemo.appendChild(
        this.plugin.renderWireframe({
          "surface-base": "#141516",
          "surface-raised": "#1C1D1F",
          "surface-sunken": "#262729",
          "surface-border": "#3A3B3D",
          "text-primary": "#E6E6E6",
          "text-secondary": "#A8A8A8",
          "text-inverse": "#000000",
          "accent-primary": "#3A8BFF",
          "accent-secondary": "#2FAF66",
          "accent-link": "#6BB6FF",
          "focus-ring": "#3A8BFF",
          "button-primary-background": "#3A8BFF",
          "button-primary-color": "#FFFFFF",
          "button-secondary-background": "#2FAF66",
          "button-secondary-color": "#FFFFFF",
          "radius-base": "6px",
          "space-unit": "8px",
          "border-width": "1px",
          "shadow-color": "rgba(0, 0, 0, 0.6)",
          "overlay-background": "rgba(0, 0, 0, 0.55)",
        })
      );
    }
  }
}