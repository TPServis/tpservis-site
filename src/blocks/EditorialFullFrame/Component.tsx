import RichText from '@/components/RichText'

type EditorialFullFrameProps = {
  title: string
  content1: any
  content2: any
}

export const EditorialFullFrame = (props: EditorialFullFrameProps) => {
  return (
    <div className="w-full container-spacing pt-48">
      <div className="container-wrapper md:grid md:grid-cols-5 gap-8 md:gap-10">
        <div className="col-span-5">
          <h2 className="text-3xl md:text-6xl font-semibold text-heading pb-10">{props.title}</h2>
        </div>
        <div className="md:col-span-2 pb-6 md:pb-0">
          <RichText
            content={props.content1}
            enableGutter={false}
            className="text-lg text-secondary"
          />
        </div>
        <div className="md:col-span-3">
          <RichText
            content={props.content2}
            enableGutter={false}
            className="text-lg text-secondary"
          />
        </div>
      </div>
    </div>
  )
}
