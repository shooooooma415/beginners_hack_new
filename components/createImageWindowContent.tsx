import "./createImageWindowContent.css";

const createImageWindowContent = (imageUrl: string, image_name: string) => {
    return `
        <div class="custom-info">
            <div class="infoWindow">
            <a href = "/detail/${image_name}">
                <img src="${imageUrl}" class="img-trimming" alt="Image"/>
                </a>
            </div>
        </div>`;
};

export default createImageWindowContent;