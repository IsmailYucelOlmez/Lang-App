import Reader from '../components/Reader'

const ReadingPage = () => {
  // Use the public URL for the PDF file
  const bookPdf = '/Philip-K.-Dick-Androidler-Elektrikli-Koyun-Dusler-mi.pdf'
  
  return (
    <div>
      <Reader file={bookPdf} />
    </div>
  )
}

export default ReadingPage
