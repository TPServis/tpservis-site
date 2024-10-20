import React from 'react'
import { StaticImageData } from 'next/image'
import NextImage from 'next/image'

import Image1 from '@/public/images/documents-1.png'
import Image2 from '@/public/images/documents-2.png'
import Image3 from '@/public/images/documents-3.png'
import Image4 from '@/public/images/documents-4.png'

export default function HomeDocuments() {
  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <h2 className="text-6xl font-bold text-astral-900 pb-10">Документи без стресу</h2>
        <div className="grid grid-cols-2 grid-rows-3 gap-8">
          <HomeDocumentsItem
            title="Оформлення віз"
            description="Допомога в підготовці та подачі візових документів."
            image={Image1}
            className="row-start-1 col-start-1"
          />
          <HomeDocumentsItemSmall
            title="Легалізація та апостиль"
            description="Підтримка з легалізацією документів і отриманням апостилю"
            image={Image2}
            className="col-start-2 row-start-1"
          />
          <HomeDocumentsItemSmall
            title="Переклади документів"
            description="Офіційні переклади, які відповідають всім вимогам"
            image={Image3}
            className="row-start-3 col-start-1"
          />
          <HomeDocumentsItem
            title="Переклади"
            description="Офіційні переклади для будь-яких видів документів, необхідних для подорожей."
            image={Image4}
          />
        </div>
      </div>
    </div>
  )
}

type HomeDocumentsItemProps = {
  title: string
  description: string
  image: StaticImageData
  className?: string
}

function HomeDocumentsItem(props: HomeDocumentsItemProps) {
  const cls = 'bg-astral-700 rounded-3xl p-4 col-span-1 row-span-2 group ' + props.className

  return (
    <div className={cls}>
      <div className="rounded-lg overflow-hidden aspect-[2/1] mb-4">
        <NextImage
          src={props.image}
          alt={props.title}
          width={1000}
          height={1000}
          className=" h-full object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <h3 className="text-2xl font-bold text-astral-50 pb-2">{props.title}</h3>
      <p className="text-lg text-astral-200 pb-2 text-balance">{props.description}</p>
    </div>
  )
}

function HomeDocumentsItemSmall(props: HomeDocumentsItemProps) {
  const cls =
    'bg-astral-700 rounded-3xl p-4 col-span-1 row-span-1 flex justify-between group ' +
    props.className

  return (
    <div className={cls}>
      <div className="">
        <h3 className="text-2xl font-bold text-astral-50 pb-2">{props.title}</h3>
        <p className="text-lg text-astral-200 pb-2 text-balance">{props.description}</p>
      </div>
      <div className="rounded-lg h-full overflow-hidden">
        <NextImage
          src={props.image}
          alt={props.title}
          width={200}
          height={200}
          className=" h-full  object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  )
}
