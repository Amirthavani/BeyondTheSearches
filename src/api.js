const apiOrigin = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

export const apiUrl = (path) => {
  if (!apiOrigin || !path.startsWith('/')) return path
  return `${apiOrigin}${path}`
}

export const apiFetch = (path, options) => fetch(apiUrl(path), options)
