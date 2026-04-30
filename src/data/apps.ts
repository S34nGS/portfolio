export type AppMeta = {
  id: string
  name: string
  image: string
  x: number
  y: number
}

export const apps: AppMeta[] = [
  {
    id: 'my-computer',
    name: 'My Computer',
    image: '/applications/myComputer.png',
    x: 40,
    y: 40,
  },
  {
    id: 'files',
    name: 'Files',
    image: '/applications/folder.png',
    x: 140,
    y: 40,
  },
]