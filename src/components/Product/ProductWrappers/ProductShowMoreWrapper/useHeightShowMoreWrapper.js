import {useState, useEffect} from 'react'

export const useGetHeightRef = (ref) => {

  const [childrenHeight, setChildrenHeight] = useState(null)

  useEffect(() => {
    setChildrenHeight(ref?.current?.offsetHeight)
  }, [ref])

  return {
    childrenHeight
  }
}
