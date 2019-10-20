import { extractVideoIdByURL } from "."

describe("extractVideoIdByURL", () => {
  it("exact", () => {
    expect.hasAssertions()
    expect(
      extractVideoIdByURL("https://www.youtube.com/watch?v=FKDaZjN4UJ0")
    ).toStrictEqual("FKDaZjN4UJ0")
    expect(
      extractVideoIdByURL("https://www.youtube.com/watch?v=x")
    ).toStrictEqual("x")
  })
})
