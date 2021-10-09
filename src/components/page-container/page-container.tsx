import React from 'react'

interface IPageContainerItem {
  fillHeight?: boolean
  ariaRole?: string
}

export const PageContainer: React.FC = ({ children }) => {
  return <div data-name='PageContainer' className='flex flex-col min-h-screen'>{children}</div>
}

export const PageContainerItem: React.FC<IPageContainerItem> = ({
  children,
  fillHeight,
  ariaRole
}) => {
  return (
    <div data-name='PageContainerItem' role={ariaRole ? ariaRole : undefined} className={fillHeight ? 'flex-grow' : undefined}>{children}</div>
  )
}
