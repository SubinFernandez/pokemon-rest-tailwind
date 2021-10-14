import { ParsedUrlQuery } from "querystring";

/**
 * Adds a new dictionary item, if not already present.
 * @param query Next.js router's query dictionary.
 * @param key Key of the new dictionary item to be added. Key is case insensitive.
 * @param value Value of the new dictionary item added.
 * @returns Updated query.
 */
export const nextRouterQueryAdd = (query: ParsedUrlQuery, key: string, value: string): ParsedUrlQuery => {
  if (Object.keys(query).filter(item => item.toLowerCase() === key.toLowerCase()).length) {
    return query
  } else {
    query[key] = value;
    return query;
  }
}

/**
 * Deletes a dictionaary item.
 * @param query Next.js router's query dictionary.
 * @param key Key of the dictionary item to be deleted. Key is case insensitive.
 * @returns Updated query.
 */
export const nextRouterQueryDelete = (query: ParsedUrlQuery, key: string): ParsedUrlQuery => {
  Object.keys(query).forEach(item => {
    if (item.toLowerCase() === key.toLowerCase()) {
      delete query[item]
    }
  })
  return query
}

/**
 * Adds or edits a dictionary item.
 * @param query Next.js router's query dictionary.
 * @param key Key of the dictionary item to be added or edited. Key is case insensitive.
 * @param value Value of the dictionary item to be addedmor edited.
 * @returns Updated query.
 */
export const nextRouterQueryUpdate = (query: ParsedUrlQuery, key: string, value: string): ParsedUrlQuery => {
  let edited = false;
  Object.keys(query).forEach(item => {
    if (item.toLowerCase() === key.toLowerCase()) {
      query[item] = value
      edited = true
    }
  })
  if (!edited) {
    query[key] = value
  }
  return query
}

/**
 * Makes a query string out of a dictionary's items.
 * @param query Next.js router's query dictionary.
 * @returns Query string.
 */
export const makeQueryString = (query: ParsedUrlQuery): string => {
  return query ? Object.keys(query).map(item => {
    return `${item}=${query[item]}`
  }).join('&') : ''
}