import Image from '../../../common/components/Image'
import bookImage from '../../../assets/bookcover.jpg'

const BookCard = ({book, isContinueReading}:{book?:Book, isContinueReading?:boolean}) => {
  return (
    <div>
      <Image src={bookImage} className=" h-72 object-cover rounded-lg" />
      <div className='flex flex-col gap-2'>
        {isContinueReading && (
            <div className='w-full h-1 bg-gray-200 rounded-full'>
                <div className='w-1/2 h-full bg-black rounded-full'></div>
            </div>
        )}
        <h5 className='font-semibold'>Book Name</h5>
      </div>
    </div>
  )
}

export default BookCard
