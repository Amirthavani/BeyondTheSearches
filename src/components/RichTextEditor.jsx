import { useEffect, useRef } from 'react'
import styles from './RichTextEditor.module.css'

const commands = [
  ['bold', 'Bold'],
  ['italic', 'Italic'],
  ['underline', 'Underline'],
  ['formatBlock', 'Heading'],
  ['insertUnorderedList', 'Bullets'],
  ['insertOrderedList', 'Numbered'],
]

export function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) editorRef.current.innerHTML = value || ''
  }, [value])

  const runCommand = (command) => {
    editorRef.current?.focus()
    document.execCommand(command, false, command === 'formatBlock' ? 'h3' : undefined)
    onChange(editorRef.current?.innerHTML || '')
  }

  const addLink = () => {
    const url = window.prompt('Enter the link URL')
    if (!url) return
    editorRef.current?.focus()
    document.execCommand('createLink', false, url)
    onChange(editorRef.current?.innerHTML || '')
  }

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar} role="toolbar" aria-label="Text formatting">
        {commands.map(([command, label]) => (
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand(command)} key={command}>{label}</button>
        ))}
        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={addLink}>Link</button>
      </div>
      <div
        ref={editorRef}
        className={styles.input}
        contentEditable
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        onBlur={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  )
}
