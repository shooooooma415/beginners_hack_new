import "./createImageWindowContent.css";

const createImageWindowContent = (imageUrl: string) => {
    return `
        <div class="custom-info">
            <div class="infoWindow">
                <img src="${imageUrl}" class="img-trimming" alt="Image"/>
            </div>
        </div>`;
};

export default createImageWindowContent;