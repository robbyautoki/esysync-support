'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback, useRef } from 'react'
import {
  BoldIcon,
  ItalicIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  LinkIcon,
  ImageIcon,
  Undo2Icon,
  Redo2Icon,
  QuoteIcon,
  MinusIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

// Word-HTML bereinigen und in sauberes HTML umwandeln
function cleanWordHTML(html: string): string {
  // MS Office spezifische Kommentare entfernen
  let cleaned = html.replace(/<!--\[if[^\]]*\]>[\s\S]*?<!\[endif\]-->/gi, '')
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
  
  // MS Office spezifische Tags entfernen
  cleaned = cleaned.replace(/<o:p[^>]*>[\s\S]*?<\/o:p>/gi, '')
  cleaned = cleaned.replace(/<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '')
  cleaned = cleaned.replace(/<m:[^>]*>[\s\S]*?<\/m:[^>]*>/gi, '')
  cleaned = cleaned.replace(/<!\[if[^\]]*\]>[\s\S]*?<!\[endif\]>/gi, '')
  
  // Style-Attribute bereinigen aber wichtige behalten
  cleaned = cleaned.replace(/\s*mso-[^:;]+:[^;]+;?/gi, '')
  cleaned = cleaned.replace(/\s*margin[^:;]*:[^;]+;?/gi, '')
  cleaned = cleaned.replace(/\s*line-height[^:;]*:[^;]+;?/gi, '')
  cleaned = cleaned.replace(/\s*tab-stops[^:;]*:[^;]+;?/gi, '')
  
  // Leere Style-Attribute entfernen
  cleaned = cleaned.replace(/\s*style\s*=\s*["']\s*["']/gi, '')
  
  // Leere class-Attribute entfernen
  cleaned = cleaned.replace(/\s*class\s*=\s*["'][^"']*Mso[^"']*["']/gi, '')
  cleaned = cleaned.replace(/\s*class\s*=\s*["']\s*["']/gi, '')
  
  // Span ohne Attribute in Text umwandeln
  cleaned = cleaned.replace(/<span\s*>([^<]*)<\/span>/gi, '$1')
  
  // Font-Tags in spans umwandeln oder entfernen
  cleaned = cleaned.replace(/<\/?font[^>]*>/gi, '')
  
  // Mehrfache Leerzeichen und Zeilenumbrüche reduzieren
  cleaned = cleaned.replace(/\s+/g, ' ')
  
  // Leere Paragraphen mit &nbsp; behalten (sind oft Absätze)
  cleaned = cleaned.replace(/<p[^>]*>\s*&nbsp;\s*<\/p>/gi, '<p><br></p>')
  
  return cleaned.trim()
}

export function RichTextEditor({ content, onChange, placeholder = 'Schreiben Sie hier...' }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
      transformPastedHTML(html) {
        return cleanWordHTML(html)
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const addImage = useCallback(async (file: File) => {
    if (!editor) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        editor.chain().focus().setImage({ src: data.url }).run()
      } else {
        alert(data.error || 'Bild-Upload fehlgeschlagen')
      }
    } catch {
      alert('Bild-Upload fehlgeschlagen')
    }
  }, [editor])

  const handleImageUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      addImage(file)
      e.target.value = ''
    }
  }, [addImage])

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL eingeben:', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  const ToolbarButton = ({
    onClick,
    active,
    disabled,
    children,
    title,
  }: {
    onClick: () => void
    active?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn('h-8 w-8 p-0', active && 'bg-muted')}
      title={title}
    >
      {children}
    </Button>
  )

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Fett"
        >
          <BoldIcon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Kursiv"
        >
          <ItalicIcon className="size-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          title="Überschrift 1"
        >
          <Heading1Icon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Überschrift 2"
        >
          <Heading2Icon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Überschrift 3"
        >
          <Heading3Icon className="size-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Aufzählung"
        >
          <ListIcon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Nummerierung"
        >
          <ListOrderedIcon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Zitat"
        >
          <QuoteIcon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Trennlinie"
        >
          <MinusIcon className="size-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        <ToolbarButton
          onClick={setLink}
          active={editor.isActive('link')}
          title="Link"
        >
          <LinkIcon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={handleImageUpload}
          title="Bild einfügen"
        >
          <ImageIcon className="size-4" />
        </ToolbarButton>

        <div className="w-px h-6 bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Rückgängig"
        >
          <Undo2Icon className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Wiederholen"
        >
          <Redo2Icon className="size-4" />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
