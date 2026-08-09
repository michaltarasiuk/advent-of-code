import assert from "node:assert"

import {fetchInput, raise} from "../lib.js"

const input = await fetchInput(import.meta)

function parseInstruction(instruction: string) {
  const re = /^(.*) (\d+),(\d+) through (\d+),(\d+)$/
  const [, action, ...coords] = instruction.match(re) ?? raise("Invalid instruction")
  return [action, ...coords.map(Number)] as const
}

function applyLights(
  actions: Record<string, (v: number) => number>,
  instructions: ReturnType<typeof parseInstruction>[],
) {
  const SIZE = 1_000
  const lights = Array.from({length: SIZE}, () => Array<number>(SIZE).fill(0))

  for (const [action, x1, y1, x2, y2] of instructions) {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        lights[y][x] = actions[action](lights[y][x])
      }
    }
  }
  return lights
}

const instructions = input.split("\n").map(parseInstruction)

const lights = applyLights(
  {"turn on": () => 1, "turn off": () => 0, toggle: v => Number(!v)},
  instructions,
)
const brightness = applyLights(
  {"turn on": v => v + 1, "turn off": v => Math.max(0, v - 1), toggle: v => v + 2},
  instructions,
)

assert.strictEqual(
  lights.flat().reduce((a, b) => a + b),
  400410,
)
assert.strictEqual(
  brightness.flat().reduce((a, b) => a + b),
  15343601,
  "Part 2 failed",
)
