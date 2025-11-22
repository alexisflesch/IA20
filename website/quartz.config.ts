import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "IA20",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "fr-FR",
    baseUrl: "ia20.alexisfles.ch",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Outfit",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e7eb",
          gray: "#64748b",
          darkgray: "#334155",
          dark: "#0f172a",
          secondary: "#0284c7", // Sky Blue 600 - Plus sobre, professionnel
          tertiary: "#0ea5e9",  // Sky Blue 500
          highlight: "rgba(0, 0, 0, 0)", // Transparent background for links
          textHighlight: "rgba(0, 0, 0, 0)", // Transparent
        },
        darkMode: {
          light: "#0a0a0a", // Almost black
          lightgray: "#262626", // Neutral dark gray
          gray: "#a3a3a3", // Neutral gray
          darkgray: "#e5e5e5", // Light gray for text
          dark: "#ffffff", // White for headings
          secondary: "#38bdf8", // Sky Blue 400 (kept for accent)
          tertiary: "#7dd3fc",  // Sky Blue 300
          highlight: "rgba(0, 0, 0, 0)",
          textHighlight: "rgba(0, 0, 0, 0)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Observables(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
