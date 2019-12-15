import { useState, useEffect } from "react"

const useFetch = (url: string) => {
  const [state, setState] = useState(() => ({
    loading: true,
    data: null
  }))

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ loading: false, data: data }))
  }, [url])

  if (state.data) {
    console.log("Fetched " + url)
  } else {
    console.log("Fetching " + url)
  }

  return state
}

export default useFetch
