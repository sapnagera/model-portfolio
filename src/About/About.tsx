import './About.css'

const About = () => {
  return (
    <section className="about">

      <div className="about-image">
        <img src="/assets/About/profile.jpg" alt="Angelina Love" />
      </div>

      <div className="about-details">
        <h1>Angelina Love</h1>
        <p className="about-bio">
  Hi, I'm Angelina! 🖤
  <br /><br />
  I'm a beauty and glamour model based in Helsinki, Finland. 
  Modeling has always been my passion — the camera, the lights, 
  the art of expression. Every shoot tells a different story and 
  I love bringing those stories to life.
  <br /><br />
  I recently started my modeling journey and I'm excited to work 
  with photographers, brands, and creative teams who share the same 
  love for beauty and art. Whether it's a bold editorial or an 
  elegant campaign — I'm ready to give my best!
  <br /><br />
  Let's create something beautiful together. 🤍
</p>

        <div className="about-stats">
          <div className="stat">
            <span className="stat-label">Age</span>
            <span className="stat-value">24</span>
          </div>
          <div className="stat">
            <span className="stat-label">Height</span>
            <span className="stat-value">175 cm / 5'9"</span>
          </div>
          <div className="stat">
            <span className="stat-label">Bust</span>
            <span className="stat-value">86 cm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Waist</span>
            <span className="stat-value">61 cm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Hips</span>
            <span className="stat-value">89 cm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Shoe</span>
            <span className="stat-value">EU 39</span>
          </div>
          <div className="stat">
            <span className="stat-label">Eyes</span>
            <span className="stat-value">Brown</span>
          </div>
          <div className="stat">
            <span className="stat-label">Hair</span>
            <span className="stat-value">Dark Brown</span>
          </div>
        </div>
      </div>

    </section>
  )
}

export default About