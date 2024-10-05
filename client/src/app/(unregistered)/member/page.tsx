"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const people = [
    {
        name: 'Manoj Shrestha',
        role: 'Project Lead / Backend Dev',
        imageUrl:
            '/manoj.jpg',
        description:
            'Manoj Shrestha is the project leader and backend developer of this project. He has been continuously tracking all the tasks of the project and helping the team to grow faster.',
        socialMedia: {
            facebook: 'https://www.facebook.com/manoj.jsx',
            instagram: 'https://www.instagram.com/remon.js/',
            linkedin: 'https://www.linkedin.com/in/manoj-shrestha-newar/',
        },
    },
    {
        name: 'Seezan Shrestha',
        role: 'Sytem Designer / Frontend Dev',
        imageUrl:
            '/seezan.jpg',
        description:
            'Seezan Shrestha is the system designer and frontend developer of this project. She has been designing the system to make it more user friendly.',
        socialMedia: {
            facebook: 'https://www.facebook.com/seezon.stha.5',
            instagram: 'https://www.instagram.com/seezan.stha/',
            linkedin: 'https://www.linkedin.com/in/seezan-shrestha-479133226/',
        },
    },
    {
        name: 'Usha Gurung',
        role: 'Frontend Developer / Tester',
        imageUrl:
            '/usha.jpg',
        description:
            'Usha Gurung is the frontend developer and tester of this project. She has been testing the system to make it more reliable and user friendly.',
        socialMedia: {
            facebook: 'https://www.facebook.com/usha.gurung.794628',
            instagram: 'https://www.instagram.com/usha__grg/',
            linkedin: 'https://www.linkedin.com/in/usha-gurung-9421b9290/',
        },
    },
    // Add more people as needed...
];

function Modal({ person, onClose }: { person: any; onClose: () => void }) {
    const handleBackdropClick = (e: React.MouseEvent) => {
        // Close modal if the click is outside the modal content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <img
                    src={person.imageUrl}
                    alt={person.name}
                    className="w-24 h-24 rounded-full mx-auto"
                />
                <h3 className="mt-4 text-lg font-bold text-center">{person.name}</h3>
                <p className="text-center text-sm text-gray-500">{person.role}</p>
                <p className="mt-4 text-center text-gray-600">{person.description}</p>
                <div className="flex justify-center space-x-4 mt-4">
                    {/* Social Media Links with FontAwesome Icons */}
                    <a href={person.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" className="text-blue-600 hover:text-blue-800" />
                    </a>
                    <a href={person.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" className="text-pink-500 hover:text-pink-700" />
                    </a>
                    <a href={person.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-blue-700 hover:text-blue-900" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Example() {
    const [open, setOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<any>(null);

    const openModal = (person: any) => {
        setSelectedPerson(person);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setSelectedPerson(null);
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Team</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Our team of experts are here to help you grow your knowledge. We are dedicated to providing you with the best
                        service possible.
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6 cursor-pointer" onClick={() => openModal(person)}>
                                <img alt="" src={person.imageUrl} className="h-16 w-14 rounded-full" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {open && selectedPerson && <Modal person={selectedPerson} onClose={closeModal} />}
        </div>
    );
}
