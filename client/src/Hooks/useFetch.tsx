import { useState, useEffect } from "react"

const useFetch = (url: string) => {
  const [state, setState] = useState({
    loading: true,
    data: null
  })

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ loading: false, data: data }))
  }, [url])

  return state
}

export default useFetch
