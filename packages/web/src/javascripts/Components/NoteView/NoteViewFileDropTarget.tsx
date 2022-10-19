import { LinkingController } from '@/Controllers/LinkingController'
import { SNNote } from '@standardnotes/snjs'
import { useEffect } from 'react'
import { useFileDragNDrop } from '../FileDragNDropProvider/FileDragNDropProvider'

type Props = {
  note: SNNote
  linkingController: LinkingController
  noteViewElement: HTMLElement | null
}

const NoteViewFileDropTarget = ({ note, linkingController, noteViewElement }: Props) => {
  const { isDraggingFiles, addDragTarget, removeDragTarget } = useFileDragNDrop()

  useEffect(() => {
    const target = noteViewElement

    if (target) {
      addDragTarget(target, {
        tooltipText: 'Drop your files to upload and link them to the current note',
        callback(files) {
          files.forEach(async (uploadedFile) => {
            await linkingController.linkItems(uploadedFile, note)
          })
        },
      })
    }

    return () => {
      if (target) {
        removeDragTarget(target)
      }
    }
  }, [addDragTarget, linkingController, note, noteViewElement, removeDragTarget])

  return isDraggingFiles ? (
    // Required to block drag events to editor iframe
    <div id="file-drag-iframe-overlay" className="absolute top-0 left-0 z-dropdown-menu h-full w-full" />
  ) : null
}

export default NoteViewFileDropTarget