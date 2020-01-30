import React from "react"
import "./Particles.scss"
import P5Wrapper from "react-p5-wrapper"
import { useTheme } from "../../Providers/theme_provider"
import { HEX2RGB } from "../../Functions"

const sketch = (p: any, background: string, accentColor: string) => {
  const particles: Particle[] = []

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight)
  }

  p.mousePressed = function() {
    particles.push(new Particle(p.mouseX, p.mouseY))
  }

  p.draw = function() {
    p.background(...HEX2RGB(background))

    particles.forEach((particle, idx) => {
      particle.update()
      particle.draw()
      particle.checkParticles(particles.slice(idx))
    })
  }

  class Particle {
    pos: any
    vel: any
    size: any

    constructor(x?: any, y?: any) {
      this.pos = p.createVector(x || p.random(p.width), y || p.random(p.height))
      this.vel = p.createVector(p.random(-2, 2), p.random(-2, 2))
      this.size = 4
    }

    update() {
      this.pos.add(this.vel)
      this.edges()
    }

    draw() {
      p.noStroke()
      p.fill(...HEX2RGB(accentColor))
      p.circle(this.pos.x, this.pos.y, this.size * 2)
    }

    edges() {
      if (this.pos.x < 0 || this.pos.x > p.width) {
        this.vel.x *= -1
      }

      if (this.pos.y < 0 || this.pos.y > p.height) {
        this.vel.y *= -1
      }
    }

    checkParticles(particles: Particle[]) {
      particles.forEach(particle => {
        const d = p.dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
        if (d < 200) {
          p.stroke(...HEX2RGB(accentColor))
          p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
        }
      })
    }
  }
}

const Particles: React.FC = () => {
  const { primaryColorDark, accentColor } = useTheme()
  return (
    <P5Wrapper
      sketch={(p: any) => sketch(p, primaryColorDark, accentColor)}
      background={primaryColorDark}
    />
  )
}

export default Particles
