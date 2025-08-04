import BookCard from './BookCard'

const BookSection = ({title}:{title:string}) => {
  return (
    <div className="w-3/4 mx-auto flex flex-col gap-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-8">
            <BookCard isContinueReading={true} />
            <BookCard isContinueReading={true} />
            <BookCard isContinueReading={true} />
        </div>
    </div>
  )
}

export default BookSection
