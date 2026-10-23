import { revalidatePath } from "next/cache"
import type { CollectionConfig } from "payload"

export const PortfolioProjects: CollectionConfig = {
  slug: "portfolio-projects",
  admin: {
    group: "Portfolio",
    useAsTitle: "title",
    defaultColumns: ["title", "order", "featured", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath("/")
      },
    ],
    afterDelete: [
      () => {
        revalidatePath("/")
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      maxLength: 320,
    },
    {
      name: "technologies",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "repositoryUrl",
      type: "text",
      label: "Repository URL",
    },
    {
      name: "demoUrl",
      type: "text",
      label: "Live demo URL",
    },
    {
      name: "visualStyle",
      type: "select",
      defaultValue: "orbit",
      options: [
        { label: "Orbit", value: "orbit" },
        { label: "Weather", value: "weather" },
        { label: "Gallery", value: "gallery" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      min: 0,
    },
  ],
}
