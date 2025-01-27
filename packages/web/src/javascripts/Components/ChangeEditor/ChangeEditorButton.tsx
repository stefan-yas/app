import { WebApplication } from '@/Application/Application'
import { ViewControllerManager } from '@/Controllers/ViewControllerManager'
import { observer } from 'mobx-react-lite'
import { FunctionComponent, useCallback, useRef, useState } from 'react'
import ChangeEditorMenu from './ChangeEditorMenu'
import Popover from '../Popover/Popover'
import RoundIconButton from '../Button/RoundIconButton'

type Props = {
  application: WebApplication
  viewControllerManager: ViewControllerManager
  onClickPreprocessing?: () => Promise<void>
}

const ChangeEditorButton: FunctionComponent<Props> = ({
  application,
  viewControllerManager,
  onClickPreprocessing,
}: Props) => {
  const note = viewControllerManager.notesController.firstSelectedNote
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedEditor, setSelectedEditor] = useState(() => {
    return note ? application.componentManager.editorForNote(note) : undefined
  })
  const [selectedEditorIcon, selectedEditorIconTint] = application.iconsController.getIconAndTintForNoteType(
    selectedEditor?.package_info.note_type,
  )

  const toggleMenu = useCallback(async () => {
    const willMenuOpen = !isOpen
    if (willMenuOpen && onClickPreprocessing) {
      await onClickPreprocessing()
    }
    setIsOpen(willMenuOpen)
  }, [onClickPreprocessing, isOpen])

  return (
    <div ref={containerRef}>
      <RoundIconButton
        label="Change note type"
        onClick={toggleMenu}
        ref={buttonRef}
        icon={selectedEditorIcon}
        iconClassName={`text-accessory-tint-${selectedEditorIconTint}`}
      />
      <Popover togglePopover={toggleMenu} anchorElement={buttonRef.current} open={isOpen} className="pt-2 md:pt-0">
        <ChangeEditorMenu
          application={application}
          isVisible={isOpen}
          note={note}
          closeMenu={() => {
            setIsOpen(false)
          }}
          onSelect={(component) => {
            setSelectedEditor(component)
          }}
        />
      </Popover>
    </div>
  )
}

export default observer(ChangeEditorButton)
