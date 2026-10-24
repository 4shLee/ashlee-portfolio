'use client'

import { figmaNextImageLoader } from '@payloadcms/figma/next-image-loader'

export default function imageLoader(props: { src: any; width: number; quality?: number }) {
  const rawSrc = props?.src
  const src =
    typeof rawSrc === 'object' && rawSrc !== null && 'src' in rawSrc
      ? rawSrc.src
      : typeof rawSrc === 'string'
        ? rawSrc
        : ''

  return figmaNextImageLoader({ ...props, src })
}

