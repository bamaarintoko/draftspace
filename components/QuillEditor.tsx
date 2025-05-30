'use client'

import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface QuillEditorProps {
  value?: string
  onChange?: (content: string) => void
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillInstance = useRef<Quill | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        },
      })

      quillInstance.current.on('text-change', () => {
        const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || ''
        onChange?.(html)
      })

      setIsLoaded(true)
    }
  }, [onChange])

  // Isi konten awal ketika Quill sudah terinisialisasi dan ada value
  useEffect(() => {
    if (quillInstance.current && isLoaded && value !== undefined) {
      const currentHtml = quillInstance.current.root.innerHTML
      if (currentHtml !== value) {
        quillInstance.current.root.innerHTML = value
      }
    }
  }, [value, isLoaded])

  return (
    <div>
      <div ref={editorRef} className="min-h-[200px] bg-white" />
      {!isLoaded && <p className="text-sm text-gray-500 mt-2">Loading editor...</p>}
    </div>
  )
}
