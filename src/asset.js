// Resolves a public/ asset path against Vite's base URL so the build works
// locally (/), on GitHub Pages (/<repo>/), and — when VITE_INLINE is set for
// the single-file preview build — as a bare path that a post-step swaps for a
// data URI.
const INLINE = import.meta.env.VITE_INLINE === '1'
export const asset = (p) => {
  if (!p) return ''
  const clean = p.replace(/^\//, '')
  return INLINE ? clean : import.meta.env.BASE_URL + clean
}
export default asset
