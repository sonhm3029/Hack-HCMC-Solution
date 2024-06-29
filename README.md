# Hack-CMC-Heineken

Our team participate in Hackathon hackcmc, give the solution for Heineken problem

## 1. Important link

- [Link Notion](https://tribegroup.notion.site/hackhcmc-2024-H-ng-d-n-d-nh-cho-th-sinh-ce934e7afcd74203b824769ff5055880)

- [Link Data](https://drive.google.com/drive/folders/1H_eVvr-F0kAY2hiVFuOc7xeoBAiSde3f)

## 2. Problem

Heineken Việt Nam cam kết mang đến những trải nghiệm thương hiệu chất lượng cao cho khách hàng. Chính vì vậy, chúng tôi đầu tư mạnh mẽ vào việc nâng cao hình ảnh các quán bar và nhà hàng được tài trợ nơi mọi người thưởng thức sản phẩm của mình. Tuy nhiên, việc kiểm tra thủ công các thiết lập thông qua hình ảnh thực sự tốn nhiều thời gian. **Để giải quyết vấn đề này, chúng tôi đang tìm kiếm các giải pháp kỹ thuật số có khả năng phân tích hình ảnh để nhận diện các yếu tố chính sau:**

1. Logo Thương hiệu: Nhận diện logo Heineken, Tiger, Bia Việt, Larue, Bivina, Edelweiss và Strongbow.
2. Sản phẩm: Chú ý đến các thùng bia và chai bia.
3. Khách hàng: Đánh giá số lượng, hoạt động và cảm xúc của khách hàng.
4. Vật phẩm Quảng cáo: Nhận diện các poster, băng rôn và biển quảng cáo.
5. Bối cảnh Thiết lập: Giải mã không gian — quán bar, nhà hàng, cửa hàng tạp hóa hoặc siêu thị.

Lưu ý: Thí sinh có thể tìm thấy 1000 hình ảnh để huấn luyện mô hình [**[tại đây]**](https://drive.google.com/drive/folders/1H_eVvr-F0kAY2hiVFuOc7xeoBAiSde3f). Tại sự kiện, ở vòng sơ loại, BTC sẽ cung cấp thêm 50 hình ảnh để kiểm tra hiệu suất và độ chính xác của dự án.

**Heineken Vietnam i**s dedicated to delivering top-quality branding experiences to our customers. Thus, we invest heavily in enhancing the look of our sponsored bars and restaurants where people enjoy our products. However, manually checking our setups via photos is a real time drain. **To solve this problem, we're looking for digital solutions that can analyze images to identify these key elements :** 

1. Brand Logos: Spot Heineken, Tiger, Bia Viet, Larue, Bivina, Edelweiss, and Strongbow logos.
2. Products: Keep an eye out for beer kegs and beer bottles.
3. Consumers: Gauge quantity, activities, and emotions.
4. Promotional Material: Identify posters, banners, and billboards.
5. Setup Context: Decode the scene—bar, restaurant, grocery store, or supermarket.

****Note : Participants can access a dataset containing 1000 images to train your model [here](https://drive.google.com/drive/folders/1H_eVvr-F0kAY2hiVFuOc7xeoBAiSde3f). An additional set of 50 images will be provided during the qualifier round to test the performance and accuracy of their solution!

## 3. Requirement conclusion

Heineken cần giải pháp cho việc đánh giá các hình ảnh về sự kiện, địa điểm mà bên họ đã đầu tư cho việc quảng cáo thương hiệu của họ. Giải pháp được thực hiện bằng AI, đáp ứng phân tích 5 tiêu chí mô tả ở phần Problem

### 3.1 Giải pháp sử dụng mô hình riêng lẻ

- Mục 1-2-4: Sử dụng Object detection với các loại đối tượng bao gồm: thùng bia, chai bia, poster, băng rôn, biển quảng cáo, backdrop, ... -> Dùng OCR để ra chữ => thuộc nhãn hiệu bia gì

- Mục 3: Detect người, face -> cảm xúc. Sử dụng image captioning cho mô tả hoạt động

- Mục 5: Classification

### 3.2 Giải pháp sử dụng LLM

- Sử dụng LLM có thể giải quyết được cả 5 tiêu chí trừ việc đếm chính xác người và thùng bia => Sử dụng thêm model detect người + ước tính thùng bia để đếm số lượng

## Environment

- Python=3.9.13

## Note from Organizing Comittee



**Đề 02 ⭐ [Từ HEINEKEN Việt Nam]**

HEINEKEN Vietnam, nhà sản xuất bia hàng đầu Việt Nam, đang đặt ra mục tiêu cách mạng hóa trải nghiệm thương hiệu cho người tiêu dùng. Từ cửa hàng bán lẻ tại địa phương đến các điểm hẹn yêu thích cùng bạn bè, bạn có thể dễ dàng nhận thấy các sản phẩm quảng cáo của thương hiệu (banner, poster, biển hiệu đến LED,...). Tất cả đã góp phần mang đến trải nghiệm hấp dẫn và khó quên cho khách hàng. Tuy nhiên, việc kiểm tra và đánh giá các bố trí này qua hình ảnh dẫn đến việc mất nhiều thời gian và chi phí cho công ty.

**Nhiệm vụ của bạn:**

Tưởng tượng bạn là thành viên đội Digital & Technology (D&T) của HEINEKEN Vietnam. Hãy phát triển một công cụ phân tích hình ảnh có thể tự động phát hiện các yếu tố sau:

1. Logo thương hiệu: Phát hiện logo của Heineken, Tiger, Bia Việt, Larue, Bivina, Edelweiss và Strongbow.
2. Sản phẩm: Nhận diện các thùng bia và chai bia.
3. Người tiêu dùng: Đánh giá số lượng, hoạt động và cảm xúc của khách hàng.
4. Ấn phẩm quảng cáo: Nhận diện poster, banner và biển quảng cáo của thương hiệu
5. Bối cảnh hình ảnh: Phân tích về địa điểm—nhà hàng, quán bar, cửa hàng tạp hóa hoặc siêu thị, v.v..

**Hãy lựa chọn một hoặc nhiều vấn đề kinh doanh để giải quyết. Càng giải quyết được nhiều vấn đề, cơ hội chiến thắng của bạn càng cao!**

- Vấn đề kinh doanh 1: Đếm số người uống bia -> OK - yolov8 detect human
- Vấn đề kinh doanh 2: Phát hiện sản phẩm quảng cáo
- Vấn đề kinh doanh 3: Đánh giá cảm xúc của sự kiện
- Vấn đề kinh doanh 4: Đo độ thỏa mãn của khách hàng
- Vấn đề kinh doanh 5: Đánh giá mức độ hiện diện tại cửa hàng

👀 Để tăng cơ hội chiến thắng, hãy xem xét các nhiệm vụ bổ sung sau:

- Xác định bối cảnh: Xác định bối cảnh của hình ảnh: nhà hàng có phục vụ hay không, siêu thị hay cửa hàng.
- Xác định logo của đối thủ: Tìm và nhận diện các logo của đối thủ và thương hiệu khác trong hình ảnh.

📕 Bộ công cụ của bạn sẽ bao gồm:

- 7 Bộ nhận diện thương hiệu: Logo kèm theo bộ tài liệu quảng cáo và vật liệu quảng bá hình ảnh thương hiệu tại điểm bán (thùng đá, chai, lon, tủ lạnh, biển hiệu, áp phích, quầy trưng bày, bàn trưng bày, ô dù).
- 1000+ hình ảnh: Hãy lưu những công cụ của bạn về nhận diện hình ảnh có sẵn
- 50+ hình ảnh để đánh giá trực tiếp cùng các bạn vào ngày 30/06/2024

---

Hãy cùng tham gia vào hành trình chuyển đổi công nghệ của HEINEKEN Việt Nam và hack "Cho một Việt Nam tốt đẹp hơn"!