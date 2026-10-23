import type { CollectionConfig } from 'payload'
import { createFolderField, createTagField } from 'payload'
import { revalidatePath } from 'next/cache'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  // Invalidate Next.js cache whenever media is uploaded, updated, or deleted
  // so that project thumbnails and certificate images immediately reflect changes on the homepage.
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
      },
    ],
    afterDelete: [
      () => {
        revalidatePath('/')
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: true,
}
