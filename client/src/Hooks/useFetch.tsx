import { useState, useEffect } from "react"

function useFetch<T>(url: string): [T, boolean, any] {
  const [state, setState] = useState<{
    loading: boolean
    data: any
    error: any
  }>(() => ({
    loading: true,
    data: null,
    error: null
  }))

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ loading: false, data, error: null }))
      .catch(err => setState({ loading: false, data: null, error: err }))
  }, [url])

  return [state.data, state.loading, state.error]
}

export default useFetch
