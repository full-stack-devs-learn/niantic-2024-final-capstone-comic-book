import {createAction} from "@reduxjs/toolkit";

const increment = createAction<string>('increment')

let action = increment('increment')

