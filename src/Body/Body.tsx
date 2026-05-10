import './Body.css'

const Body = () => {
  return (
    <section className="body">
      <video
        className="body-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/body/body.mp4" type="video/mp4" />
      </video>

      <div className="body-content">
        <h1>Angelina Love</h1>
        <p>Beauty & Glamour Model</p>
      </div>
    </section>
  )
}

export default Body