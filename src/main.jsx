import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider 
            router={router} 
            fallbackElement={<div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>} 
        />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)