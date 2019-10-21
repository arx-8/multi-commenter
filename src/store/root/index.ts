import * as operations from "./operations"
import * as selectors from "./selectors"

/**
 * 全 state にまたがる selectors, operations
 * combine された state が処理対象なため、ここは reducer は定義しない
 */

export const rootOperations = operations
export const rootSelectors = selectors
