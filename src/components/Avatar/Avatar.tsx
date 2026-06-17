import styles from './Avatar.module.css'

interface Props {
  name: string
  variant?: 'default' | 'light'
  className?: string
}

function initials(name: string): string {
  return name.split(' ').map(n => n[0]).join('')
}

export function Avatar({ name, variant = 'default', className }: Props) {
  return (
    <div
      className={`${styles.avatar} ${variant === 'light' ? styles.light : ''} ${className ?? ''}`}
      aria-label={name}
    >
      {initials(name)}
    </div>
  )
}
