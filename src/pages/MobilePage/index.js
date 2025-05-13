import classNames from "classnames/bind";
import styles from './MobilePage.module.scss';
import Item from "@/components/Item";
import { useState, useEffect, useMemo } from "react";
import electronicService from "@/services/electronicService"; 

const cx = classNames.bind(styles);

function MobilePage() {
  const [allMobiles, setAllMobiles] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState(""); // "iphone", "samsung", etc.
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState(""); // "newest", "priceAsc", "priceDesc"

  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const result = await electronicService.getAllElectronics();
        if (result.success) {
          const filtered = result.data.filter(
            (product) => product.category.cat_id === 1
          );
          setAllMobiles(filtered);
          setLoading(false);
        } else {
          setError(result.message);
          setLoading(false);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu sản phẩm");
        setLoading(false);
      }
    };

    fetchMobiles();
  }, []);

  const mobiles = useMemo(() => {
    let result = [...allMobiles];

    if (selectedBrand) {
      result = result.filter((product) =>
        product.brand.brand_id.toLowerCase() === selectedBrand
      );
    }

    if (onlyInStock) {
      result = result.filter((product) => product.status === "instock");
    }

    if (sortBy === "newest") {
      result.sort((a, b) => b.manufacture_year - a.manufacture_year);
    } else if (sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [allMobiles, selectedBrand, onlyInStock, sortBy]);

  if (loading) return <div className={cx("wrapper")}>Đang tải...</div>;
  if (error) return <div className={cx("wrapper")}>{error}</div>;

  return (
    <div className={cx('wrapper', 'w-full', 'flex', 'flex-col')}>
      <h1 className={cx('font-bold', 'text-[20px]', 'my-[20px]', 'text-[#263646]')}>Chọn theo tiêu chí</h1>

      <div className={cx('tabs')}>
        <div className={cx('tab-item')}>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">Hãng</option>
            <option value="iphone">iPhone</option>
            <option value="samsung">Samsung</option>
            <option value="xiaomi">Xiaomi</option>
          </select>
        </div>
        <div className={cx('tab-item')}>
          <label>
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
            />
            <span style={{ marginLeft: '6px' }}>Có sẵn</span>
          </label>
        </div>
        <div className={cx('tab-item')}>
          <button
            className={cx({ active: sortBy === "newest" })}
            onClick={() => setSortBy("newest")}
          >
            Mới nhất
          </button>
        </div>
        <div className={cx('tab-item')}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Giá cả</option>
            <option value="priceAsc">Tăng dần</option>
            <option value="priceDesc">Giảm dần</option>
          </select>
        </div>
      </div>

      <div className={cx('w-full', 'flex', 'flex-wrap', 'gap-[10px]')}>
        {mobiles.length > 0 ? (
          mobiles.map((product) => (
            <Item key={product.id} product={product} />
          ))
        ) : (
          <div className={cx('text-[#888]', 'mt-[20px]')}>Không có sản phẩm phù hợp</div>
        )}
      </div>
    </div>
  );
}

export default MobilePage;
