

import classNames from "classnames/bind";
import styles from './BuyPage.module.scss'
import { IoIosArrowBack } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)
function BuyPage() {
    const [numberOne , setNumberOne] = useState(1);
    const [numberTwo , setNumberTwo] = useState(1);
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link  to="/product"className={cx('flex','items-center','mb-[20px]')}>
                    <IoIosArrowBack className={cx('text-[25px]','mr-[10px]','cursor-pointer')}/>
                    <span className={cx('text-[18px]')}>Quay Lại</span>
                </Link>
                <div className={cx('body','flex','items-start','justify-between')}>
                    <div className={cx('product','w-[40%]')}>
                        <div className={cx('product-item')}>
                            <div className={cx('choose')}>
                                <input type='radio'/>
                            </div>
                            <div className={cx('product-img')}>
                                <img alt ='imgproduct' src="/images/ss.png"/>
                            </div>
                            <div className={cx('product-name')}>
                                <h1 className={cx('font-bold','text-[18px]')}>Samsung Galaxy S23 Plus</h1>
                                <div className={cx('flex','items-center','mt-[10px]')}>
                                    <span className={cx('font-medium','text-[16px]','mr-[10px]')}>Số lượng:</span>
                                    <div className={cx('flex','items-center','number','justify-center')}>
                                        <GoDash
                                        className={cx('cursor-pointer')}
                                        onClick={() => setNumberOne(prev => Math.max(1, prev - 1))}
                                        />
                                        <span className={cx('mx-[20px]','font-semibold')}>{numberOne}</span>
                                        <GoPlus
                                        className={cx('cursor-pointer')}
                                        onClick={() => setNumberOne(prev => prev + 1)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div className={cx('product-item')}>
                            <div className={cx('choose')}>
                                <input type='radio'/>
                            </div>
                            <div className={cx('product-img')}>
                                <img alt ='imgproduct' src="/images/ss.png"/>
                            </div>
                            <div className={cx('product-name')}>
                                <h1 className={cx('font-bold','text-[18px]')}>Samsung Galaxy S23 Plus</h1>
                                <div className={cx('flex','items-center','mt-[10px]')}>
                                    <span className={cx('font-medium','text-[16px]','mr-[10px]')}>Số lượng:</span>
                                    <div className={cx('flex','items-center','number','justify-center')}>
                                        <GoDash
                                        className={cx('cursor-pointer')}
                                        onClick={() => setNumberTwo(prev => Math.max(1, prev - 1))}
                                        />
                                        <span className={cx('mx-[20px]','font-semibold')}>{numberTwo}</span>
                                        <GoPlus
                                        className={cx('cursor-pointer')}
                                        onClick={() => setNumberTwo(prev => prev + 1)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('price')}>
                            <span className={cx('font-medium','text-[16px]')}>Tổng giá trị:</span>
                            <span className={cx('ml-[10px]','font-bold','text-red-500')}>1.000.000 đđ</span>
                        </div>
                    </div>
                    <div className={cx('info-place')}>
                        <h1 className={cx('font-semibold','text-[20px]','mb-[16px]','title')}>Thông tin địa chỉ giao hàng</h1>
                        <span className={cx('font-medium','text-[12px]','subtitle')}>Bạn cần nhập đầy đủ các thông tin dưới đây!</span>
                        <form className={cx('form')}>
                            <div className={cx('form-group')}>
                                <input placeholder="Họ và tên..."/>
                            </div>
                             <div className={cx('form-group')}>
                                <input placeholder="Số điện thoại..."/>
                            </div>
                             <div className={cx('form-group')}>
                                <input placeholder="Email..."/>
                            </div>
                       
                        <h1 className={cx('text-[#263646]','mr-auto','font-bold','mb-[10px]')}>Nơi nhận hàng</h1>
                        <div className={cx('w-full','flex','items-center','justify-between')}>
                            <div className={cx('w-[49%]')}>
                                <select className={cx('form-group','text-[#a1a1a1]')}>
                                    <option className={cx('text-[#ccc]','text-[14px]')}>Tỉnh/Thành phố...</option>
                                </select>
                            </div>
                             <div className={cx('w-[49%]')}>
                               <div className={cx('form-group')}> <input placeholder="Xã/Phường..."/></div>
                            </div>
                        </div>
                         <div className={cx('form-group')}>
                                <input placeholder="Địa chỉ nhận hàng..."/>
                            </div>
                             <div className={cx('form-group')}>
                                <textarea placeholder="Ghi chú (nếu có)..."/>
                            </div>
                            <div className={cx('w-full')}>
                                <h1 className={cx('text-[#263646]','mr-auto','font-bold','mb-[10px]')}>
                                    Phương thức thanh toán
                                </h1>   
                                <div className={cx('w-full','flex','justify-between','items-center')}>
                                    <div className={cx('pay-item')}>
                                        <input type='radio'/>
                                        <span className={cx('text-[#263646]','ml-[16px]')}>Ngay sau khi nhận hàng</span>
                                    </div>
                                     <div className={cx('pay-item')}>
                                        <input type='radio'/>
                                        <span className={cx('text-[#263646]','ml-[16px]')}>Thanh toán trực tuyến</span>
                                    </div>
                                </div>
                            </div>
                            <button className={cx('btn-submit')}>
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