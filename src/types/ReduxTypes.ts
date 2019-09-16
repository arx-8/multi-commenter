import { Action, AnyAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState } from "store/store"

/**
 * Type utility for redux
 */

/**
 * Action creator with NO payload
 * @template T type
 */
export type ActionCreator<T> = () => Action<T>

/**
 * Flux Standard Action に準拠した Action
 */
type ActionWithPayload<T, P> = {
  payload: P
} & Action<T>

/**
 * Action creator with payload
 * @template T type
 * @template P payload
 */
export type ActionCreatorWithPayload<T, P> = (
  payload: P
) => ActionWithPayload<T, P>

/**
 * redux-thunk action shorthand for this application.
 *
 * ThunkAction の <R> を void | Promise<void> に制約してる理由は、実装の複雑化を避けるため。
 * 「Promise.resolve の結果を受け取って Component 側でロジックを実装」することを防ぐ。
 * 基本的に、Thunk を使う Action は非同期処理 (return Promise<*>) の場合が多いため、デフォルトの型引数は Promise<void> としている。
 * 同期的な ThunkAction の場合は、明示的に型引数を指定すること。
 *
 * @template TReturn Type of return
 * @template TAction Type of acceptable action
 */
export type AppThunkAction<
  TReturn extends void | Promise<void> = Promise<void>,
  TAction extends Action = AnyAction
> = ThunkAction<TReturn, RootState, void, TAction>

/**
 * redux-thunk dispatch shorthand for this application.
 *
 * State と extraArgument (<S, E>) は、applyMiddleware の時点で決定するため、決め打ち
 * Action (<A>) は、型定義するコスパが悪い(ActionCreatorを使うため、タイポや未定義の可能性は低い)ため、AnyAction
 */
type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

/**
 * redux-thunk compatible MapDispatchToPropsFunction.
 *
 * @see node_modules/@types/react-redux/index.d.ts
 */
export type MapThunkDispatchToPropsFunction<TDispatchProps, TOwnProps> = (
  dispatch: AppThunkDispatch,
  ownProps: TOwnProps
) => TDispatchProps
