import { redirect } from 'next/navigation'

type Props = {}

const page = (props: Props) => {
  redirect('/app/dashboard')
}

export default page