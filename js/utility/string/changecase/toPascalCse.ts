export default function toPascalCase(s: string = '') {
  return s.replace(
    /(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  )
}
