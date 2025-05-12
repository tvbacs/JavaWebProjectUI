
import classNames from "classnames/bind";
import styles from './Item.module.scss'
import { FaStar } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)
function Item() {
    return ( 
        <Link to='/product' className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('rate','flex','items-center')}>
                    <FaStar className={cx('text-[14px]','text-white','mr-[5px]')}/>
                    <span className={cx('text-[12px]','text-white','leading-[1]')}>5.0</span>
                </div>
                <div className={cx('image-product')}>
                    <img alt='product' src="/images/item.jpg"/>
                </div>
                <div className={cx('info-product')}>
                    <h2 className={cx('text-[16px]','font-bold')}>Samsung S23 (6GB/128GB)</h2>
                    <span className={cx('text-[14px]','text-red-600','font-bold')}>1.000.000 đ</span>
                    <div className={cx('btn-like')}>
                        <span className={cx('text-[14px]','font-medium','mr-[6px]')}>Yêu thích</span>
                        <SlLike/>
                    </div>
                </div>
            </div>
        </Link>
     );
}

export default Item;