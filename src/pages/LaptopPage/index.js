
import classNames from "classnames/bind";
import styles from './LabtopPage.module.scss'
import Item from "@/components/Item";

const cx = classNames.bind(styles)
function LaptopPage() {
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
          <h1 className={cx('font-bold','text-[20px]','my-[20px]','text-[#263646]')}>Chọn theo tiêu chí</h1>
            <div className={cx('tabs')}>
                <div className={cx('tab-item')}>
                    <select>
                        <option>Hãng</option>
                        <option>Apple</option>
                        <option>Android</option>
                    </select>
                </div>
                  <div className={cx('tab-item')}>
                    <span>Có sẵn</span>
                </div>
                  <div className={cx('tab-item')}>
                   <span>Mới nhất</span>
                </div>
                  <div className={cx('tab-item')}>
                    <select>
                        <option>Giá cả</option>
                        <option>Tăng đần</option>
                        <option>Giảm dần</option>
                    </select>
                </div>
            </div>
            <div className={cx('w-full','flex','flex-wrap','gap-[10px]')}>
                {products.map((product)=>(
                    <Item product={product}/>
                ))}
            </div>
        </div>
     );
}

export default LaptopPage;