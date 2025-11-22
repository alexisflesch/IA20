import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileTrieNode } from "./quartz/util/fileTrie"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // Component.ConditionalRender({
    //   component: Component.RecentNotes({
    //     title: "📚 Contenu du cours",
    //     limit: 10,
    //     showTags: true
    //   }),
    //   condition: (page) => page.fileData.slug === "index",
    // }),
  ],
  left: [
    Component.ConditionalRender({
      component: Component.PageTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.MobileOnly(Component.Spacer()),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.Flex({
        components: [
          {
            Component: Component.Search(),
            grow: true,
          },
          { Component: Component.Darkmode() },
          { Component: Component.ReaderMode() },
        ],
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.Explorer({
        folderDefaultState: "open",
        folderClickBehavior: "link",
        mapFn: (node) => {
          // If a folder has no children (meaning it's a leaf folder with just an index),
          // treat it as a file to avoid the useless chevron.
          if (node.children.length === 0) {
            node.isFolder = false
          }
        },
        sortFn: (a: FileTrieNode, b: FileTrieNode) => {
          // Sort purely by name, ignoring whether it's a folder or file
          // This ensures chapters stay in order even if some have sub-pages and others don't
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        },
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  right: [
    // Component.Graph(),
    // Component.DesktopOnly(Component.TableOfContents()),
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderDefaultState: "open",
      folderClickBehavior: "link",
      mapFn: (node) => {
        // If a folder has no children (meaning it's a leaf folder with just an index),
        // treat it as a file to avoid the useless chevron.
        if (node.children.length === 0) {
          node.isFolder = false
        }
      },
      sortFn: (a: FileTrieNode, b: FileTrieNode) => {
        // Sort purely by name, ignoring whether it's a folder or file
        // This ensures chapters stay in order even if some have sub-pages and others don't
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),
  ],
  right: [],
}
