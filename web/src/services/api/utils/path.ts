export const queryParams = (
  params: Record<string, string | number | boolean>,
): string =>
  !Object.keys(params)
    ? ''
    : '?' +
      Object.entries(params)
        .map(([k, v]) => k + '=' + (v ? encodeURIComponent(v) : ''))
        .join('&')

export default function path(...paths: Array<string | number>): string {
  return [...paths].join('/')
}
