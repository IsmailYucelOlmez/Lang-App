import Image from '../Image'
import categoryImage from '../../../assets/categoryBg.png'

const CategorySection = () => {
  return (
    <div className='w-9/10 mx-auto flex flex-col gap-8 relative'>
      <Image src={categoryImage} className='w-full object-cover -z-10'/>
      <div className='absolute top-12 left-1/10 w-2/3'>
        <p className='text-2xl font-bold z-10 mb-4'>Explore Categories</p>

        <p className='text-lg font-semibold z-10'>Discover a world of knowledge and learning with our diverse collection of categories.
        <p className='text-lg font-semibold z-10'>From classic literature to modern bestsellers, we have something for everyone.</p></p>
      </div>

      <div className='absolute bottom-1/5 left-1/10 w-2/3'>

        <button className='bg-white text-black px-4 py-2 rounded-full w-1/4'>View All Categories</button>
      </div>
      
    </div>
  )
}

export default CategorySection
