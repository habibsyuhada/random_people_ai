import Head from 'next/head'
import ChatUI from '@/components/Chat/ChatUI'
import ThemeChanger from '@/components/ThemeChanger'

export default function Home() {
  return (
    <>
      <Head>
        <title>Random AI Character Chat</title>
        <meta name="description" content="Chat with a random AI character" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed top-4 right-4 z-50">
        <ThemeChanger />
      </div>
      <main>
        <ChatUI />
      </main>
    </>
  )
}
