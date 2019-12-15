import { useState, useEffect } from "react"

function useFetch<T>(url: string): [T, boolean] {
  const [state, setState] = useState<{ loading: boolean; data: any }>(() => ({
    loading: true,
    data: null
  }))

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState({ loading: false, data }))
  }, [url])

  if (state.data) {
    console.log("Fetched " + url)
  } else {
    console.log("Fetching " + url)
  }

  return [state.data, state.loading]
}

export default useFetch
