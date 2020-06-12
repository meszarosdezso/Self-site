import { colorWithOpacity } from "../../utils/colors"
import { useTheme } from "../../providers/theme.provider"

type Props = {
  fields: string[]
  activeFields: string[]
  onChange(fields: string[]): void
}

const FieldSelector: React.FC<Props> = ({ fields, activeFields, onChange }) => {
  const handleChipToggle = (field: string) => {
    if (activeFields.includes(field)) {
      const newFields = activeFields.filter((f) => f !== field)
      if (!newFields.length) onChange(fields)
      else onChange(newFields)
    } else {
      onChange([...activeFields, field])
    }
  }

  return (
    <div className="field-selector">
      {fields.map((f) => (
        <FieldChip
          key={f}
          active={activeFields.includes(f)}
          onToggle={handleChipToggle}
          field={f}
        />
      ))}
    </div>
  )
}
export default FieldSelector

const FieldChip: React.FC<{
  field: string
  onToggle: (field: string) => void
  active: boolean
}> = ({ field, onToggle, active }) => {
  const { textColor, accentColor } = useTheme()
  return (
    <div
      style={{
        backgroundColor: active
          ? colorWithOpacity(accentColor, 0.2)
          : colorWithOpacity(textColor, 0.3),
        color: active ? accentColor : textColor,
      }}
      className="field-chip mono"
      onClick={(_) => onToggle(field)}
    >
      {field}
    </div>
  )
}
