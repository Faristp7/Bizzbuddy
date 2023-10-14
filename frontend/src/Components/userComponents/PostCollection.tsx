import { PostCollectionProps } from '../../interface/interface'
import { getProfilePost } from '../../Api/userApi'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PropsData {
  _id: string
  title: string
  description : string
}

export default function PostCollection({ role }: PostCollectionProps) {
  const [datas, setData] = useState<PropsData[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      if (role === 'user') {
        const { data } = await getProfilePost()
        setData(data.post)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {datas && datas.map((item) => (
        <div key={item._id}>
          <h5>
            {item.title}
          </h5>
          <p>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
