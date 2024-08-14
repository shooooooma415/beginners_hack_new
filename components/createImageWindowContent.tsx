import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import './createInfoWindowContent.css';

const createImageWindowContent = (imageUrl: string) => {
    return `
        <div class="custom-info">
            <div class="custom-info-item coordinates">
                <img src="${imageUrl}" />
            </div>
        </div>`;
};

export default createImageWindowContent;