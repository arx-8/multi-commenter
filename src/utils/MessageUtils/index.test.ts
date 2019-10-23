import {
  checkRemainingStatus,
  concatAsTweet,
  countRemaining,
  getLength,
  isValidComment,
} from "."

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

describe("checkRemainingStatus", () => {
  it("exact", () => {
    expect.hasAssertions()
    expect(checkRemainingStatus(100)).toStrictEqual("ok")
    expect(checkRemainingStatus(99)).toStrictEqual("warn")
    expect(checkRemainingStatus(0)).toStrictEqual("warn")
    expect(checkRemainingStatus(-1)).toStrictEqual("error")
  })
})

describe("concatAsTweet", () => {
  it("exact", () => {
    expect.hasAssertions()
    expect(concatAsTweet("main", "suffix")).toStrictEqual("main suffix")
    expect(concatAsTweet("", "")).toStrictEqual("")
    expect(concatAsTweet(" ", "　")).toStrictEqual(" ")
    expect(concatAsTweet("main text", "")).toStrictEqual("main text")
    expect(concatAsTweet(" main text ", " ")).toStrictEqual(" main text ")
    expect(
      concatAsTweet(
        `末尾改行の場合
`,
        "#twitter"
      )
    ).toStrictEqual(`末尾改行の場合
#twitter`)
    expect(
      concatAsTweet(
        `final new line


`,
        "#twitter"
      )
    ).toStrictEqual(`final new line


#twitter`)
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
