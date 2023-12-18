import useFetch from "../../hooks/useFetch"
import "./features.css"

const Features = () => {

    const {data, loading, error} = useFetch("/hotels/countByCity?cities=London,Berlin,Madrid")

  return (
    <div className="features">
        {loading ? (
        "LOADING" ) : (
        <> 
            <div className="featureItem">
                <img src='https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg'
                    width={310}
                    height={200}
                    alt=""
                    className="featuredImg" />
                <div className="featureTitles">
                    <span>London</span> <br/>
                    <span>{data[0]} properties</span>
                </div>
            </div>

            <div className="featureItem">
                <img src='https://wiki-travel.com.vn/uploads/post/UyenMac-231611091640-du-lich-duc-berlin-anh-bia.jpg'
                    width={310}
                    height={200}
                    alt=""
                    className="featuredImg" />
                <div className="featureTitles">
                    <span>Berlin</span> <br/>
                    <span>{data[1]} properties</span>
                </div>
            </div>

            <div className="featureItem">
                <img src='https://tuonglong.vn/upload/images/nhung-dia-diem-du-lich-noi-tieng-tai-madrid-1.jpg'
                    width={310}
                    height={200}
                    alt=""
                    className="featuredImg" />
                <div className="featureTitles">
                    <span>Madrid</span> <br/>
                    <span>{data[2]} properties</span>
                </div>
            </div> 
        </> )}
    </div>
  )
}

export default Features