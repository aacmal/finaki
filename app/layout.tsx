import { usePathname } from 'next/navigation'
import Container from '../components/Container/Container'
import Navbar from '../components/Navbar/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const pathname = usePathname()

  // const getHeaderTitle = (pathname: string | null) => {
  //   switch (pathname) {
  //     case '/dashboard':
  //       return 'Dashboard'
  //     case '/transactions':
  //       return 'Transactions'
  //     case '/settings':
  //       return 'Settings'
  //     default:
  //       return 'Dashboard'
  //   }
  // }

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
            <header className='flex justify-between mt-3 items-center w-full px-5'>
              <h1 className='text-2xl font-bold'>{'Dashboard  '}</h1>
              <div className='flex gap-2 items-center'>
                <div className='h-10 w-10 rounded-full bg-gray-300'></div>
                <span className='font-medium'>Aca M</span>
              </div>
            </header>
            <main>
              {children}
            </main>
          </div>
        </Container>
      </body>
    </html>
  )
}
