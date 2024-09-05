import { useState } from 'react'
import './Styles/App.css'
import ChatContextProvider from './context/ChatContextProvider'
import Switch from './Components/Switch'
import * as Sentry from "@sentry/react";


function App() {

  Sentry.init({
    dsn: "https://fcb5aed709e31906e872b8347177ab76@o4507899554824192.ingest.de.sentry.io/4507899560198224",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/chatify-api.up.railway.app\.io\/api/,
    ],
    profilesSampleRate: 0.0, // Adjust or comment out if not using profiling
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  return (
    <>
    <ChatContextProvider>
      <>
        <Switch />
      </>
    </ChatContextProvider> 
    </>
  )
}

export default App
