/**
 * Глобалы, которые решение может трогать в воркере. Общий список для песочницы, линтера и автодополнения.
 */
export const SANDBOX_GLOBALS = [
  'Array',
  'ArrayBuffer',
  'BigInt',
  'Boolean',
  'DataView',
  'Date',
  'Error',
  'Infinity',
  'Intl',
  'JSON',
  'Map',
  'Math',
  'NaN',
  'Number',
  'Object',
  'Promise',
  'Proxy',
  'RangeError',
  'Reflect',
  'RegExp',
  'Set',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'Uint8Array',
  'WeakMap',
  'WeakRef',
  'WeakSet',
  'clearTimeout',
  'console',
  'decodeURIComponent',
  'encodeURIComponent',
  'globalThis',
  'isFinite',
  'isNaN',
  'parseFloat',
  'parseInt',
  'queueMicrotask',
  'setTimeout',
  'structuredClone',
  'undefined',
] as const

/**
 * Глобалы, которые песочница глушит: сеть, хранилища, вложенные воркеры.
 */
export const BLOCKED_GLOBALS = [
  'EventSource',
  'WebSocket',
  'Worker',
  'XMLHttpRequest',
  'fetch',
  'importScripts',
  'indexedDB',
] as const

/**
 * Что React-задача видит без импорта.
 */
export const REACT_GLOBALS = ['React'] as const
