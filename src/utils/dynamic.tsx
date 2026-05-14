import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'

interface DynamicOptions {
  error?: ({ error }: FallbackProps) => React.ReactNode //함수, FallbackProps로부터 error를 꺼냄
  loading?: React.ReactNode //속성
}

export default function dynamic(
  importFn: () => Promise<{ default: React.ComponentType }>,
  options: DynamicOptions = {}
) {
  const Component = lazy(() => importFn())

  return function DynamicComponent() {
    return (
      <ErrorBoundary
        fallbackRender={
          options.error ||
          (({ error }) => (
            <div>Error: {(error as Error)?.message || 'Unknown error!!'}</div>
          ))
        }>
        <Suspense fallback={options.loading || <div>Loading...</div>}>
          <Component />
        </Suspense>
      </ErrorBoundary>
    )
  }
}

//아래가 원래 기본 코드였음@!
// import { lazy, Suspense } from 'react'
// import { ErrorBoundary } from 'react-error-boundary'

// const Home = lazy(() => import('@/routes/pages/Home'))

// element: <ErrorBoundary
//   fallbackRender={({ error }) => {
//     let message = ''
//     if (error instanceof Error) {
//       message = error.message
//     }
//     return <h1>에러가 발생했어요. {message}</h1>
//   }}>
//   <Suspense fallback={<Loader />}>
//     <Home />
//   </Suspense>
// </ErrorBoundary>
