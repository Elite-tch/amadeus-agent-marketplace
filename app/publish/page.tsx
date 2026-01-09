import PublishPage from '@/components/Publish'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Publish Agent',
    description: 'Publish your agent to the marketplace',
}
const page = () => {
  return (
    <div>
          <PublishPage/>
    </div>
  )
}

export default page