// src/components/common/TypeBadge.jsx
import { useState } from 'react'
import { typeBadgeStyle } from '../../utils/typeColors'
import { typeSpriteUrl } from '../../utils/assetUrl'

const ICON_SIZE = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export default function TypeBadge({ type, size = 'md', variant = 'pill' }) {
  const [imgError, setImgError] = useState(false)

  if (!type) return null

  const spriteUrl = typeSpriteUrl(type.sprite_image)

  if (variant === 'icon') {
    const dimension = ICON_SIZE[size] || ICON_SIZE.md
    return (
      <div title={type.name} className={`${dimension} flex items-center justify-center shrink-0`}>
        {!imgError && spriteUrl ? (
          <img
            src={spriteUrl}
            alt={type.name}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="w-full h-full rounded-full bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center justify-center">
            {type.name.charAt(0)}
          </span>
        )}
      </div>
    )
  }

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-sm px-3 py-1 gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses}`}
      style={typeBadgeStyle(type.color_hex)}
    >
      {!imgError && spriteUrl && (
        <img
          src={spriteUrl}
          alt={type.name}
          className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}
          onError={() => setImgError(true)}
        />
      )}
      {type.name}
    </span>
  )
}