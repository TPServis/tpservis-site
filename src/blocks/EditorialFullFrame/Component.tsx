import RichText from '@/components/RichText'

type EditorialFullFrameProps = {
  title: string
  content1: any
  content2: any
}

export const EditorialFullFrame = (props: EditorialFullFrameProps) => {
  return (
    <div className="w-full container-spacing pt-48">
      <div className="container-wrapper grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
        <div className="md:col-span-3 row-span-1 md:w-[80%]">
          <h2 className="md:text-6xl text-3xl font-bold text-heading">{props.title}</h2>
        </div>
        <div className="md:col-span-2 row-span-1">
          <RichText
            content={props.content1}
            enableGutter={false}
            className="text-lg text-shark-400 pb-6"
          />
          <RichText
            content={props.content2}
            enableGutter={false}
            className="text-lg text-shark-400 pb-6"
          />
        </div>
      </div>
    </div>
  )
}
