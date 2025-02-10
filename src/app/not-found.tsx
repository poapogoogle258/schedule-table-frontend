import React from 'react';
import { Result } from 'antd'
// Add these imports
import './globals.css' // Required for styling

const NotFound: React.FC = () => {
    return (
        <div>
            <Result
                status={404}
                title="404 - Page Not Found"
                subTitle="Sorry, the page you are looking for does not exist."
            />
        </div>
    );
};

export default NotFound;