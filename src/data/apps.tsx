import type { ReactNode } from "react"
import MyComputerWindow from "../components/windows/MyComputerWindow"
import FilesWindow from "../components/windows/FilesWindow"

export type AppMeta = {
  id: string
  name: string
  image: string
  x: number
  y: number
  content: ReactNode;
}

export const apps: AppMeta[] = [
  {
    id: 'my-computer',
    name: 'My Computer',
    image: '/applications/myComputer.png',
    x: 40,
    y: 40,
    content: <MyComputerWindow />,
  },
  {
    id: 'files',
    name: 'Files',
    image: '/applications/folder.png',
    x: 140,
    y: 40,
    content: <FilesWindow />,
  },
]