import { countRemaining, getLength, isValidComment } from "."

describe("getLength", () => {
  it("exact", () => {
    expect.hasAssertions()
    expect(getLength("")).toStrictEqual(0)
    expect(getLength("aaa")).toStrictEqual(3)
    expect(getLength("あa")).toStrictEqual(3)
    expect(getLength("あああ")).toStrictEqual(6)
    expect(getLength("🍞👏🐬")).toStrictEqual(6)
  })
})

describe("countRemaining", () => {
  it("exact", () => {
    expect.hasAssertions()
    expect(countRemaining("")).toStrictEqual(200)
    expect(countRemaining("aaa")).toStrictEqual(197)
    expect(countRemaining("あa")).toStrictEqual(197)
    expect(countRemaining("あああ")).toStrictEqual(194)
    expect(countRemaining("🍞👏🐬")).toStrictEqual(194)
    expect(
      countRemaining(
        "aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa."
      )
    ).toStrictEqual(0)
  })
})

describe("isValidComment", () => {
  it("valid", () => {
    expect.hasAssertions()
    expect(isValidComment("aaa")).toStrictEqual(true)
    expect(isValidComment("あa")).toStrictEqual(true)
    expect(isValidComment("あああ")).toStrictEqual(true)
    expect(isValidComment("🍞👏🐬")).toStrictEqual(true)
  })

  it("invalid", () => {
    expect.hasAssertions()
    expect(isValidComment("")).toStrictEqual(false)
    expect(isValidComment("aaahttps://www.example.com/")).toStrictEqual(false)
    expect(isValidComment("あhttp://")).toStrictEqual(false)
    expect(
      isValidComment(
        "aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa."
      )
    ).toStrictEqual(false)
  })
})
