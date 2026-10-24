import path from "path"
import { buildFigmaConfig } from "@payloadcms/figma"
import { mcpPlugin } from "@payloadcms/plugin-mcp"
import { en as adminLanguage } from "@payloadcms/translations/languages/en"
import { fileURLToPath } from "url"
import { Admins } from "./collections/Admins"
import { Media } from "./collections/Media"
import { Folders } from "./collections/Folders"
import { Tags } from "./collections/Tags"
import { Posts } from "./collections/Posts"
import { PortfolioProjects } from "./collections/PortfolioProjects"
import { Credentials } from "./collections/Credentials"
import { CareerEntries } from "./collections/CareerEntries"
import { ContactSubmissions } from "./collections/ContactSubmissions"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Provide fallback placeholders during standalone Vercel / CI builds so that
// buildFigmaConfig does not log missing Environment ID errors during route collection.
if (!process.env.FIGMA_EID) process.env.FIGMA_EID = "build-eid"
if (!process.env.FIGMA_CONTENT_SYSTEM_ID) process.env.FIGMA_CONTENT_SYSTEM_ID = "build-csid"
if (!process.env.FIGMA_CONTENT_API_URL) process.env.FIGMA_CONTENT_API_URL = "https://figma.com/api"
if (!process.env.FIGMA_OAUTH_CLIENT_ID) process.env.FIGMA_OAUTH_CLIENT_ID = "build-client-id"

export default buildFigmaConfig({
  admin: {
    user: Admins.slug,
    constrainWidth: true,
    dashboard: {
      widgets: [],
      defaultLayout: [
        { widgetSlug: "activity", width: "full" },
        { widgetSlug: "collections", width: "full" },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en: adminLanguage },
  },
  collections: [
    Admins,
    Media,
    Folders,
    Tags,
    Posts,
    PortfolioProjects,
    Credentials,
    CareerEntries,
    ContactSubmissions,
  ],
  localization: {
    locales: [{ code: "en", label: "English" }],
    fallback: true,
    defaultLocale: "en",
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [mcpPlugin({})],
  figma: { contentSystemId: process.env.FIGMA_CONTENT_SYSTEM_ID || "build-csid" },
})
