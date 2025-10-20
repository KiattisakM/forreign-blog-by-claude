import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface FilterCheckboxProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function FilterCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
  className,
}: FilterCheckboxProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: checked ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      className={cn(
        'group flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all',
        'hover:bg-accent/50 cursor-pointer',
        checked && 'bg-primary/5 dark:bg-primary/10',
        className
      )}
      onClick={() => onCheckedChange(!checked)}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="transition-all"
      />
      <label
        htmlFor={id}
        className={cn(
          'flex-1 text-sm font-medium cursor-pointer transition-colors',
          'select-none',
          checked
            ? 'text-foreground'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
      >
        {label}
      </label>
      {checked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
          className="h-1.5 w-1.5 rounded-full bg-primary"
        />
      )}
    </motion.div>
  )
}
