export function inferSchema (filed) {
  if (filed.schema) {
    filed = filed.schema
  }

  if (filed.properties) {
    filed.type = 'object'
  }

  return filed
}

