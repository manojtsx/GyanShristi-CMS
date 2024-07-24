import React from 'react'
import { stringify } from 'flatted'; 
import './ShowContent.css'
interface ShowContentProps {
    editorInstance: any; // Replace 'any' with the appropriate type if known
}
const ShowContent = ({editorInstance }: ShowContentProps) => {
    return (
        <div>
            {/* Use the dangerouslySetInnerHTML prop to render the HTML content */}
            <div dangerouslySetInnerHTML={{ __html: editorInstance }}></div>
        </div>
    )
}

export default ShowContent