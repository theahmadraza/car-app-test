export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex place-items-center text-3xl">
        Welcome to Car App
      </div>
      <div className="grid justify-center text-center lg:max-w-5xl lg:w-full mt-10">
        <a
          href="/login"
          className="group rounded-lg border border-transparent  px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Login{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
           Click this button to Login
          </p>
        </a>

       
      </div>
    </main>
  )
}
