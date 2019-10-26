import {
  checkIsPostable,
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

describe("checkIsPostable", () => {
  describe("valid cases", () => {
    it("valid main + suffix", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = "aaa"
      const suffix = "sss"

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(true)
    })

    it("valid main only", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = "あああ"
      const suffix = ""

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(true)
    })

    it("valid emoji", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = "🍞👏🐬"
      const suffix = " "

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(true)
    })

    it("valid long boundary value", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main =
        "aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa."
      const suffix = "long"

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(true)
    })

    it("valid many line break", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = `
あ

あ`
      const suffix = "many line break"

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(true)
    })
  })

  describe("invalid cases", () => {
    it("empty", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = " "
      const suffix = ""

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(false)
    })

    it("contains url in main", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = "aaahttps://www.example.com/"
      const suffix = "suffix"

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(false)
    })

    it("contains url in suffix", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = "aaa"
      const suffix = "あhttp://"

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(false)
    })

    it("too long 1", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main =
        "aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aa"
      const suffix = "too long"

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(false)
    })

    it("too long 2", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main =
        "aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa.aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa a"
      const suffix = ""

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(false)
    })

    it("too many line break", () => {
      expect.hasAssertions()
      // ## Arrange ##
      const main = `
あ


あ`
      const suffix = ""

      // ## Act ##
      const result = checkIsPostable(
        main,
        suffix,
        countRemaining(concatAsTweet(main, suffix))
      )

      // ## Assert ##
      expect(result).toStrictEqual(false)
    })
  })
})
