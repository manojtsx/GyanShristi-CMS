"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '../Loading';

interface ContentData {
    title: string;
    description: string;
    location: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    category_id: string[];
    content_type: string;
    status: string;
    _id: string;
    fileContent: string; // Added this field to handle HTML content directly
}

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const ShowContent: React.FC = () => {
    const [contentData, setContentData] = useState<ContentData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { id } = useParams(); // Extracting the content ID from the URL params

    useEffect(() => {
        if (id) {
            fetchContentById(id);
        }
    }, [id]);

    const fetchContentById = async (contentId: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API}api/content/post/${contentId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Error fetching content');
            }
            setContentData(data);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!contentData) {
        return <div>No content available</div>;
    }

    const {
        title,
        description,
        thumbnail,
        created_at,
        updated_at,
        fileContent,
    } = contentData;

    return (
        <div className="show-content-container">
            <h1>{title}</h1>
            <img src={`${API}${thumbnail}`} alt="Thumbnail" className="content-thumbnail" />
            <p>{description}</p>
            <div>
                <strong>Created At:</strong> {new Date(created_at).toLocaleDateString()}
            </div>
            <div>
                <strong>Updated At:</strong> {new Date(updated_at).toLocaleDateString()}
            </div>
            <div className="content-body">
                {/* Render the HTML content directly */}
                <div dangerouslySetInnerHTML={{ __html: contentData.fileContent }}></div>
            </div>
        </div>
    );
};

export default ShowContent;
