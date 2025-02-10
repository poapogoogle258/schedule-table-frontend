'use client'

import { useEffect } from 'react'
import { Button, Result } from 'antd'
// Add these imports
import './globals.css' // Required for styling

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Enable error logging
    console.error('Global Error:', error)
  }, [error])

  return (
    <div>
      <Result
        status={500}
        title="Something went wrong!"
        subTitle={process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'}
        extra={[
          <Button key="retry" type="primary" onClick={reset}>
            Try Again
          </Button>,
          process.env.NODE_ENV === 'development' && (
            <pre key="error-details">
              {error.stack}
            </pre>
          )
        ].filter(Boolean)}
      />
    </div>
  )
}

