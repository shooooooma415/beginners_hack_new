import "./createImageWindowContent.css";

const createImageWindowContent = (imageUrl: string) => {
    return `
        <div class="custom-info">
            <div class="custom-info-item coordinates">
                <img src="${imageUrl}" class="img-trimming" alt="Image"/>
            </div>
        </div>`;
};

export default createImageWindowContent;