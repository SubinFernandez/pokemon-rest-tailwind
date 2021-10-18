import { createContext, useContext } from 'react'

interface AppSettings {
  galleryScrollYPos: number,
  setGalleryScrollYPos: (pos: number) => void
}

export const AppSettingContext = createContext<AppSettings>({
  galleryScrollYPos: 0,
  setGalleryScrollYPos: () => {}
})

export const useAppSettingContext = () => useContext(AppSettingContext)
