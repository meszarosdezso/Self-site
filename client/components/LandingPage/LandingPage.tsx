import "./LandingPage.scss"

const fields = ["ui/ux", "ios/android", "photography", "front-end"]

const LandingPage: React.FC = () => {
  return (
    <div id="LandingPage">
      <div id="logo">
        <img src="/logo240.png" alt="logo" />
      </div>

      <div id="contact-btn">
        <h4>Contact</h4>
      </div>

      <div className="fields">
        {fields.map((field) => {
          return (
            <span className="field" key={field}>
              {field}
            </span>
          )
        })}
      </div>

      <h1 id="name-hero">
        <div id="cross-line"></div>
        Dezso <span id="z">Z</span>
        <br />
        Meszaros
      </h1>

      <h4 id="imadethese">I've made these</h4>
    </div>
  )
}

export default LandingPage
