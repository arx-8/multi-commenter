import { ActionTypes as authActionTypes } from "src/store/auth/actions"
import { ActionTypes as settingsActionTypes } from "src/store/settings/actions"
import { toUniq } from "src/utils/ArrayUtils"

describe("ActionType", () => {
  it("No duplicate definition", () => {
    expect.hasAssertions()
    // ## Arrange ##
    const original: string[] = [
      ...Object.values(authActionTypes),
      ...Object.values(settingsActionTypes),
    ]

    // ## Act ##
    const unique = toUniq(original)

    // ## Assert ##
    expect(unique).toHaveLength(original.length)
  })
})
