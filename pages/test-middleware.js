export default function TestMiddleware() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Middleware Test</h1>
        <p>If you can see this page, the middleware is working correctly!</p>
        <p className="text-gray-400 mt-2">This page is not protected by middleware.</p>
      </div>
    </div>
  )
}
