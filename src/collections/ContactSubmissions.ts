import type { CollectionConfig } from "payload"

const staffOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    group: "Inbox",
    useAsTitle: "subject",
    defaultColumns: [
      "fullName",
      "email",
      "subject",
      "projectType",
      "status",
      "createdAt",
    ],
  },
  access: {
    create: () => true,
    read: staffOnly,
    update: staffOnly,
    delete: staffOnly,
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "subject",
      type: "text",
      required: true,
      minLength: 3,
      maxLength: 140,
    },
    {
      name: "projectType",
      type: "select",
      required: true,
      options: [
        { label: "Website or portfolio", value: "website" },
        { label: "Interactive experience", value: "interactive" },
        { label: "Front-end development", value: "frontend" },
        { label: "Design collaboration", value: "design" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      minLength: 20,
      maxLength: 4000,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      access: {
        create: staffOnly,
        update: staffOnly,
      },
      options: [
        { label: "New", value: "new" },
        { label: "In progress", value: "in-progress" },
        { label: "Replied", value: "replied" },
        { label: "Archived", value: "archived" },
      ],
    },
  ],
}
