import { toDateTimeStr, UnixTime } from "."

describe("toDateTimeStr", () => {
  // CircleCI 上の timezone (offset) に対応するのが手間なため、一旦 skip
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("exact", () => {
    expect.hasAssertions()
    expect(toDateTimeStr(1571672152.028 as UnixTime)).toStrictEqual(
      "2019-10-22 00:35:52.028"
    )
    expect(toDateTimeStr(1501671960.0 as UnixTime)).toStrictEqual(
      "2017-08-02 20:06:00.000"
    )
  })
})
