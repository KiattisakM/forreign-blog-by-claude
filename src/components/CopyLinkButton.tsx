import { useState } from 'react'
import { Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CopyLinkButtonProps {
  className?: string
}

export function CopyLinkButton({ className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
      // Fallback for browsers that don't support clipboard API
      alert('Failed to copy link. Please copy the URL from the address bar.')
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      disabled={copied}
      className={className}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Link2 className="mr-2 h-4 w-4" />
          Copy Link
        </>
      )}
    </Button>
  )
}
