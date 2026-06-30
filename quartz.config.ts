import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "A Worm, Not A Man",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "awormnotaman-blog.vercel.app",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "OpenDyslexic Nerd Font",
        body: "OpenDyslexic Nerd Font Propo",
        code: "OpenDyslexicM Nerd Font Mono",
      },
      colors: {
        lightMode: {
          light: "#f9f5d7",
          lightgray: "#d5c4a1",
          gray: "#bdae93",
          darkgray: "#504945",
          dark: "#282828",
          secondary: "#d15a1a",
          tertiary: "#e8854a",
          highlight: "rgba(204, 36, 29, 0.15)",
          textHighlight: "#fabd2f88",
        },
        darkMode: {
          light: "#2e261f",
          lightgray: "#3b3026",
          gray: "#917959",
          darkgray: "#d7c0a3",
          dark: "#ebdac6",
          secondary: "#d15a1a",
          tertiary: "#e8854a",
          highlight: "rgba(209, 90, 26, 0.15)",
          textHighlight: "#f9cf5188",
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
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // CustomOgImages disabled — requires remote font (OpenDyslexic is local only)
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
