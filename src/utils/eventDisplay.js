export const formatEventDates = (startDate, endDate) => {
  if (!startDate && !endDate) return ''
  const formatDate = (value) => new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const start = startDate ? formatDate(startDate) : ''
  const end = endDate ? formatDate(endDate) : ''
  if (start && end && start === end) return start
  return [start, end].filter(Boolean).join(' - ')
}
