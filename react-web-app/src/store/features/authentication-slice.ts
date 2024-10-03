import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthenticatedUser } from "../../models/security/authentication";

interface AuthenticatedUserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

function loadState(): AuthenticatedUserState 
{
  try
  {
    // read login information from local storage
    const userString = localStorage.getItem('user')

    if(userString === null) throw new Error('User not logged in')

    const authUser = JSON.parse(userString) as AuthenticatedUser

    return {
      user: authUser.user!,
      token: authUser.token!,
      isAuthenticated: authUser.token !== null
    }

  }
  catch
  {
    // if no local storage then use defaults
    return {
      user: null,
      token: null,
      isAuthenticated: false
    }
  }

}

const initialState: AuthenticatedUserState = loadState()

const authenticationSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthenticatedUser>) {
      state.isAuthenticated = action.payload.token != undefined
      state.token = action.payload.token!
      state.user = action.payload.user!
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.user = null
    }
  }
})

export const { login, logout } = authenticationSlice.actions

const authenticationReducer = authenticationSlice.reducer
export default authenticationReducer