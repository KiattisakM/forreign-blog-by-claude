import { useParams } from 'react-router-dom'

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Article {id}
      </h1>
      <p className="text-gray-600">Article content will be displayed here...</p>
    </div>
  )
}
