'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get('q') || ''

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    // Only navigate if we're not already on the search page with the same query
    const newPath = `/search${debouncedValue ? `?q=${debouncedValue}` : ''}`
    const currentPath = pathname + (currentQuery ? `?q=${currentQuery}` : '')

    if (newPath !== currentPath) {
      router.push(newPath)
    }
  }, [debouncedValue, router, pathname, currentQuery])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
          defaultValue={currentQuery}
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
