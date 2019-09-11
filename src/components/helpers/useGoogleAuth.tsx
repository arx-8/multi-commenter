import { GOOGLE_API_API_KEY, GOOGLE_API_CLIENT_ID } from "constants/Env"
import {
  GOOGLE_API_DISCOVERY_DOCS,
  GOOGLE_API_SCOPES,
} from "constants/GoogleAPI"
import { useEffect, useCallback } from "react"
import { FixMeAny } from "types/Utils"

type Return = {
  disconnect: () => void
  isGoogleAuthorized: () => boolean
  signIn: () => Promise<gapi.auth2.GoogleUser>
  signOut: () => void
}

// TODO Contextにすべき？
let googleAuth: gapi.auth2.GoogleAuth | undefined

export const useGoogleAuth = (): Return => {
  const initClient = async (): Promise<void> => {
    await gapi.client.init({
      apiKey: GOOGLE_API_API_KEY,
      discoveryDocs: GOOGLE_API_DISCOVERY_DOCS,
      clientId: GOOGLE_API_CLIENT_ID,
      scope: GOOGLE_API_SCOPES,
    })

    googleAuth = gapi.auth2.getAuthInstance()
  }

  const init = useCallback((): void => {
    gapi.load("client:auth2", initClient as FixMeAny)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const signIn = (): Promise<gapi.auth2.GoogleUser> => {
    if (!googleAuth) {
      throw new Error("Initialize before call operations")
    }
    return googleAuth.signIn()
  }

  /**
   * signOutは、再signInに再認証が不要
   */
  const signOut = (): void => {
    if (!googleAuth) {
      throw new Error("Initialize before call operations")
    }
    googleAuth.signOut()
  }

  /**
   * disconnectは、再signInに再認証が必要
   */
  const disconnect = (): void => {
    if (!googleAuth) {
      throw new Error("Initialize before call operations")
    }
    googleAuth.disconnect()
  }

  const isAuthorized = (): boolean => {
    if (!googleAuth) {
      return false
    }

    const user = googleAuth.currentUser.get()
    return user.hasGrantedScopes(GOOGLE_API_SCOPES)
  }

  return {
    disconnect,
    isGoogleAuthorized: isAuthorized,
    signIn,
    signOut,
  }
}
