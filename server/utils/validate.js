const validateDate = (date) => {
  if (typeof date !== 'string') return false
  if (date.length > 10) return false
  const [year, month, day] = date.split('-');

  if (year !== String(+year)) return false
  if (month?.length !== 2 || +month < 1 || +month > 12) return false
  if (day?.length !== 2 || +day < 1 || +day > 31) return false

  return true
}

module.exports = { validateDate }