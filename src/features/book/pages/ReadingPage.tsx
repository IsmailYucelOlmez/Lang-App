import Reader from '../components/Reader'


const ReadingPage = () => {
  
  const bookPDF='/Philip-K.-Dick-Androidler-Elektrikli-Koyun-Dusler-mi.pdf'
  
  return (
    <div>
      
      <Reader file={bookPDF} />
      
      
    </div>
  )
}

export default ReadingPage
