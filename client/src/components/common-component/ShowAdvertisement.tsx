import React from 'react'
import Image from 'next/image'

const ShowAdvertisement: React.FC = () => {
    return (
        <aside className="w-full lg:w-1/4 bg-gray-100 p-4 lg:p-6 rounded-lg shadow-md">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Advertisement
            </h2>
            <div className='flex flex-col gap-8'>
                <Image src="/ad1.png" alt="Advertisement" width={300} height={250} />
                <Image src="/ad3.png" alt="Advertisement" width={300} height={250} />
                <Image src="/ad2.png" alt="Advertisement" width={300} height={250} />
                <Image src="/ad4.png" alt="Advertisement" width={300} height={250} />
            </div>

        </aside>
    )
}

export default ShowAdvertisement