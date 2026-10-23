import { revalidatePath } from "next/cache"
import type { CollectionConfig } from "payload"

export const CareerEntries: CollectionConfig = {
  slug: "career-entries",
  admin: {
    group: "Portfolio",
    useAsTitle: "title",
    defaultColumns: ["title", "organization", "type", "startDate", "updatedAt"],
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
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Work", value: "work" },
        { label: "Education", value: "education" },
        { label: "Training", value: "training" },
      ],
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "organization",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "current",
      type: "checkbox",
      defaultValue: false,
      label: "Current role or program",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      maxLength: 500,
    },
    {
      name: "highlights",
      type: "array",
      fields: [
        {
          name: "highlight",
          type: "text",
          required: true,
        },
      ],
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
