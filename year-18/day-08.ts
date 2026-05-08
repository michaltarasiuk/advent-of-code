import assert from "node:assert"

import {fetchInput} from "../lib.js"

const input = await fetchInput({year: 2018, day: 8})

function sumMetadataEntries(nodes: number[]) {
  let sum = 0
  let cursor = 0
  function walk() {
    const childCount = nodes[cursor++]
    const metadataCount = nodes[cursor++]
    for (let i = 0; i < childCount; i++) {
      walk()
    }
    for (let i = 0; i < metadataCount; i++) {
      sum += nodes[cursor++]
    }
  }
  walk()
  return sum
}

const nodes = input.split(" ").map(Number)
const sum = sumMetadataEntries(nodes)

assert.strictEqual(sum, 41028, "Part 1 failed")
