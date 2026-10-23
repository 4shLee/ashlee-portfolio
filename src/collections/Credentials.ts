import { revalidatePath } from "next/cache"
import type { CollectionConfig } from "payload"

export const Credentials: CollectionConfig = {
  slug: "credentials",
  admin: {
    group: "Portfolio",
    useAsTitle: "title",
    defaultColumns: ["title", "issuer", "issuedAt", "updatedAt"],
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
      name: "issuer",
      type: "text",
      required: true,
    },
    {
      name: "issuedAt",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "monthOnly",
          displayFormat: "MMMM yyyy",
        },
      },
    },
    {
      name: "credentialId",
      type: "text",
      label: "Credential ID",
    },
    {
      name: "certificate",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "certificateUrl",
      type: "text",
      label: "Certificate URL",
    },
    {
      name: "verificationUrl",
      type: "text",
      label: "Official verification URL",
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
