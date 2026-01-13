/** Mantém `value` dentro do intervalo [min, max), dando a volta quando passa. */
export function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}
