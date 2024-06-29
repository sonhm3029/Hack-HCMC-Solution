# Tài liệu hướng dẫn sử dụng

## 1. Flow của tool

![](./src/assets/images/guideline/1.png)

## 2. Thông tin chi tiết

### 2.1 Cấu trúc dữ liệu của chatbot

Chatbot sẽ ghi nhận các dữ liệu của người dùng trong các cuộc trò chuyện. Nếu chatbot không chắc chắn đưa ra câu trả lời cho người dùng (Confidence score <= 0.7), câu hỏi của người dùng sẽ được ghi nhận lại và đưa vào tool đánh nhãn:

![](./src/assets/images/guideline/2.png)

Dữ liệu chatbot sử dụng để học tập có dạng sau:

```json
{
    examples: [
        "Xin chào",
        "hello",
        "chào bạn",
        "HIiiiiiiiii"
    ],
    response: "Xin chào bạn, mình sẵn sàng giúp đỡ ^_^"
}
```

Trong đó `examples` là các trường hợp mà người dùng sẽ hỏi chatbot, các `examples` này gộp lại được gọi là `intent`, `response` là câu trả lời mà chatbot dự kiến sẽ trả lời.

### 2.2 Chi tiết các màn

#### 2.2.1 Màn hiển thị các câu hỏi của người dùng được ghi nhận lại

Đây là màn hiển thị các câu hỏi được ghi lại trong quá trình trò chuyện với người dùng.

Các thao tác có thể thực hiện với các dữ liệu này bao gồm:

- Xóa một hoặc nhiều dữ liệu trong trường hợp người đánh nhãn thấy đó là dữ liệu rác hoặc đã tồn tại (Biểu tượng thùng rác)

- Đánh nhãn cho dữ liệu -> Màn tại mục **2.2.2** (Biểu tượng cây bút)

![](./src/assets/images/guideline/3.png)

#### 2.2.2 Màn đánh nhãn dữ liệu

Tại màn hiển thị dữ liệu ghi nhận, click chuột vào biểu tượng but tại cột thao tác -> Mở ra hộp thoại đánh nhãn:

Màn này cho phép người dùng thêm mới câu hỏi của người dùng với câu trả lời làm một intent (dữ liệu) mới trong database **Hoặc** thêm câu hỏi của được ghi nhận làm examples của một intent đã tồn tại trong database

![](./src/assets/images/guideline/4.png)

- Section bên tay trái với title **Thêm mới dữ liệu** để thêm câu trả lời cho câu hỏi được ghi nhận trong trường hợp **Chưa tồn tại intent**
- Section bên tay phải cho phép search các `intent` đã có trong database -> Cho phép người dùng kiếm tra câu hỏi được ghi nhận và thêm câu hỏi vào làm `examples` cho intent đã tồn tại trong database. Thao tác:
    - Click chuột vào intent (hàng chứa intent)

# 3. Tác dụng

Với các câu hỏi được thu thập và đánh nhãn. Chatbot sẽ được training lại để cải thiện hơn.