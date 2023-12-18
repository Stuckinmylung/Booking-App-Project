import "./propertyList.css"
import useFetch from "../../hooks/useFetch"

const PropertyList = () => {

    const {data, loading, error} = useFetch("/hotels/countByType")

    const images = [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/370564672.jpg?k=4f37af06c05a6f5dfc7db5e8e71d2eb66cae6eec36af7a4a4cd7a25d65ceb941&o=&hp=1",
        "https://connorgroup.com/static/2e58451ff52c8752da7936803fcef971/70ff9/2512-weddington-int-8952-ZF-8353-93284-1-018.jpg",
        "https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg",
        "https://pqr.vn/wp-content/uploads/2020/06/villas-la-gi2.jpg",
        "https://images.rezfusion.com/evrn/PINNAC/186135/1988780924.jpg?optimize=true&rotate=true&quality=70&width=1600"
    ];

  return (
    <div className="pList">
        {loading ? (
        "LOADING" ) : (
        <> 
            {data && images.map((img, i) => (
             <div className="pListItem" key={i}>
                <img src= {img}
                    width={310}
                    height={200}
                    alt="" 
                    className="pListImg" />
                <div className="pListTitles">
                    <span className="spTitles"> {data[i]?.type} </span> <br/>
                    <span>{data[i]?.count} {data[i]?.type}</span>
                </div>
            </div> ))}
        </> )}
    </div>
  )
}

export default PropertyList