import React from 'react'

interface NameValuePairProps {
  name: string
  value: string
  cssClasses?: string
}

export const NameValuePair: React.FC<NameValuePairProps> =({
  name,
  value,
  cssClasses
}) => {
  return (
    <div data-id='NameValuePair' className={cssClasses}>
      <div className='font-bold text-sm'>{name}</div>
      <div className='capitalize'>{value}</div>
    </div>
  )
}