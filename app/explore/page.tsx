import ExplorePage from '@/components/Explore'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Explore Agents',
    description: 'Explore the agent marketplace',
}
const page = () => {
  return (
    <div>
          <ExplorePage/>
    </div>
  )
}

export default page