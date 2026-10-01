const getItemType = (list) => (list.itemType === 'other' ? list.otherItemType : list.itemType) || ''

const getPreferences = () => {
  try {
    const preferences = JSON.parse(localStorage.getItem('visitorPreferences') || 'null')
    return {
      interests: (preferences?.interests || []).map((interest) => interest.trim().toLowerCase()),
    }
  } catch {
    return { interests: [] }
  }
}

export const rankLists = (lists) => {
  const { interests } = getPreferences()
  return [...lists].sort((first, second) => {
    const firstInterest = interests.includes(getItemType(first).trim().toLowerCase()) ? 1 : 0
    const secondInterest = interests.includes(getItemType(second).trim().toLowerCase()) ? 1 : 0
    if (firstInterest !== secondInterest) return secondInterest - firstInterest

    const firstPremium = first.is_Premium ? 1 : 0
    const secondPremium = second.is_Premium ? 1 : 0
    if (firstPremium !== secondPremium) return secondPremium - firstPremium

    const firstUpdated = new Date(first.updatedAt || first.createdAt || first.startDate || 0).getTime()
    const secondUpdated = new Date(second.updatedAt || second.createdAt || second.startDate || 0).getTime()
    if (firstUpdated !== secondUpdated) return secondUpdated - firstUpdated

    return (second.views || 0) - (first.views || 0)
  })
}
