import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Enjoy the best time!</h1>
        <span className="mailDesc">Sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Your e-mail"/>
          <button>Subcribe</button>
        </div>
    </div>
  )
}

export default MailList