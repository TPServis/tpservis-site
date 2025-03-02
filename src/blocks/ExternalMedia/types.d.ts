export type ExternalMediaType = {
  slug: string
  url: string
  alt?: string
  size?: 'small' | 'medium' | 'large' | 'full'
  className?: string
  priority?: boolean
  quality?: number
  blockType: 'externalMedia'
  aspectRatio?: '1/1' | '16/9' | '9/16' | '4/3' | '3/4' | '1/2' | '2/1' | 'custom'
  customAspectRatio?: string
  container?: 'none' | 'horizontal' | 'vertical' | 'full'
}
