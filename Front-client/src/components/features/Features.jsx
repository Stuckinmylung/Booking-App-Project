import { useState, useEffect, useContext } from "react"
import useFetch from "../../hooks/useFetch"
import "./features.scss"
import { useNavigate } from "react-router-dom"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { SearchContext } from "../../context/SearchContext"

const Features = () => {
    // eslint-disable-next-line
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=Ha Noi,Ho Chi Minh,Phu Quoc,Da Lat,Da Nang,Sa Pa")

    const { dispatch } = useContext(SearchContext);
    // eslint-disable-next-line
    const [destination, setDestination] = useState(['Ha Noi', 'Ho Chi Minh', 'Phu Quoc', 'Da Lat', 'Da Nang', 'Sa Pa'])
    
    const today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const startDate = new Date(today);
    const endDate = new Date(today.setDate(today.getDate() + 2));
    // eslint-disable-next-line
    const [dates, setDates] = useState([
        {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }
    ]);
    // eslint-disable-next-line
    const [option, setOption] = useState({
        adult: 2,
        children: 0,
        room: 1
    });

    const navigate = useNavigate()

    const list = [
        {
            img: 'https://cdn.lawnet.vn/nhch-images//CauHoi_Hinh/87577cc2-910a-477e-a1c9-f066df898287.jpg',
            desc: 'Hà Nội, thủ đô của Việt Nam, là một điểm đến hấp dẫn với sự kết hợp tuyệt vời giữa di sản lịch sử và văn hóa phong phú, kiến trúc độc đáo và không gian xanh tươi mát.'
        },
        {
            img: 'https://www.new7wonders.com/app/uploads/sites/5/2016/10/ho-chi-minh-city-1348092-1920x1280.jpg',
            desc: 'Thành phố sôi động này được ví như “Hòn ngọc Viễn Đông” bởi những công trình kiến trúc di sản quyến rũ, không khí năng động, sôi động, náo nhiệt và con người thân thiện.'
        },
        {
            img: 'https://vietnam.travel/sites/default/files/styles/top_banner/public/2021-05/Phu%20Quoc%20family%20guide.jpg?itok=5NYQQXnW',
            desc: 'Du khách được ghé thăm vườn quốc gia Phú Quốc, nơi thu hút hàng triệu lượt khách du lịch với những bãi biển hoang sơ tuyệt đẹp và hệ động thực vật phong phú, đa dạng.'
        },
        {
            img: 'https://static.vinwonders.com/production/gioi-thieu-ve-da-lat-1.jpg',
            desc: 'Đà Lạt hiện lên với khung cảnh mộng mơ và nên thơ nhờ cái lạnh cao nguyên ban đêm, sương mù buổi sáng cùng dải rừng thông bạt ngàn, hứa hẹn là một nơi du lịch hấp dẫn.'
        },
        {
            img: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA',
            desc: 'Đà Nẵng hội tụ đủ cả núi, đồng bằng, biển và là nơi đã lọt vào top một trong 20 thành phố sạch đẹp nhất trên thế giới, địa hình đa dạng và khung cảnh thiên nhiên tuyệt đẹp.'
        },
        {
            img: 'https://dulichkhatvongviet.com/wp-content/uploads/2015/10/hoang-su-phi-mua-lua-chin-1.jpg',
            desc: 'Sapa là điểm đến để chiêm ngưỡng vẻ đẹp hoang sơ của ruộng bậc thang, thác nước, những ngọn núi, những phong tục tập quán, nét đẹp văn hóa của các dân tộc trên núi.'
        }
    ]

    useEffect(() => {
        Aos.init({ duration: 500 })
    }, [])


    return (
        <section className="features container section">

            <div data-aos='fade-right' className="ftSecTitle">
                <h3 className="ftTitle">Most visited destinations</h3>
            </div>

            <div className="ftSecContent grid">
                {loading ? 'PLEASE WAIT' :
                    <>
                        {data && list.map(({ img, desc }, i) => {
                            return (
                                <div className="singleDestination" key={i}>
                                    <div className="imageDiv">
                                        <img src={img}
                                            alt=''
                                        />
                                    </div>

                                    <div className="cardInfo"
                                        onClick={() => {
                                            dispatch({ type: "NEW_SEARCH", payload: { destination: destination[i], dates, option } });
                                            localStorage.setItem('dates', JSON.stringify(dates));
                                            localStorage.setItem('option', JSON.stringify(option));
                                            navigate("/hotels", { state: { destination: destination[i], dates, option } })
                                        }}
                                    >
                                        <h4 className="destTitle flex">
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            {destination[i]}

                                            <span>
                                                <small>{data[i]} properties</small>
                                            </span>
                                        </h4>

                                        <div className="desc">
                                            <p>{desc}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        </section>
    )
}

export default Features