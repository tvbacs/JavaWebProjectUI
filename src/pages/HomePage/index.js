
import classNames from "classnames/bind";
import styles from './HomePage.module.scss'
import Item from "@/components/Item";
import Scroll from "@/components/Scroll";
import { useRef } from "react";

const cx = classNames.bind(styles)
function HomePage() {
     const scrollRefMobile = useRef(null);
     const scrollRefLaptop = useRef(null);
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
        <div className={cx('wrapper','w-full','flex','flex-col')}>
            <div className={cx('content','w-full')}>
                <div className={cx('mobile')}>
                    <h1>Điện thoại nổi bật nhất</h1>
                    <div className={cx('w-full','relative')}>
                        <div className={cx('products')} ref={scrollRefMobile}>
                            {products.map((product,index)=>{
                                return <Item product={product} />
                            })}
                        </div>
                          <Scroll scrollRef={scrollRefMobile} />
                    </div>
                </div>
                 <div className={cx('laptop')}>
                    <h1>Laptop nổi bật nhất</h1>
                    <div className={cx('w-full','relative')}>
                        <div className={cx('products')} ref={scrollRefLaptop}>
                            {products.map((product,index)=>{
                                return <Item product={product} />
                            })}
                        </div>
                          <Scroll scrollRef={scrollRefLaptop} />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default HomePage;