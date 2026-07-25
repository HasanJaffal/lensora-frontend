// The public catalog covers only the categories the try-on overlay can render.
export type PublicCategory = 'frame' | 'sun'

export type PublicOrganizationDto = {
  name: string
  slug: string
}

// Decimal fields serialize as JSON strings (e.g. "145.00") to preserve precision.
export type PublicProductDto = {
  id: string
  category: string
  name: string
  brand: string
  spec: string
  shape: string | null
  color: string | null
  price: string
}
