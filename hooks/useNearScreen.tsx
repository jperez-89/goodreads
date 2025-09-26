import Loader from "@/components/Loader"
import { lazy, useEffect, useRef, useState } from "react"

// Esta funcion se utiliza para cargar data cuando se llega a una seccion
const useNearScreen = ({ distance = '100px' }) => {
  const [isNearScreen, setIsNearScreen] = useState(false)
  const fromRef = useRef(null)

  useEffect(() => {
    let observer: IntersectionObserver

    const onChange = (entries, observer) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting) {
        setIsNearScreen(isIntersecting)
        observer.disconnect()
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })

      observer.observe(fromRef.current)
    })

    return () => observer && observer.disconnect()

  })

  return { isNearScreen, fromRef }
}


import React, { Suspense } from 'react'
import { View } from 'react-native'

// Forma de uso de hook
export default function Lazy() {
  const { isNearScreen, fromRef } = useNearScreen({ distance: '200px' })

  const Table = lazy(() => import("@/components/Table"))

  return <View ref={fromRef}>
    <Suspense fallback={<Loader />}>
      {
        isNearScreen ?
          <Table />
          :
          <Loader />
      }
    </Suspense>
  </View>
}