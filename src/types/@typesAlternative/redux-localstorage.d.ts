/**
 * For redux-localstorage 0.x
 */
declare module "redux-localstorage" {
  // eslint-disable-next-line import/no-default-export
  export default function persistState(
    paths: string[],
    config?: Record<string, FixMeAny>
  ): FixMeAny
}
