import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UIProvider } from "./context/UIContext"
import { AuthProvider } from "./context/AuthContext"
import { DBProvider } from "./context/DBContext"

import OnlineGuard from "./guards/OnlineGuard"
import AuthGuard from "./guards/AuthGuard"

import AuthLayout from "./app/auth/layout"
import TabLayout from "./app/tabs/layout"

import Login from "./app/auth/Login"
import Verify from "./app/auth/Verify"
import Complete from "./app/auth/Complete"

import Home from "./app/tabs/Home"
import Products from "./app/tabs/Products"
import Orders from "./app/tabs/Orders"
import Profile from "./app/tabs/Profile"

import SlugLayout from "./app/landing/layout"
import SlugPage from "./app/landing/SlugPage"

import ErrorPage from "./layout/ui/ErrorPage"

import './theme/variables.css'
import './theme/global.css'
import './theme/theme.css'
import './theme/constants.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <OnlineGuard><AuthGuard><TabLayout/></AuthGuard></OnlineGuard>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'products',
                element: <Products/>
            },
            {
                path: 'orders',
                element: <Orders/>
            },
            {
                path: 'profile',
                element: <Profile/>
            }
        ],
        errorElement: <ErrorPage/>,
    },
    {
        path: '/login',
        element: <OnlineGuard><AuthGuard><AuthLayout/></AuthGuard></OnlineGuard>,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: 'verify',
                element: <Verify/>
            },
            {
                path: 'complete',
                element: <Complete/>
            },
            {
                path: 'photo',
                element: <h1>Photo</h1>
            }
        ]
    },
    {
        path: '/:slug',
        element: <OnlineGuard><SlugLayout/></OnlineGuard>,
        children: [
            {
                index: true,
                element: <SlugPage/>
            }
        ],
        errorElement: <ErrorPage/>,
    }
])

const root = createRoot(document.getElementById('root'))

root.render(
    <>

        <UIProvider>

            <AuthProvider>

                <DBProvider>
            
                    <RouterProvider router={router} />
                
                </DBProvider>
            
            </AuthProvider>
        
        </UIProvider>

    </>
)