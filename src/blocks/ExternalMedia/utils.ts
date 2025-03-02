const DEFAULT_IMAGE_ASPECT_RATIO = '16/9'

const validateAspectRatio = (value: string | string[] | undefined | null): true | string => {
  if (!value || typeof value !== 'string') return true

  const res = getValidAspectRatio(value)

  if (!res) {
    console.error(
      `Invalid aspect ratio "${value}". Expected format: "width/height" with positive integers. Defaulting to ${DEFAULT_IMAGE_ASPECT_RATIO}`,
    )
    return 'Invalid aspect ratio'
  }
  const { width, height } = res

  if (!width || !height) {
    console.error(
      `Width and height must be provided for aspect ratio "${value}". Defaulting to ${DEFAULT_IMAGE_ASPECT_RATIO}`,
    )
    return 'Width and height must be provided'
  }

  if (!Number.isInteger(width) || width <= 0) {
    console.error(
      `Width must be a positive integer for aspect ratio "${value}". Defaulting to ${DEFAULT_IMAGE_ASPECT_RATIO}`,
    )
    return 'Width must be a positive integer'
  }

  if (!Number.isInteger(height) || height <= 0) {
    console.error(
      `Height must be a positive integer for aspect ratio "${value}". Defaulting to ${DEFAULT_IMAGE_ASPECT_RATIO}`,
    )
    return 'Height must be a positive integer'
  }

  return true
}

const getValidAspectRatio = (ratio: string): { width: number; height: number } | null => {
  if (!ratio) return null

  const parts = ratio.trim().split('/')
  if (parts.length !== 2) return null

  const [width, height] = parts.map((part) => {
    const num = parseInt(part.trim(), 10)
    return Number.isInteger(num) && num > 0 ? num : null
  })

  if (!width || !height) return null

  return { width, height }
}

export { validateAspectRatio, getValidAspectRatio }
