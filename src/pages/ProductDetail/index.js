
import classNames from "classnames/bind";
import styles from './ProductDetail.module.scss';
import { LuShoppingCart } from "react-icons/lu";
import { useRef } from "react";
import Item from "@/components/Item";
import Scroll from "@/components/Scroll";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)
function ProducDetail() {
    const scrollRef= useRef(null);
     const products = [
        {
            name:'',
            price:''
        },
          {
            name:'',
            price:''
        },  {
            name:'',
            price:''
        },  {
            name:'',
            price:''
        }
        ,  {
            name:'',
            price:''
        }
        ,  {
            name:'',
            price:''
        }
        ,  {
            name:'',
            price:''
        }
        ,  {
            name:'',
            price:''
        }
        ,  {
            name:'',
            price:''
        }
    ]
    return ( 
       <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('info')}>
                        <div className={cx('info-left')}>
                            <h1>Samsung Galaxy S23 Plus</h1>
                            <img alt='productimg' src="/images/ss.png"/>
                        </div>
                         <div className={cx('info-right')}>
                            <div className={cx('flex','justify-between','items-center')}>
                                <div className={cx('price','flex','items-center','justify-start')}>
                                    <span className={cx('font-medium','text-[16px]','mr-[10px]')}>Giá cả: </span>
                                    <span className={cx('font-semibold','text-[18px]','text-red-500')}>1.000.000 đ</span>
                                </div>
                                <div className={cx('buy','flex','items-center','justify-center')}>
                                    <div className={cx('cart','mr-[10px]')}>
                                        <LuShoppingCart className={cx('text-[20px]')}/>
                                    </div>
                                    <Link to='/buy' className={cx('buy-btn')}>Mua ngay</Link>
                                </div>
                            </div>
                            <div className={cx('infor-product')}>
                                <h1 className={cx('text-[16px]','font-semibold','mb-[20px]')}>Thông tin sản phẩm</h1>
                                <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>Màn hình</span>
                                    <p>2 days 1 night</p>
                                </div>
                                 <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>Vi xử lí</span>
                                    <p>Sightseeing, Food, Culture</p>
                                </div>
                                 <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>RAM</span>
                                    <p>10 people</p>
                                </div>
                                 <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>Bộ nhớ trong</span>
                                    <p>Hilton Da Nang</p>
                                </div>
                                 <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>Chất liệu</span>
                                    <p>Da Nang International Airport</p>
                                </div>
                                 <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>Hệ điều hành</span>
                                    <p>Da Nang International Airport</p>
                                </div>
                                 <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>Dung lượng pin</span>
                                    <p>Da Nang International Airport</p>
                                </div>
                                 <div className={cx('infor-product-item','w-full','flex','justify-between','items-center')}>
                                    <span>Năm sản xuất</span>
                                    <p>Da Nang International Airport</p>
                                </div>
    
    
                            </div>
                        </div>
                    </div>
                     <div className={cx('descript')}>
                        <h1 className={cx('font-semibold','text-[16px]','mb-[10px]')}>Mô tả chi tiết</h1>
                        <span className={cx('description')}>
                            Samsung Galaxy S23 là mẫu điện thoại cao cấp nhỏ gọn được Samsung ra mắt vào đầu năm 2023. Máy sở hữu thiết kế tinh tế với mặt kính Gorilla Glass Victus 2 và khung viền nhôm chắc chắn, đạt chuẩn kháng nước IP68. Màn hình 6.1 inch Dynamic AMOLED 2X mang đến hình ảnh sắc nét, mượt mà với tần số quét 120Hz. Bên trong, Galaxy S23 được trang bị vi xử lý Snapdragon 8 Gen 2 for Galaxy mạnh mẽ, kết hợp RAM 8GB và bộ nhớ trong lên đến 512GB. Hệ thống ba camera sau, với camera chính 50MP, cho phép chụp ảnh rõ nét và quay video chất lượng cao. Với viên pin 3.900mAh cùng khả năng sạc nhanh và sạc không dây, Galaxy S23 đáp ứng tốt nhu cầu sử dụng hàng ngày. Đây là lựa chọn lý tưởng cho người dùng yêu thích sự nhỏ gọn nhưng vẫn muốn trải nghiệm hiệu năng mạnh mẽ và công nghệ cao cấp.
                        </span>
                    </div>
                </div>
            </div>
             <div className={cx('my-[20px]')}>
                    <h1 className={cx('font-bold','text-[18px]','mb-[16px]','mt-[30px]')}>Sản phẩm liên quan</h1>
                     <div className={cx('product')}>
                        <div className={cx('w-full','relative')}>
                            <div className={cx('products')} ref={scrollRef}>
                                {products.map((product,index)=>{
                                    return <Item product={product} />
                                })}
                            </div>
                              <Scroll scrollRef={scrollRef} />
                        </div>
                    </div>
                </div>
       </>
     );
}

export default ProducDetail;