
import classNames from "classnames/bind";
import styles from './Profile.module.scss'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useState } from "react";

const cx = classNames.bind(styles)
function Profile() {
    const [activeTab, setActiveTab] = useState("info");

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('sibar')}>
                    <div className={cx('flex','items-center','mb-[30px]')}>
                        <Link to='/'><MdOutlineArrowBackIos className={cx('text-[25px]','mr-[10px]')}/></Link>
                        <span className={cx('text-[20px]','font-medium','text-[#3F3F46]')}>Quay lại</span>
                    </div>

                   <div className={cx('tabs')}>
                    <div
                        className={cx('tab-item', { active: activeTab === "info" })}
                        onClick={() => setActiveTab("info")}
                    >
                        <AiOutlineUser className={cx('text-[20px]', 'mr-[10px]')} />
                        <span className={cx('text-[#263646]', 'text-[14px]', 'font-semibold')}>Thông tin cá nhân</span>
                    </div>

                    <div
                        className={cx('tab-item', { active: activeTab === "bill" })}
                        onClick={() => setActiveTab("bill")}
                    >
                        <LiaMoneyCheckAltSolid className={cx('text-[20px]', 'mr-[10px]')} />
                        <span className={cx('text-[#263646]', 'text-[14px]', 'font-semibold')}>Hóa đơn của bạn</span>
                    </div>

                    <div
                        className={cx('tab-item', { active: activeTab === "order" })}
                        onClick={() => setActiveTab("order")}
                    >
                        <MdProductionQuantityLimits className={cx('text-[20px]', 'mr-[10px]')} />
                        <span className={cx('text-[#263646]', 'text-[14px]', 'font-semibold')}>Đơn hàng chờ duyệt</span>
                    </div>
                    </div>

                </div>
                <div className={cx('content-tab')}>
                    {activeTab === "info" && <div className={cx('information')}>
                            <div className={cx('flex','items-center','mb-[20px]')}>
                                <img className={cx('avt')} alt='' src="/images/testavt.png" />
                                <div className={cx('flex','flex-col')}>
                                    <h1 className={cx('text-[20px]','font-semibold','text-[#263646]')}>Nguyễn Quang Hoàng</h1>
                                    <span  className={cx('text-[16px]','mt-10[10px]')}>userid</span>
                                </div>
                            </div>
                            <div className={cx('w-full')}>
                                <h1 className={cx('text-[18px]','text-[#263646]','font-medium','mb-[20px]')}>Thông tin của bạn</h1>
                                <form>
                                    <div className={cx('w-full','flex','justify-between','items-center')}>
                                        <div className={cx('form-group')}>
                                            <label>Họ và tên</label>
                                            <input placeholder="Nguyễn Quang Hoàng"/>
                                        </div>
                                         <div className={cx('form-group')}>
                                            <label>Username</label>
                                            <input placeholder="hoangnq.jl"/>
                                        </div>
                                    </div>
                                     <div className={cx('w-full','flex','justify-between','items-center','my-[20px]')}>
                                        <div className={cx('form-group')}>
                                            <label>Email</label>
                                            <input placeholder="Nguyễn Quang Hoàng"/>
                                        </div>
                                         <div className={cx('form-group')}>
                                            <label>Số điện thoại</label>
                                            <input placeholder="hoangnq.jl"/>
                                        </div>
                                    </div>
                                    <button className={cx('btn-submit')}>Lưu thông tin</button>
                                </form>
                            </div>
                        </div>
                    }

                    {activeTab === "bill" && <div className={cx('bill')}>
                            <div className={cx('bill-item')}>
                                <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Tên khách hàng:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Nguyễn Quang Hoàng</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Địa chỉ:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Đà Nẵng không phải quê</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>SĐT:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>0905785273</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Ngày đặt:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>15/12/2004</span>
                                </div> <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Mã hóa đơn:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>hoadon_02</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Hình thức thanh toán:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Thanh toán khi nhận hàng</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Sản phẩm mua:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Samsung Galaxy S23 Ultra SL 2, iPhone 14 Pro Max SL 1</span>
                                </div>

                                  <div className={cx('bill-infor','mb-[20px]','flex','items-center','ml-auto')}>
                                    <p className={cx('font-normal','text-[16px]','text-red-500')}>Tổng giá:</p>
                                    <span className={cx('font-medium','text-[16px]','ml-[6px]','text-red-500')}>24.000.000 (VNĐ)</span>
                                </div>

                                
                            </div>
                        </div>}
                    {activeTab === "order" && <div className={cx('order')}>
                               <div className={cx('bill-item')}>
                                <div className={cx('flex','items-center','justify-between')}>
                                    <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                        <p className={cx('font-normal','text-[14px]')}>Tên khách hàng:</p>
                                        <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Nguyễn Quang Hoàng</span>
                                    </div>
                                    <span className={cx('font-semibold','text-[14px]','text-red-500')}>ĐANG XỬ LÝ</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Địa chỉ:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Đà Nẵng không phải quê</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>SĐT:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>0905785273</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Ngày đặt:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>15/12/2004</span>
                                </div> <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Mã hóa đơn:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>hoadon_02</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Hình thức thanh toán:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Thanh toán khi nhận hàng</span>
                                </div>
                                 <div className={cx('bill-infor','mb-[20px]','flex','items-center')}>
                                    <p className={cx('font-normal','text-[14px]')}>Sản phẩm mua:</p>
                                    <span className={cx('font-medium','text-[14px]','ml-[6px]')}>Samsung Galaxy S23 Ultra SL 2, iPhone 14 Pro Max SL 1</span>
                                </div>

                                  <div className={cx('bill-infor','mb-[20px]','flex','items-center','ml-auto')}>
                                    <p className={cx('font-normal','text-[16px]','text-red-500')}>Tổng giá:</p>
                                    <span className={cx('font-medium','text-[16px]','ml-[6px]','text-red-500')}>24.000.000 (VNĐ)</span>
                                </div>

                                
                            </div>
                        </div>}
                </div>

            </div>
        </div>
     );
}

export default Profile;