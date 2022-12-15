import { usePathname } from 'next/navigation'
import Container from '../components/Container/Container'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Container>
          <Navbar/>
          <div className='flex flex-col w-full'>
            <Header/>
            <main>
              {children}
            </main>
          </div>
        </Container>
      </body>
    </html>
  )
}
