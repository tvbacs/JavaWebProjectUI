import classNames from "classnames/bind";
import styles from "./BuyPage.module.scss";
import { IoIosArrowBack } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import electronicService from "@/services/electronicService";
import { useUser } from "@/contexts/UserContext";
import invoiceService from "@/services/invoiceService";

const cx = classNames.bind(styles);

function BuyPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [numberOne, setNumberOne] = useState(1);
  const [numberTwo, setNumberTwo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const { user } = useUser();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError(
          <div>
            Không tìm thấy sản phẩm. Vui lòng chọn sản phẩm từ{" "}
            <Link to="/">trang chủ</Link>.
          </div>
        );
        setLoading(false);
        return;
      }

      try {
        const productResult = await electronicService.getElectronicById(id);
        console.log("BuyPage Product Result:", productResult);
        if (productResult.success) {
          setProduct(productResult.data);
        } else {
          setError(productResult.message);
        }
        setLoading(false);
      } catch (err) {
        console.error("BuyPage Fetch Error:", err);
        setError("Không thể tải thông tin sản phẩm");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className={cx("wrapper")}>Đang tải...</div>;
  if (error) return <div className={cx("wrapper")}>{error}</div>;
  if (!product) return <div className={cx("wrapper")}>Sản phẩm không tồn tại</div>;

  const formattedPrice = Number(product.price).toLocaleString("vi-VN") + " đ";
  const totalPrice = (Number(product.price) * (numberOne + numberTwo)).toLocaleString("vi-VN") + " đ";
  const imageSrc = product.image
    ? `${process.env.REACT_APP_API_URL}${product.image}`
    : "/images/item.png";

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const purchasedItems = [
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: numberOne + numberTwo,
    },
  ];

  const invoicePayload = {
    address: `${formData.get("address")}, ${formData.get("ward")}, ${formData.get("province")}`,
    paymentMethod: formData.get("paymentMethod"),
    purchasedItems: JSON.stringify(purchasedItems), 
    totalPrice: Number(product.price) * (numberOne + numberTwo),
    status: "processing", 
  };

  console.log("Sending Invoice:", invoicePayload);

  const result = await invoiceService.createInvoice(invoicePayload);

  if (result.success) {
    alert("Đặt hàng thành công!");
  } else {
    alert("Lỗi: " + result.message);
  }
};

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <Link to={`/product/${id}`} className={cx("flex", "items-center", "mb-[20px]")}>
          <IoIosArrowBack className={cx("text-[25px]", "mr-[10px]", "cursor-pointer")} />
          <span className={cx("text-[18px]")}>Quay Lại</span>
        </Link>
        <div className={cx("body", "flex", "items-start", "justify-between")}>
          <div className={cx("product", "w-[40%]")}>
            <div className={cx("product-item")}>
              {/* <div className={cx("choose")}>
                <input type="radio" name="product" />
              </div> */}
              <div className={cx("product-img")}>
                <img alt={product.name} src={imageSrc} />
              </div>
              <div className={cx("product-name")}>
                <h1 className={cx("font-bold", "text-[18px]")}>{product.name}</h1>
                <div className={cx("flex", "items-center", "mt-[10px]")}>
                  <span className={cx("font-medium", "text-[16px]", "mr-[10px]")}>
                    Số lượng:
                  </span>
                  <div className={cx("flex", "items-center", "number", "justify-center")}>
                    <GoDash
                      className={cx("cursor-pointer")}
                      onClick={() => setNumberTwo((prev) => Math.max(1, prev - 1))}
                    />
                    <span className={cx("mx-[20px]", "font-semibold")}>{numberTwo}</span>
                    <GoPlus
                      className={cx("cursor-pointer")}
                      onClick={() =>
                        setNumberTwo((prev) =>
                          product.quantity ? Math.min(product.quantity, prev + 1) : prev + 1
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("price")}>
              <span className={cx("font-medium", "text-[16px]")}>Tổng giá trị:</span>
              <span className={cx("ml-[10px]", "font-bold", "text-red-500")}>
                {totalPrice}
              </span>
            </div>
          </div>
          <div className={cx("info-place")}>
            <h1 className={cx("font-semibold", "text-[20px]", "mb-[16px]", "title")}>
              Thông tin địa chỉ giao hàng
            </h1>
            <span className={cx("font-medium", "text-[12px]", "subtitle")}>
              Bạn cần nhập đầy đủ các thông tin dưới đây!
            </span>
            <form className={cx("form")} onSubmit={handleSubmit}>
              <div className={cx("form-group")}>
                <input name="fullName" placeholder={user.fullname || 'fullname...'} />
              </div>
              <div className={cx("form-group")}>
                <input
                  name="phone"
                  placeholder={user.phoneNumber || 'phonenumber...'}
                  type="tel"
                  pattern="[0-9]{10,11}"
                />
              </div>
              <div className={cx("form-group")}>
                <input name="email" placeholder={user.email || 'email...'} type="email"  />
              </div>
              <h1 className={cx("text-[#263646]", "mr-auto", "font-bold", "mb-[10px]")}>
                Nơi nhận hàng
              </h1>
              <div className={cx("w-full", "flex", "items-center", "justify-between")}>
                <div className={cx("w-[49%]")}>
                  <select
                    name="province"
                    className={cx("form-group", "text-[#a1a1a1]")}
                    required
                  >
                    <option value="" disabled selected>
                      Tỉnh/Thành phố...
                    </option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                </div>
                <div className={cx("w-[49%]")}>
                  <div className={cx("form-group")}>
                    <input name="ward" placeholder="Xã/Phường..." required />
                  </div>
                </div>
              </div>
              <div className={cx("form-group")}>
                <input name="address" placeholder="Địa chỉ nhận hàng..." required />
              </div>
              <div className={cx("form-group")}>
                <textarea name="note" placeholder="Ghi chú (nếu có)..." />
              </div>
              <div className={cx("w-full")}>
                <h1 className={cx("text-[#263646]", "mr-auto", "font-bold", "mb-[10px]")}>
                  Phương thức thanh toán
                </h1>
                <div className={cx("w-full", "flex", "justify-between", "items-center")}>
                  <div className={cx("pay-item")}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      defaultChecked
                      required
                    />
                    <span className={cx("text-[#263646]", "ml-[16px]")}>
                      Ngay sau khi nhận hàng
                    </span>
                  </div>
                  <div className={cx("pay-item")}>
                    <input type="radio" name="paymentMethod" value="online" required />
                    <span className={cx("text-[#263646]", "ml-[16px]")}>
                      Thanh toán trực tuyến
                    </span>
                  </div>
                </div>
              </div>
              <button type="submit" className={cx("btn-submit")}>
                Xác nhận mua hàng
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;