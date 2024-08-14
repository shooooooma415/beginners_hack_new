const createInfoWindowContent = (lat: number, lng: number): string => {
    return `
        <div class="custom-info">
            <div class="custom-info-item name">
                Tips
            </div>
            <div class="custom-info-item address">
                ここにコメント書く
            </div>
            <div class="custom-info-item coordinates">
                緯度: ${lat}<br>経度: ${lng}
            </div>
            <div class="custom-info-item google-map">
                <a href="https://www.hinatazaka46.com/s/official/?ima=0000" target="_blank">投稿</a>
            </div>
        </div>`;
};

export default createInfoWindowContent;
