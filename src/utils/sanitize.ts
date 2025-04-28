// src/utils/sanitize.ts
import DOMPurify from 'dompurify'

/**
 * Säubert einen beliebigen String von potentiell
 * gefährlichem HTML/JS, bevor er ins Template kommt.
 */
export function sanitize(input: string): string {
  return DOMPurify.sanitize(input)
}
