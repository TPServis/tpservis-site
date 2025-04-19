import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cva } from 'class-variance-authority'
import { ExternalLink } from 'lucide-react'
import React from 'react'

export type DownloadableFilesBlock = {
  blockType: 'downloadableFiles'
  files: {
    file: MediaType
  }[]
  buttonLabel: string
  withLateralSpacing: boolean
}

const containerVariants = cva(['w-full !py-0'], {
  variants: {
    withLateralSpacing: {
      true: ['container-spacing'],
    },
  },
})

const containerWrapperVariants = cva(
  ['grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 !mb-8'],
  {
    variants: {
      withLateralSpacing: {
        true: ['container-wrapper'],
      },
    },
  },
)

const DownloadableFiles = (props: DownloadableFilesBlock) => {
  if (!props.files?.length) return null

  return (
    <div className={containerVariants({ withLateralSpacing: props.withLateralSpacing })}>
      <div className={containerWrapperVariants({ withLateralSpacing: props.withLateralSpacing })}>
        {props.files.map((fileItem, index) => {
          const file = fileItem.file
          if (!file) return null

          const isImage = file.mimeType?.includes('image')
          const fileUrl = `https://utfs.io/f/${file._key}` || file.url || ''
          const fileName = file.filename || 'File'

          return (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-xl border-8 border-white overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {isImage ? (
                <div className="aspect-[4/3] w-full relative overflow-hidden">
                  <Media
                    resource={file}
                    className="w-full h-full filter brightness-95 rounded"
                    imgClassName="object-cover"
                  />
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium duration-200"
                  >
                    переглянути зображення
                  </a>
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-astral-50 flex items-center justify-center rounded">
                  <div className="text-4xl text-astral-400">{fileName.split('.')[0]}</div>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-astral-400 transition-colors duration-200">
                    {fileName}
                  </h3>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="Open in new window"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                {file.alt && <p className="mt-1 text-sm text-gray-500 line-clamp-2">{file.alt}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DownloadableFiles
