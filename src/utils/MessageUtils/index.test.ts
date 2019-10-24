import {
  checkMessageState,
  checkRemainingStatus,
  concatAsTweet,
  countRemaining,
  getLength,
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
    expect(checkMessageState("aaa", "sss", true)).toStrictEqual({
      isPostable: true,
      remainingNum: 193,
    })
    expect(checkMessageState("あa", "", true)).toStrictEqual({
      isPostable: true,
      remainingNum: 197,
    })
    expect(checkMessageState("あああ", "#", true)).toStrictEqual({
      isPostable: true,
      remainingNum: 192,
    })
    expect(checkMessageState("🍞👏🐬", " ", true)).toStrictEqual({
      isPostable: true,
      remainingNum: 194,
    })
    expect(
      checkMessageState(
        "aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.",
        "long",
        true
      )
    ).toStrictEqual({
      isPostable: true,
      remainingNum: 0,
    })
    expect(
      checkMessageState(
        `
あ

あ`,
        "many line break",
        true
      )
    ).toStrictEqual({
      isPostable: true,
      remainingNum: 177,
    })
  })

  it("invalid", () => {
    expect.hasAssertions()
    expect(checkMessageState("aaa", "sss", false)).toStrictEqual({
      isPostable: false,
      remainingNum: 193,
    })
    expect(checkMessageState("", " ", true)).toStrictEqual({
      isPostable: false,
      remainingNum: 200,
    })
    expect(
      checkMessageState("aaahttps://www.example.com/", "suffix", true)
    ).toStrictEqual({
      isPostable: false,
      remainingNum: 166,
    })
    expect(checkMessageState("あhttp://", "", true)).toStrictEqual({
      isPostable: false,
      remainingNum: 191,
    })
    expect(
      checkMessageState(
        "aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aa",
        "too long",
        true
      )
    ).toStrictEqual({
      isPostable: false,
      remainingNum: -1,
    })
    expect(
      checkMessageState(
        `
あ


あ`,
        "too many line break",
        true
      )
    ).toStrictEqual({
      isPostable: false,
      remainingNum: 172,
    })
  })
})
